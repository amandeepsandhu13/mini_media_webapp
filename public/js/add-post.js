document.addEventListener("DOMContentLoaded", () => {
    const addPostForm = document.getElementById("addPostForm");

    addPostForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission

        try {
            const title = document.getElementById("title").value;
            const post_contents =
                document.getElementById("post_contents").value;
            const image_url = document.getElementById("image_url").value;
            const user_id = document.querySelector(
                "input[name='userId']"
            ).value; // Get user_id from hidden input

            const formData = {
                title,
                post_contents,
                image_url,
                userId: user_id, // Ensure user_id is included in formData
            };

            const url = "/api/posts/add-post";

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to add post");
            }

            const responseData = await response.json();
            console.log("Post added successfully:", responseData);
            document.getElementById("updateMessage").innerText =
                "Post added successfully";

            // Redirect to another page after successful post creation
            window.location.href = `/api/posts/user/${user_id}`; // Redirect to user's posts page
        } catch (error) {
            console.error("Error adding the post:", error);
            document.getElementById("updateMessage").innerText =
                "Error adding post";
        }
    });
});