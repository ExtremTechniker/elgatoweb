require('./streamdeck')

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


////////////////////////////////////////////////////

function helloWorld() {
    alert("Hello world!");
}

function test() {
    confirm();
}

