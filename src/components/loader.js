import { useState } from "react";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
// import { BeatLoader } from "react-spinners";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Loader() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="sweet-loading">
        <ClipLoader color={color} loading={loading} css={override} size={150} />
        <h1 className="mt-2">Loading...</h1>
      </div>
    </div>
  );
}

export default Loader;
