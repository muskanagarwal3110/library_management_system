let btn= document.querySelector("#menu-btn")
let sidebar= document.querySelector(".sidebar")
btn.onclick= function(){
    sidebar.classList.toggle("active")
}
const changeth= document.getElementById("moon")
function changeTheme(){
    document.body.style.backgroundColor = 
        document.body.style.backgroundColor === "black" ? "white" : "black";
}
//adding real time
// let currentTime= new Date()
// let date= currentTime.toDateString()
// document.getElementById("time").innerHTML= date

//changing to add new book


function loadpage(page) {
    fetch(page)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            document.querySelector(".home-cnt").innerHTML = html;
            updateTime(); // Update time after loading content
            
             // Attach fetchBooks event listener after loading dashboard.html
            if (page === "dashboard.html") {
                addcharts()
                addVisitorChart()
            }
            attachFetchBooksListener();
            // Add event listener for dynamically loaded content
            const homecnt= document.querySelector(".home-cnt")
            const loadAddPage = document.querySelector("#newBook");
            if (loadAddPage) {
                loadAddPage.addEventListener("click", () => {
                    loadAddBookForm();
                    homecnt.style.display="flex";
                    homecnt.style.justifyContent = "center"; // Center items horizontally
                    homecnt.style.alignItems = "center"; // Center items vertically
                });
            } else {
                console.error("Element with ID 'newBook' not found after loading page!");
            }
        })
        .catch(error => {
            console.error("Error loading page:", error);
            document.querySelector(".homecnt").innerHTML = `
                <p>Error loading content. Please check if the file exists or try again later.</p>`;
        });
}
function addcharts(){
    
        // Get the canvas element
        const ctx = document.getElementById("myPieChart").getContext("2d");

        // Create the pie chart
        new Chart(ctx, {
            type: "pie",  // Specify pie chart
            data: {
                labels: ["Fiction", "Non-Fiction", "Science", "History", "Comics"],
                datasets: [{
                    data: [20, 15, 30, 25, 10],  // Data for each category
                    backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff"],
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "top",
                    },
                },
            }
        });

}
function addVisitorChart() {
    const canvas = document.getElementById("visitorsChart")
    const ctx= canvas.getContext("2d")
    const visitorsData = {
        labels: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ],
        datasets: [{
            label: "Monthly Visitors",
            data: [500, 700, 1200, 900, 1500, 1800, 2000, 2200, 2100, 2500, 2700, 3000], // Example data
            backgroundColor: "rgba(54, 162, 235, 0.5)", // Light Blue
            borderColor: "rgba(54, 162, 235, 1)", // Darker Blue
            borderWidth: 1
        }]
    };
    new Chart(ctx, {
        type: "bar", // Bar chart
        data: visitorsData,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Number of Visitors"
                    }
                }
            }
        }
    });
}
// Function to remove existing content and display book search results
function searchBooks(query) {
    fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            const booksContainer = document.querySelector(".home-cnt");
            booksContainer.innerHTML = ""; // Clear previous content (removes "Welcome Admin" and others)

            if (!data.docs.length) {
                booksContainer.innerHTML = "<p>No books found</p>";
                return;
            }

            data.docs.slice(0, 6).forEach(book => {
                const coverID = book.cover_edition_key || book.edition_key?.[0]; // Get the cover ID
        const coverURL = coverID 
            ? `https://covers.openlibrary.org/b/olid/${coverID}-M.jpg` 
            : "https://via.placeholder.com/100x150?text=No+Cover"; // Placeholder for missing covers
            const bookElement = document.createElement("div");
            bookElement.classList.add("book-card");
            bookElement.innerHTML = `
                <img src="${coverURL}" alt="Book Cover" class="book-cover">
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <p><strong>Author:</strong> ${book.author_name ? book.author_name.join(", ") : "Unknown"}</p>
                    <p><strong>First Published:</strong> ${book.first_publish_year || "N/A"}</p>
                </div>
            `;
            booksContainer.appendChild(bookElement);
            });
        })
        .catch(error => console.error("Error fetching books:", error));
}
function attachFetchBooksListener() {
    const searchInput = document.querySelector(".search input"); // Select the input field
    const searchIcon = document.getElementById("srch"); // Search icon
    const homeContent = document.querySelector(".home-cnt"); // Main content div
    const booksContainer= document.querySelector("#booksContainers")

    function performSearch() {
        const searchQuery = searchInput.value.trim();
        if (searchQuery) {
            homeContent.innerHTML = ""; // Clear the main content
            searchBooks(searchQuery);
        }
    }

    // Trigger search on clicking the search icon
    searchIcon.addEventListener("click", performSearch);

    // Trigger search when pressing Enter in the input field
    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent form submission (if inside a form)
            performSearch();
        }
    });
}
function loadAddBookForm() {
    const addBookFormHTML = `
    <div class="form-container">
        <h2>Book Issue Details:</h2>
        <form id="book-form">
        <div id="con">
        <div id="form-row">
            <div class="input-group">
                <label for="book-name">NAME OF THE BOOK</label>
                <input type="text" id="book-name" placeholder="Enter Book Name" required>
            </div>
            <div class="input-group">    
                <label for="author">AUTHOR OF THE BOOK</label>
                <input type="text" id="author" placeholder="Enter Author Name" required>
            </div>
        </div>
        <div id="form-row">
            <div class="input-group">
                <label for="isbn">ISBN NUMBER</label>
                <input type="text" id="isbn" placeholder="Enter ISBN Number" required>
            </div>
            <div class="input-group">    
                <label for="year">Year:</label>
                <input type="number" id="year" required>
            </div>
           
        </div>
        <div id="form-row">
            <div class="input-group">
                <label for="return-date">DATE OF BOOK RETURN</label>
                <input type="date" id="return-date">
            </div>
            <div class="input-group">    
                <label for="issue-date">DATE OF BOOK ISSUE</label>
                <input type="date" id="issue-date">
            </div>
        </div>
        <div id="form-row">
            <div class="input-group">
                <label for="late-fee">LATE FEE BALANCE(IF ANY)</label>
                <input type="text" id="late-fee" placeholder="Amount">
            </div>
            <button type="submit" id="submit-btn">SUBMIT</button>
        </div>
        
        </div>
            
        </form>
    </div>
    `;
    document.querySelector(".home-cnt").innerHTML = addBookFormHTML;
}

