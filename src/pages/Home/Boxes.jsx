const Boxes = ({ boxGrid, activeTurbo }) => {
  const boxes = {
    3: 9,
    5: 20,
    7: 49,
    9: 81,
  };

  const boxArray = Array.from({ length: boxes[boxGrid] }, (_, i) => ({
    name: `box${i + 1}`,
    clickable: false,
    id: i + 1,
    win: false,
    roundEnd: false,
  }));

  return (
    <div className="game__inner">
      <div className="game__box">
        <div className={`game__grid _${boxGrid}x${boxGrid}`}>
          {boxArray.map((box) => {
            return (
              <div
                key={box}
                className={` game-item ${
                  activeTurbo ? "_turbo" : "_disabled"
                } ${box?.win ? "game-item-win _blue" : ""}`}
              >
                {!box.win && (
                  <>
                    <div className="game-item__inner">
                      <div className="game-item__sum">$1.08</div>
                    </div>
                    <div className="game-item__shadow" />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Boxes;
