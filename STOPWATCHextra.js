// stopwatch == 00:00:00:00 === hour:min:sec:mlsec == 60:60:60:100
var myVar = setInterval(myTimer, 1000);
  
function myTimer() {
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  var d = new Date();
  document.getElementById("tens").innerHTML =
    d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
  document.getElementById("time").innerHTML = d.toLocaleDateString(
    "en-US",
    options
  );
}

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

// stopwatch function
function stopwatch() {
  second++;
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

  var watchStartStop = document.getElementById("startStop");
  var replacingTime = JSON.parse(localStorage.getItem("attendance"));
  var replacingLocalTime = JSON.parse(replacingTime[replacingTime.length-1]);
  var RT = replacingLocalTime.stopwatchTime.split(":");
  displayHours = 00;
  displayMinutes = 00;
  displaySeconds = 00;
  // document.getElementById("display").innerHTML = displayHours + ":" + displayMinutes + ":" + displaySeconds;
      // document.getElementById("display").innerHTML = RT;
      // var RT = replacingLocalTime.ff.split(":");


      // var storingTempTime;
      // storingTempTime =  (((hourOutNew) ) + ":" + ((minOutNew)) + ":" + ((secOutNew)) + ":" + ((miliSecOutNew)));
      // replacingLocalTime.ff = storingTempTime;
      // console.log(JSON.stringify(replacingTime));

      // replacingTime[gettingTheValueOfR] = JSON.stringify(replacingLocalTime);
      // localStorage.setItem("dataArray" , JSON.stringify(replacingTime))
}

var obj = {
  weekday: "",
  checkin: "",
  checkout: "",
  duration: "",
  sessionTime: "",
  stopwatchTime: "",
};



var arr = new Array();

var a = 0;
var Cinval;
function startStop() {
  var table = document.getElementById("myTable");
  if (status == "stopped") {
    // start the stopwatch(by calling the setInterval() function)
    interval = window.setInterval(stopwatch, 1000);
    document.getElementById("startStop").innerHTML = "Check-Out";
    document.getElementById("startStop").style.background = "red";

    // var option = { weekday: 'long'};

    status = "started";
    row = table.insertRow(-1);

    // var dy = document.getElementById("days").value;
    var today = new Date();
    // document.getElementById("time").innerHTML = today.toLocaleDateString('en-US', { weekday: 'long' });

    var day = today.getDay();
    // var daylist = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    console.log("today", day);
    // console.log("dy", dy)
    // if (day == daylist[day]) {
    console.log("yes");

    var cell1 = row.insertCell(-1);
    var cell2 = row.insertCell(-1);

    cell1.innerHTML = today.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric", });
    cell2.innerHTML = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var checkinValue = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    Cinval = checkinValue.split(":");



    obj.weekday = today.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric", });
    obj.checkin = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    // } else {

    //     window.clearInterval(interval)
    //     alert("Please Select Appropriate Day");
    // }
  } else {
    var today = new Date();

    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    window.clearInterval(interval);
    document.getElementById("startStop").innerHTML = "Check-In";
    document.getElementById("startStop").style.background = "green";
    status = "stopped";

    // var dy = document.getElementById("days").value;
    var day = today.getDay();
    // var daylist = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // if (dy == daylist[day]) {

    console.log(table);
    // var cell1 = row.insertCell(-1);
    // var cell2 = row.insertCell(-1);
    var cell3 = row.insertCell(-1);
    var cell4 = row.insertCell(-1);

    //cell1.innerHTML = dy;
    // cell2.innerHTML = "";
    cell3.innerHTML = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var checkoutValue = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var CoutVal = checkoutValue.split(":");
    // cell4.innerHTML = displayHours + ":" + displayMinutes + ":" + displaySeconds;
    cell4.innerHTML = (parseInt(CoutVal[0])-parseInt(Cinval[0])) + ":" + (parseInt(CoutVal[1])-parseInt(Cinval[1])) + ":" + (parseInt(CoutVal[2])-parseInt(Cinval[2])); 
    obj.checkout = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    obj.sessionTime = (parseInt(CoutVal[0])-parseInt(Cinval[0])) + ":" + (parseInt(CoutVal[1])-parseInt(Cinval[1])) + ":" + (parseInt(CoutVal[2])-parseInt(Cinval[2])); 
    obj.duration = displayHours + ":" + displayMinutes + ":" + displaySeconds;
    displayHours = 00;
    displayMinutes = 00;
    displaySeconds = 00;
    document.getElementById("display").innerHTML = displayHours + ":" + displayMinutes + ":" + displaySeconds;
    // startStop();

    // let object = new Object();
    // object = obj;

    console.log(obj + a);
    if (JSON.parse(localStorage.getItem("a")) != null) {
      a = JSON.parse(localStorage.getItem("a"));
    }
    //set value
    // localStorage.setItem("obj " + a, JSON.stringify(obj));
    // a++;
    // localStorage.setItem("a", JSON.stringify(a));

    var setVar = ("obj" + a, JSON.stringify(obj));
    a++;
    //dataArray.push(setVar)
    var k = JSON.parse(localStorage.getItem("attendance"));
    k.push(setVar);
    localStorage.setItem("attendance", JSON.stringify(k));
    // arr.push(object);

    // } else {

    //     window.clearInterval(interval)
    //     alert("Please Select Appropriate Day");
    // }
  }

  // try {
  //     localStorage.setItem("myTable", table.value);
  //     // table.value = "";
  // }
  // catch (e) {
  //     if (e == QUOTA_EXCEEDED_ERR) {
  //         console.log("Error: Local Storage limit exceeds.");
  //     }
  //     else {
  //         console.log("Error: Saving to local storage.");
  //     }
  // }
}
var hourss = 24; // Reset when storage is more than 24hours
var now = new Date().getTime();
var setupTime = localStorage.getItem('setupTime');
if (setupTime == null) {
    localStorage.setItem('setupTime', now)
} else {
    if((now-setupTime) > hourss*60*60*1000) {
        localStorage.clear()
        localStorage.setItem('setupTime', now);
    }
}

function initClock() {
  dataRender();
 
}

//items get from local storage 
var table = document.getElementById("myTable");
function dataRender() {
  console.log("heydatarender");
  if ( localStorage.getItem("attendance") == null || localStorage.getItem("attendance") == undefined ) {
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
      
    // }
   

    // i = index;
  });
  console.log(Localstored);
}

// for (let i = 0; i < JSON.parse(localStorage.getItem("a")); i++) {
//   row = table.insertRow(-1);
//   var cell1 = row.insertCell(-1);
//   var cell2 = row.insertCell(-1);
//   var cell3 = row.insertCell(-1);
//   var cell4 = row.insertCell(-1);
//   var b = JSON.parse(localStorage.getItem("obj " + i));
//   cell1.innerHTML = b.weekday;
//   cell2.innerHTML = b.checkin;
//   cell3.innerHTML = b.checkout;
//   cell4.innerHTML = b.duration;
// }

// function Reload(t) {
//   setTimeout("location.reload(true);", t);
// }


// to filter date
searchFun = () => {
  let filter = document.getElementById('search-input').value.toUpperCase();
  console.log(filter);

  let myTable = document.getElementById('myTable');

  let tr = myTable.getElementsByTagName('tr');

  let inp = filter.replace(",", " ");
  inp.split();

  for (let i = 0; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName('td')[0];
    console.log(td);
    if (td) {
      let textvalue = td.textContent || td.innerHTML;
      console.log(textvalue);

      if (textvalue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";

      }
    }
  }
}





















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
