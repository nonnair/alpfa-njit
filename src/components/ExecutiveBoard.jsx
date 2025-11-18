import '../styles/ExecutiveBoard.css'

function ExecutiveBoard() {
  return (
    <section id="executive-board">
      <div className="executive-container">
        <h2 className="section-title">Executive Board</h2>
        <div className="board-grid">
          <div className="board-member">
            <img src="img/board1.jpg" alt="President" />
            <h3>Example Text</h3>
            <p>President</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExecutiveBoard;