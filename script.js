// Grabing the Elements from HTML
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const copyQuoteBtn = document.getElementById("copy-quote");

// initializing Global Variable
let apiQuotes = [];

// Fetch Signle Quote
function newQuote() {
    //Picking random Quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //Check if authos is NULL Then Print Unknown
    if (!quote.author) {
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }
    //Check if Quote is Too Big To Adjust
    if (quoteText.length > 50) {
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-quote");
    }
    quoteText.textContent = quote.text;
}

// Getting Quotes from API
async function getQuotes() {
    const apiUrl = "https://type.fit/api/quotes";
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Error Handler
        console.log("Something Went Wrong");
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, "_blank");
}
// Copy Quote
function copyQuote() {
    const copyText = `${quoteText.textContent} -- ${authorText.textContent}`;
    navigator.clipboard.writeText(copyText);
    alert("Clipboard : " + copyText);
}

//Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
copyQuoteBtn.addEventListener("click", copyQuote);
// On Load
getQuotes();
