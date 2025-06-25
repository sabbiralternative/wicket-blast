import { useEffect, useState } from "react";
import "./Home.css";
import "./Font.css";
import Navbar from "./Navbar";
import Settings from "./Settings";
import Boxes from "./Boxes";
import GameHistory from "./GameHistory";
import { useOrderMutation } from "../../redux/features/events/events";
import { generateRoundId } from "../../utils/generateRoundId";
import toast from "react-hot-toast";

const wicketData = {
  3: [2, 3, 5, 7],
  5: [3, 5, 7, 10],
  7: [5, 7, 10, 12],
  9: [10, 12, 15, 20],
};

const boxes = {
  3: 9,
  5: 20,
  7: 49,
  9: 81,
};

const Home = () => {
  const [showWinModal, setShowWinModal] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const [activeTurbo, setActiveTurbo] = useState(false);
  const [boxGrid, setBoxGrid] = useState(3);
  const [addOrder] = useOrderMutation();
  const [isBetPlaced, setIsBetPlaced] = useState(false);
  const [wicket, setWicket] = useState(wicketData?.[boxGrid]?.[0]);
  const [betAmount, setBetAmount] = useState(100);
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
  const initialBoxData = Array.from({ length: boxes[boxGrid] }, (_, i) => ({
    name: `box${i + 1}`,
    id: i + 1,
    mine: (i + 1) % boxGrid === 0,
    win: false,
    roundEnd: false,
  }));
  const [boxData, setBoxData] = useState(initialBoxData);
  const isSingleBoxWin = boxData?.some((box) => box.win);

  const handlePlaceBet = async () => {
    if (betAmount) {
      const round_id = generateRoundId();
      sessionStorage.removeItem("round_id");
      sessionStorage.setItem("round_id", round_id);

      const payload = [
        {
          eventId: 20004,
          eventName: "Wicket Blast",
          isback: 0,
          stake: betAmount,
          type: "bet",
          round_id,
        },
      ];

      const res = await addOrder(payload).unwrap();
      setBoxData(initialBoxData);
      if (res?.success) {
        setIsBetPlaced(true);
        setTimeout(() => {
          let recentResult = [];
          const recentStoredResult = localStorage.getItem("recentResult");
          if (recentStoredResult) {
            recentResult = JSON.parse(recentStoredResult);
          }
          //push
          localStorage.setItem("recentResult", JSON.stringify(recentResult));
        }, 500);
      } else {
        setIsBetPlaced(true);
        toast.error(res?.Message);
      }
    } else {
      toast.error("Amount is required");
    }
  };

  useEffect(() => {
    setWicket(wicketData?.[boxGrid]?.[0]);
    setBoxData(initialBoxData);
  }, [boxGrid]);

  useEffect(() => {
    const handleResize = () => {
      setDeviceWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleChangeBetAmount = (type) => {
    if (type === "minus") {
      if (betAmount > 0 && betAmount <= 100) {
        setBetAmount((prev) => Math.max(prev - 10, 0));
      } else if (betAmount > 100 && betAmount <= 1000) {
        setBetAmount((prev) => Math.max(prev - 100, 0));
      } else if (betAmount > 1000) {
        setBetAmount((prev) => Math.max(prev - 500, 0));
      }
    }
    if (type === "plus") {
      if (betAmount >= 0 && betAmount < 100) {
        setBetAmount((prev) => prev + 10);
      } else if (betAmount >= 100 && betAmount < 1000) {
        setBetAmount((prev) => prev + 100);
      } else if (betAmount >= 1000) {
        setBetAmount((prev) => prev + 500);
      }
    }
  };

  const handleCashOut = async () => {
    const findBoxAndChange = boxData?.map((boxObj) => ({
      ...boxObj,
      win: boxObj?.mine ? false : true,
      roundEnd: true,
    }));

    setBoxData(findBoxAndChange);
    setIsBetPlaced(false);

    setTimeout(() => {
      setShowWinModal(true);
    }, 100);

    setTimeout(() => {
      setShowWinModal(false);
    }, 2000);

    setTimeout(() => {
      setBoxData(initialBoxData);
    }, 3000);
  };

  return (
    <div id="app">
      {showSetting && (
        <Settings
          handleChangeBetAmount={handleChangeBetAmount}
          betAmount={betAmount}
          setBetAmount={setBetAmount}
          setWicket={setWicket}
          wicket={wicket}
          wicketData={wicketData}
          boxGrid={boxGrid}
          setBoxGrid={setBoxGrid}
          setShowSetting={setShowSetting}
        />
      )}
      <Navbar />
      <div id="observeElementTree" className="wrap">
        <div className="bg" />
        <div className="inner" style={{ width: `${deviceWidth}px` }}>
          <div className="header">
            <div className="header__logo" />
            <div className="header__history">
              <div className="header-stat">
                <div className="header-stat__inner">
                  <div className="header-stat__item">
                    <div className="header-stat__icon">
                      <i className="fm-iconFont fm-iconFont-plates"></i>
                    </div>
                    <div className="header-stat__value">
                      {boxGrid}x{boxGrid}
                    </div>
                  </div>
                  <div className="header-stat__item">
                    <div className="header-stat__icon _font14">
                      <i className="fm-iconFont fm-iconFont-union" />
                    </div>
                    <div className="header-stat__value">{wicket}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="game">
            <Boxes
              isBetPlaced={isBetPlaced}
              setIsBetPlaced={setIsBetPlaced}
              setBoxData={setBoxData}
              boxData={boxData}
              boxGrid={boxGrid}
              activeTurbo={activeTurbo}
            />
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
                      <div
                        onClick={() => setBetAmount(10)}
                        className="amount-btns__left"
                      >
                        min
                      </div>
                      <div
                        onClick={() => handleChangeBetAmount("minus")}
                        className="amount-btns__right _font20 _pr1 _pb1"
                      >
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
                      value={betAmount}
                    />
                  </div>
                  <div className="amount-btns _right">
                    <div className="amount-btns__inner">
                      <div
                        onClick={() => handleChangeBetAmount("plus")}
                        className="amount-btns__left _font20 _pl1"
                      >
                        +
                      </div>
                      <div
                        onClick={() => setBetAmount(10000)}
                        className="amount-btns__right"
                      >
                        max
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`control-portrait__toggle  ${
                isBetPlaced ? "pointer-events-none" : ""
              }`}
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

            {isBetPlaced ? (
              <div
                onClick={handleCashOut}
                className={`control-portrait__button ${
                  isSingleBoxWin ? "" : "pointer-events-none opacity-50"
                }`}
              >
                <div className="control-portrait-button _blue">
                  <div className="control-portrait-button__inner">
                    <div className="control-portrait-button__content">
                      <span className="control-portrait-button__text">
                        Cash Out
                      </span>
                      <span className="control-portrait-button__sum">
                        {betAmount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="control-portrait__button"
                onClick={handlePlaceBet}
              >
                <div className="control-portrait-button _orange">
                  <div className="control-portrait-button__inner">
                    <div className="control-portrait-button__content">
                      <span className="control-portrait-button__text">
                        Start Game
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div
              onClick={() => setShowSetting(true)}
              className={`control-portrait__setting ${
                isBetPlaced ? "pointer-events-none" : ""
              }`}
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
      {showWinModal && (
        <div className="win _blue">
          <div className="win__inner">
            <div className="win__content">
              <div className="win__img"></div>
              <div className="win__amount">{betAmount}</div>
              <div className="win__amount-shadow">{betAmount}</div>
              <div className="win__coef">x1.06</div>
              <div className="win__coef-shadow">x1.06</div>
              <div className="win__text">Multiplier</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
