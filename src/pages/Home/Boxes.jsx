import { useState } from "react";

const Boxes = ({
  boxGrid,
  activeTurbo,
  boxData,
  isBetPlaced,
  setBoxData,
  setIsBetPlaced,
}) => {
  const [loadingBoxId, setLoadingBoxId] = useState(null);
  const handleBoxClick = async (box) => {
    if (isBetPlaced) {
      setLoadingBoxId(box.id);
      setTimeout(() => {
        setLoadingBoxId(null);
        if (box.mine) {
          const updatedBoxes = boxData?.map((boxObj) => ({
            ...boxObj,
            roundEnd: true,
            win: boxObj?.mine ? false : true,
          }));
          setBoxData(updatedBoxes);
          setIsBetPlaced(false);
        } else {
          const updatedBoxes = boxData?.map((boxObj) =>
            box?.id === boxObj.id
              ? {
                  ...boxObj,
                  win: true,
                }
              : boxObj
          );
          setBoxData(updatedBoxes);
        }
      }, 200);
    }
  };
  return (
    <div className="game__inner">
      <div className="game__box">
        <div className={`game__grid _${boxGrid}x${boxGrid}`}>
          {boxData.map((box, i) => {
            return (
              <div
                onClick={() => handleBoxClick(box)}
                key={i}
                className={` game-item 
                  ${activeTurbo ? "_turbo" : ""} 
                  ${box?.win ? "game-item-win _blue" : " "}
                ${isBetPlaced ? "" : "_disabled"} 
                ${box?.mine && box?.roundEnd ? "game-item-lose" : ""}  ${
                  loadingBoxId === box.id ? "_loading" : ""
                }`}
              >
                {!box.win && !box?.roundEnd && (
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
