#! /usr/bin/env node
import inquirer from "inquirer";
//Define the Student class
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = []; //Initialize an empty array for courses
        this.balance = 5000;
    }
    //Method to enroll a atudent in a course
    enroll_course(course) {
        this.courses.push(course);
    }
    //Method to view a student balance
    view_balance() {
        console.log(`Balance for ${this.name}:${this.balance}`);
    }
    //Method to pay student fees
    pay_fees(amount) {
        this.balance -= amount; //deduct the amount from balance 
        console.log(`${amount} fees paid successfully for ${this.name}`);
        console.log(`Remaining Balance is: $${this.balance}`);
    }
    //Method to show student status 
    show_status() {
        console.log(`Name: ${this.name}`);
        console.log(`ID:   ${this.id}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance: ${this.balance}`);
    }
}
//defining a Student-Manager class to manage students
class Student_manager {
    students;
    constructor() {
        this.students = [];
    }
    //Method to add a new student
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student: ${name} added successfully,\nStudent ID: ${student.id}`);
    }
    //Method a enroll a student in a course 
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(`${student.name} enrolled in ${course} successfully `);
        }
        else {
            console.log("Student not found, Please enter a correct ID");
        }
    }
    //Method to view a student balance
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log("Student not found, Please enter a correct ID");
        }
    }
    //Method to pay student fees
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log("Student not found, Please enter a correct ID");
        }
    }
    //method to display student status
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
        else {
            console.log("Student not found, Please enter a correct ID");
        }
    }
    //method to find a student by student_id
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
//main function to run the program 
async function main() {
    console.log(`Welcome to "Mohib ali khan" - Student Management System`);
    console.log('*'.repeat(55));
    let student_manager = new Student_manager();
    // While loop to keep the program running
    while (true) {
        // Asking user to choose an option
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: [
                    "Add new student",
                    "Enroll a Student",
                    "View Student Balance",
                    "Pay fees",
                    "Show Status",
                    "Exit"
                ]
            }
        ]);
        // Using switch case to handle user choice statement
        switch (choice.choice) {
            case "Add new student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a Student Name:",
                    }
                ]);
                student_manager.add_student(name_input.name);
                break;
            case "Enroll a Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        type: "list",
                        name: "course",
                        message: "Enter a Course Name",
                        choices: ["AI", "Typescript", "Data Science", "C++", "Phython"]
                    }
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    }
                ]);
                student_manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay"
                    }
                ]);
                student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID"
                    }
                ]);
                student_manager.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log("Exiting...");
                process.exit();
        }
    }
}
// Calling main function to start the program
main();
