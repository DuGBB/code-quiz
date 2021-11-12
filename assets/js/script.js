//setting variables
var timer;
var curIndex = -1;
var preAnswer = "";
var score = -50;
var questions = [];

//quiz questions, available choices, and correst answers array
var questions = [{
    question: "Commonly used data types DO Not Include _____",
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

function startQuiz() {//creates timer
    timer = 75;
    var x = setInterval(() => {//sets a one second interval
        if (score > -1) {
            clearInterval(x);//stops timer
        }
        timer--;
        document.getElementById("timer").innerHTML = "Timer:  " + timer;//writes timer to screen
        if (timer <= 0) {
            endGame();
            clearInterval(x);//stops timer
        }
    }, 1000);//sets coutdown interval

    next();//displays next question
};

//displays the question
function next() {
    curIndex++;//increments it up from -1

    if (curIndex > questions.length - 1) {
       //logging that endgame work

    endGame();
    return 0;
    };

    var contentArea = document.getElementById("content");//grabbing div
    var newDiv = document.createElement("div");//creates new content div
    newDiv.setAttribute("id", "content");//save stylings

    var newHtml = document.createElement("h2");// replaced syntax on line 67
    newHtml.setAttribute("id", "htmlNew");
    newHtml.innerHTML = questions[curIndex].question;
    var curChoices = questions[curIndex].choices;
    newDiv.appendChild(newHtml);

    var buttonDiv = document.createElement("div");
    buttonDiv.setAttribute("id", "divButton");
    

    for(var loopCounter = 0; loopCounter < curChoices.length; loopCounter++) {//for loop creates choice buttons
        
        var choiceButton = document.createElement("button");//creates button
        choiceButton.innerHTML = curChoices[loopCounter];//creates text for button
        
        if (curChoices[loopCounter] === questions[curIndex].answer){
            choiceButton.setAttribute("onclick", "correct()");//calls correct function if answer is correct

        } else {choiceButton.setAttribute("onclick", "wrong()");//calls  wrong function is answer is incorrect

        }
        var breakLine = document.createElement("br");
        buttonDiv.appendChild(choiceButton);
        buttonDiv.appendChild(breakLine);//makes buttons verticle
    }
    
    newDiv.appendChild(buttonDiv);
    var horRow = document.createElement("hr");
    newDiv.appendChild(horRow);//creates horizontal line to showcase whether the previous answer was correct or incorrect

    var bottomAnswer =document.createElement("p");
    bottomAnswer.setAttribute("id", "answerBottom");
    bottomAnswer.innerHTML = preAnswer;
    newDiv.appendChild(bottomAnswer);
    
    contentArea.parentNode.replaceChild(newDiv, contentArea);//replaces previous content
};

function correct() {//what to do the correct answer is chosen
    preAnswer = "Correct!"; 
    next();
}

function wrong() {//what to do when incorrect answer is chosen
    preAnswer = "Wrong!";
    timer = timer - 10;
    next();
}

function endGame() {
    if(score < 0) {
    score = timer; 
    var contentArea = document.getElementById("content");//grabbing div
    var newDiv = document.createElement("div");//creates new content div
    newDiv.setAttribute("id", "content");//save stylings
    newDiv.style.textAlign = "left";

    var overGame = document.createElement("h2");//127 - 154 replaced syntax from commented code above
    overGame.innerHTML = "All Done!";//write to screen when quiz is done
    newDiv.appendChild(overGame);
    
    var finalScore = document.createElement("p");//writes to screen the final score
    finalScore.innerHTML ="Your final score is " + score + "!";
    finalScore.setAttribute("id", "scoreFinal");
    newDiv.appendChild(finalScore);

    //var endForm = document.createElement("form");//creates form for submit button

    var endLabel = document.createElement("label");
    endLabel.setAttribute("for", "initials");//creates label to enter player initials
    endLabel.innerHTML = "Enter Initials ";
    
    var endInput = document.createElement("input");
    endInput.setAttribute("type", "text");
    endInput.setAttribute("id", "initials");//creates input element to enter initials
    endInput.setAttribute("name", "initials");

    var endButton = document.createElement("button");//creates the submit button
    endButton.setAttribute("id", "buttonEnd");
    endButton.innerHTML = "Submit ";
    endButton.setAttribute("onclick", "subMit()");

    newDiv.appendChild(endLabel);
    newDiv.appendChild(endInput);
    newDiv.appendChild(endButton);

    var horRow = document.createElement("hr");
    newDiv.appendChild(horRow);//creates horizontal line to showcase whether the previous answer was correct or incorrect

    var bottomAnswer =document.createElement("p");
    bottomAnswer.setAttribute("id", "answerBottom");
    bottomAnswer.innerHTML = preAnswer;
    newDiv.appendChild(bottomAnswer);
    
    contentArea.parentNode.replaceChild(newDiv, contentArea);//replaces previous content
    }
}

function subMit() {
    var name = document.getElementById('initials').value;
   console.log("WANNA");
    var scoresArray = localStorage.getItem("scoresArray");
    console.log(scoresArray);
    var newScore = [name, timer];
    if (scoresArray === null) {
        scoreGet = [];
    } else {
        var scoreGet = JSON.parse(scoresArray);
    }
    if (scoreGet.length < 5) {
        scoreGet.push(newScore);
    } else {scoreGet =scoreUpdate(newScore, scoreGet);
    };
    localStorage["scoresArray"] = JSON.stringify(scoreGet);

    viewHighScores();
}

function scoreUpdate(newScore, scoreGet) {
    var minScore = 75;
    var minScoreIndex = -1;
    for (let index = 0; index < scoreGet.length; index++) {
        const element = scoreGet[index];
        if (minScore > element[1]) {
            minScore = element[1];
            minScoreIndex = index;
        }
        
    }
    if (minScore < newScore[1]) {
        scoreGet[minScoreIndex] = newScore;
    }
    return scoreGet;
}
        


function viewHighScores() {
    var contentScore = document.getElementById("content");
    var newDiv = document.createElement("div");
    newDiv.setAttribute("id", "content");
    newDiv.style.textAlign = "left";

    var scoreTitle = document.createElement("h2");
    scoreTitle.innerHTML = "High score";
    newDiv.appendChild(scoreTitle);

    var readNow = document.createElement("textarea");
    readNow.setAttribute("rows", "5");
    readNow.setAttribute("cols", "20");
    readNow.readOnly = true;
    var scoresArray = localStorage.getItem("scoresArray");

    if (scoresArray === null) {
        var scoreGet = [];
    } else {
        var scoreGet = JSON.parse(scoresArray);
    }

    var arrayList = "";

    for (let index = 0; index < scoreGet.length; index++) {
        const element = scoreGet[index];
        arrayList = arrayList + element[0] + "   " + element[1] + "\n";     
    }

    readNow.innerHTML = arrayList;
        
    
    newDiv.appendChild(readNow);

    var breakLine = document.createElement("br");
    newDiv.appendChild(breakLine);//makes buttons verticle

    var resetButton =document.createElement("button");
    resetButton.innerHTML = "Go Back";
    resetButton.setAttribute("onclick", "goBack()");
    newDiv.appendChild(resetButton);

    var clearButton = document.createElement("button");
    clearButton.innerHTML = "Clear high scores";
    clearButton.setAttribute("onclick", "clearScores()");
    newDiv.appendChild(clearButton);


    contentScore.parentNode.replaceChild(newDiv, contentScore);
}

function goBack() {
    window.location.href = "index.html";
}

function clearScores() {
    localStorage.clear();
    console.log("clearScores");
    viewHighScores();
}