import React, { useContext, useState } from "react";

import { Modal, Box, TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import "./Navbar.css";

import petProjectService from "../../services/petProjectService";
import { storageContext } from "../Context/Context";

export const Navbar = () => {
  const ppService = new petProjectService();

  const storage = useContext(storageContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [imageURL, setImageURL] = useState("");
  const [caption, setCaption] = useState("");

  const onAddPostClick = (event) => {
    event.preventDefault();
    let newPost = {
      id: null,
      imageURL: imageURL,
      isLiked: false,
      caption: caption,
      comments: [],
    };
    ppService.addPost(newPost);
    storage.setPosts(ppService.getAllPosts());
  };

  return (
    <div>
      <button onClick={handleOpen}>
        <AddIcon fontSize="large" />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <form onSubmit={onAddPostClick}>
            <TextField
              name="imageURL"
              label="image URL"
              onChange={(e) => setImageURL(e.target.value)}
            />
            <TextField
              name="caption"
              label="Caption"
              onChange={(e) => setCaption(e.target.value)}
            />
            <Button type="submit">Post</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
