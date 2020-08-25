// Class for handling instantiating a task object
class Task {
    constructor(task, name, date) {
        this.task = task
        this.name = name
        this.date = date
    }
}
// Class for handling the UI related tasks -  Adding, deleting and displaying tasks
class UserInterface {

    //Method to display existing tasks 
    static displayTask() {
        const taskList = [{
            task: "(Example) Reply to Jane Doe's Email",
            name: "Mazen Abdul",
            date: "2020-08-24"
        }]

        const tasks = taskList
        tasks.forEach((task) => {
            UserInterface.addToTable(task)
        })

    }

    //Method to add tasks to table
    static addToTable = (task) => {
        const list = document.querySelector("#task-list")
        const row = document.createElement("tr")

        row.innerHTML = `
      <td>${task.task}</td>
      <td>${task.name}</td>
      <td>${task.date}</td>
      <td><button type = "button" class="btn-sm btn btn-danger">X</button></td>
      `
        list.appendChild(row)
    }

    static removeTask(target) {
        if (target.classList.contains("btn-danger")) {
            target.parentElement.parentElement.remove()
            UserInterface.alert("Task Removed", "danger")
        } else {
            UserInterface.alert("No Task to remove", "danger")
        }

    }

    //Method to display a customizable alert message 
    static alert(message, type) {

        const form = document.querySelector("#task-input")
        const alert = document.querySelector(".alert")
        const div = document.createElement("div")

        div.innerHTML = `
      <div class="alert alert-dismissible alert-${type}">
      <button type="button" class="close" data-dismiss="alert">&times;</button>
      <strong>${message}</strong>
      </div>
      `
        alert.appendChild(div)

        setTimeout(() => {
            alert.removeChild(div)
        }, 3000)
    }

    static clearFields() {
        document.querySelector("#task").value = ''
        document.querySelector("#assigned").value = ''
        document.querySelector("#deadline").value = ''
    }
}

//Event - Display the tasks on Load
document.addEventListener("DOMContentLoaded", UserInterface.displayTask)

//Event - Take Input values and call the add method to create a new task
const form = document.querySelector("#task-input")
form.addEventListener("submit", () => {
    event.preventDefault()
    const task = document.querySelector("#task").value
    const name = document.querySelector("#assigned").value
    const date = document.querySelector("#deadline").value

    //Validate the form values 
    if (task === '' || name === '' || date === '') {
        UserInterface.alert("Please make sure all fields below are filled!", "danger")
    } else {
        //Instantiate a new task object and pass the above values in 
        const item = new Task(task, name, date)

        //Add the form values as a new item in the list
        UserInterface.addToTable(item)

        //Clear the input fields 
        UserInterface.clearFields()

        //Display an Alert message of "Task Added Successfully!"
        UserInterface.alert("Task added successfully!", "success")
    }
})

//Event to trigger a remove task method via click 
const tableBody = document.querySelector("#task-list")

tableBody.addEventListener("click", (event) => {
    UserInterface.removeTask(event.target)
})