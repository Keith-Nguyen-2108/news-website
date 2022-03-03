import React, { useContext, useRef, useState } from "react";
import { ThemeContext } from "../../context/Context";
import Input from "../input/Input";

const CommentForm = ({
  isReply = false,
  handleSubmit,
  setActiveComment,
  initialText = "",
}) => {
  const [text, setText] = useState(initialText);
  const [{ isDark }] = useContext(ThemeContext);
  // console.log(text);
  // const textRef = useRef();
  const handleKeypress = (e) => {
    if (e.keyCode === 13 && text !== "") {
      handleSubmit(text);
      setText("");
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="d-flex w-100 align-items-center"
    >
      <Input
        // ref={textRef}
        type="text"
        value={text}
        className={`form-control bg-transparent border ${
          isDark && "text-white"
        }`}
        placeholder="Enter comment..."
        onKeyUp={(e) => handleKeypress(e)}
        onChange={(e) => setText(e.target.value)}
      />
      {isReply && (
        <i
          className="far fa-window-close cancel-icon"
          onClick={() => setActiveComment(null)}
        >
          <span className="tooltiptext">Cancel</span>
        </i>
      )}

      {/* <button type="button" onClick={() => handleClick()}>
        {submitLabel}
      </button> */}
    </form>
  );
};

export default CommentForm;
