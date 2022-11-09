import React, { useState } from "react";

import "./App.css";

import { Feed } from "../Feed/Feed";
import { Navbar } from "../Navbar/Navbar";

import petProjectService from "../../services/petProjectService";
import { storageContext } from "../Context/Context";

const App = () => {
  const ppService = new petProjectService();
  const [posts, setPosts] = useState(ppService.getAllPosts());
  return (
    <storageContext.Provider value={{ posts, setPosts }}>
      <div>
        <Navbar />
        <Feed posts={posts} />
      </div>
    </storageContext.Provider>
  );
};

export default App;
