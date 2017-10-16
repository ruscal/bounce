import React from 'react'

const Sprite = ({x, y, radius, velocity})=>{

    let diameter = radius * 2;

    let style ={
        left: x - radius,
        top: y - radius,
        width: `${diameter}px`,
        height: `${diameter}px`,
        borderRadius: `${radius}px`
    }

    return (
        <div className="sprite" style={style}>
        </div>
    )
}

export default Sprite