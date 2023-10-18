import React, { useRef } from "react";
import WindowPrint from "./components/WindowPrint";
import { PrintRefType } from "./components/WindowPrint/components/Print";

function App() {
  const printRef = useRef<PrintRefType>();
  // 打印
  const onPrint = async () => {
    printRef.current?.handlePrint();
  };
  return (
    <div className="App">
      <div
        onClick={onPrint}
        style={{ width: 200, height: 100, backgroundColor: "red" }}
      >
        打印测试
      </div>
      <WindowPrint printRef={printRef} />
    </div>
  );
}

export default App;
