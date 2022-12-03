$(document).ready(onReady);

let employees = [
    {
        firstName: 'John',
        lastName: 'Doe',
        idNumber: 1234,
        title: 'CEO',
        annualSalary: 100000
    }
];

function onReady() {
    renderEmployeeList();
    console.log('DOM is ready');
    $('#submitEmployeeButton').on('click', addEmployee)
}

// re-renders the table body
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
                <td><button>Delete</button></td>
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
                <td><button>Delete</button></td>
            </tr>
            `);
        }
    }
    
}

// adds new employee info to employees array
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
    renderEmployeeList();

    $('#firstNameInput').val('');
    $('#lastNameInput').val('');
    $('#idInput').val('');
    $('#titleInput').val('');
    $('#annualSalaryInput').val('');

    console.log(newEmployee);
    // console.log(employees);
}