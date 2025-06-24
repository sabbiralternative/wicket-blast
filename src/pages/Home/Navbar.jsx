import { MdCreditCard } from "react-icons/md";
import { AiOutlineMenuFold } from "react-icons/ai";
import { FaMicrophone } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useAuth } from "../../hooks/auth";
import { useEffect } from "react";
const Navbar = () => {
  const { token, balance } = useSelector((state) => state.auth);
  const { mutate: handleAuth } = useAuth();

  useEffect(() => {
    if (token) {
      handleAuth();
    }
  }, [token, handleAuth]);
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
      <div className="demo--Ig8fs">
        <div className="demoIcon--ozzEI" />
        <div>Demo Mode</div>
      </div>
      <div
        data-track="balance"
        className="balance--Kjiqa"
        style={{ position: "fixed", zIndex: 1000, left: "8px", top: "8px" }}
      >
        <div className="balanceTitle--JnSFJ">Balance:</div>
        <MdCreditCard className="mr-2" />
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
          <AiOutlineMenuFold />
        </div>
        <div className="icon--k9yLr" style={{ marginRight: "8px" }}>
          <FaMicrophone />
        </div>
        <div
          data-track="universe"
          className="icon--k9yLr"
          style={{ marginRight: "8px" }}
        >
          <span className="iconActiveIndicator--CMTO4" />
          <div className="iconTurboUniverse--Of1Ih" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
