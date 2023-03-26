let player;
const playerContainer = $('.player');

let eventsInit = () => {
  $(".player__start").click(e => {
    e.preventDefault();

    const btn = $(e.currentTarget);

    
    if (playerContainer.hasClass("paused")) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  });

  $('.player__playback').click(e => {
    const bar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX;
    const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
    const newPlaybackPercentSec =
      (player.getDuration() / 100) * newButtonPositionPercent;

    $(".player__playback-button").css({
      left: `${newButtonPositionPercent}%`
    });

    player.seekTo(newPlaybackPercentSec);
  });

  $(".player__wrapper").click(e => {
    player.playVideo();
  });
}

const formatTime = timeSec => {
  const roundTime = Math.round(timeSec);

  const minutes = addZero(Math.floor(roundTime / 60));
  const seconds = addZero(roundTime - minutes * 60);

  function addZero(num) {
    return num < 10 ? `0${num}` : num;
  }

  return `${minutes}:${seconds}`;
}

const onPlayerReady = () => {
  let interval;
  const durationSec = player.getDuration();

  if (typeof intervar === 'undefined') {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    const completedSec = player.getCurrentTime();
    const compelentedPercent = (completedSec / durationSec) * 100;

    $(".player__playback-button").css({
      left: `${compelentedPercent}%`
    })

  }, 1000);
}

const onPlayerStateChange = event => {
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
}

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