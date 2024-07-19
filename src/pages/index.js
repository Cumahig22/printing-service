import React from "react";
import { useReactToPrint } from "react-to-print";
import Deposit from "./deposit";
const PrintPage = () => {
  const depositRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => depositRef.current,
  });

  return (
    <div>
      <h1>Print Page</h1>
      <button onClick={handlePrint}>Print</button>
      <div style={{ display: "none" }}>
        <Deposit ref={depositRef} />
      </div>
    </div>
  );
};

export default PrintPage;
