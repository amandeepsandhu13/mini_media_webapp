document.querySelector('#new-comment-form').addEventListener('submit', async function newCommentHandler(event) {
    event.preventDefault();
    
    const comment_content = document.querySelector('#comentcontent').value;
    
    
    //HOW TO GET id from user logged??????
    
    const userId = window.userId;
    const postId = event.target.hasAttribute('data-id');

    if (!userId) {
        console.error('User is not logged in.');
        return;
      };
  
      if (!postId) {
        console.error('Post ID is not found.');
        return;
      }

    const response = await fetch(`/api/comments`, {
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
