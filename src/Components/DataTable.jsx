import React from "react";

export const DataTable = ({ items ,headers}) => {
  
  return (
    <div>
   <table className="table container">
      <thead>
          <tr>
            {headers.map(header => <th scope="col" key={header}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {items.map(d => (
            <tr>
                  {Object.keys(d).map((val) =><td key={val}>{d[val]}</td>)}
              </tr>

          ))}
        </tbody>

      </table>
    </div>
  );
};
