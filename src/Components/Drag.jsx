/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";

export const Drag = ({ headers, dropTableData }) => {
  const [dropped, setDropped] = useState([]);
  const [droppedTableToshow, setdroppedTableToshow] = useState({});
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

  return (
    <DragDropContext onDragEnd={handleEnd}>
      <div className="drag-drop">
        <Droppable droppableId="headerDrops">
          {(provided) => (
            <div
              className="draggable left"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h4>Available content to drag</h4>
              <div className="flex">
                <div
                  className="all-file"
                  onClick={() => setdroppedTableToshow(dropTableData)}
                >
                  ALL Files
                </div>
                <div
                  className="all-file"
                  onClick={() => {
                    setdroppedTableToshow({});
                    setDropped([]);
                  }}
                >
                  Clear
                </div>
              </div>
              {headers?.map((header, index) => {
                return (
                  <Draggable draggableId={header} index={index} key={index}>
                    {(provided) => (
                      <div
                        className="dragItems"
                        key={index}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        {header}
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="headerDrops2">
          {(provided) => (
            <div
              className="draggable right"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {Object.keys(droppedTableToshow).map((head, index) => {
                return (
                  <tbody>
                    <thead className="dropped-head" key={index}>
                      {head}
                    </thead>
                    {droppedTableToshow[head].map((val) => (
                      <tr>
                        <td>{val}</td>
                      </tr>
                    ))}
                  </tbody>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};
