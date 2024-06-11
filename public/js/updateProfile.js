document.getElementById('update-profile-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const username = document.getElementById('username').value.trim();
    const DOB = document.getElementById('DOB').value;
    const gender = document.getElementById('gender').value;
    const bio = document.getElementById('bio').value.trim();
  
    if (name && email && username && DOB && gender) {
      const response = await fetch(`/api/users/${userId}`, { // Assuming userId is defined somewhere
        method: 'PUT',
        body: JSON.stringify({ name, email, username, DOB, gender, bio }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to update profile');
      }
    }
  });
  