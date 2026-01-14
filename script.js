let income = localStorage.getItem("income") || 0;
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let balance = 0;

function addExpense() {
    let income = document.getElementById("income").value;
    let expense = document.getElementById("expense").value;

    balance = income - expense;

    document.getElementById("balance").innerText =
        "Balance: ₹" + balance;
}
function addTask() {
    let taskText = document.getElementById("taskInput").value;

    if (taskText === "") {
        alert("Task cannot be empty");
        return;
    }

    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
    document.getElementById("taskInput").value = "";
}
function displayTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.innerText = task;

        li.onclick = function () {
            li.style.textDecoration = "line-through";
        };

        let delBtn = document.createElement("button");
        delBtn.innerText = "X";
        delBtn.onclick = function () {
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            displayTasks();
        };

        li.appendChild(delBtn);
        list.appendChild(li);
    });
}
displayTasks();
function saveIncome() {
    income = document.getElementById("income").value;
    localStorage.setItem("income", income);
    calculateBudget();
}

function addExpense() {
    let expense = document.getElementById("expenseInput").value;

    if (expense === "") {
        alert("Enter expense");
        return;
    }

    expenses.push(Number(expense));
    localStorage.setItem("expenses", JSON.stringify(expenses));

    document.getElementById("expenseInput").value = "";
    calculateBudget();
}
function resetBudget() {
    if (confirm("Are you sure you want to reset budget?")) {
        localStorage.removeItem("income");
        localStorage.removeItem("expenses");

        income = 0;
        expenses = [];

        document.getElementById("income").value = "";
        document.getElementById("totalExpense").innerText = 0;
        document.getElementById("balance").innerText = 0;
    }
}


function calculateBudget() {
    let total = expenses.reduce((sum, val) => sum + val, 0);

    document.getElementById("totalExpense").innerText = total;
    document.getElementById("balance").innerText = income - total;
}
document.getElementById("income").value = income;
calculateBudget();

function generateTimetable() {
    let hours = document.getElementById("studyHours").value;
    let subjects = document.getElementById("subjects").value;

    if (hours === "" || subjects === "") {
        alert("Please fill all fields");
        return;
    }

    let subjectArray = subjects.split(",");
    let perSubject = (hours / subjectArray.length).toFixed(1);

    let list = document.getElementById("timetableList");
    list.innerHTML = "";

    subjectArray.forEach(sub => {
        let li = document.createElement("li");
        li.innerText = sub.trim() + " - " + perSubject + " hrs";
        list.appendChild(li);
    });
}
function showSection(id, btn) {
    document.getElementById("budget").style.display = "none";
    document.getElementById("tasks").style.display = "none";
    document.getElementById("timetable").style.display = "none";

    document.getElementById(id).style.display = "block";

    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
}
function toggleDark() {
    document.body.classList.toggle("dark");
}
