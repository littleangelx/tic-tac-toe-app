import { useReducer } from "react";
import NewGame from "./components/new-game-menu/NewGame";
import PlayGame from "./components/play-game/PlayGame";

const initialState = {
  status: "start",
  points: {
    X: 0,
    O: 0,
    tie: 0,
  },
  userMark: "X",
  isX: true,
  winner: null,
  opponent: null,
  cells: {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
  },
  opponentPlayer: "CPU",
};

function reducer(state, action) {
  switch (action.type) {
    case "updateMark":
      return {
        ...state,
        userMark: action.payload,
      };
    case "startGame":
      return { ...state, opponentPlayer: action.payload, status: "active" };
    case "onMove":
      const { idx, isX } = action.payload;
      let current;
      if (isX) {
        current = "X";
      } else {
        current = "O";
      }
      if (state.cells[idx] || state.winner) return { ...state };
      const newCells = { ...state.cells, [idx]: current };
      return { ...state, cells: newCells, isX: !isX };
    case "onFinishGame":
      const { winner, increase } = action.payload;
      // const currentWinnerPoints = Number(state.points[winnerofGame]);
      // const newWinnerPoints = currentWinnerPoints + 1;
      return {
        ...state,
        winner: winner,
        status: "finished",
        points: { ...state.points, [winner]: state.points[winner] + increase },
      };
    case "restart":
      console.log(state.countCompletedGames);
      return {
        ...state,
        cells: initialState.cells,
        status: "active",
        winner: null,
        isX: state.countCompletedGames % 2 === 0 ? true : false,
      };
    case "quit":
      return { ...initialState };
    default:
      throw new Error("Invalid action");
  }
}

export default function App() {
  const [
    { status, points, userMark, isX, winner, opponent, cells, opponentPlayer },
    dispatch,
  ] = useReducer(reducer, initialState);

  const countCompletedGames = Object.values(points).reduce((cur, acc) => {
    return cur + acc;
  }, 0);

  console.log(countCompletedGames);

  return (
    <>
      {status === "start" && (
        <NewGame userMark={userMark} dispatch={dispatch} />
      )}
      {(status === "active" || status === "finished") && (
        <PlayGame
          userMark={userMark}
          points={points}
          isX={isX}
          winner={winner}
          status={status}
          cells={cells}
          opponent={opponent}
          opponentPlayer={opponentPlayer}
          dispatch={dispatch}
        />
      )}
    </>
  );
}
