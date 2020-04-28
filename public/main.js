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

function openTwitch() {
    requestUrl("http://localhost:42800/send/OpenTwitch")
}

function openTwitchClym() {
    requestUrl("http://localhost:42800/send/OpenTwitchClym")
}

function openExplorer() {
    requestUrl("http://localhost:42800/send/openExplorer")
}

function play_pause() {
    requestUrl("http://192.168.0.10:42800/send/PlayPauseMusic")
}
