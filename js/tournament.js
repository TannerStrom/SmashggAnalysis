$.ajax({
  url: 'https://api.smash.gg/tournament/bopme-15',
  type: 'GET',
  dataType: 'json',
  success: setTitle
})

$.ajax({
  url: 'https://api.smash.gg/event/14870?expand[0]=entrants&expand[1]=groups',
  type: 'GET',
  dataType: 'json',
  success:getEntrantID
})

function setTitle(data) {
  var name = data['entities']['tournament']['name'];
  $('.tournament-name').text(name);
}

function getEntrantID(data) {
  var len = data['entities']['entrants']['length'];
  var i;
  
  for(i = 0; i < len; i++) {
    var entrantId = data['entities']['entrants'][i]['id'];
    $.ajax({
      url: 'https://api.smash.gg/entrant/' + entrantId,
      type: 'GET',
      dataType: 'json',
      success: getPlayer
    })
  }
}

function getPlayer(data) {
  var id = data['entities']['attendee'][0]['playerId'];
  
  $.ajax({
    url: 'https://api.smash.gg/player/' + id,
    type: 'GET',
    dataType: 'json',
    success: gotPlayer
  })
}

function gotPlayer(data) {
  console.log(data['entities']['player']['gamerTag']);
}