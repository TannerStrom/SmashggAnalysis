//function getName() {
  var url = 'https://api.smash.gg/tournament/bopme-15/attendees';
  
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    success: displayAll
  })
  
  //$('.tournament-name').text("Tournament Name");
//}

function displayAll(data) {
  var response = JSON.parse(data);
  console.log(response);
}