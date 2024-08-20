let currentPlayer = 'X';
let turnsCounter = 0;
const resetBt = document.querySelector( '.board__btn' );
const score=document.querySelector( '.score' );
const scorePlayerX=document.querySelector( '.score__value--X' );
const scorePlayerO = document.querySelector( '.score__value--O' );
const boardInput = document.querySelector( '.board__input' );
const boardBtns = document.querySelector( '.board__btns' );
const increaseBtn=document.getElementById( 'increaseBtn' );
const decreaseBtn = document.getElementById( 'decreaseBtn' );
let NUMBER_OF_ROWS = parseInt( boardInput.value );
let turns = NUMBER_OF_ROWS ** 2;
let scoreX=0;
let scoreO=0;
scorePlayerX.textContent = scoreX;
scorePlayerO.textContent = scoreO;
const createBoardArray = () => {
    let board = [];
    for ( let row = 0; row < NUMBER_OF_ROWS; row++ ) {
        board.push( Array.from( {length: NUMBER_OF_ROWS} ,()=>"_" ) );
    }
    return board;
};
let board = createBoardArray();
const updateBoardSize = () => {
    NUMBER_OF_ROWS = parseInt( boardInput.value );
    turns = NUMBER_OF_ROWS ** 2;
};
const checkRows = ( currentPlayer ) => {  
    for ( let row = 0; row < NUMBER_OF_ROWS; row++ ) {
        let win = true;
        for ( let column = 0; column < NUMBER_OF_ROWS; column++ ) {
            if ( board[row][column] !== currentPlayer ) {
                win = false;
                break;
            }
        }
        if ( win ) return true;
    }
    return false;
};
const checkColumns = ( currentPlayer ) => {
    for ( let column = 0; column < NUMBER_OF_ROWS; column++ ) {
        let win = true;
        for ( let row = 0; row < NUMBER_OF_ROWS; row++ ) {
            if ( board[row][column] !== currentPlayer ) {
                win = false;
                break;
            }
        }
        if ( win ) return true;
    }
    return false;
};
const checkDiagonals = ( currentPlayer ) => {
    let win = true;
    for ( let i = 0; i < NUMBER_OF_ROWS; i++ ) {
        if ( board[i][i] !== currentPlayer ) {
            win = false;
            break;
        }
    }
    return win;
};
const checkReverseDiagonals = ( currentPlayer ) => {
    let win = true;
    for ( let i = 0; i < NUMBER_OF_ROWS; i++ ) {
        if ( board[i][NUMBER_OF_ROWS-1-i] !== currentPlayer ) {
            win = false;
            break;
        }
    }
    return win;
};
const checkWin = () => {
    if (
        checkRows( currentPlayer ) ||
        checkColumns( currentPlayer ) ||
        checkDiagonals( currentPlayer ) ||
        checkReverseDiagonals( currentPlayer )
    ) {
        scoreCount( currentPlayer );
        return true;
    }
  return false;
};
const scoreCount = ( currentPlayer ) => {
    if ( currentPlayer === 'X' ) {
        scoreX++;
        scorePlayerX.textContent=scoreX;
 }else {
        scoreO++;
        scorePlayerO.textContent=scoreO;
 }
};
const runWinFunc = ( currentPlayer ) => {
    setTimeout( () => {
        alert( `${currentPlayer} won!` );
        resetFunc();
 },150 );
};
const resetFunc = () => {
    document.querySelector( '.board' ).remove();
    updateBoardSize();
    board = createBoardArray();
    currentPlayer = 'X';
    turnsCounter = 0;
    createBoard();
};
const runDrawFunc = () => {
    setTimeout( () => {
        alert( "Draw!" );
        resetFunc();
    },150 );
};
const cellStyle = ( cell, currentPlayer ) => {
    const cellValue = cell.querySelector( '.board__value' );
    cellValue.textContent = currentPlayer;
    cell.classList.add( `board__cell--${currentPlayer}` );
};
const clickHandler = ( element, index ) => {
    const cell = element.target;
    const row = Math.floor( index / NUMBER_OF_ROWS );
    const col = index % NUMBER_OF_ROWS;

    if ( board[row][col] === '_' ) {
        turnsCounter++;
        board[row][col] = currentPlayer;
        cellStyle( cell, currentPlayer );

        if ( checkWin() ) {
            runWinFunc( currentPlayer );
        } else if ( turns === turnsCounter ) {
            runDrawFunc();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
};
const boardSizeBtnHandler = () => {
    increaseBtn.addEventListener( 'click', () => {
        if ( NUMBER_OF_ROWS < 5 ) {
            boardInput.value=parseInt( boardInput.value )+1;
        }
        resetFunc();
    } );
    decreaseBtn.addEventListener( 'click', () => {
        if ( NUMBER_OF_ROWS > 3 ) {
            boardInput.value=parseInt( boardInput.value )-1;
        }
        resetFunc();
    } );
};
const createCell = ( i ) => {
    const boardCell = `<div class="board__cell" role="button" tabindex="${i+1}"><span class="board__value"></span></div>`;
    const boardCellElement = document.createRange().createContextualFragment( boardCell );
    boardCellElement.querySelector( ".board__cell" ).addEventListener( "click", ( event )=>clickHandler( event,i ) );
    boardCellElement.querySelector( ".board__cell" ).addEventListener( "keydown", ( event ) => event.key === 'Enter' ? clickHandler( event, i ) : true ); 
    return boardCellElement;
};
const createBoard = () => {
    const boardElement = document.createElement( 'div' );
    boardElement.classList.add( 'board' );
    if ( NUMBER_OF_ROWS === 3 ) {
        boardBtns.classList.remove( 'board__btns--five' );
    }
    if ( NUMBER_OF_ROWS === 4 ) {
        boardElement.classList.add( 'board--four' );
        boardBtns.classList.remove( 'board__btns--five' );
    }
    if ( NUMBER_OF_ROWS === 5 ) {
        boardElement.classList.add( 'board--five' );
        boardBtns.classList.add( 'board__btns--five' );
    }
    for ( let i = 0; i < turns; i++ ) {
       const boardCellElement=  createCell( i );
        boardElement.appendChild( boardCellElement );
        document.documentElement.style.setProperty( '--grid-rows', NUMBER_OF_ROWS );
      
    };
    score.insertAdjacentElement( 'afterend', boardElement );
};
boardInput.addEventListener( 'input', () => {
    NUMBER_OF_ROWS = parseInt( boardInput.value );
    resetFunc();
} );
createBoard();
resetBt.addEventListener( "click", resetFunc );
boardSizeBtnHandler();