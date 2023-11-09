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

class Budget{
    constructor(name, amount) {
        this.name = name;
        this.amount = amount;
        // this.id = id;
    }

    appendSalary() {
        income+= this.amount;
        var save = this.amount;
        amountLeft.innerHTML = `$${(income-expenses).toFixed(2)}`;
        const wageText = document.createElement('li');
        wageText.innerHTML = `${this.name}: $${this.amount}`;
        wageList.appendChild(wageText);

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


        if ((income-expenses) < 0){
            amountLeft.style.color = 'red';
        }
        else {
            amountLeft.style.color = 'white';
        }
    }

    appendExpenses() {
        expenses+= this.amount;
        var save = this.amount;
        amountLeft.innerHTML = `$${(income-expenses).toFixed(2)}`;
        const wageText = document.createElement('li');
        wageText.innerHTML = `${this.name}: $${this.amount}`;
        boughtList.appendChild(wageText);

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

        if ((income-expenses) < 0){
            amountLeft.style.color = 'red';
        }
        else {
            amountLeft.style.color = 'white';
        }
    }

    reset() {
        wageValues = [];
        boughtValues = [];
    }
}

document.getElementById('newWage').addEventListener('click', function(){
    var selectbox = document.getElementById("selectBox");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    switch (selectedValue) {
        case '1':
            if(monthlyWage.value !== ''){
                var amountAdd = parseFloat(monthlyWage.value);
                let appendWage = new Budget('Salary', amountAdd);
                wageValues.push(appendWage);
                appendWage.appendSalary();
                monthlyWage.value = '';
            }
            break;
        case '2':
            if((hours.value!== '')&&(hourlyWage.value!== '')){
                var amountAdd = parseFloat(hours.value*hourlyWage.value*4);
                let appendWage = new Budget('Hourly', amountAdd);
                wageValues.push(appendWage);
                appendWage.appendSalary();
                hours.value = '';
                hourlyWage.value = '';
            }
            break;
        case '3':
            if(oneTime.value !== ''){
                var amountAdd = parseFloat(oneTime.value);
                let appendWage = new Budget('One Time', amountAdd);
                wageValues.push(appendWage);
                appendWage.appendSalary();
                oneTime.value = '';
            }
            break;
    }
})

document.getElementById('newExpense').addEventListener('click', function(){
    if ((itemSpent.value!=='')&&(amountSpent.value!=='')) {
        var amountAdd = parseFloat(amountSpent.value);
        let appendWage = new Budget(itemSpent.value, amountAdd);
        boughtValues.push(appendWage);
        appendWage.appendExpenses();
        itemSpent.value = '';
        amountSpent.value = '';
    }
    else {
        alert('Please Enter Both Values');
    }
})

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


