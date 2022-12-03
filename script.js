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

}

function renderEmployeeList() {
    $('.employeeList').empty();
}