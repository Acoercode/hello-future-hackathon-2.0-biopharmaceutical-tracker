import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

const OperatorScan: React.FC = () => {
  const [data, setData] = useState("No result");
  console.log("DATA", data);

  return (
    <QrReader
      onResult={(result, error) => {
        // @ts-ignore
        setData(result?.text);
      }}
      // @ts-ignore
      style={{ width: "100%" }}
      videoStyle={{ height: "80%" }}
      constraints={{ facingMode: "environment" }}
    />
  );
};

export default OperatorScan;
