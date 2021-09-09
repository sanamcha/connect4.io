
class Game {
  
constructor (p1, p2, height=6, width=7){
  this.players = [p1, p2];
  this.height = height;
  this.width = width;
  this.currPlayer = p1;
  this.makeBoard();
  this.makeHtmlBoard();
  this.gameOver = false;
}

   makeBoard() {
    this.board = [];
    for (let y = 0; y < this.height; y++) {
      this.board.push(Array.from({length: this.width}));
    }
  }
  
  /** makeHtmlBoard: make HTML table and row of column tops. */
  
   makeHtmlBoard() {
    const board = document.getElementById('board');
    board.innerHTML = ''; //to prevent multiple board 
  
    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement('tr');
    top.setAttribute('id', 'col-top');
    
    this.handleClick1 = this.handleClick.bind(this);
    top.addEventListener('click', this.handleClick1);
  
    for (let x = 0; x < this.width; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }
  
    board.append(top);
  
    // make main part of board
    for (let y = 0; y < this.height; y++) {
      const row = document.createElement('tr');
  
      for (let x = 0; x < this.width; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }
  
      board.append(row);
    }
  }

  // findSpotForCol: given column x, return top empty y (null if filled) 
  
   findSpotForCol(x) {
    for (let y = this.height - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }
  
   placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.style.backgroundColor = this.currPlayer.color;
  
    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }
  
 //endgame message
   endGame(msg) {
    alert(msg);
    const endMessage = document.getElementById('end-message');
    endMessage.innerText = 'GAME OVER!!'; 
    const top = document.getElementById('col-top');
    top.removeEventListener('click', this.handleClick1);
  }
  
  
  handleClick(evt) {
    const x = +evt.target.id;
    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }
    this.board[y][x] = this.currPlayer;
    this.placeInTable(y, x);
    
    // check for win
    if (this.checkForWin()) {
      this.gameOver = true;
      let p =document.querySelector('p');
      p.innerHTML = `Player ${this.currPlayer.color} won the game. Do you like to play again!!`;
      return this.endGame(`Congratulation Player ${this.currPlayer.color},you won this game!`);

    }
    
    // check for tie
    if (this.board.every(row => row.every(cell => cell))) {
      let p =document.querySelector('p');
      p.innerHTML = "Sorry the Game is Tie, Do you like to Play Again!!!";
      return this.endGame('Sorry, this game is TIE! Play Again!!!');
    }
      
    // switch players
    this.currPlayer = this.currPlayer === this.players[0] ? this.players[1] :this.players[0];
  }
    
  checkForWin(){
   let _win = cells =>
      cells.every(
        ([y, x]) =>
          y >= 0 && y < this.height && x >= 0 && x < this.width && this.board[y][x] === this.currPlayer
      );
   
    
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
    
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }
}

class Player{
  constructor(color){
    this.color = color;
  }
}
//to start the game
const startBtn = document.querySelector('#start');
startBtn.addEventListener('click', () => {
  let player1 = document.querySelector('#p1-color');
  let player2 = document.querySelector('#p2-color');
  let p1 = new Player(player1.value);
  let p2 = new Player(player2.value);
  new Game(p1, p2);
});

  


