import { useState } from "react";
import "./Home.css";
import Navbar from "./Navbar";
import Settings from "./Settings";
import { LiaTableSolid } from "react-icons/lia";
import Boxes from "./Boxes";
import GameHistory from "./GameHistory";
import { useOrderMutation } from "../../redux/features/events/events";
import { generateRoundId } from "../../utils/generateRoundId";

const Home = () => {
  const [showSetting, setShowSetting] = useState(false);
  const [activeTurbo, setActiveTurbo] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [boxGrid, setBoxGrid] = useState(3);
  const [addOrder] = useOrderMutation();

  //   const handlePlaceBet = async () => {
  //   if (stake) {

  //     setBoxes(() => {
  //       return boxArray;
  //     });
  //     setSelectLevelData(() => {
  //       return data;
  //     });
  //     const round_id = generateRoundId();
  //     sessionStorage.removeItem("round_id");
  //     sessionStorage.setItem("round_id", round_id);

  //     const payload = [
  //       {
  //         eventId: 20004,
  //         eventName: "Tower Legend",
  //         isback: 0,
  //         stake,
  //         type: "bet",
  //         round_id,
  //       },
  //     ];

  //     const res = await addOrder(payload).unwrap();
  //     // console.log(res);
  //     if (res?.success) {
  //       setDisableCashOutRandom(false);
  //       setIsBetPlaced(true);
  //       setTimeout(() => {
  //         let recentResult = [];
  //         const recentStoredResult = localStorage.getItem("recentResult");
  //         if (recentStoredResult) {
  //           recentResult = JSON.parse(recentStoredResult);
  //         }
  //         //push
  //         localStorage.setItem("recentResult", JSON.stringify(recentResult));
  //       }, 500);
  //     } else {
  //       const firstNonBorderObj = data.find(
  //         (item) => item.border === false && item.isSelected === false
  //       );

  //       const addBorderToLevelData = data.map((item) => ({
  //         ...item,
  //         border: firstNonBorderObj.id === item.id ? true : item.border,
  //         isSelected: firstNonBorderObj.id === item.id ? true : item.border,
  //       }));
  //       setSelectLevelData(addBorderToLevelData);

  //       setBoxes((prevBoxes) => {
  //         const updatedBoxes = [...prevBoxes]; // copy of state
  //         const falseIndexes = [];

  //         // Find all indexes where clickable === false
  //         for (let i = updatedBoxes.length - 1; i >= 0; i--) {
  //           if (!updatedBoxes[i].clickable && !updatedBoxes[i].isSelected) {
  //             falseIndexes.push(i);
  //           }
  //         }

  //         // If at least 3 non-clickable items exist
  //         if (falseIndexes.length >= clickableBoxForLevel[selectLevel]) {
  //           // Take the *last* 3 (from the end of the array, i.e. the first 3 in falseIndexes array)
  //           const indexesToUpdate = falseIndexes.slice(
  //             0,
  //             clickableBoxForLevel[selectLevel]
  //           );

  //           indexesToUpdate.forEach((i) => {
  //             updatedBoxes[i] = {
  //               ...updatedBoxes[i],
  //               clickable: true, // or any other modification
  //             };
  //           });
  //         }

  //         return updatedBoxes;
  //       });
  //       setDisableCashOutRandom(false);
  //       setIsBetPlaced(true);
  //       toast.error(res?.Message);
  //     }
  //   } else {
  //     toast.error("Amount is required");
  //   }
  // };
  return (
    <div id="app">
      {showSetting && (
        <Settings
          boxGrid={boxGrid}
          setBoxGrid={setBoxGrid}
          setShowSetting={setShowSetting}
        />
      )}
      <Navbar />
      <div id="observeElementTree" className="wrap">
        <div className="bg" />
        <div className="inner" style={{ width: "300px" }}>
          <div className="header">
            <div className="header__logo" />
            <div className="header__history">
              <div className="header-stat">
                <div className="header-stat__inner">
                  <div className="header-stat__item">
                    <div className="header-stat__icon">
                      <LiaTableSolid />
                    </div>
                    <div className="header-stat__value">5x5</div>
                  </div>
                  <div className="header-stat__item">
                    <div className="header-stat__icon _font14">
                      <i className="fm-iconFont fm-iconFont-union" />
                    </div>
                    <div className="header-stat__value">3</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="game">
            <Boxes boxGrid={boxGrid} activeTurbo={activeTurbo} />
            <GameHistory />
          </div>
          <div className="control-portrait">
            <div className="control-portrait__amount">
              <div className="amount-portrait">
                <div className="amount-portrait__inner">
                  <div className="amount-portrait__title">
                    Bet Amount
                    <div className="icon-alert _ml5">
                      <div className="icon-alert__content">
                        <div className="tooltip">
                          <div className="tooltip__inner">
                            <div className="tooltip__icon">
                              <i className="fm-iconFont fm-iconFont-info-sm" />
                            </div>
                            <div className="tooltip__content">
                              Max Profit $10000
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="icon-alert__icon">
                        <i className="fm-iconFont fm-iconFont-info-sm" />
                      </div>
                    </div>
                  </div>
                  <label
                    htmlFor="86686389-9295-47a9-b831-05e7a754b169"
                    className="amount-portrait__label"
                  />
                  <div className="amount-btns">
                    <div className="amount-btns__inner">
                      <div className="amount-btns__left">min</div>
                      <div className="amount-btns__right _font20 _pr1 _pb1">
                        -
                      </div>
                    </div>
                  </div>
                  <div className="amount-portrait__input">
                    <input
                      id="86686389-9295-47a9-b831-05e7a754b169"
                      type="text"
                      inputMode="decimal"
                      autoComplete="off"
                      spellCheck="false"
                      tabIndex={-1}
                    />
                  </div>
                  <div className="amount-btns _right">
                    <div className="amount-btns__inner">
                      <div className="amount-btns__left _font20 _pl1">+</div>
                      <div className="amount-btns__right">max</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="control-portrait__toggle "
              onClick={() => setActiveTurbo((prev) => !prev)}
            >
              <div
                className={`control-portrait-toggle ${
                  activeTurbo ? "_active" : ""
                }`}
              >
                <div className="control-portrait-toggle__inner">
                  <div className="control-portrait-toggle__title">Turbo</div>
                  <div className="control-portrait-toggle__btn" />
                </div>
              </div>
            </div>
            <div
              className="control-portrait__button"
              onClick={() => setStartGame((prev) => !prev)}
            >
              {startGame ? (
                <div className="control-portrait-button _black">
                  <div className="control-portrait-button__inner">
                    <div className="control-portrait-button__content">
                      <span className="control-portrait-button__text">
                        Cancel
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="control-portrait-button _orange">
                  <div className="control-portrait-button__inner">
                    <div className="control-portrait-button__content">
                      <span className="control-portrait-button__text">
                        Start Game
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div
              onClick={() => setShowSetting(true)}
              className="control-portrait__setting"
            >
              <div className="control-portrait-setting">
                <div className="control-portrait-setting__inner">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
