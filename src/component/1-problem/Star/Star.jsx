import classes from './styles.module.scss'

const Star = ({
    index = 0,
    onChange = () => {},
    handleHoverPosition = () => {},
    isFilled = false
}) => {

    const handleStarClick = () => {
        onChange(index + 1)
    }

    const handleHoverEnter = () => {
        handleHoverPosition(index + 1)
    }

    return (
        <div 
            className={`${classes.container} ${isFilled ? classes.filled: ''} `} 
            onClick={handleStarClick}
            onMouseEnter={handleHoverEnter}
        >
            
        </div>
    )
}

export default Star;