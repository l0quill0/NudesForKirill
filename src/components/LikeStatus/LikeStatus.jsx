import React from "react";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button } from "@mui/material";

import "./LikeStatus.css";

export const LikeStatus = ({ isLiked, onClick }) => {
  return (
    <div>
      <Button onClick={onClick}>
        {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </Button>
    </div>
  );
};
