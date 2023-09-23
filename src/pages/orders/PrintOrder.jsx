import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const PrintOrder = (props) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Order receipt",
    onAfterPrint: () => console.log("Printed PDF successfully!"),
  });

  return (
    <>
      <div ref={componentRef}>
        <p>{props.title}</p>
      </div>

      <button onClick={handlePrint}>Print pass</button>
    </>
  );
};

export default PrintOrder;
