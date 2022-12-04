$(document).ready(onReady);


let currentMonthlyBudget = 20000;


// converts a number to currency
let dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});
//console.log(dollarUS.format(currentMonthlyBudget));

// converts currency to a number
function convert(currency) {
    const temp = currency.replace(/[^0-9.-]+/g,"");
    return parseFloat(temp);
}


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
                <td class="tdCell">${employees[i].firstName}</td>
                <td class="tdCell">${employees[i].lastName}</td>
                <td class="tdCell"><span class="listedEmployeeIdSpan">${employees[i].idNumber}</span></td>
                <td class="tdCell">${employees[i].title}</td>
                <td class="tdCell"><span id="listedEmployeeAnnualSalarySpan">${dollarUS.format(employees[i].annualSalary)}</span></td>
                <td>
                    <button class="deleteEmployeeButton">Delete</button>
                </td>
            </tr>
            `);
        } else {
            $('.employeeList').append(`
            <tr>
                <td class="tdCell">${employees[i].firstName}</td>
                <td class="tdCell">${employees[i].lastName}</td>
                <td class="tdCell"><span class="listedEmployeeIdSpan">${employees[i].idNumber}</span></td>
                <td class="tdCell">${employees[i].title}</td>
                <td class="tdCell"><span id="listedEmployeeAnnualSalarySpan">${dollarUS.format(employees[i].annualSalary)}</span></td>
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

    addEmployeeMonthlyCost()
    renderEmployeeList();
    renderMonthlyBudget();

    $('#firstNameInput').val('');
    $('#lastNameInput').val('');
    $('#idInput').val('');
    $('#titleInput').val('');
    $('#annualSalaryInput').val('');
}


// removes employee from table
function deleteEmployee() {
    let tableRowToDelete = $(this).parent().parent();
    let listedEmployeeIdNumberText = tableRowToDelete.find('.listedEmployeeIdSpan').text();
    let listedEmployeeIdNumber = Number(listedEmployeeIdNumberText);
    tableRowToDelete.remove();
    let employeesKept = [];
    console.log('ID:', listedEmployeeIdNumber);
    for (let employee of employees) {
        if (listedEmployeeIdNumber !== employee.idNumber) {
            employeesKept.push(employee);
        }
    }

    employees = employeesKept;

    let listedEmployeeAnnualSalaryText = tableRowToDelete.find('#listedEmployeeAnnualSalarySpan').text();
    let listedEmployeeAnnualSalaryNumber = convert(listedEmployeeAnnualSalaryText);
    monthlyCostOfEmployee = Math.floor(listedEmployeeAnnualSalaryNumber / 12);
    currentMonthlyBudget += monthlyCostOfEmployee;
    console.log('DELETE monthly cost:', monthlyCostOfEmployee);

    renderEmployeeList();
    renderMonthlyBudget();
    
    console.log('employee deleted');
}


// renders total monthly budget
function renderMonthlyBudget() {
    $('#totalMonthlyBudgetSpan').empty();
    //console.log('current monthly budget:', currentMonthlyBudget);

    if (currentMonthlyBudget < 0) {
        $('#totalMonthlyBudgetSpan').css('color', 'red');
        $('#totalMonthlyBudgetSpan').append(`
        <span id="totalMonthlyBudgetSpan">${dollarUS.format(currentMonthlyBudget)} OVER BUDGET!</span>`);
    } else if (currentMonthlyBudget >= 0) {
        $('#totalMonthlyBudgetSpan').css('color', 'black');
        $('#totalMonthlyBudgetSpan').append(`
        <span id="totalMonthlyBudgetSpan">${dollarUS.format(currentMonthlyBudget)}</span>`);
    }
}


// subtracts monthly employee cost from total monthly budget
function addEmployeeMonthlyCost() {
        let annualSalaryInput = Number($('#annualSalaryInput').val());
        let monthlyCostOfEmployee = Math.floor(annualSalaryInput / 12);
        
        currentMonthlyBudget -= monthlyCostOfEmployee;

        //console.log('ADD annual salary:', Math.floor(annualSalaryInput));
        console.log('ADD monthly cost:', monthlyCostOfEmployee);
}