import React from 'react'
import Draggable from 'react-draggable'

export default function Drag({ number }) {
  return (
    <Draggable>
      <div
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/parts/image_part_00${number}.jpg)`,
          backgroundSize: "contain",
          backgroundRepeat: 'no-repeat',
          width: "100px",
          height: "100px",
        }}
      />
    </Draggable>
  )
}
