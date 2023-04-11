import React, { useState, useEffect } from 'react'

const TicTacToe = () => {
  const [xTurn, setXTurn] = useState(true);
  const [won, setWon] = useState(false);
  const [wonCombo, setWonCombo] = useState([]);
  const [player, setPlayer] = useState('X');
  const [player2, setPlayer2] = useState('O');
  const WINNING_COMBO = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const [boardData, setBoardData] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
  });
  const [isDraw, setIsDraw] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  useEffect(() => {
    checkWinner();
    checkDraw();
  }, [boardData]);
  const updateBoardData = (idx) => {
    if (!boardData[idx] && !won) {
      //will check whether specify idx is empty or not
      let value = xTurn === true ? "X" : "O";
      setBoardData({ ...boardData, [idx]: value });
      setXTurn(!xTurn);
    }
  };
  const checkDraw = () => {
    let check = Object.keys(boardData).every((v) => boardData[v]);
    setIsDraw(check);
    if (check) setModalTitle("Match Draw!!!");
  };
  const checkWinner = () => {
    WINNING_COMBO.map((bd) => {
      const [a, b, c] = bd;
      if (
        boardData[a] &&
        boardData[a] === boardData[b] &&
        boardData[a] === boardData[c]
      ) {
        setWon(true);
        setWonCombo([a, b, c]);
        setModalTitle(`Player ${!xTurn ? player : player2} Won!!!`);

        return;
      }
    });
  };

  useEffect(() => {
    setModalTitle("Olá, seja bem vindo ao jogo da velha!");
  }, []);

  const reset = () => {
    setBoardData({
      0: "",
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: "",
    });
    setXTurn(true);
    setWon(false);
    setWonCombo([]);
    setIsDraw(false);
    setModalTitle("");
  };
  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <div className="player">
        <label>Player 1: </label>
        <br />
        <input type="text" className='players' value={player} onChange={(e) => setPlayer(e.target.value)} />
      </div>
      <div className="player">
        <label>Player 2: </label>
        <br />
        <input type="text" className='players' value={player2} onChange={(e) => setPlayer2(e.target.value)} />
      </div>
      <div className="game">
        <div className="game__menu">
          <p>{xTurn === true ? player : player2}'s Turn</p>
          <p>{`Game Won:${won} Draw: ${isDraw}`}</p>
        </div>
        <div className="game__board">
          {[...Array(9)].map((v, idx) => {
            return (
              <div
                onClick={() => {
                  updateBoardData(idx);
                }}
                key={idx}
                className={`square ${
                  wonCombo.includes(idx) ? "highlight" : ""
                }`}
              >
                {boardData[idx]}
              </div>
            );
          })}
        </div>
      </div>

      <div className={`modal ${modalTitle ? "show" : ""}`}>
        <div className="modal__title">{modalTitle}</div>
        <button onClick={reset}>New Game</button>
      </div>
    </div>
  );
}

export default TicTacToe;