import { useEffect, useState } from "react";

export function Toast({
  title = "",
  message = "",
  show,
  onClose,
  type = "info", 
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 300);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);


  const theme = {
    success: {
      border: "#38A169",
      accent: "#38A169",
    },
    error: {
      border: "#E53E3E",
      accent: "#E53E3E",
    },
    info: {
      border: "#2B6CB0",
      accent: "#2B6CB0",
    },
  };

  const current = theme[type] || theme.info;

  return (
    <div
  style={{
    position: "fixed",
    top: "20px",
    right: "20px",
    minWidth: "280px",
    maxWidth: "350px",
    backgroundColor: "white",
    color: "black",
    padding: "14px 16px",
    borderRadius: "12px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
    borderLeft: `5px solid ${current.border}`,
    fontFamily: "sans-serif",
    zIndex: 9999,

  
    pointerEvents: visible ? "auto" : "none",

    // Animation
    opacity: visible ? 1 : 0,
    transform: visible
      ? "translateY(0px)"
      : "translateY(-20px)",
    transition: "all 0.35s ease",
  }}
>
    
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <strong style={{ fontSize: "14px" }}>{title}</strong>

       
        <span
          onClick={() => {
            setVisible(false);
            setTimeout(onClose, 300);
          }}
          style={{
            cursor: "pointer",
            fontWeight: "bold",
            color: "gray",
          }}
        >
          ×
        </span>
      </div>

     
      <div style={{ marginTop: "6px", fontSize: "13px", color: "#444" }}>
        {message}
      </div>

      
      <div
        style={{
          marginTop: "10px",
          height: "3px",
          width: "100%",
          backgroundColor: "#eee",
          borderRadius: "2px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: show ? "100%" : "0%",
            backgroundColor: current.accent,
            transition: "width 3s linear",
          }}
        />
      </div>
    </div>
  );
}