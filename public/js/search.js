// public/js/search.js

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");

    // Function to handle search and navigate to results page
    const handleSearch = async () => {
        const query = searchInput.value.trim();

        if (query.length === 0) {
            alert("Please enter a search query.");
            return;
        }

        try {
            const response = await fetch(`/users/search?query=${encodeURIComponent(query)}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Search request failed.");
            }

            const result = await response.json();

            // Check if there are users in the result
            if (result.users.length > 0) {
                // Navigate to results page with query parameter
                window.location.href = `/users/results?query=${encodeURIComponent(query)}`;
            } else {
                alert(`No users found for "${query}".`);
            }
        } catch (err) {
            console.error("Error searching users:", err);
            alert("Error searching users. Please try again later.");
        }
    };

    // Trigger search on Enter key press in searchInput
    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    });

    // Optional: Trigger search on search button click (if needed)
    // const searchBtn = document.getElementById("searchBtn");
    // searchBtn.addEventListener("click", handleSearch);
});