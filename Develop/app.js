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

function teamGenerator() {
    inquirer
      .prompt([
        {
          message: "Enter member's name",
          name: "name",
        },
        {
          type: "list",
          message: "Select team member's role",
          choices: ["Engineer", "Intern", "Manager"],
          name: "role",
        },
        {
          message: "Enter member's ID",
          name: "id",
        },
        {
          message: "Enter member's email",
          name: "email",
        },
      ])
      .then(function ({ name, role, id, email }) {
        let roleInput = "";
        if (role === "Engineer") {
          roleInput = "GitHub Username";
        } else if (role === "Intern") {
          roleInput = "School Name";
        } else {
          roleInput = "Office Number";
        }
        inquirer
          .prompt([
            {
              message: `What is member's ${roleInput}?`,
              name: "roleInput",
            },
            {
              type: "confirm",
              message: "Add more members?",
              name: "addMembers",
            },
          ])
          .then(function ({ roleInput, addMembers }) {
            let teamMember;
            if (role === "Engineer") {
              teamMember = new Engineer(name, id, email, roleInput);
            } else if (role === "Intern") {
              teamMember = new Intern(name, id, email, roleInput);
            } else {
              teamMember = new Manager(name, id, email, roleInput);
            }
            employees.push(teamMember);
            if (addMembers) {
              teamGenerator();
            } else {
              render(employees);
              fs.writeFile(outputPath, render(employees), (err) => {
                if (err) {
                  throw err;
                }
                console.log("Member(s) added!");
              });
            }
          })
          .catch((err) => {
            if (err) {
              console.log("Error: ", err);
            }
          });
      });
  }
  teamGenerator();

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