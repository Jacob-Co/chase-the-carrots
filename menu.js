const menuOverlay = document.querySelector('#main-menu');
const menuLog = document.querySelector('#menu-status')
const menuButton = document.querySelector('#menu-button');


function renderStartMenu() {
  menuLog.textContent = 'Instructions: Try to get as much carrot circles are you can. They are "O" shaped and colored orange. Don\'t touch the Solid Balls they will kill you!'
  menuButton.textContent = 'Start!'
}

function renderEndMenu(score) {
  menuLog.textContent = `Your total score is ${score}`;
  menuButton.textContent = 'Re-start!';
}

function start() {
  menuOverlay.style.visibility = 'visible';
  renderStartMenu();
  menuButton.addEventListener('click', function() {
    console.log('start');
    menuOverlay.style.visibility = 'hidden';
    initializeGame();
    loop();
  }, {once: true})
}

function end(score) {
  menuOverlay.style.visibility = 'visible';
  renderEndMenu(score);
  menuButton.addEventListener('click', function() {
    console.log('here');
    menuOverlay.style.visibility = 'hidden';
    clearGame();
    initializeGame();
    loop();
  }, {once: true})
}

start();