//setting variables
var timer;
var curIndex = -1;
//quiz questions, available choices, and correst answers array
var questions = [{
    question: "Commonly used data types DO Not Include",
    choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts"
    },
    {
    question: "The condition in an if / else statement is enclosed with ______",
    choices: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
    answer: "3. parenthesis"
    },  
    {
    question: "Arrays in JavaScript can be used to store _____",
    choices: ["1. numbers", "2. other arrays", "3. booleans", "4. all of the above"],
    answer: "4. all of the above"
    },  
    {
    question: "String values must be enclosed within _____ when being assigned to variables",
    choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
    answer: "3. quotes"
    },   
    {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
    answer: "4. console.log"
    }
];

function startQuiz() {
    timer = 75;
    document.getElementById("timer").innerHTML = timer;
        setTimeout(function(){
            timer = timer-1;
            console.log("TIMER " + timer);
        }, 1000);
    next();
};

//displays the question
function next() {
    curIndex++;//increments it up from -1

    if (curIndex > questions.length - 1) (
        console.log("exiting game")//logging that endgame works
    );

    var contentArea = document.getElementById("content");//grabbing div
    var newDiv = document.createElement("div");//creates new content div
    newDiv.setAttribute("id", "content");//save stylings

    //newDiv.innerHTML = "<h1>" + questions[curIndex].question + "</h1>";//inserts question text
    
    var newHtml = "<h1>" + questions[curIndex].question + "</h1>";//inserts question text
    var curChoices = questions[curIndex].choices;

    for(var loopCounter = 0; loopCounter < curChoices.length; loopCounter++) {
        newHtml = newHtml + "<button onclick=\"next()\">" + curChoices[loopCounter] + "</button><br/>"
    }
    newDiv.innerHTML = newHtml;

    
    contentArea.parentNode.replaceChild(newDiv, contentArea);//replaces previous content
};