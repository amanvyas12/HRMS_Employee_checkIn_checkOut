//FOR API
// var csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
var url = "/attendance/attend/";
// stopwatch == 00:00:00:00 === hour:min:sec:mlsec == 60:60:60:100
var myVar = setInterval(myTimer, 1000);
// define vars to hold times values
let second = 0;
let minutes = 0;
let hours = 0;
var cell = 00 + ":" + 00 + ":" + 00;
var hr = 00;
var sec = 00;
var min = 00;
// define vars to hold "display" values
let displaySeconds = 0;
let displayMinutes = 0;
let displayHours = 0;
// variable to hold setInterval() function
let interval = null;
// variable to hold the status of stopwatch
let status = "stopped";

// for receiving the values of lastly stored time.
var ReceiveH = 0;
var ReceiveM = 0;
var ReceiveS = 0;
// variables to append value to UI
var arr = new Array();
var a = 0;
var Cinval;
var replacingTime;
var replacingLocalTime;
var RT;
var H;
var M;
var S;

var today = new Date();
var date = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
// FUNCTION FOR DATE
setTimeout(() => {
  document.getElementById("currentDate").innerText = date;
}, 100);

// FUNCTION TO DISPLAY TIME ON HEADER(for future instance)
function myTimer() {
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  var d = new Date();
  // document.getElementById("tens").innerHTML = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();  
  // document.getElementById("time").innerHTML = d.toLocaleDateString(
  // "en-US",
  // options
  // );
}

// Funtion called onLoad to display Stopwatch
function initClock() {
  // callApi();
  dataRender();
  try {
    if (localStorage.getItem("attendance") != null) {
      var replacingTime = JSON.parse(localStorage.getItem("attendance"));
      replacingLocalTime = JSON.parse(replacingTime[replacingTime.length - 1]);
      RT = replacingLocalTime.stopwatchTime.split(":");
      Hhh = RT[0];
      Mmm = RT[1];
      Sss = RT[2];
      // stopwatch(H, M, S);
      //  stopwatch(RT);
      document.getElementById("display").innerHTML = Hhh + ":" + Mmm + ":" + Sss;
  }
 }catch(err) {  
  }


}

