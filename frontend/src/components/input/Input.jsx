import React, { forwardRef, memo, useImperativeHandle, useRef } from "react";

const Input = ({ label, type, id, ...rest }, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    value() {
      return inputRef.current?.value;
    },
    // file() {
    //   return inputRef.current?.files[0];
    // },
  }));

  // console.log("rerender");

  return (
    <React.Fragment>
      {label && <label htmlFor={id}>{label}: </label>}
      <input type={type} id={id} ref={inputRef} {...rest} />
    </React.Fragment>
  );
};

export default memo(forwardRef(Input));
