import { useEffect } from "react";
import "./PlayGame.css";

export default function PlayGame({
  userMark,
  points,
  isX,
  winner,
  status,
  dispatch,
  cells,
  opponent,
  opponentPlayer,
}) {
  opponent = userMark === "X" ? "O" : "X";

  return (
    <div className="container">
      <div className="row">
        <div className="main-section">
          <div className="top-section">
            <Logo />
            <WhosTurn who={isX ? "X" : "O"} />
            <RestartButton dispatch={dispatch} />
          </div>
          <GameBoard
            userMark={userMark}
            isX={isX}
            dispatch={dispatch}
            cells={cells}
            winner={winner}
            opponent={opponent}
            status={status}
            opponentPlayer={opponentPlayer}
          />

          <div className="stats">
            <Stats
              userMark={userMark}
              points={points}
              opponentPlayer={opponentPlayer}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Logo() {
  return <img className="logo" src="logo.svg" alt="logo" />;
}

function WhosTurn({ who }) {
  return (
    <div className="whos-turn">
      <span className="current-turn">{who}</span> Turn
    </div>
  );
}

function RestartButton({ dispatch }) {
  return (
    <button onClick={() => dispatch({ type: "restart" })}>
      <img src="icon-restart.svg" alt="restart icon" />
    </button>
  );
}

function GameBoard({
  userMark,
  isX,
  winner,
  dispatch,
  cells,
  opponent,
  status,
  opponentPlayer,
}) {
  useEffect(() => {
    checkIfWin(cells, userMark, dispatch);
    checkIfWin(cells, opponent, dispatch);
    if (!winner && Object.values(cells).indexOf(null) === -1) {
      dispatch({ type: "onFinishGame", payload: "tie" });
    }
  }, [cells, userMark, opponent, dispatch, winner]);

  useEffect(() => {
    if ((isX && opponent === "X") || (!isX && opponent === "O")) {
      opponentsMove(cells, opponentPlayer);
    }
  }, [cells, isX, opponent]);

  function opponentsMove(cells, opponentPlayer) {
    if (opponentPlayer === "CPU") {
      setTimeout(() => {
        const bestMove = cpuPlayerLogic(cells);
        dispatch({ type: "onMove", payload: { idx: bestMove, isX: isX } });
      }, 1000);
    }
  }

  function cpuPlayerLogic(cells) {
    if (cells[1] === userMark && cells[2] === userMark && cells[3] === null) {
      return 3;
    } else if (
      cells[1] === userMark &&
      cells[2] === null &&
      cells[3] === userMark
    ) {
      return 2;
    } else if (
      cells[1] === null &&
      cells[2] === userMark &&
      cells[3] === userMark
    ) {
      return 1;
    } else if (
      cells[4] === userMark &&
      cells[5] === userMark &&
      cells[6] === null
    ) {
      return 6;
    } else if (
      cells[4] === userMark &&
      cells[5] === null &&
      cells[6] === userMark
    ) {
      return 5;
    } else if (
      cells[4] === null &&
      cells[5] === userMark &&
      cells[6] === userMark
    ) {
      return 4;
    } else if (
      cells[7] === userMark &&
      cells[8] === userMark &&
      cells[9] === null
    ) {
      return 9;
    } else if (
      cells[7] === userMark &&
      cells[8] === null &&
      cells[9] === userMark
    ) {
      return 8;
    } else if (
      cells[7] === null &&
      cells[8] === userMark &&
      cells[9] === userMark
    ) {
      return 7;
    } else if (
      cells[1] === userMark &&
      cells[4] === userMark &&
      cells[7] === null
    ) {
      return 7;
    } else if (
      cells[1] === userMark &&
      cells[4] === null &&
      cells[7] === userMark
    ) {
      return 4;
    } else if (
      cells[1] === null &&
      cells[4] === userMark &&
      cells[7] === userMark
    ) {
      return 1;
    } else if (
      cells[2] === userMark &&
      cells[5] === userMark &&
      cells[8] === null
    ) {
      return 8;
    } else if (
      cells[2] === userMark &&
      cells[5] === null &&
      cells[8] === userMark
    ) {
      return 5;
    } else if (
      cells[2] === null &&
      cells[5] === userMark &&
      cells[8] === userMark
    ) {
      return 2;
    } else if (
      cells[3] === userMark &&
      cells[6] === userMark &&
      cells[9] === null
    ) {
      return 9;
    } else if (
      cells[3] === userMark &&
      cells[6] === null &&
      cells[9] === userMark
    ) {
      return 6;
    } else if (
      cells[3] === null &&
      cells[6] === userMark &&
      cells[9] === userMark
    ) {
      return 3;
    } else if (
      cells[1] === userMark &&
      cells[5] === userMark &&
      cells[9] === null
    ) {
      return 9;
    } else if (
      cells[1] === userMark &&
      cells[5] === null &&
      cells[9] === userMark
    ) {
      return 5;
    } else if (
      cells[1] === null &&
      cells[5] === userMark &&
      cells[9] === userMark
    ) {
      return 1;
    } else if (
      cells[3] === userMark &&
      cells[5] === userMark &&
      cells[7] === null
    ) {
      return 7;
    } else if (
      cells[3] === userMark &&
      cells[5] === null &&
      cells[7] === userMark
    ) {
      return 5;
    } else if (
      cells[3] === null &&
      cells[5] === userMark &&
      cells[7] === userMark
    ) {
      return 3;
    } else {
      let randNum = Math.floor(Math.random() * 9) + 1;
      do {
        randNum = Math.floor(Math.random() * 9) + 1;
      } while (cells[randNum] && Object.values(cells).indexOf(null) !== -1);
      return randNum;
    }
  }

  function checkIfWin(cells, mark, dispatch) {
    const winningCombinations = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];

    winningCombinations.forEach((combination) => {
      let counter = 0;

      combination.forEach((position) => {
        if (cells[position] === mark) counter++;
        if (counter === 3) {
          dispatch({ type: "onFinishGame", payload: mark });
        }
      });
    });
  }

  return (
    <>
      <div className="game-board">
        {Array.from({ length: 9 }, (_, idx) => idx + 1).map((num) => (
          <Cell
            num={num}
            value={cells[num]}
            userMark={userMark}
            key={num}
            dispatch={dispatch}
            isX={isX}
          />
        ))}
      </div>
      {status === "finished" && (
        <FinalMessage winner={winner} userMark={userMark} dispatch={dispatch} />
      )}
    </>
  );
}

function Cell({ num, value, userMark, dispatch, isX }) {
  return (
    <div
      className={"cell cell-" + Number(num)}
      onClick={() =>
        dispatch({ type: "onMove", payload: { idx: num, isX: isX } })
      }
    >
      {value === "X" && <img src="icon-x.svg" alt="icon x" />}
      {value === "O" && <img src="icon-o.svg" alt="icon o" />}
    </div>
  );
}

function FinalMessage({ winner, userMark, dispatch }) {
  return (
    <div className="final-message">
      <div className="win-or-lose">
        {winner === userMark && "You won!"}
        {winner !== userMark && winner !== "tie" && "Oh no, you lost..."}
      </div>
      <div
        className="final-outcome"
        style={{
          color:
            winner === "X" ? "#31C3BD" : winner === "O" ? "#F2B137" : "#a8bfc9",
        }}
      >
        {winner === "X" && (
          <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
              fill="#31C3BD"
              fillRule="evenodd"
            />
          </svg>
        )}
        {winner === "O" && (
          <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
              fill="#F2B137"
            />
          </svg>
        )}
        {winner === "tie" ? "Round tied" : ` takes the round`}
      </div>
      <div className="quit-or-again">
        <button
          className="btn btn-quit"
          onClick={() => dispatch({ type: "quit" })}
        >
          Quit
        </button>
        <button
          className="btn btn-next-round"
          onClick={() => dispatch({ type: "restart" })}
        >
          Next round
        </button>
      </div>
    </div>
  );
}

function Stats({ userMark, points, opponentPlayer }) {
  return (
    <>
      <div className="user">
        <div>
          <span className="x-mark">X</span>
          <span>
            {" "}
            (
            {userMark === "X"
              ? opponentPlayer === "CPU"
                ? "You"
                : "p1"
              : opponentPlayer === "CPU"
              ? "CPU"
              : "p2"}
            )
          </span>
        </div>
        <div className="score x-score">{points.X}</div>
      </div>
      <div className="ties">
        <span>Ties</span>
        <div className="score ties-score">{points.tie}</div>
      </div>
      <div className="opponent">
        <div>
          <span className="o-mark">O</span>
          <span>
            {" "}
            (
            {userMark === "O"
              ? opponentPlayer === "CPU"
                ? "You"
                : "p1"
              : opponentPlayer === "CPU"
              ? "CPU"
              : "p2"}
            )
          </span>
        </div>
        <div className="score o-score">{points.O}</div>
      </div>
    </>
  );
}
