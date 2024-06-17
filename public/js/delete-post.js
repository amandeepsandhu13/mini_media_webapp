 // JavaScript for handling delete post functionality
 document.addEventListener('DOMContentLoaded', function() {
    const deletePostLinks = document.querySelectorAll('.delete-post');
    
    deletePostLinks.forEach(link => {
        link.addEventListener('click', async function(event) {
            event.preventDefault();
            
            const postId = this.getAttribute('data-post-id');
            const confirmDelete = confirm('Are you sure you want to delete this post?');
            
            if (confirmDelete) {
                try {
                    const response = await fetch(`api/posts/${postId}/delete`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    const data = await response.json();
                    if (response.ok) {
                        alert(data.message); // Optional: show success message
                        location.reload(); // Refresh page or update UI accordingly
                    } else {
                        alert(data.error); // Optional: show error message
                    }
                } catch (error) {
                    console.error('Error deleting post:', error);
                    alert('Failed to delete post. Please try again.'); // Optional: show generic error message
                }
            }
        });
    });
});