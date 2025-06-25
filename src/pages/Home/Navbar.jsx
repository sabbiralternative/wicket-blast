import { useSelector } from "react-redux";
import { useAuth } from "../../hooks/auth";
import { useEffect } from "react";
import { useSound } from "../../context/ApiProvider";
const Navbar = () => {
  const { sound, setSound } = useSound();
  const { token, balance } = useSelector((state) => state.auth);
  const { mutate: handleAuth } = useAuth();

  useEffect(() => {
    if (token) {
      handleAuth();
    }
  }, [token, handleAuth]);

  const handleSoundToggle = () => {
    if (sound) {
      sessionStorage.removeItem("sound");
      setSound(false);
    } else {
      sessionStorage.setItem("sound", true);
      setSound(true);
    }
  };
  return (
    <>
      <div
        id="ModuleLayoutDiv"
        style={{
          position: "fixed",
          zIndex: 1000,
          left: "0px",
          top: "0px",
          width: "100%",
          height: "40px",
          background:
            "linear-gradient(rgba(34, 34, 34, 0.5) 0%, rgba(34, 34, 34, 0) 100%)",
        }}
      />
      {/* <div className="demo--Ig8fs">
        <div className="demoIcon--ozzEI" />
        <div>Demo Mode</div>
      </div> */}
      <div
        data-track="balance"
        className="balance--Kjiqa"
        style={{ position: "fixed", zIndex: 1000, left: "8px", top: "8px" }}
      >
        <div className="balanceTitle--JnSFJ">Balance:</div>
        <i className="fm-iconFont fm-iconFont-ios-creditcard"></i>
        <span className="balanceSum--_ab3Z">{balance}</span>
      </div>
      <div
        className="name--TP6Ls"
        style={{ position: "fixed", zIndex: 1000, left: "8px", bottom: "0px" }}
      >
        Turbo Games • Wicket Blast
      </div>
      <div
        style={{ position: "fixed", zIndex: 1000, right: "8px", bottom: "0px" }}
      >
        <div className="time--tHxDp">24 Jun, 2025 | 12:45:39</div>
      </div>
      <div
        style={{
          position: "fixed",
          zIndex: 1000,
          right: "0px",
          top: "68px",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          zIndex: 1000,
          right: "8px",
          top: "8px",
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
        }}
      >
        <div data-track="settings" className="icon--k9yLr">
          <i className="fm-iconFont fm-iconFont-ios-nav"></i>
        </div>
        <div
          onClick={handleSoundToggle}
          className="icon--k9yLr"
          style={{ marginRight: "8px" }}
        >
          {sound ? (
            <i className="fm-iconFont fm-iconFont-ios-music-off"></i>
          ) : (
            <i className="fm-iconFont fm-iconFont-ios-music-on"></i>
          )}
        </div>
        {/* <div
          data-track="universe"
          className="icon--k9yLr"
          style={{ marginRight: "8px" }}
        >
          <span className="iconActiveIndicator--CMTO4" />
          <div className="iconTurboUniverse--Of1Ih" />
        </div> */}
      </div>
    </>
  );
};

export default Navbar;
