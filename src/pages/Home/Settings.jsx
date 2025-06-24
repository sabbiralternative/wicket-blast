import { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import useCloseModalClickOutside from "../../hooks/closeModal";

const wicketData = {
  3: [2, 3, 5, 7],
  5: [3, 5, 7, 10],
  7: [5, 7, 10, 12],
  9: [10, 12, 15, 20],
};

const Settings = ({ setShowSetting, setBoxGrid, boxGrid }) => {
  const ref = useRef();
  useCloseModalClickOutside(ref, () => {
    setShowSetting(false);
  });

  const [wicket, setWicket] = useState(wicketData?.[boxGrid]?.[0]);
  const [betAmount, setBetAmount] = useState(0.1);

  useEffect(() => {
    setWicket(wicketData?.[boxGrid]?.[0]);
  }, [boxGrid]);

  const handleDecreaseWicket = (type) => {
    if (type === "minus") {
      if (wicket === 1) {
        return;
      } else {
        setWicket((prev) => prev - 1);
      }
    } else {
      setWicket((prev) => prev + 1);
    }
  };

  const handleDecreaseBetAmount = () => {
    if (betAmount > 1) {
      setBetAmount((prev) => prev - 1);
    } else if (betAmount > 0.1) {
      setBetAmount((prev) => Math.max((prev - 0.1).toFixed(1), 0.1));
    }
  };

  const handleIncreaseBetAmount = () => {
    if (betAmount >= 1) {
      setBetAmount((prev) => prev + 1);
    } else {
      setBetAmount((prev) => Math.min(parseFloat((prev + 0.1).toFixed(1)), 1));
    }
  };

  return (
    <div className="control-portrait-modal">
      <div className="control-portrait-modal__inner" ref={ref}>
        <div className="control-portrait-modal__content">
          <div className="control-portrait-modal__close">
            <IoIosClose
              onClick={() => setShowSetting(false)}
              className="text-white "
            />
          </div>
          <div className="control-portrait-modal__title">Grid</div>
          <div className="control-portrait-modal__box">
            <div
              onClick={() => setBoxGrid(3)}
              className={`control-portrait-modal-btn ${
                boxGrid === 3 ? "_disabled" : ""
              }`}
            >
              <div className="control-portrait-modal-btn__inner">3x3</div>
            </div>
            <div
              onClick={() => setBoxGrid(5)}
              className={`control-portrait-modal-btn ${
                boxGrid === 5 ? "_disabled" : ""
              }`}
            >
              <div className="control-portrait-modal-btn__inner">5x5</div>
            </div>
            <div
              onClick={() => setBoxGrid(7)}
              className={`control-portrait-modal-btn ${
                boxGrid === 7 ? "_disabled" : ""
              }`}
            >
              <div className="control-portrait-modal-btn__inner">7x7</div>
            </div>
            <div
              onClick={() => setBoxGrid(9)}
              className={`control-portrait-modal-btn ${
                boxGrid === 9 ? "_disabled" : ""
              }`}
            >
              <div className="control-portrait-modal-btn__inner">9x9</div>
            </div>
          </div>
          <div className="control-portrait-modal__title">Wickets</div>
          <div className="control-portrait-modal__box">
            <div className="control-portrait-modal-btn-group">
              <div className="control-portrait-modal-btn-group__inner">
                {wicketData?.[boxGrid]?.map((item) => {
                  return (
                    <div
                      onClick={() => setWicket(item)}
                      key={item}
                      className="control-portrait-modal-btn-group__btn"
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="control-portrait-modal-input">
              <label
                htmlFor="b450b082-cae7-408a-babe-925fb7ad99ba"
                className="control-portrait-modal-input__label"
              />
              <div
                onClick={() => handleDecreaseWicket("minus")}
                className="control-portrait-modal-btn"
              >
                <div className="control-portrait-modal-btn__inner _font20 _pb1">
                  -
                </div>
              </div>
              <input
                id="b450b082-cae7-408a-babe-925fb7ad99ba"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                spellCheck="false"
                tabIndex={-1}
                value={wicket}
                className="control-portrait-modal-input__input"
              />
              <div
                onClick={() => handleDecreaseWicket("plus")}
                className="control-portrait-modal-btn"
              >
                <div className="control-portrait-modal-btn__inner _font20">
                  +
                </div>
              </div>
            </div>
          </div>
          <div className="control-portrait-modal__title">
            Bet Amount
            <div className="icon-alert _ml5">
              <div className="icon-alert__content">
                <div className="tooltip">
                  <div className="tooltip__inner">
                    <div className="tooltip__icon">
                      <i className="fm-iconFont fm-iconFont-info-sm" />
                    </div>
                    <div className="tooltip__content">Max Profit $10000</div>
                  </div>
                </div>
              </div>
              <div className="icon-alert__icon">
                <i className="fm-iconFont fm-iconFont-info-sm" />
              </div>
            </div>
          </div>
          <div className="control-portrait-modal__box _gap-y-0">
            <div className="control-portrait-modal-input">
              <label
                htmlFor="abc7ed2b-26b1-4a1d-9952-cbffb4a8e124"
                className="control-portrait-modal-input__label"
              />

              <input
                id="abc7ed2b-26b1-4a1d-9952-cbffb4a8e124"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                spellCheck="false"
                value={betAmount}
                className="control-portrait-modal-input__input"
              />
            </div>
            <div
              onClick={() => setBetAmount(0.1)}
              className="control-portrait-modal-btn"
            >
              <div className="control-portrait-modal-btn__inner">min</div>
            </div>
            <div className="control-portrait-modal-btn-group _w100">
              <div className="control-portrait-modal-btn-group__inner">
                <div
                  onClick={handleDecreaseBetAmount}
                  className="control-portrait-modal-btn-group__btn _font20 _pl1"
                >
                  -
                </div>
                <div
                  onClick={handleIncreaseBetAmount}
                  className="control-portrait-modal-btn-group__btn _font20"
                >
                  +
                </div>
              </div>
            </div>
            <div
              onClick={() => setBetAmount(100)}
              className="control-portrait-modal-btn"
            >
              <div className="control-portrait-modal-btn__inner">max</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
