/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { DraggableComp } from "./DraggableComp";
import { ChartComp } from "./ChartComp";
import { DroppableComp } from "./DroppableComp";

export const Vizualization = ({ dropTableData, headers }) => {
  const [dropped, setDropped] = useState([]);
  const [droppedTableToshow, setdroppedTableToshow] = useState({});
  const [chartType, setChartType] = useState("bar");
  useEffect(() => {
    var neobj = { ...droppedTableToshow };
    for (const d of Object.keys(dropTableData)) {
      if (dropped.includes(d)) {
        neobj = { ...neobj, [d]: dropTableData[d] };
      }
    }
    setdroppedTableToshow(neobj);
  }, [dropped]);

  const handleEnd = (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = headers;
    let complete = dropped;
    // Source Logic
    if (source.droppableId === "headerDrops") {
      add = active[source.index];
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "headerDrops2") {
      complete.splice(destination.index, 0, add);
    }
    setDropped([...complete]);
  };

  const clear = () => {
    setdroppedTableToshow({});
    setDropped([]);
  };

  const handleChange = (e) => {
    setChartType(e.target.value);
  };
  return (
    <DragDropContext onDragEnd={handleEnd}>
      <select name="options" id="options" onChange={(e) => handleChange(e)}>
        <option value="bar">Chart</option>
        <option value="line">LineChart</option>
        <option value="pie">PieChart</option>
      </select>
      <div className="drag-drop">
        <DraggableComp headers={headers} clear={clear} />
        <DroppableComp droppedTableToshow={droppedTableToshow}>
          <ChartComp
            dropTableData={dropTableData}
            droppedTableToshow={droppedTableToshow}
            chartType={chartType}
          />
        </DroppableComp>
      </div>
    </DragDropContext>
  );
};
