import React from 'react'
import { Droppable } from 'react-beautiful-dnd';

export const DroppableComp = ({children}) => {
  return (
    <>
    <Droppable droppableId="headerDrops2">
    {(provided) => (
      <div
      className=""
      ref={provided.innerRef}
      {...provided.droppableProps}
      >
        {children}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
    </>

  )
}
