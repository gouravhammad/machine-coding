import { useState } from "react";
import Star from "../Star/Star";
import classes from "./styles.module.scss"

const StarReview = ({
    size = 0
}) => {

    let stars = new Array(size).fill(0)
    const [position, setPosition] = useState(0)
    const [hoverPosition, setHoverPosition] = useState(0)

    console.log("# POSITION: ", position)
    console.log("# hoverPosition: ", hoverPosition)

    function handleOnChange(value) {
        setPosition(value)
    }

    function handleHoverPosition(value) {
        setHoverPosition(value)
    }

    function getIsFilled(index) {
        if(hoverPosition > position) {
            return index < hoverPosition
        } else {
            return index < position
        }
    }

    return (
        <div className={classes.container}>
            {stars.map((item, index) => {
                return <Star 
                    index={index}
                    position={position}
                    key={`star_${index}`} 
                    onChange={handleOnChange} 
                    handleHoverPosition={handleHoverPosition}
                    isFilled={getIsFilled(index)}
                />
            })}
        </div>
    )
}

export default StarReview