// STOPWATCH FUNCTION FOR EVERY ROW
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
  }

  else {
    second++;

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
var obj = {
  weekday: "",
  checkin: "",
  checkout: "",
  sessionTime: "",
  duration: "",
  stopwatchTime: "",
};
// FUNCTION TO APPEND TABLE ON PAGE
function startStop() {
  var table = document.getElementById("myTable");
  if (status == "stopped") {

    if (replacingLocalTime != null) {
      replacingTime = JSON.parse(localStorage.getItem("attendance"));
      replacingLocalTime = JSON.parse(replacingTime[replacingTime.length - 1]);
      RT = replacingLocalTime.stopwatchTime.split(":");
      H = parseInt(RT[0]);
      M = parseInt(RT[1]);
      S = parseInt(RT[2]);

      interval = window.setInterval(function () { stopwatch(H, M, S) }, 1000);
      document.getElementById("startStop").innerHTML = "Check-Out";
      document.getElementById("startStop").value = "Check-Out";
      document.getElementById("startStop").style.background = "red";

      status = "started";
      row = table.insertRow(-1);

      var today = new Date();

      var cell1 = row.insertCell(-1);
      var cell2 = row.insertCell(-1);
      cell1.innerHTML = today.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric", });
      cell2.innerHTML = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

      obj.weekday = today.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric", });
      obj.checkin = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

      //////////////////////////////////////////////////////////
      // for URL
      var data = new FormData()
      data.append("employee_id", "HRM303 - Kanik Vijay");
      data.append("checkin", obj.checkin);

      async function callApi() {
        //   // Call API and send form data to store in database
        let urlCheckIn = `${url}1`
        try {
          const send = await axios.post(urlCheckIn, data, {

          });
        }
        catch (error) {
          console.log("Error : ", error);
          throw new Error(error);
        };
      }
      //////////////////////////////////////////////////////////

    }
    else {
      interval = window.setInterval(function () { stopwatch(H, M, S) }, 1000);
      document.getElementById("startStop").innerHTML = "Check-Out";
      document.getElementById("startStop").value = "Check-Out";
      document.getElementById("startStop").style.background = "red";

      status = "started";
      row = table.insertRow(-1);

      var today = new Date();

      var cell1 = row.insertCell(-1);
      var cell2 = row.insertCell(-1);

      cell1.innerHTML = today.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric", });
      cell2.innerHTML = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

      obj.weekday = today.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric", });
      obj.checkin = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

      //////////////////////////////////////////////////////////
      var data = new FormData()
      data.append("employee_id", "HRM303 - Kanik Vijay");
      data.append("checkin", obj.checkin);

      async function callApi() {
        //   // Call API and send form data to store in database
        let urlCheckIn = `${url}1`
        try {
          const send = await axios.post(urlCheckIn, data, {

          });
        }
        catch (error) {
          console.log("Error : ", error);
          throw new Error(error);
        };
      }
      //////////////////////////////////////////////////////////

    }
  } else {
    var today = new Date();

    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    window.clearInterval(interval);
    document.getElementById("startStop").innerHTML = "Check-In";
    document.getElementById("startStop").value = "Check-In";
    document.getElementById("startStop").style.background = "green";
    status = "stopped";

    var day = today.getDay();


    console.log(table);
    var cell3 = row.insertCell(-1);
    var cell4 = row.insertCell(-1);
    var cell5 = row.insertCell(-1);

    cell3.innerHTML = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    cell4.innerHTML = displayHours + ":" + displayMinutes + ":" + displaySeconds;
    obj.checkout = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    obj.duration = displayHours + ":" + displayMinutes + ":" + displaySeconds;


    console.log(obj + a);
    if (JSON.parse(localStorage.getItem("a")) != null) {
      a = JSON.parse(localStorage.getItem("a"));
    }

    var setVar = ("obj" + a, JSON.stringify(obj));
    a++;
    var k = JSON.parse(localStorage.getItem("attendance"));
    k.push(setVar);
    localStorage.setItem("attendance", JSON.stringify(k));

    //////////////////////////////////////////////////////////
    // for URL
    var data = new FormData()
    data.append("employee_id", "HRM303 - Kanik Vijay");
    data.append("checkin", obj.checkin);
    async function callApi() {
      let urlCheckOut = `${url}0`
      //   // Call API and send form data to store in database
      try {
        const send = await axios.post(urlCheckOut, data, {

        });
      }
      catch (error) {
        console.log("Error : ", error);
        throw new Error(error);
      };
    }
    //////////////////////////////////////////////////////////

  }

}

// FUNCTION TO GET ITEMS FROM LOCAL STORAGE AND APPEND ON PAGE
var table = document.getElementById("myTable");
function dataRender() {
  console.log("heydatarender");
  if (localStorage.getItem("attendance") == null || localStorage.getItem("attendance") == undefined) {
    console.log("hey");

    var attendBlank = [];
    localStorage.setItem("attendance", JSON.stringify(attendBlank));
  }
  var Localstored = JSON.parse(localStorage.getItem("attendance"));
  console.log(typeof Localstored);

  Localstored.forEach((element, index) => {
    // if (index == Localstored.length-1) {
    console.log(a);
    row = table.insertRow(-1);
    var cell1 = row.insertCell(-1);
    var cell2 = row.insertCell(-1);
    var cell3 = row.insertCell(-1);
    var cell4 = row.insertCell(-1);


    var a = JSON.parse(element).weekday;
    var b = JSON.parse(element).checkin;
    var c = JSON.parse(element).checkout;
    var d = JSON.parse(element).duration;


    cell1.innerHTML = a;
    cell2.innerHTML = b;
    cell3.innerHTML = c;
    cell4.innerHTML = d;

  });
  console.log(Localstored);
}

// FUNCTION TO CLEAR THE LOCAL STORAGE AFTER EVERY 24 HOURS..
var hourss = 24; // Reset when storage is more than 24hours
var now = new Date().getTime();
var setupTime = localStorage.getItem('setupTime');
if (setupTime == null) {
  localStorage.setItem('setupTime', now)
} else {
  if ((now - setupTime) > hourss * 60 * 60 * 1000) {
    localStorage.clear();
    localStorage.setItem('setupTime', now);
  }
}

//FUNCTION TO CALL API
// async function callApi(){
//   // Call API and send form data to store in database
//   var LocalstoredAPI = JSON.parse(localStorage.getItem("attendance"));
//   console.log(LocalstoredAPI);
//   try {
//       const send = await axios.post(url, data, {
//           headers: {
//               "Content-Type": "multipart/form-data",
//               "X-CSRFToken" : csrfToken,
//               }
//           });
//       return send;
//   }
//   catch(error){
//       console.log("Error : ", error);
//       throw new Error(error);
//   };
// }

// FUNCTION FOR FILTERING THE DATA FROM THE TABLE ON USER INPUT(for future instance)
// searchFun = () => {
//   let filter = document.getElementById('search-input').value.toUpperCase();
//   console.log(filter);

//   let myTable = document.getElementById('myTable');

//   let tr = myTable.getElementsByTagName('tr');

//   let inp = filter.replace(",", " ");
//   inp.split();

//   for (let i = 0; i < tr.length; i++) {
//     let td = tr[i].getElementsByTagName('td')[0];
//     console.log(td);
//     if (td) {
//       let textvalue = td.textContent || td.innerHTML;
//       console.log(textvalue);

//       if (textvalue.toUpperCase().indexOf(filter) > -1) {
//         tr[i].style.display = "";
//       } else {
//         tr[i].style.display = "none";

//       }
//     }
//   }
// }





















//   var cell1 = row.insertCell(-1);
//   var cell2 = row.insertCell(-1);
//   var cell3 = row.insertCell(-1);
//   var cell4 = row.insertCell(-1);

//   var ar = [cell1, cell2, cell3, cell4]

// $('#search-input').on('keyup', function(){
//   var value = $(this).val()
//   console.log('value: ' , value)
//  var data = searchTable(value, ar)
//   startStop(data)
// })

// function searchTable(value, data) {

//   var filteredData = []

//   for (let i = 0; i< data.length; i++) {
//     value = value.toLowerCase();
//     var name = data[i].weekday.toLowerCase()

//     if (name.includes(value)) {
//       filteredData.push(data[i])
//     } 

//       }
//   return filteredData
// }
