import { useRef } from "react";
import useCloseModalClickOutside from "../../hooks/closeModal";

const Settings = ({
  setShowSetting,
  setBoxGrid,
  boxGrid,
  wicket,
  setWicket,
  betAmount,
  setBetAmount,
  wicketData,
  handleChangeBetAmount,
}) => {
  const ref = useRef();
  useCloseModalClickOutside(ref, () => {
    setShowSetting(false);
  });

  const handleDecreaseWicket = (type) => {
    const maxWicket = boxGrid * boxGrid - 1;

    if (type === "minus") {
      if (wicket === 1) {
        return;
      } else {
        setWicket((prev) => prev - 1);
      }
    } else {
      if (wicket === maxWicket) {
        return;
      } else {
        setWicket((prev) => prev + 1);
      }
    }
  };

  return (
    <div className="control-portrait-modal">
      <div className="control-portrait-modal__inner" ref={ref}>
        <div className="control-portrait-modal__content">
          <div className="control-portrait-modal__close">
            <i
              onClick={() => setShowSetting(false)}
              className="fm-iconFont fm-iconFont-close"
            ></i>
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
              onClick={() => setBetAmount(10)}
              className="control-portrait-modal-btn"
            >
              <div className="control-portrait-modal-btn__inner">min</div>
            </div>
            <div className="control-portrait-modal-btn-group _w100">
              <div className="control-portrait-modal-btn-group__inner">
                <div
                  onClick={() => handleChangeBetAmount("minus")}
                  className="control-portrait-modal-btn-group__btn _font20 _pl1"
                >
                  -
                </div>
                <div
                  onClick={() => handleChangeBetAmount("plus")}
                  className="control-portrait-modal-btn-group__btn _font20"
                >
                  +
                </div>
              </div>
            </div>
            <div
              onClick={() => setBetAmount(10000)}
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
