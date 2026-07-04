import { useState } from "react";
import classes from "./styles.module.scss";

const RecursiveComment = () => {

  const [userInput, setUserInput] = useState('')
  const [allComments, setAllComments] = useState([])
  const [isReplyClick, setIsReplyClick] = useState(false)

  function handleChange(e) {
    setUserInput(e.target.value)
  }

  function handleAddComment() {
    let updatedComments = [...allComments]
    updatedComments.push(userInput)
    setAllComments(updatedComments)
    setUserInput('')
  }

  function handleReplyClick() {
    setIsReplyClick(true)
  }

  return (

    <div className={classes.container}>
        <input type="text" placeholder="Add your comment" onChange={handleChange} />
        <button onClick={handleAddComment}>Add</button>

        {(allComments ?? []).map((item, index) => {
          return (
            <div key={`comment_${index}`}>
               <span>{item}</span>
               <button onClick={handleReplyClick}>Reply</button>

                {isReplyClick && (
                  <div className={classes.children}>
                    <RecursiveComment />
                  </div>
                )}
            </div>
          )
        })}

    </div>
  );
};

export default RecursiveComment;
