import React from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

interface OperatorScanProps {
  setData: any;
}

const OperatorScan: React.FC<OperatorScanProps> = ({ setData }) => {
  return (
    //@ts-ignore
    <Scanner
      constraints={{
        advanced: [{ facingMode: "environment" }],
      }}
      onScan={(result) =>
        setData(result && result.length && JSON.parse(result[0].rawValue))
      }
    />
  );
};

export default OperatorScan;
