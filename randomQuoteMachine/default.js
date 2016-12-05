function getQuote() {
    var xhr = new XMLHttpRequest();
    // api website for documentation http://quotes.stormconsultancy.co.uk/api
    var url = 'http://quotes.stormconsultancy.co.uk/random.json';

    xhr.open('GET', url, true);
    xhr.send();
    xhr.onreadystatechange = processRequest;

    function processRequest(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            document.getElementById('quoteText').innerHTML = response.quote;
            document.getElementById('quoteAuthor').innerHTML = response.author;
        }
    }
}

function sendTweet() {
    var tweetLink = 'http://twitter.com/home?status=';
    var quoteText = document.getElementById('quoteText').innerHTML;
    var textToTweet = tweetLink + encodeURIComponent(quoteText);
    window.open(textToTweet);
}

// event listeners and handlers for button clicks
var newQuoteButton = document.getElementById('newQuoteButton');
var tweetButton = document.getElementById('tweetButton');

newQuoteButton.addEventListener('click', getQuote, false);
tweetButton.addEventListener('click', sendTweet, false);

getQuote();
