const inquirer = require('inquirer')
const Employee = require('./library/Employee')
const Manager = require('./library/Manager')
const Engineer = require('./library/Engineer')
const Intern = require('./library/Intern')
const fs = require('fs')



const employeeArray = []
    
function initalizeApp () {
    inquirer.prompt( [
    // THEN I am prompted to enter the team manager’s name, ID:, email address, and office number
    {
        type: 'input',
        name: 'managersName',
        message:'Input the managers Name'
    },

    {
        type: 'input',
        name: 'managerId',
        message: 'What is the Employees ID?',
    },

    {
        type: 'input',
        name: 'managerEmail',
        message: 'What is the Employees Email?'
    },

    {
        type: 'input',
        name: 'managersPhoneNum',
        message: 'Whats is the phone number to reach you while you are in your office?'
    }
])
.then( answers => {
const newManager = new Manager(answers.managersName, answers.managerEmail, answers.managerId,  answers.managersPhoneNum)
console.log(newManager)
employeeArray.push(newManager)
additionalEmployee()
})
}


function additionalEmployee () {

    inquirer.prompt( [
    {
        type: 'list',
        name: 'addAnotherEmployeeQ',
        // WHEN I decide to finish building my team
        // THEN I exit the application, and the HTML is generated
        message:'Would you like to add an additional Employee?',
        choices: ['engineer', 'intern', 'Click here to no longer add any additional people to the organizational structure.']
    },

])
.then (answers => {
    switch(answers.addAnotherEmployeeQ) {
        case 'engineer':
            getEngineer()
            break;
        case 'intern':
            getIntern()
            break;
        case 'Click here to no longer add any additional people to the organizational structure.':
            endCreation(employeeArray)
            break;
    }
})}



function getEngineer() {

    inquirer.prompt( [


        {
            // WHEN I select the engineer option
            // THEN I am prompted to enter the engineer’s name, ID, email, and GitHub username, 
            type: 'inpu',
            name: 'engineerName',
            message: 'Please enter the engineers name here',
        },
    
        {
            type: 'input',
            name: 'engineerId',
            message: 'Whats is your engineers ID:?'
        },
    
        {
            type: 'input',
            name:'engineerEmail',
            message:'What is your engineers email address?'
        },
    
        {
            type: 'input',
            name: 'engineerGit',
            message: 'Whats your engineers Github username?'
            //then I am taken back to the menu 
        }
    ])
    .then(answers => {
        const engineer = new Engineer(answers.engineerName,answers.engineerEmail, answers.engineerId, answers.engineerGit)
        employeeArray.push(engineer)
        additionalEmployee()
    })   
}

function getIntern () {

    inquirer.prompt ( [

        {    // WHEN I select the intern option
            // THEN I am prompted to enter the intern’s name, ID, email, and school, 
            type:'input',
            name:'internName',
            message: 'What is the name of your intern?',
        },
    
        {
            type:'input',
            name:'internId',
            message: 'What is your interns ID:?',
        },
    
        {
            type: 'input',
            name: 'internEmail',
            message: 'What is your interns email address?',
        }, 
    
        {
            type: 'input',
            name:'internSchool',
            message: 'What school is your intern currently attending?'
        }
        // then I am taken back to the menu
    ]
    )
.then(answers => {
    const intern = new Intern(answers.internName,answers.internEmail, answers.internId, answers.internSchool)
    employeeArray.push(intern)
    additionalEmployee()
})
}

function makeCards(){
    const cards = document.querySelector("#cards")
    console.log(cards)
    console.log(employeeArray[0].name)
    let cardsHTML 
     
}

function endCreation(employeeArray) {  
    console.log(employeeArray.length)
  const generatedHTML = `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-uWxY/CJNBR+1zjPWmfnSnVxwRheevXITnMqoEIeG1LJrdI0GlVs/9cVSyPYXdcSF" crossorigin="anonymous">
      <link href="style.css" rel="stylesheet">
      <title>My Team</title>
    </head>
    <body>
      <header style="background-color: red; text-align: center; margin: auto;">
          <h1>Team Builder</h1>
      </header>
      <div style="offset: 1;">
          <div style="display: flex; justify-content: center; flex-wrap: wrap;">
              
                  
              
  
  `
  fs.writeFile('generatedTeam.HTML',generatedHTML, function(err) {
      if (err) throw err
      let cardsHTML
      for (let v = 0; v < employeeArray.length; v++){
        let lastQuestion
        if (employeeArray[v].getRole() == "Manager"){
            lastQuestion = "Office Number: <a href='tel:" + employeeArray[v].officeNum + "'>" + employeeArray[v].officeNum + "</a></li>"
        }
        else if (employeeArray[v].getRole() == "Engineer"){
            lastQuestion =  "<a href = 'https://github.com/" + employeeArray[v].gitHub + "'>GitHub: " + employeeArray[v].gitHub + "</a>"
        }
        else{
            lastQuestion = "School: " + employeeArray[v].school
        }
        cardsHTML = `<div class="card" style="width: 18rem; margin: auto; margin-top: 1%;" id="cards">
        <div class="card-body">
        <h5 class="card-title">${employeeArray[v].name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${employeeArray[v].getRole()}</h6>
        <ul>
        <li>ID: ${employeeArray[v].getId()}</li>
        <li>Email: <a href="mailto: ${employeeArray[v].getEmail()}">${employeeArray[v].getEmail()}</a></li>
        <li>${lastQuestion}</li>
        </ul>
        </div>
        </div>`
        fs.appendFileSync('./generatedTeam.HTML', cardsHTML)
        }  
      
        

        const endHTML = `                      
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-kQtW33rZJAHjgefvhyyzcGF3C5TFyBQBA13V1RKPf4uH+bwyzQxZ6CmMZHmNBEfJ" crossorigin="anonymous"></script>
        </body>
        </html>`

        fs.appendFileSync('./generatedTeam.HTML', endHTML)
    })
  
}
  
initalizeApp()