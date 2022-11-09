import React, { useState, useContext } from "react";

import { Typography } from "@mui/material";

import "./Post.css";

import { LikeStatus } from "../LikeStatus/LikeStatus";
import { Comments } from "../Comments/Comments";
import { storageContext } from "../Context/Context";
import petProjectService from "../../services/petProjectService";

export const Post = ({ id, imageURL, isLiked, caption, comments }) => {
  const ppService = new petProjectService();

  const storage = useContext(storageContext);
  const [commentCounter, setCommentCounter] = useState(
    comments.length === 0 ? 0 : comments[comments.length - 1].commentId
  );

  const [liked, setLiked] = useState(isLiked);
  const [commentArr, setCommentArr] = useState(comments);

  const onLikeBtnClick = () => {
    const updatedPost = {
      id,
      imageURL,
      isLiked: !liked,
      caption,
      comments,
    };

    ppService.updatePost(id, updatedPost) && setLiked(!liked);
  };

  const onCommentSubmit = (event, comment) => {
    event.preventDefault();

    const newComment = {
      commentId: commentCounter + 1,
      comment,
      commentLiked: false,
      replies: [],
    };

    const updatedPost = {
      id,
      imageURL,
      isLiked,
      caption,
      comments: [...commentArr, newComment],
    };

    ppService.updatePost(id, updatedPost);
    setCommentArr([...commentArr, newComment]);
    setCommentCounter(commentCounter + 1);
    storage.setPosts(ppService.getAllPosts());
  };

  const onCommentLiked = (commentId, status) => {
    const updatedCommentArr = commentArr.map((comment) =>
      comment.commentId === commentId
        ? { ...comment, commentLiked: !status }
        : comment
    );

    const updatedPost = {
      id,
      imageURL,
      isLiked,
      caption,
      comments: [...updatedCommentArr],
    };

    ppService.updatePost(id, updatedPost) &&
      setCommentArr([...updatedCommentArr]);
    storage.setPosts(ppService.getAllPosts());
  };

  return (
    <div>
      <img src={imageURL} alt="" />
      <LikeStatus isLiked={liked} onClick={onLikeBtnClick} />
      <Typography>{caption}</Typography>
      <Comments
        comments={comments}
        onSubmit={onCommentSubmit}
        onCommentLiked={onCommentLiked}
      />
    </div>
  );
};
