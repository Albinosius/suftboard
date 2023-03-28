"use strict";

var player;
var playerContainer = $('.player');
var eventsInit = function eventsInit() {
  $(".player__start").click(function (e) {
    e.preventDefault();
    var btn = $(e.currentTarget);
    if (playerContainer.hasClass("paused")) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  });
  $('.player__playback').click(function (e) {
    var bar = $(e.currentTarget);
    var clickedPosition = e.originalEvent.layerX;
    var newButtonPositionPercent = clickedPosition / bar.width() * 100;
    var newPlaybackPercentSec = player.getDuration() / 100 * newButtonPositionPercent;
    $(".player__playback-button").css({
      left: "".concat(newButtonPositionPercent, "%")
    });
    player.seekTo(newPlaybackPercentSec);
  });
  $(".player__wrapper").click(function (e) {
    player.playVideo();
  });
};
var formatTime = function formatTime(timeSec) {
  var roundTime = Math.round(timeSec);
  var minutes = addZero(Math.floor(roundTime / 60));
  var seconds = addZero(roundTime - minutes * 60);
  function addZero(num) {
    return num < 10 ? "0".concat(num) : num;
  }
  return "".concat(minutes, ":").concat(seconds);
};
var onPlayerReady = function onPlayerReady() {
  var interval;
  var durationSec = player.getDuration();
  if (typeof intervar === 'undefined') {
    clearInterval(interval);
  }
  interval = setInterval(function () {
    var completedSec = player.getCurrentTime();
    var compelentedPercent = completedSec / durationSec * 100;
    $(".player__playback-button").css({
      left: "".concat(compelentedPercent, "%")
    });
  }, 1000);
};
var onPlayerStateChange = function onPlayerStateChange(event) {
  /* 
   -1 – воспроизведение видео не началось
    0 – воспроизведение видео завершено
    1 – воспроизведение
    2 – пауза
    3 – буферизация
    5 – видео находится в очереди
  */
  switch (event.data) {
    case 1:
      playerContainer.removeClass('active');
      playerContainer.addClass("paused");
      break;
    case 2:
      playerContainer.addClass('active');
      playerContainer.removeClass("paused");
      break;
  }
};
function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    height: '405',
    width: '660',
    videoId: 'M7lc1UVf-VE',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    },
    playerVars: {
      controls: 0,
      disablekd: 0,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0
    }
  });
}
eventsInit();