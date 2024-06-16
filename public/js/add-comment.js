document.querySelector('#new-comment-form').addEventListener('submit', async function newCommentHandler(event) {
    event.preventDefault();
    
    const comment_content = document.querySelector('#comentcontent').value;
    const userId = window.userId;
    const postId = event.target.hasAttribute('data-id');


    const response = await fetch(`/api/comments/${postId}/${commentId}`, {
      method: 'POST',
      body: JSON.stringify({
        comment_content,
        userId,
        postId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to add comment');
    }
});

// // to delete a comment
// const deleteCommentHandler = async (event) => {
//     if (
//         event.target.hasAttribute("data-id") &&
//         event.target.hasAttribute("data-postid")
//     ) {
//         const commentId = event.target.getAttribute("data-id");
//         const postId = event.target.getAttribute("data-postid");

//         const response = await fetch(`/api/comments/${postId}/${commentId}`, {
//             method: "DELETE",
//         });

//         if (response.ok) {
//             document.location.reload();
//         } else {
//             alert("Failed to delete comment");
//         }
//     }
// };

// document
//     .querySelector(".comment-list")
//     .addEventListener("click", deleteCommentHandler);