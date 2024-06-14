// show all posts
const getPosts = () => {
    fetch("api/posts", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

// show the posts for the current user
const getPostsByCurrentUser = (userid) => {
    fetch(`api/posts/:${userid}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

// delete the post
const deletePost = (id) =>
    fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
