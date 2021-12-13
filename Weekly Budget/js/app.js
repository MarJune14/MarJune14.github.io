//classess
class Budget {
    constructor(budget) {
        this.budget = Number ( budget );
        this.budgetleft = this.budget;

    }

    //substract from the budget
    substractFromBudget(amount) {
        return this.budgetleft -= amount;
    }
}

//Everything related to HTML
class HTML {

    //insert budget when the user submit
    insertBudget(amount) {  
        
        //insert into html
        budgetTotal.innerHTML = `${amount}`;
        budgetLeft.innerHTML = `${amount}`;

    }


    //Display a Message(Correct or Invalid)
    printMessage(message, className) {
        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('text-center', 'alert', className);
        messageWrapper.appendChild(document.createTextNode(message));

        //insert into HTML
        document.querySelector('.primary').insertBefore(messageWrapper, addExpenseForm ); 


        //clear the error
        setTimeout(function() {
            document.querySelector('.primary .alert').remove();
            addExpenseForm.reset(); 
        }, 3000);
    }
    //Dislay te expenses from the form into the list
    addExpenseToList(name, amount) {
        const expensesList = document.querySelector('#expenses ul');

        //create a li
        const li = document.createElement('li');
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        //Create the template
        li.innerHTML = `
                ${name}
                <span class="badge badge-primary badge-pill">$ ${amount}</span>
        `;

        //insert into the html
        expensesList.appendChild(li);

    }

    //substract expense amount from budget
    trackBudget(amount) {
        const budgetLeftDollars = budget.substractFromBudget(amount);
        budgetLeft.innerHTML = `${budgetLeftDollars}`;


        //check when the 25% is spent
         if( (budget.budget / 4) >budgetLeftDollars){
            budgetLeft.parentElement.parentElement.classList.remove('alert-success', 'alert-warning');

            budgetLeft.parentElement.parentElement.classList.add('alert-danger');

         }else if( (budget.budget / 2) >budgetLeftDollars) {
            budgetLeft.parentElement.parentElement.classList.remove('alert-success');

            budgetLeft.parentElement.parentElement.classList.add('alert-warning');

         }

    }

}


//variables
const addExpenseForm = document.querySelector('#add-expense'),
    budgetTotal = document.querySelector('span#total');
    budgetLeft = document.querySelector('span#left');


let budget, userBudget


// Instantiate the HTML class
html = new HTML();


//event listener

eventListeners();
function eventListeners() {

    document.addEventListener('DOMContentLoaded', function() {
        //Ask the visitor the weekly budget
        userBudget = prompt('What\'s your Budget for this week? ');

        if(userBudget === null || userBudget === '' || userBudget === '0') {
            window.location.reload();

        } else {
            //budget is valid 
            budget = new Budget(userBudget);

            //Instantiate HTML class
            html.insertBudget(budget.budget);

        }

    });

    addExpenseForm.addEventListener('submit', function(e) {
        e.preventDefault();
        //read the input values
        const expenseName = document.querySelector('#expense').value;
        const amount = document.querySelector('#amount').value;

        if(expenseName === '' || amount === '') {
            html.printMessage('There was an Error, all the fields are MANDATORY!', 'alert-danger');

        }else {
            //add the expenses into the list
            html.addExpenseToList(expenseName, amount);
            html.trackBudget(amount);
            html.printMessage('Added...', 'alert-success');
        }
    });
}
