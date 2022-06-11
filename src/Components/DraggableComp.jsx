import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

export const DraggableComp = ({ headers ,clear}) => {
  return (
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
                  onClick={clear}
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
    </div>
  );
};
