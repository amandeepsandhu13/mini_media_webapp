document.addEventListener("DOMContentLoaded", () => {
    const addPostForm = document.getElementById("addPostForm");
    const imageInput = document.getElementById("image");
    const imagePreview = document.getElementById("imagePreview");

    // Event listener for image input change to show preview
    imageInput.addEventListener("change", () => {
        const file = imageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
                imagePreview.style.display = "block";
            };
            reader.readAsDataURL(file);
        } else {
            imagePreview.src = "#";
            imagePreview.style.display = "none";
        }
    });

    // Event listener for form submission
    addPostForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission

        try {
            const title = document.getElementById("title").value;
            const post_contents =
                document.getElementById("post_contents").value;
            const image_url = document.getElementById("image_url").value;
            const user_id = document.querySelector(
                "input[name='userId']"
            ).value; // Get userId from hidden input
            const image = imageInput.files[0]; // Get the selected image file

            // Create FormData object to send both text and file data
            const formData = new FormData();
            formData.append("userId", user_id);
            formData.append("title", title);
            formData.append("post_contents", post_contents);
            formData.append("image", image);

            const url = "/api/posts/add-post";

            const response = await fetch(url, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorResponse = await response.text();
                throw new Error(errorResponse);
            }

            // If successful, redirect to profile page
            window.location.replace("/profile");
        } catch (error) {
            console.error("Error adding the post:", error);
            document.getElementById("updateMessage").innerText =
                "Error adding post";
        }
    });
});
