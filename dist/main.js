const render = (teamData) => {
  let source = $('#displayContainer-template').html()
  let template = Handlebars.compile(source)
  
  $('#displayContainer').empty()
  for (let player of teamData) {
    let newHTML = template(player)
    $('#displayContainer').append(newHTML)
  }
}
let players=[]

const getPlayerData = () => {
  $('.iconAdd').on('click', function () {
    
    let firstName = $(this)
      .closest('.displayPlayerData')
      .find('.namesHeader')
      .find('.firstName')
      .text()

    let lastName = $(this)
      .closest('.displayPlayerData')
      .find('.namesHeader')
      .find('.lastName')
      .text()

    let jersey = $(this).closest('.displayPlayerData').find('.jersey').text()

    let position = $(this)
      .closest('.displayPlayerData')
      .find('.position')
      .text()

    let player = {
      firstName: firstName,
      lastName: lastName,
      jersey: jersey,
      pos: position,
    }

    // const deletePlayerData=()=>{
    //   $('.iconRemove').on('click', function () {
        
    //   })
    // }

    alert(`${player.firstName} ${player.lastName} added successfully`);
    $.post('/roster', player, () => {})
  })
}

const fetchData = () => {
  let teamName = $('#teamNameInput').val().toLowerCase()
  $.get(`/teams/${teamName}`, (teamData) => {
    render(teamData)
    getPlayerData()
  })
  $('#teamNameInput').val('')
}

const displayDataBtn = () => {
  fetchData()
}

const displayDreamTeam = () => {
  $.get('/dreamTeam', (dreamTeam) => {
    render(dreamTeam)
  })
}

function img404(img) {
  img.src = 'https://makitweb.com/demo/broken_image/images/noimage.png'
}