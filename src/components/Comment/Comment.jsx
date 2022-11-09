import React from "react";

import { Button, TextField, Typography, Box } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import SendIcon from "@mui/icons-material/Send";

import "./Comment.css";

import { LikeStatus } from "../LikeStatus/LikeStatus";

import { useState } from "react";

export const Comment = React.memo(
  ({
    id,
    text,
    liked,
    onCommentLiked,
    onReplySubmit,
    replies,
    onReplyLiked,
  }) => {
    const [replyVisibility, setReplyVisibility] = useState(false);
    const [replyText, setReplyText] = useState("");

    const visibilityHandler = () => {
      setReplyVisibility(!replyVisibility);
    };

    return (
      <div>
        <Typography>{text}</Typography>
        <LikeStatus isLiked={liked} onClick={() => onCommentLiked(id, liked)} />
        <Button onClick={visibilityHandler}>
          <ReplyIcon />
        </Button>
        {replyVisibility && (
          <form onSubmit={(event) => onReplySubmit(event, replyText)}>
            <Box>
              <TextField
                variant="standard"
                label="Reply"
                onChange={(e) => setReplyText(e.target.value)}
              />
              <Button variant="text" type="submit">
                <SendIcon />
              </Button>
            </Box>
          </form>
        )}
        {replies.length > 0 && (
          <Box>
            {replies.map((reply) => (
              <Box>
                <Typography>{reply.text}</Typography>
                <LikeStatus isLiked={reply.liked} onClick={onReplyLiked} />
              </Box>
            ))}
          </Box>
        )}
      </div>
    );
  }
);
