

var hours = document.getElementById("hrs");


var minutes = document.getElementById("mnts");


var seconds = document.getElementById("scs");



setInterval(function () {
  let d = new Date();
  hours.textContent = 23 - d.getHours();
  minutes.textContent = 59 - d.getMinutes();
  seconds.textContent = 59 - d.getSeconds();
}, 1000)
