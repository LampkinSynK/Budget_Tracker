// All Variables Initialized
const monthlyWage = document.getElementById('month_wage');
const hourlyWage = document.getElementById('hourly_wage');
const hours = document.getElementById('hours');
const oneTime = document.getElementById('one_time');
const amountLeft = document.getElementById('amount_left');
const amountSpent = document.getElementById('expenses')
const itemSpent = document.getElementById('item');
const boughtList = document.getElementById('bought_list');
const wageList = document.getElementById('wage_list');

var wageValues = [];
var boughtValues = [];

var expenses = 0;
var income = 0;


// Parent Class Budget Created
class Budget{
    constructor(name, amount) {
        this.name = name;
        this.amount = amount;
    }
    // Checks when amount left is negative
    checkBudget() {
        if ((income-expenses) < 0){
            amountLeft.style.color = 'red';
        }
        else {
            amountLeft.style.color = 'white';
        }
    }

}

// Child Classe Income
class Income extends Budget {
    constructor(name, amount) {
        super(name, amount)
    }
    // Method to add to Amount left & Show List Items on Screen
    appendSalary() {
        income+= this.amount;
        var save = this.amount;
        amountLeft.innerHTML = `$${(income-expenses).toFixed(2)}`;
        const wageText = document.createElement('li');
        wageText.innerHTML = `${this.name}: $${this.amount}`;
        wageList.appendChild(wageText);
        // Checks when List Item is clicked and removes
        wageText.addEventListener('click', function(){
            wageText.remove();
            income-= save;
            amountLeft.innerHTML = `$${(income-expenses).toFixed(2)}`;
            if ((income-expenses) < 0){
                amountLeft.style.color = 'red';
            }
            else {
                amountLeft.style.color = 'white';
            }
        })
        this.checkBudget();
    }
    
}

// Child Class Expense
class Expense extends Budget {
    constructor(name, amount) {
        super(name, amount)
    }
    // Method to take away from Amount left & Show List Items on Screen
    appendExpenses() {
        expenses+= this.amount;
        var save = this.amount;
        amountLeft.innerHTML = `$${(income-expenses).toFixed(2)}`;
        const wageText = document.createElement('li');
        wageText.innerHTML = `${this.name}: $${this.amount}`;
        boughtList.appendChild(wageText);
        // Checks when List Item is clicked and removes
        wageText.addEventListener('click', function(){
            wageText.remove();
            expenses-= save;
            amountLeft.innerHTML = `$${(income-expenses).toFixed(2)}`;
            if ((income-expenses) < 0){
                amountLeft.style.color = 'red';
            }
            else {
                amountLeft.style.color = 'white';
            }
        })
        this.checkBudget();
    }
    
}

// Checking to see when submit button is clicked
document.getElementById('newWage').addEventListener('click', function(){
    var selectbox = document.getElementById("selectBox");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    // Determining which type of income will be appeneded
    switch (selectedValue) {
        case '1':
            if(monthlyWage.value !== ''){
                var amountAdd = parseFloat(monthlyWage.value);
                // creating new Income Salary Object
                let appendWage = new Income('Salary', amountAdd);
                wageValues.push(appendWage);
                appendWage.appendSalary();
                monthlyWage.value = '';
            }
            break;
        case '2':
            if((hours.value!== '')&&(hourlyWage.value!== '')){
                var amountAdd = parseFloat(hours.value*hourlyWage.value)*4;
                // Creating new Income Hourly Object
                let appendWage = new Income('Hourly', amountAdd);
                wageValues.push(appendWage);
                appendWage.appendSalary();
                hours.value = '';
                hourlyWage.value = '';
            }
            break;
        case '3':
            if(oneTime.value !== ''){
                var amountAdd = parseFloat(oneTime.value);
                // Creating new Income One Time Object
                let appendWage = new Income('One Time', amountAdd);
                wageValues.push(appendWage);
                appendWage.appendSalary();
                oneTime.value = '';
            }
            break;
    }
})

// Checking when Expense Submit is pushed
document.getElementById('newExpense').addEventListener('click', function(){
    if ((itemSpent.value!=='')&&(amountSpent.value!=='')) {
        var amountAdd = parseFloat(amountSpent.value);
        // Creating new Expense Object
        let appendWage = new Expense(itemSpent.value, amountAdd);
        boughtValues.push(appendWage);
        appendWage.appendExpenses();
        itemSpent.value = '';
        amountSpent.value = '';
    }
    else {
        alert('Please Enter Both Values');
    }
})

// Function to change Dropdown for Income box
changeFunc = () => {
    var selectbox = document.getElementById("selectBox");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    switch (selectedValue) {
        case '1':
            hourlyWage.style.display = 'none';
            hours.style.display = 'none';
            oneTime.style.display = 'none';
            monthlyWage.style.display = 'inline';
            break;
        case '2':
            hourlyWage.style.display = 'inline';
            hours.style.display = 'inline';
            oneTime.style.display = 'none';
            monthlyWage.style.display = 'none';
            break;
        case '3':
            hourlyWage.style.display = 'none';
            hours.style.display = 'none';
            oneTime.style.display = 'inline';
            monthlyWage.style.display = 'none';
            break;
    }
}