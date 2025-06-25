import { useState } from "react";
import { useSound } from "../../context/ApiProvider";
import {
  playWhoopSound,
  playWicketSound,
  playWinSound,
} from "../../utils/sound";

const Boxes = ({
  boxGrid,
  activeTurbo,
  boxData,
  isBetPlaced,
  setBoxData,
  setIsBetPlaced,
}) => {
  const { sound } = useSound();
  const [loadingBoxId, setLoadingBoxId] = useState(null);
  const handleBoxClick = async (box) => {
    if (isBetPlaced) {
      setLoadingBoxId(box.id);
      if (sound) {
        playWhoopSound();
      }
      setTimeout(() => {
        setLoadingBoxId(null);
        if (box.mine) {
          if (sound) {
            playWicketSound();
          }

          const updatedBoxes = boxData?.map((boxObj) => ({
            ...boxObj,
            roundEnd: true,
            win: boxObj?.mine ? false : boxObj.win,
            showBox: boxObj.mine ? false : boxObj.win ? false : true,
          }));
          setBoxData(updatedBoxes);
          setIsBetPlaced(false);
        } else {
          if (sound) {
            playWinSound();
          }
          const updatedBoxes = boxData?.map((boxObj) =>
            box?.id === boxObj.id
              ? {
                  ...boxObj,
                  win: true,
                  showBox: false,
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
                {box.showBox ? (
                  <>
                    <div className="game-item__inner">
                      <div className="game-item__sum">$1.08</div>
                    </div>
                    <div className="game-item__shadow" />
                  </>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Boxes;
