import { useState } from "react";
import Star from "../Star/Star";
import classes from "./styles.module.scss"

const StarReview = ({
    size = 0
}) => {

    let stars = new Array(size).fill(0)
    const [position, setPosition] = useState(0)
    const [hoverPosition, setHoverPosition] = useState(0)

    function handleOnChange(value) {
        setPosition(value)
    }

    function handleHoverPosition(value) {
        setHoverPosition(value)
    }

    function getIsFilled(index) {
        const activePosition = hoverPosition > 0 ? hoverPosition : position
        return index < activePosition
    }

    return (
        <div
            className={classes.container}
            onMouseLeave={() => setHoverPosition(0)}
        >
            {stars.map((item, index) => {
                return <Star 
                    index={index}
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