require('./streamdeck')
const OBS = require('./lib/OBSWebSocket')

function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
}

function requestUrl(url) {
  $.ajax(url);
}

function openDeckFolder(folder) {
location.search = "?p="+folder
}

const con = new OBS();

con.connect({address:'localhost:4444',password:''})


////////////////////////////////////////////////////

function helloWorld() {
    alert("Hello world!");
}

function test() {
    confirm();
}

