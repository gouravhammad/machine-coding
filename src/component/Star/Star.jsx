import classes from './styles.module.scss'

const Star = ({
    position = 0,
    index = 0,
    onChange = () => {},
    handleHoverPosition = () => {},
    isFilled = () => {}
}) => {

    const handleStarClick = () => {
        onChange(index + 1)
    }

    const handleHoverEnter = () => {
        handleHoverPosition(index + 1)
    }
    
    const handleHoverLeave = () => {
        handleHoverPosition(position)
    }


    return (
        <div 
            className={`${classes.container} ${isFilled ? classes.filled: ''} `} 
            onClick={handleStarClick}
            onMouseEnter={handleHoverEnter}
            onMouseLeave={handleHoverLeave}
        >
            
        </div>
    )
}

export default Star;