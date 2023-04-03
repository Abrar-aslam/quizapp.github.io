// <!-- --------Questions---------- -->

var questions = [
    {
        q: "who invented bulb",
        a: "makr",
        b: "Graham Bell",
        c: "shada",
        d: "none",
        ans: "b",
        opt1: "a",
        opt2: "d"

    },
    {
        q: "what is the capital of India?",
        a: "Mumbai",
        b: "Chennai",
        c: "Kolkata",
        d: "Delhi",
        ans: "d",
        opt1: "b",
        opt2: "c"
    },

    {
        q: "who is the father of nation?",
        a: "makr",
        b: "raju g",
        c: "Gandhi G ",
        d: "none",
        ans: "c",
        opt1: "a",
        opt2: "b"
    }
];

// -- ----------Defaults------- 
$("#quizBox").hide();
$("#restartQuiz").hide();
$("#nextQuestion").hide();


// -------------variables_-----
var pname = "";
var count = 0;
var cid = "";
var points = 0;
var len = questions.length;   //len has num of questions
// alert(len);tested


// -------------Start Quiz Button Trigger_-----
$("#startQuizBtn").click(function () {
    pname = $("#playerName").val();
    // alert(pname); to test
    $("#startQuiz").hide();
    $("#quizBox").show();

    if (pname != "")
        $("#changePlayerName").text(pname)      // updating player name

    loadQuestion()
    startTime()         //timer 
});


// <----------------------load questions --------------->
function loadQuestion() {
    $("#q").text(questions[count].q);
    $("#a").val(questions[count].a);
    $("#b").val(questions[count].b);
    $("#c").val(questions[count].c);
    $("#d").val(questions[count].d);
    // updating questin no 
    $("#questionNo").text(`Question No. ${count + 1}/${len}`)
}


// --------------validation---------------
$(".opt").click(function () {
    // fetch the id of the button pressed:-  this is used for current button attr is attribute 
    cid = $(this).attr("id");
    // alert(cid) tested ok
    if (cid == questions[count].ans) {
        $(this).css("background", "green");   //correct ans as green
        points++;
        //    to update the points get the container add it the value 
        // $("#points").text("Points: " + points);
        $("#points").text(`Points: ${points}`);
    }
    else {
        $(this).css("background", "red");
        // if wrong button pressed ans highlighted with green:-
        $("#" + questions[count].ans).css("background", "green").fadeOut().fadeIn();
    }
    $(".opt").prop("disabled", true);
    $("#nextQuestion").show();
})


// ----------------------50-50 Button Triggers ---------------
$("#lifeLine").click(function () {
    // alert("clicked");

    $("#" + questions[count].opt1).val("");  //removed the btn content #a
    $("#" + questions[count].opt2).val("");   //removed btn content #b
    $("#" + questions[count].opt1).prop("disabled", "true");
    $("#" + questions[count].opt2).prop("disabled", "true");//pr0p is property
    $("#lifeLine").prop("disabled", "true");
})


// ----------------------Next Button Triggers ---------------
$("#nextQuestion").click(function () {
    // alert("") button tested
    count++;
    $(".opt").css("background", "");
    $(".opt").prop("disabled", "");
    if (count >= len) {
        $("#quizBox").hide();
        $("#restartQuiz").show();
        if (points < 0.5 * len) {
            $("#finalpoints").text(`Ops! ${pname} Your Points: ${points}, Work Hard!`);
        }
        else {
            $("#finalpoints").text(`Congratulations ${pname}! Your Points: ${points} `);
        }

    }
    else {
        loadQuestion();
    }
    $("#nextQuestion").hide();//hide next button when clicked.
})


// ====================Restart Quiz Button===============
$("#restartQuizBtn").click(function () {
    $("#restartQuiz").hide();
    $("#quizBox").show();
    resetQuiz();
    loadQuestion();
    startTime()
    $("#lifeLine").prop("disabled", "");

})



// ====================Reset Quiz===============
function resetQuiz() {
    count = 0;
    points = 0;
    // $("#points").text(`Points: 0`);
    clearInterval(quizTime);
    $("#time").text(`00:00`);
    $("#points").text(`Points: ${points}`);
    $("#questionNo").text(`Question No. ${count + 1}/${len}`);
}

//<===================== Timer ======================>

//            =============Variables===========                   
var totalMins = 0; //mins given by quiz master
var conToSecs = 0; //mins converted to secs
var remMins = 0;
var remSecs = 0;
var quizTime = "";


// ==================== Start time function===============>
function startTime() {
    totalMins = 2;
    conToSecs = 60 * totalMins;
    function timer() {
        conToSecs--;
        // console.log(conToSecs);
        remMins = Math.floor(conToSecs / 60);
        remSecs = conToSecs % 60;
        if (remMins <= 9 && remMins >= 0) {
            remMins = "0" + remMins; //concatenate to show in 00 format
        }
        if (remSecs <= 9 && remSecs >= 0) {
            remSecs = "0" + remSecs;
        }
        $("#time").text(`${remMins}:${remSecs}`);
        if (conToSecs == 0) {
            clearInterval(quizTime);
            $("#quizBox").hide();
            $("#restartQuiz").show();

        }
    }

    quizTime = setInterval(timer, 1000);
}
/* JavaScript animations for buttons */
const buttons = document.querySelectorAll('.opt');

buttons.forEach((button) => {
    button.addEventListener('pointerdown', () => {
        button.classList.add('pressed');
    });
    button.addEventListener('pointerup', () => {
        button.classList.remove('pressed');
    });
});
