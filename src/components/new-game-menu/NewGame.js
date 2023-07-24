import "./NewGame.css";

export default function NewGame({ userMark, dispatch }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6 col-lg-4 main-section">
          <div className="logo">
            <img src="logo.svg" alt="logo" />
          </div>
          <div className="inner-container">
            <h1>Pick player 1's mark</h1>
            <div className="choose-mark">
              <button
                className={"btn choose-x " + (userMark === "X" ? "active" : "")}
                onClick={() => dispatch({ type: "updateMark", payload: "X" })}
              >
                {userMark === "X" ? (
                  <img src="choose-x-active.svg" alt="x-icon" />
                ) : (
                  <img src="choose-x-inactive.svg" alt="x-icon" />
                )}
              </button>
              <button
                className={"btn choose-o " + (userMark === "O" ? "active" : "")}
                onClick={() => dispatch({ type: "updateMark", payload: "O" })}
              >
                {userMark === "O" ? (
                  <img src="choose-o-active.svg" alt="o-icon" />
                ) : (
                  <img src="choose-o-inactive.svg" alt="o-icon" />
                )}
              </button>
            </div>
            <p>Remember: x goes first</p>
          </div>
          <div className="new-game-buttons">
            <button
              className="btn choose-cpu"
              onClick={() => dispatch({ type: "startGame", payload: "CPU" })}
            >
              New game (vs CPU)
            </button>
            <button
              className="btn choose-multi"
              onClick={() => dispatch({ type: "startGame", payload: "multi" })}
            >
              New game (vs player)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
