import React from "react";
import style from "./styles.module.css";

const Message = ({ message, type = "success" }) => {
  if (!message) return null;

  return (
    <p className={type === "success" ? style.successMsg : style.errorMsg}>
      {message}
    </p>
  );
};

export default Message;
