$(document).ready(onReady);


let currentMonthlyBudget = 20000;
console.log('current monthly budget:', currentMonthlyBudget);


let employees = [
    {
        firstName: 'John',
        lastName: 'Doe',
        idNumber: 123,
        title: 'CEO',
        annualSalary: 100000
    }
];


function onReady() {
    renderEmployeeList();
    console.log('DOM is ready');
    $('#submitEmployeeButton').on('click', addEmployee);
    $('body').on('click', '.deleteEmployeeButton', deleteEmployee);
    //$('#totalMonthlyBudgetSpan').text('20,000.00');
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
                <td>${employees[i].annualSalary}</td>
                <td><button class="deleteEmployeeButton">Delete</button></td>
            </tr>
            `);
        } else {
            $('.employeeList').append(`
            <tr>
                <td>${employees[i].firstName}</td>
                <td>${employees[i].lastName}</td>
                <td>${employees[i].idNumber}</td>
                <td>${employees[i].title}</td>
                <td>${employees[i].annualSalary}</td>
                <td><button class="deleteEmployeeButton">Delete</button></td>
            </tr>
            `);
        }
    }
    
}


// adds new employee info to employees array and
// logs out monthly employee cost
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


// calculates monthly cost of employee
function calculateMonthlyCostOfEmployee() {
    let annualSalary = Number($('#annualSalaryInput').val());
    let monthlyCostOfEmployee = Math.floor(annualSalary / 12);
    currentMonthlyBudget -= monthlyCostOfEmployee;
    console.log('monthly cost of this employee is:', monthlyCostOfEmployee);
    console.log('current monthly budget:', currentMonthlyBudget);
    return monthlyCostOfEmployee;
}


// function calculateCurrentMonthlyBudget() {
//     currentMonthlyBudget -= monthlyCostOfEmployee;
//     console.log('current monthly budget:', currentMonthlyBudget);
// }
// calculateCurrentMonthlyBudget();