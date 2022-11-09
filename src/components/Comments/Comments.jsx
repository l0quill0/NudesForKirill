import React from "react";

import { TextField, Button, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import "./Comments.css";

import { Comment } from "../Comment/Comment";
import { useState } from "react";

export const Comments = ({ comments, onSubmit, onCommentLiked }) => {
  const [comment, setComment] = useState("");

  return (
    <Box>
      <form onSubmit={(event) => onSubmit(event, comment)}>
        <TextField
          variant="standard"
          label="Comment here"
          onChange={(e) => setComment(e.target.value)}
        />
        <Button variant="text" type="submit">
          <SendIcon />
        </Button>
      </form>
      <Box>
        {comments?.map((comment) => (
          <Box key={comment.commentId}>
            <Comment
              id={comment.commentId}
              text={comment.comment}
              liked={comment.commentLiked}
              onCommentLiked={onCommentLiked}
              replies={comment.replies}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
