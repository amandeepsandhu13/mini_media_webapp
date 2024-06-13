// show all posts
const getPosts = () => {
    fetch("api/posts", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

// single post
const getSinglePost = () => {};

// delete the post
const deletePost = (id) =>
    fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
