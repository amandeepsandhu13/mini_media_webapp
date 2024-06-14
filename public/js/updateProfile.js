document.addEventListener('DOMContentLoaded', () => {
  const updateButton = document.getElementById('updateButton');
  const updateForm = document.getElementById('update-profile-form');

  updateForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      const formData = {
        name: document.getElementById('name').value,
        username: document.getElementById('username').value,
        DOB: document.getElementById('DOB').value,
        gender: document.getElementById('gender').value,
        bio: document.getElementById('bio').value
      };

      const userId = updateForm.dataset.userId;
      const url = `/api/users/profile/${userId}`;

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const responseData = await response.json();
      console.log('Profile updated successfully:', responseData);
      document.getElementById('updateMessage').innerText = 'Profile updated successfully'; // Display success message

      // Redirect to the user profile page
     // window.location.href = `/profile/${userId}`;

    } catch (error) {
      console.error('Error updating profile:', error);
      document.getElementById('updateMessage').innerText = "profile not updated"; // Display error message
    }
  });
});
