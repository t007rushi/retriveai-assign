import React, { useState } from "react";
import "./App.css";
import * as XLSX from "xlsx";
import { DataTable } from "./Components/DataTable";
import { Drag } from "./Components/Drag";
import { Link, Route, Routes } from "react-router-dom";
import { Vizualization } from "./Components/Vizualization";

function App() {
  const [items, setItems] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [dropTableData, setdropTableData] = useState([]);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);
        const arrdata = XLSX.utils.sheet_to_json(ws, {
          header: 1,
          defVal: "",
        });
        setHeaders(arrdata[0]);
        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
      console.log(d);
      const final = d.reduce((acc, curr) => {
        for (const k of Object.keys(curr)) {
          if (!Object.keys(acc).includes(k)) {
            acc = { ...acc, [k]: [curr[k]] };
          } else {
            acc = { ...acc, [k]: [...acc[k], curr[k]] };
          }
        }
        return acc;
      }, {});
      setdropTableData(final);
    });
  };

  return (
    <div className="main">
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />
      <div style={{ display: "flex", gap: "1rem" }}>
        <Link to="/">home</Link>
        <Link to="/dnd">dnd</Link>
        <Link to="/viz">viz</Link>
      </div>
      <Routes>
        <Route
          path="/"
          element={<DataTable items={items} headers={headers} />}
        />
        <Route
          path="/dnd"
          element={<Drag headers={headers} dropTableData={dropTableData} />}
        />
        <Route
          path="/viz"
          element={
            <Vizualization headers={headers} dropTableData={dropTableData} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
