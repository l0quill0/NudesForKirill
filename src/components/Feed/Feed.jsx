import React from "react";

import { Box, Typography } from "@mui/material";

import "./Feed.css";

import { Post } from "../Post/Post";

export const Feed = ({ posts }) => {
  const postsCheck =
    posts.length > 0 ? (
      posts.map((post) => <Post key={post.id} {...post} />)
    ) : (
      <Typography>No posts yet :(</Typography>
    );

  return <Box>{postsCheck}</Box>;
};
