$(document).ready(onReady);


let currentMonthlyBudget = 20000.00;


let employees = [];


function onReady() {
    renderEmployeeList();
    renderMonthlyBudget();
    console.log('DOM is ready');
    $('#submitEmployeeButton').on('click', addEmployee);
    $('body').on('click', '.deleteEmployeeButton', deleteEmployee);
}


// renders the table body
function renderEmployeeList() {
    $('.employeeList').empty();
    for (i=0; i<employees.length; i++) {
        if (i === 0) {
            $('.employeeList').append(`
            <tr>
                <td>${employees[i].firstName}</td>
                <td>${employees[i].lastName}</td>
                <td>${employees[i].idNumber}</td>
                <td>${employees[i].title}</td>
                <td><span id="listedEmployeeAnnualSalarySpan">${employees[i].annualSalary}</span></td>
                <td>
                    <button class="deleteEmployeeButton">Delete</button>
                </td>
            </tr>
            `);
        } else {
            $('.employeeList').append(`
            <tr>
                <td>${employees[i].firstName}</td>
                <td>${employees[i].lastName}</td>
                <td>${employees[i].idNumber}</td>
                <td>${employees[i].title}</td>
                <td><span id="listedEmployeeAnnualSalarySpan">${employees[i].annualSalary}</span></td>
                <td>
                    <button class="deleteEmployeeButton">Delete</button>
                </td>
            </tr>
            `);
        }
    }
    
}


// adds new employee to the list of employees
function addEmployee() {
    console.log('employee added');
    let newFirstName = $('#firstNameInput').val();
    let newLastName = $('#lastNameInput').val();
    let newId = $('#idInput').val();
    let newTitle = $('#titleInput').val();
    let newAnnualSalary = $('#annualSalaryInput').val();

    let newEmployee = {
        firstName: newFirstName,
        lastName: newLastName,
        idNumber: Number(newId),
        title: newTitle,
        annualSalary: Number(newAnnualSalary)
    };

    employees.push(newEmployee);

    calculateMonthlyCostOfEmployee();

    renderEmployeeList();
    renderMonthlyBudget();

    $('#firstNameInput').val('');
    $('#lastNameInput').val('');
    $('#idInput').val('');
    $('#titleInput').val('');
    $('#annualSalaryInput').val('');

    console.log(newEmployee);
}


// removes employee info from table
function deleteEmployee() {
    console.log('employee deleted');
    let tableRowToDelete = $(this).parent().parent();
    tableRowToDelete.remove();
}


// subtracts monthly employee cost from total monthly budget
function calculateMonthlyCostOfEmployee() {
    let annualSalaryInput = Number($('#annualSalaryInput').val());
    let monthlyCostOfEmployee = Math.floor(annualSalaryInput / 12);

    console.log('annual salary is:', Math.floor(annualSalaryInput));

    currentMonthlyBudget -= monthlyCostOfEmployee;
    console.log('monthly cost of this employee is:', monthlyCostOfEmployee);
    return monthlyCostOfEmployee;
}


// renders total monthly budget
function renderMonthlyBudget() {
    $('#totalMonthlyBudgetSpan').empty();
    console.log('current monthly budget:', currentMonthlyBudget);

    if (currentMonthlyBudget <= 0) {
        $('#totalMonthlyBudgetSpan').css('color', 'red');
        $('#totalMonthlyBudgetSpan').append(`
        <span id="totalMonthlyBudgetSpan">${currentMonthlyBudget} OVER BUDGET!</span>`);
    } else {
        $('#totalMonthlyBudgetSpan').append(`
        <span id="totalMonthlyBudgetSpan">${currentMonthlyBudget}</span>`);
    }
}