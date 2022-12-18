import React from "react";

/** Loading message used by components that fetch API data. */

function LoadingSpinner() {
  return (
      <div style={{textAlign: "center", fontSize: "24pt", color:"blue"}}>
        Loading ...
      </div>
  );
}

export default LoadingSpinner;