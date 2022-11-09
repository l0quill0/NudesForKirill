export default class petProjectService {
  counterKey = "postIdCounter";

  getAllPosts() {
    let postArray = [];
    if (localStorage.length === 0) {
      return postArray;
    }
    for (let i = 0; i <= localStorage.getItem(this.counterKey); i++) {
      postArray.push(this.getPost(i));
    }
    return postArray;
  }

  getPost(postId) {
    if (localStorage.getItem(postId)) {
      return JSON.parse(localStorage.getItem(postId));
    }
  }

  addPost(post) {
    if (localStorage.length === 0) {
      localStorage.setItem(this.counterKey, 0);
      post.id = 0;
    } else {
      let id = localStorage.getItem(this.counterKey);
      post.id = ++id;
      localStorage.setItem(this.counterKey, id);
    }
    localStorage.setItem(post.id, JSON.stringify(post));
  }

  updatePost(postId, updatedPost) {
    if (postId <= localStorage.getItem(this.counterKey)) {
      localStorage.setItem(postId, JSON.stringify(updatedPost));
      return true;
    }
    return false;
  }
}