function updateTime() {
    let timeElement = document.getElementById("time");
    if (timeElement) {
        let currentTime = new Date();
        let date = currentTime.toDateString();
        timeElement.innerHTML = date;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    loadpage("dashboard.html");
    const loadAddPage = document.querySelector("#newBook");
    if (loadAddPage) {
        loadAddPage.addEventListener("click", () => {
            loadAddBookForm();
        });
    }
    // else {
    //     console.error("Element with ID 'newBook' not found!");
    // }
    
});

document.addEventListener("submit", function (event) {
    if (event.target && event.target.id === "book-form") {
        event.preventDefault(); // Prevent page reload
        
        let bookName = document.getElementById("book-name").value.trim();
        let author = document.getElementById("author").value.trim();
        let isbn = document.getElementById("isbn").value.trim();
        let year = document.getElementById("year").value;
        let issueDateInput = document.getElementById("issue-date").value;
        
        if (!bookName || !author || !isbn || !year || !issueDateInput) {
            alert("Please fill all required fields.");
            return;
        }

        let issueDate = new Date(issueDateInput);
        if (isNaN(issueDate.getTime())) {
            alert("Please enter a valid issue date.");
            return;
        }

        let returnDate = new Date(issueDate);
        returnDate.setDate(issueDate.getDate() + 7);
        
        document.getElementById("return-date").value = returnDate.toISOString().split("T")[0];

        let book = {
            bookName,
            author,
            isbn,
            year,
            issueDate: issueDate.toISOString().split("T")[0],
            returnDate: returnDate.toISOString().split("T")[0],
            returned: false
        };

        alert(`Book "${bookName}" by ${author} has been issued!\nReturn by: ${returnDate.toDateString()}`);
    }
});