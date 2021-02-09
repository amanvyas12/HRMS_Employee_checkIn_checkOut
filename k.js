// Importing logics from logic folder 
import { apiCall } from "../js/logics/api_logic.js";
// Define All variables below: 
// Variables points html tags 
let table = document.getElementById("myTable");
let bodyVariable = document.getElementById("body");
let startStopButton = document.getElementById("startStop");
// Variables use in function 
// Changable : 
let row;
let hours = minutes = second = ReceiveH = ReceiveM = ReceiveS = 0;
let objectStoringValue = 0; // this is for object increment 
let displayHours = displayMinutes = displaySeconds = 0;
let arr = new Array();
let today = new Date();
// variable to hold setInterval() function 
let interval = null;
let response = null;
// variable to hold the status of stopwatch 
let status = "stopped";
// Constant 
const url = "/attendance/attend/";
const urlCheckIn = `${url}1`
const urlCheckOut = `${url}0`
// variables to append value to UI 
let replacingTime;
let replacingLocalTime;
let localTimeStoredTimer;
let H = M = S;
let date = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
});
// FUNCTION FOR DATE 
document.getElementById("currentDate").value = date;
// FUNCTION TO DISPLAY TIME ON HEADER(for future instance) 
// Funtion called onLoad to display Stopwatch 
function initClock() {
    // callApi(); 
    dataRender();
    if (localStorage.getItem("attendance") != null) {
        let replacingTime = JSON.parse(localStorage.getItem("attendance"));
        replacingLocalTime = JSON.parse(replacingTime[replacingTime.length - 1]);
        localTimeStoredTimer = replacingLocalTime.stopwatchTime.split(":");
        let hourInitial = localTimeStoredTimer[0];
        let minuteInitial  = localTimeStoredTimer[1];
        let seondInitial  = localTimeStoredTimer[2];
        // stopwatch(H, M, S); 
        // stopwatch(RT); 
        document.getElementById("display").innerHTML = hourInitial + ":" + minuteInitial + ":" + seondInitial;
    }
}
// STOPWATCH FUNCTION FOR EVERY ROW 
// function stopWatchTest(){ 
// let hour = arguments[0] 
// let min = arguments[1] 
// let second = arguments[2] 
// second++; 
// // logic to determine when to flip the values 
// if (second / 60 === 1){ 
// second = 0; 
// minutes ++ 
// if (minutes /60 === 1){ 
// minutes = 0 
// hours ++ 
// } 
// } 
// // seconds/minutes/hours are only one digits, add a leading 0 to the value 
// if (second <10){ 
// displaySeconds = "0" + second.toString(); 
// } 
// else{ 
// displaySeconds = second; 
// } 
// if (minutes <10){ 
// displayMinutes = "0" + minutes.toString(); 
// } 
// else{ 
// displayMinutes = minutes; 
// } 
// if (hours <10){ 
// displayHours = "0" + hours.toString(); 
// } 
// else{ 
// displayHours = hours; 
// } 
// let value = { 
// "hour": hour, 
// "min": min, 
// "second": second, 
// "displaysec": displaySeconds, 
// "displaymin": displayMinutes, 
// "displayhour": displayHours 
// } 
// return value 
// } 
function stopwatch(ReceiveH, ReceiveM, ReceiveS) {
    if (localStorage.getItem("attendance") == null || ReceiveS != null) {
        // second = ReceiveS; 
        ReceiveS++;
        // second = second + parseInt(ReceiveS); 
        // logic to determine when to flip the values 
        if (ReceiveS / 60 === 1) {
            ReceiveS = 0;
            ReceiveM++;
            if (ReceiveM / 60 === 1) {
                ReceiveM = 0;
                ReceiveH++;
            }
        }
        // seconds/minutes/hours are only one digits, add a leading 0 to the value 
        if (ReceiveS < 10) {
            displaySeconds = "0" + ReceiveS.toString();
        } else {
            displaySeconds = ReceiveS;
        }
        if (ReceiveM < 10) {
            displayMinutes = "0" + ReceiveM.toString();
        } else {
            displayMinutes = ReceiveM;
        }
        if (ReceiveH < 10) {
            displayHours = "0" + ReceiveH.toString();
        } else {
            displayHours = ReceiveH;
        }
        // display updated stopwatch value to user 
        document.getElementById("display").innerHTML = displayHours + ":" + displayMinutes + ":" + displaySeconds;
        obj.stopwatchTime = displayHours + ":" + displayMinutes + ":" + displaySeconds;
        H = ReceiveH;
        M = ReceiveM;
        S = ReceiveS;
    } else {
        second++;
        // second = second + parseInt(ReceiveS); 
        // logic to determine when to flip the values 
        if (second / 60 === 1) {
            second = 0;
            minutes++;
            if (minutes / 60 === 1) {
                minutes = 0;
                hours++;
            }
        }
        // seconds/minutes/hours are only one digits, add a leading 0 to the value 
        if (second < 10) {
            displaySeconds = "0" + second.toString();
        } else {
            displaySeconds = second;
        }
        if (minutes < 10) {
            displayMinutes = "0" + minutes.toString();
        } else {
            displayMinutes = minutes;
        }
        if (hours < 10) {
            displayHours = "0" + hours.toString();
        } else {
            displayHours = hours;
        }
        // display updated stopwatch value to user 
        document.getElementById("display").innerHTML = displayHours + ":" + displayMinutes + ":" + displaySeconds;
        obj.stopwatchTime = displayHours + ":" + displayMinutes + ":" + displaySeconds;
    }
}
// OBJECTS FOR STORING DATA TO LOCAL STORAGE 
let obj = {
    weekday: "",
    checkin: "",
    checkout: "",
    duration: "",
    stopwatchTime: "",
};
// FUNCTION TO APPEND TABLE ON PAGE 
function startStop() {
    let table = document.getElementById("myTable");
    if (status == "stopped") {
        let data = new FormData();
        if (replacingLocalTime != null) {
            replacingTime = JSON.parse(localStorage.getItem("attendance"));
            replacingLocalTime = JSON.parse(replacingTime[replacingTime.length - 1]);
            RT = replacingLocalTime.stopwatchTime.split(":");
            H = parseInt(RT[0]);
            M = parseInt(RT[1]);
            S = parseInt(RT[2]);
            interval = window.setInterval(function () {
                stopwatch(H, M, S);
            }, 1000);
            document.getElementById("startStop").innerHTML = "Check-Out";
            document.getElementById("startStop").value = "Check-Out";
            document.getElementById("startStop").style.background = "red";
            status = "started";
            row = table.insertRow(-1);
            let today = new Date();
            let cell1 = row.insertCell(-1);
            let cell2 = row.insertCell(-1);
            cell1.innerHTML = today.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            });
            cell2.innerHTML = today.getHours() + ":" + today.getMinutes();
            obj.weekday = today.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            });
            obj.checkin = today.getHours() + ":" + today.getMinutes();
            ////////////////////////////////////////////////////////// 
            // for URL 
            data.append("employee_id", "HRM303 - Kanik Vijay");
            data.append("checkin", obj.checkin);
            // Call API and send form data to store in database 
            let response = apiCall(urlCheckIn, data, "POST")
            console.log(response)
            ////////////////////////////////////////////////////////// 
        } else {
            interval = window.setInterval(function () {
                stopwatch(H, M, S);
            }, 1000);
            document.getElementById("startStop").innerHTML = "Check-Out";
            document.getElementById("startStop").value = "Check-Out";
            document.getElementById("startStop").style.background = "red";
            status = "started";
            row = table.insertRow(-1);
            let today = new Date();
            let cell1 = row.insertCell(-1);
            let cell2 = row.insertCell(-1);
            cell1.innerHTML = today.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            });
            cell2.innerHTML = today.getHours() + ":" + today.getMinutes();
            obj.weekday = today.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            });
            obj.checkin = today.getHours() + ":" + today.getMinutes();
            ////////////////////////////////////////////////////////// 
            data.append("employee_id", "HRM303 - Kanik Vijay");
            data.append("checkin", obj.checkin);
            response = apiCall(urlCheckIn, data, "POST");
            console.log(response);
        }
    }
    else {
        let data = new FormData();
        let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        window.clearInterval(interval);
        document.getElementById("startStop").innerHTML = "Check-In";
        document.getElementById("startStop").value = "Check-In";
        document.getElementById("startStop").style.background = "green";
        status = "stopped";
        let day = today.getDay();
        console.log(table);
        let cell3 = row.insertCell(-1);
        let cell4 = row.insertCell(-1);
        cell3.innerHTML = today.getHours() + ":" + today.getMinutes();
        cell4.innerHTML = displayHours + ":" + displayMinutes + ":" + displaySeconds;
        obj.checkout = today.getHours() + ":" + today.getMinutes();
        obj.duration = displayHours + ":" + displayMinutes + ":" + displaySeconds;
        if (JSON.parse(localStorage.getItem("a")) != null) {
            objectStoringValue = JSON.parse(localStorage.getItem("a"));
        }
        let setVar = ("obj" + objectStoringValue, JSON.stringify(obj));
        a++;
        let k = JSON.parse(localStorage.getItem("attendance"));
        k.push(setVar);
        localStorage.setItem("attendance", JSON.stringify(k));
        ////////////////////////////////////////////////////////// 
        // for URL 
        data.append("checkout", obj.checkout);
        data.append("time", obj.duration);
        response = apiCall(urlCheckOut, data, "POST");
        console.log(response);
        ////////////////////////////////////////////////////////// 
    }
}
// FUNCTION TO GET ITEMS FROM LOCAL STORAGE AND APPEND ON PAGE 
function dataRender() {
    if (
        localStorage.getItem("attendance") == null ||
        localStorage.getItem("attendance") == undefined
    ) {
        let attendBlank = [];
        localStorage.setItem("attendance", JSON.stringify(attendBlank));
    }
    let Localstored = JSON.parse(localStorage.getItem("attendance"));
    Localstored.forEach((element, index) => {
        // if (index == Localstored.length-1) { 
        row = table.insertRow(-1);
        let cell1 = row.insertCell(-1);
        let cell2 = row.insertCell(-1);
        let cell3 = row.insertCell(-1);
        let cell4 = row.insertCell(-1);
        let a = JSON.parse(element).weekday;
        let b = JSON.parse(element).checkin;
        let c = JSON.parse(element).checkout;
        let d = JSON.parse(element).duration;
        cell1.innerHTML = a;
        cell2.innerHTML = b;
        cell3.innerHTML = c;
        cell4.innerHTML = d;
    });
}
// FUNCTION TO CLEAR THE LOCAL STORAGE AFTER EVERY 24 HOURS.. 
let hourss = 24; // Reset when storage is more than 24hours 
let now = new Date().getTime();
let setupTime = localStorage.getItem("setupTime");
if (setupTime == null) {
    localStorage.setItem("setupTime", now);
} else {
    if (now - setupTime > hourss * 60 * 60 * 1000) {
        localStorage.clear();
        localStorage.setItem("setupTime", now);
    }
}
// Call function when page load 
bodyVariable.onload = () => initClock();
startStopButton.onclick = () => startStop();
// unused things : 
// var a = 0; 
// (line 256 ) var checkinValue = today.getHours() + ":" + today.getMinutes(); 
// (line 257 ) Cinval = checkinValue.split(":"); 
// Line 367-371 
// var checkoutValue = today.getHours() + ":" + today.getMinutes(); 
// var CoutVal = checkoutValue.split(":"); 
// cell4.innerHTML = parseInt(CoutVal[0]) - parseInt(Cinval[0]) + ":" + (parseInt(CoutVal[1]) - parseInt(Cinval[1])) + 
// ":" + 
// (parseInt(CoutVal[2]) - parseInt(Cinval[2])); 
// 
// obj.sessionTime = 
// parseInt(CoutVal[0]) - 
// parseInt(Cinval[0]) + 
// ":" + 
// (parseInt(CoutVal[1]) - parseInt(Cinval[1])) + 
// ":" + 
// (parseInt(CoutVal[2]) - parseInt(Cinval[2])); 