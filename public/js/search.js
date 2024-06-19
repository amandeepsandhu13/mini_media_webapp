document.addEventListener("DOMContentLoaded", function() {
    const searchBtn = document.getElementById("searchBtn");

    searchBtn.addEventListener("click", function() {
        const queryInput = document.getElementById("searchInput").value.trim();

        if (queryInput) {
            handleSearch(queryInput);
        } else {
            console.error('Empty query, cannot perform search.');
            // Optionally handle empty query case
        }
    });
});

function handleSearch(query) {
    console.log('Searching for query:', query);
    fetch(`/api/results?query=${encodeURIComponent(query)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Received data:', data);
            const users = data.users;

            const template = Handlebars.compile(document.getElementById("search-results-template").innerHTML);
            const html = template({ query, users });
            document.getElementById("search-results").innerHTML = html;
        })
        .catch(error => {
            console.error('Error fetching search results:', error);
            // Handle error (e.g., display error message to user)
        });
}
