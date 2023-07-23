import { useReducer } from "react";
import NewGame from "./components/new-game-menu/NewGame";
import PlayGame from "./components/play-game/PlayGame";

const initialState = {
  status: "start",
  points: {
    X: 0,
    O: 0,
    T: 0,
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
};

function reducer(state, action) {
  switch (action.type) {
    case "updateMark":
      return {
        ...state,
        userMark: action.payload,
        opponent: action.payload === "X" ? "O" : "X",
      };
    case "startGame":
      return { ...state, opponent: action.payload, status: "active" };
    case "onMove":
      const player = action.payload.isX;
      let current;
      if (player) {
        current = "X";
      } else {
        current = "O";
      }
      if (state.cells[action.payload.idx] || state.winner) return;
      return {
        ...state,
        cells: state.cells.map((cell, index) =>
          index === action.payload.idx ? current : cell
        ),
        isX: !state.isX,
      };
    case "onFinishGame":
      return { ...state, winner: action.payload, status: "finished" };
    default:
      throw new Error("Invalid action");
  }
}

export default function App() {
  const [{ status, points, userMark, isX, winner, opponent, cells }, dispatch] =
    useReducer(reducer, initialState);

  return (
    <>
      {status === "start" && (
        <NewGame userMark={userMark} dispatch={dispatch} />
      )}
      {status === "active" && (
        <PlayGame
          userMark={userMark}
          points={points}
          isX={isX}
          winner={winner}
          status={status}
          cells={cells}
          opponent={opponent}
          dispatch={dispatch}
        />
      )}
    </>
  );
}
