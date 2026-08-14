//DOM load event

  const body = document.querySelector('body');
const vid1 = document.querySelector('.vid1');
 const vid2 = document.querySelector('.vid2');
  const vid3 = document.querySelector('.vid3');
    const vid4 = document.querySelector('.vid4');
    const vid5 = document.querySelector('.vid5');
    const vid6 = document.querySelector('.vid6');
const vid7 = document.querySelector('.vid7');
 const vid8 = document.querySelector('.vid8');
  const vid9 = document.querySelector('.vid9');
    const vid10 = document.querySelector('.vid10');
    const vid11 = document.querySelector('.vid11');
    const vid12 = document.querySelector('.vid12');
    const vid13 = document.querySelector('.vid13');
    const vid14 = document.querySelector('.vid14');

window.addEventListener("DOMContentLoaded", () => {
  //   Speech rec

// popup
  var $iframe = $('iframe'),
//   $videoLink = $('.video-link'),
  playerTemplate = '<div class="player"><div class="player__video"><div class="video-filler"></div><button class="video-close">&times;</button><iframe class="video-iframe" src="{{iframevideo}}" frameborder="0" allowfullscreen allow="autoplay; encrypted-media; picture-in-picture"></iframe></div><div/>'

function vidappear(event) {
  
  var localTemplate = '',
    videoWidth = parseInt($(event).data('width')),
    videoHeight = parseInt($(event).data('height')),
    videoAspect = (videoHeight / videoWidth) * 100,
    // elements
    $player = null,
    $video = null,
    $close = null,
    $iframe = null;

//   event.preventDefault();

  localTemplate = playerTemplate.replace('{{iframevideo}}', $(event).prop('href'));

  $player = $(localTemplate);

  $player.find('.video-filler').css('padding-top', videoAspect + '%');

  $close = $player.find('.video-close').on('click', function closeout() {
    $(this)
      .off()
      .closest('.player')
      .hide()
      .remove();
  })

  $player.appendTo('body').addClass('js--show-video');
}

  //Set speech recognition
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;


  const recognition = new SpeechRecognition();
  heardOutput = document.querySelector('.heard-output');

 
  //Start speech recognition
  recognition.start();
  //Listen for when the user finishes talking
  recognition.addEventListener('result', e => {

    //Get transcript of user speech
    const transcript = e.results[0][0].transcript.toLowerCase().replace(/\s/g,' ');

    //Output transcript
    heardOutput.textContent = transcript;

    //Check if transcript is valid
    if (transcript === 'egypt') {
      event = vid1;
vidappear(event);
    } else if (transcript === 'greece') {
     event = vid2;
vidappear(event);
    } else if (transcript === 'dark ages') {
     event = vid3;
vidappear(event);
} else if (transcript === 'renaissance') {
     event = vid4;
vidappear(event);
} else if (transcript === 'blombos cave') {
     event = vid5;
vidappear(event)
} else if (transcript === 'altamira'){
     event = vid6;
vidappear(event);
} else if (transcript === 'byzantine'){
     event = vid7;
vidappear(event);
}
    else if (transcript === 'gothic'){
     event = vid8;
vidappear(event);
}
    else if (transcript === 'greek works'){
     event = vid9;
vidappear(event);
}
    else if (transcript === 'caves of lascaux'){
     event = vid10;
vidappear(event);
}
    else if (transcript === 'nigeria'){
     event = vid11;
vidappear(event);
}
    else if (transcript === 'sulawesi'){
     event = vid12;
vidappear(event);
}
    else if (transcript === 'rome and pompei'){
     event = vid13;
vidappear(event);
}
     else if (transcript === 'summary'){
     event = vid14;
vidappear(event);
}
  });

  //Restart speech recognition after user has finished talking
  recognition.addEventListener('end', recognition.start);
  
});

                     
                        