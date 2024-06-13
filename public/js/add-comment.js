// add a comment

const newFormHandler = async (event) => {
    event.preventDefault();

    const comment_content = document
        .querySelector("#comment_content")
        .value.trim();

    const postId = document.querySelector("#comment_content").dataset.postid;

    if (comment_content && postId) {
        const response = await fetch(`/api/comments/${postId}`, {
            method: "POST",
            body: JSON.stringify({ comment_content }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            document.location.replace("/profile");
        } else {
            alert("Failed to create comment");
        }
    }
};

// to delete a comment
const deleteCommentHandler = async (event) => {
    if (
        event.target.hasAttribute("data-id") &&
        event.target.hasAttribute("data-postid")
    ) {
        const commentId = event.target.getAttribute("data-id");
        const postId = event.target.getAttribute("data-postid");

        const response = await fetch(`/api/comments/${postId}/${commentId}`, {
            method: "DELETE",
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert("Failed to delete comment");
        }
    }
};

document
    .querySelector(".new-comment-form")
    .addEventListener("submit", newFormHandler);

document
    .querySelector(".comment-list")
    .addEventListener("click", deleteCommentHandler);
