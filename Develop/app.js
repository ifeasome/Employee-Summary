const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const employees = [];

const startQuest = () => inquirer.prompt([
    {
        type: "list",
        name: "role",
        message: "What team member would you like to add?",
        choices: ["Engineer", "Intern", "none"],
    },
])
.then(answers => {
    if(answers.role === "Engineer") {
        engineerQuest();
    }
    else if(answers.role === "Intern") {
        internQuest();
    } else {
        render(employees);
        fs.writeFile(outputPath, render(employees), (err) => {
            if (err) {
                throw err;
            }
            console.log("Member(s) added!");
        })
        
    }
});

const managerQuest = () => inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "Enter Manager's name:",
            validate: function(input) {
                if (input === "") {
                    return "Please enter a Manager name"; 
                }
                return true;
            }
         },
         {
            type: "input",
            name: "managerEmail",
            message: "Enter Manager's Email",
            
        },
        {
            type: "input",
            name: "managerId",
            message: "Enter Manager's ID",
        },
        {
            type: "input",
            name: "managerOfficenmbr",
            message: "Enter Manager's Office Number",
        },
    
])
.then(answers => {
    let manager = new Manager(answers.managerName, answers.managerEmail, answers.managerId, answers.managerOfficenmbr);

    employees.push(manager);

    startQuest();
    
});

const internQuest = () => inquirer.prompt([
    {
        type: "input",
        name: "internName",
        message: "Enter Intern's name:",
     },
     {
        type: "input",
        name: "internEmail",
        message: "Enter Intern's Email",
        
    },
    {
        type: "input",
        name: "internId",
        message: "Enter Intern's ID",
    },
    {
        type: "input",
        name: "school",
        message: "Name of school?",
    },
])
.then(answers => {
    let intern = new Intern(answers.internName, answers.internEmail, answers.internId, answers.school);

    employees.push(intern);

    startQuest();
});

const engineerQuest = () => inquirer.prompt([
    {
        type: "input",
        name: "engineerName",
        message: "Enter Engineer's name:",
     },
     {
        type: "input",
        name: "engineerEmail",
        message: "Enter Engineer's Email",
        
    },
    {
        type: "input",
        name: "engineerId",
        message: "Enter Engineer's ID",
    },
    {
        type: "input",
        name: "github",
        message: "Enter Engineer's Github username",
    },
])
.then(answers => {

    let engineer = new Engineer(answers.engineerName, answers.engineerEmail, answers.engineerId, answers.github);

    employees.push(engineer);

    startQuest();
});

managerQuest();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!



// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.



// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
// I am calling the html renderer...pass in an array of objects from specific employee status