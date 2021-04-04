// for every value/ slot it is assigned a color
//Math.random will choose a random property
//compare that answer to the bet you choose
//if user chooses red, and math.random choses an even number,
//even numbers are red, that means the user wins double what they bet

//line below is optional

// for index.ejs
var style = document.createElement("style");
document.head.appendChild(style)
sheet = style.sheet

document.querySelector('button').addEventListener('click', playGame)

let board = {
  0: "green",
  00: "green",
  1: "red",
  2: "black",
  3: "red",
  4: "black",
  5: "red",
  6: "black",
  7: "red",
  8: "black",
  9: "red",
  10: "black",
  11: "black",
  12: "red",
  13: "black",
  14: "red",
  15: "black",
  16: "red",
  17: "black",
  18: "red",
  19: "red",
  20: "black",
  21: "red",
  22: "black",
  23: "red",
  24: "black",
  25: "red",
  26: "black",
  27: "red",
  28: "black",
  29: "black",
  30: "red",
  31: "black",
  32: "red",
  33: "black",
  34: "red",
  35: "black",
  36: "red"
}
let money = 20000
document.querySelector('#value').innerText = "$"+money



function playGame() {

  let result = Math.floor(Math.random() * 37)
  let bet = parseInt(document.getElementById('moneyBet').value)
  let userInputColor = document.getElementById('colorInput').value.toLowerCase()
  let name = document.querySelector('#name').value
  let casinoWon = 0
  let casinoLost = 0
  console.log(`This is the input color: ${userInputColor}`)
  console.log(`This is the bet: ${bet}`)
  console.log(`This is the result: ${result}`)
  if (document.querySelector('#name').value == '' || document.querySelector('#moneyBet').value == '') {
    alert('please enter your name and/or betting amount')
    return

  }
  if (bet > money) {
    alert('Sorry, you are out of money. Better luck next time!')
  } else {

    sheet.addRule('#wheel::before', `transition: all 4s ease !important`)
    sheet.addRule('#wheel::before', `transform: ${Object.values(rotation)[result]}`)



    console.log('starting set time out')
    if (userInputColor == Object.keys(board)[result]) {
      money = money + bet * 2
      winnerStatus = 'You won!'

      console.log('casino lost (inside set time out)', new Date())
      casinoLost = bet * -1
      console.log('winner')

    } else if (userInputColor == Object.values(board)[result] || Object.values(board)[result] == "green") {
      money = money + bet * 5
      console.log('casino LOST (inside set time out)', new Date())
      casinoLost = bet * -4
      winnerStatus = 'You won!'

    } else {
      console.log('casino won(inside set time out)', new Date())
      money = money - bet
      console.log('loser')
      casinoWon = bet
      winnerStatus = 'You lost!'
    }

    setTimeout(_ => {
      document.querySelector('.results').innerText = winnerStatus
      document.getElementById('value').innerText = "$" + money
      setTimeout(_ => {
        sheet.addRule('#wheel::before', `transition: 0.01s !important`)
        sheet.addRule('#wheel::before', `transform: rotate(43deg)`)
      }, 4000)
    }, 4000)
    // fetch to update casino won and lost
    console.log('starting fetch', new Date())
    fetch('casinoUpdate', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name,
        'casinoWon': casinoWon,
        'casinoLost': casinoLost,
        'color': userInputColor,
        'bet': bet
      })
    })
  }
}

/// rotation

let rotation = {
  0: "rotate(2156deg)",
  00: "rotate(1976deg)",
  1: "rotate(1985deg)",
  2: "rotate(1805deg)",
  3: "rotate(2024deg)",
  4: "rotate(1843deg)",
  5: "rotate(2062deg)",
  6: "rotate(1880deg)",
  7: "rotate(2098deg)",
  8: "rotate(1920deg)",
  9: "rotate(2137deg)",
  10: "rotate(1957deg)",
  11: "rotate(2108deg)",
  12: "rotate(1928deg)",
  13: "rotate(1995deg)",
  14: "rotate(1814deg)",
  15: "rotate(2033deg)",
  16: "rotate(1852deg)",
  17: "rotate(2071deg)",
  18: "rotate(1890deg)",
  19: "rotate(1910deg)",
  20: "rotate(2090deg)",
  21: "rotate(1871deg)",
  22: "rotate(2053deg)",
  23: "rotate(1833deg)",
  24: "rotate(2014deg)",
  25: "rotate(1947deg)",
  26: "rotate(2128deg)",
  27: "rotate(1966deg)",
  28: "rotate(2146deg)",
  29: "rotate(1938deg)",
  30: "rotate(1918deg)",
  31: "rotate(1900deg)",
  32: "rotate(2080deg)",
  33: "rotate(1862deg)",
  34: "rotate(2043deg)",
  35: "rotate(1824deg)",
  36: "rotate(2005deg)"
}
