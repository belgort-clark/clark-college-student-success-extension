const search = document.querySelector("#search");
let searchTerm = document.querySelector("#searchTerm");
const messages = document.querySelector("#messages");
const apiUrl = "https://raw.githubusercontent.com/belgort-clark/clark-college-student-success-extension/refs/heads/main/messages.json";

search.addEventListener("click", (e) => {
    e.preventDefault();
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        myNewUrl = "https://www.clark.edu/directories/web-search.php?q=" + encodeURI(searchTerm.value);
        chrome.tabs.update(tabs[0].id, { url: myNewUrl });
    });
});

// check for important messages
fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse JSON data
    })
    .then(data => {
        messages.innerHTML = data.message;
        messages.style.display = 'block';
        console.log(data); // Handle the data
    })
    .catch(error => {
        console.error('There was an error with the fetch operation:', error);
    });