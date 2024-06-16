document.addEventListener("DOMContentLoaded", () => {
    const updateForm = document.getElementById("addPostForm");

    updateForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission

        try {
            const formData = {
                title: document.getElementById("title").value,
                post_contents: document.getElementById("post_contents").value,
                image_url: document.getElementById("image_url").value,
            };

            // const userId = updateForm.dataset.userId; //to find
            const url = `/api/posts/add-post`;

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to update profile");
            }

            const responseData = await response.json();
            console.log("Post added successfully:", responseData);
            document.getElementById("updateMessage").innerText =
                "Post successfully"; // Display success message

            // Redirect to the user profile page
            // window.location.href = `/profile/${userId}`;
        } catch (error) {
            console.error("Error adding the post:", error);
            document.getElementById("updateMessage").innerText =
                "profile not updated"; // Display error message
        }
    });
});
