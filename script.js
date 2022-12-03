$(document).ready(onReady);

let employees = [
    {
        firstName: 'John',
        lastName: 'Doe',
        idNumber: 1234,
        title: 'CEO',
        annualSalary: 100000
    },
    {
        firstName: 'Jane',
        lastName: 'Doe',
        idNumber: 2345,
        title: 'CFO',
        annualSalary: 200000
    }
];

function onReady() {
    renderEmployeeList();
    console.log('DOM is ready');
    $('#submitEmployeeButton').on('click', addEmployee)
}

function renderEmployeeList() {
    $('.employeeList').empty();
    $('.employeeList').append(`
    <td>John</td>
    <td>Doe</td>
    <td>1234</td>
    <td>CEO</td>
    <td>$100,000</td>
    <td><button>Delete</button></td>
    `);
    
}

function addEmployee() {
    console.log('employee added');
}