document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('add-comment-form');
    if (commentForm) {
      commentForm.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const content = document.getElementById('comment-content').value.trim();
        alert(content);
        const postId = commentForm.getAttribute('data-post-id');
        if (content) {
          try {
            const response = await fetch(`/api/comments/${postId}`, {
              method: 'POST',
              body: JSON.stringify({ content }),
              headers: {
                'Content-Type': 'application/json',
              },
            });
  
            if (response.ok) {
              // Reload the page to see the new comment
              document.location.reload();
            } else {
              alert('Failed to add comment');
            }
          } catch (err) {
            console.error('Error adding comment:', err);
          }
        }
      });
    }
  });
  