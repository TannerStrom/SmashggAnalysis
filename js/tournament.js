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
  var state = data['entities']['player']['state'];
  prepData(state);
}

var IN = 0;
  var KY = 0;
  var IL = 0;
  var other = 0;

function prepData(state) {
  google.charts.load('current', {'packages':['corechart', 'bar']});
  google.charts.setOnLoadCallback(makeChart);
  
  
  
  if(state === "IN") {
    IN++;
  } else if (state === "IL") {
    IL++;
  } else if (state === "KY") {
    KY++;
  } else {
    other++;
  }
  
  function makeChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'State');
    data.addColumn('number', 'Total');
    data.addRows([
      ['IN', IN],
      ['KY', KY],
      ['IL', IL],
      ['Other', other]
    ]);
    
    var options = {'title': "Players per State",
                   'width': 500,
                   'height': 400};
    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  }
}