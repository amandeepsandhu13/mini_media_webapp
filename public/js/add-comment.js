document.querySelector('#new-comment-form').addEventListener('submit', async function newCommentHandler(event) {
  event.preventDefault();

  const comment_content = document.querySelector('#comment_content').value;


  if ( !comment_content) {
      alert('comment content is missing');
      return;
  }

  const response = await fetch(`/api/comments`, { 
      method: 'POST',
      body: JSON.stringify({
          comment_content,
    
      }),
      headers: {
          'Content-Type': 'application/json',
      },
  });

  if (response.ok) {
      document.location.replace('/comments');
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