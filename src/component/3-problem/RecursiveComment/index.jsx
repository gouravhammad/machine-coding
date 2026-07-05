import { useState } from "react";
import classes from "./styles.module.scss";

const SingleComment = ({ comment = {}, handleReply }) => {
  const [isShowReply, setIsShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");

  function handleReplyClick() {
    setIsShowReply((prevState) => !prevState);
  }

  function handleReplyText(e) {
    setReplyText(e.target.value);
  }

  function handleAddReply() {
    if (!replyText.trim()) return;
    handleReply(comment.id, replyText.trim());
    setReplyText("");
    setIsShowReply(false);
  }

  return (
    <div className={classes.comment}>
      <span>{comment.comment}</span>
      <button onClick={handleReplyClick}>Reply</button>
      {isShowReply && (
        <div className={classes.children}>
          <input
            type="text"
            placeholder="Add reply"
            value={replyText}
            onChange={handleReplyText}
          />
          <button onClick={handleAddReply}>Add Reply</button>
        </div>
      )}

      <div className={classes.children}>
        {(comment.replies ?? []).map((item) => (
          <SingleComment
            key={item.id}
            comment={item}
            handleReply={handleReply}
          />
        ))}
      </div>
    </div>
  );
};

const RecursiveComment = () => {
  const [userInput, setUserInput] = useState("");
  const [allComments, setAllComments] = useState([]);

  function handleChange(e) {
    setUserInput(e.target.value);
  }

  function handleAddComment() {
    if (!userInput.trim()) return;
    setAllComments((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(), // Date.now(),
        comment: userInput.trim(),
        replies: [],
      },
    ]);
    setUserInput("");
  }

  function addReply(commentData, parentId, inputValue) {
     return commentData.map((item) => {
      if(item.id === parentId) {
        return {
          ...item,
          replies: [
            ...item.replies,
            {
              id: crypto.randomUUID(), // Date.now(),,
              comment: inputValue,
              replies: [],
            },
          ]
        }
      }
      return {
        ...item,
        replies: addReply(item.replies, parentId, inputValue)
      }
    })
  }

  function handleReply(parentId, inputValue) {
    setAllComments((prevState) => addReply(prevState, parentId, inputValue))
  }

  return (
    <div className={classes.container}>
      <input
        type="text"
        placeholder="Add your comment"
        value={userInput}
        onChange={handleChange}
      />
      <button onClick={handleAddComment}>Add</button>

      {(allComments ?? []).map((item) => (
        <SingleComment
          key={item.id}
          comment={item}
          handleReply={handleReply}
        />
      ))}
    </div>
  );
};

export default RecursiveComment;