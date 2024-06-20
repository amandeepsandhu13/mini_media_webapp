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
    fetch(`api/posts/user/${userid}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

// delete the post
const deletePost = async (id) => {
    try {
        const response = await fetch(`/api/posts/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Post deleted successfully:", data);
        } else {
            const errorData = await response.json();
            console.error("Failed to delete the post:", errorData.message);
        }
    } catch (error) {
        console.error("Error while deleting the post:", error);
    }
};
