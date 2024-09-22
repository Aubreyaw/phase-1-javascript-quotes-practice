document.addEventListener("DOMContentLoaded", function () {
    const quoteUrl = "http://localhost:3000/quotes?_embed=likes";
    const quotesList = document.getElementById("quote-list");
    const quoteLikeUrl = "http://localhost:3000/likes";
    const quoteDeleteUrl = "http://localhost:3000/quotes" 
    console.log("list", quotesList);

    function fetchQuotes() {
        fetch(quoteUrl)
            .then(response => response.json())
            .then(data => {
                console.log("fetch successful", data);
                displayQuotes(data);
            })
            .catch(error => console.error("quote fetch error:", error));
    }

    function displayQuotes(quotes) {
        quotes.forEach(quote => {
            const quoteCard = document.createElement("li");
            quoteCard.classList.add("quote-card");

            const blockquote = document.createElement("blockquote");
            blockquote.classList.add("blockquote");

            const quoteText = document.createElement("p");
            quoteText.classList.add("mb-0");
            quoteText.textContent = quote.quote;

            const quoteAuthor = document.createElement("footer");
            quoteAuthor.classList.add("blockquote-footer");
            quoteAuthor.textContent = quote.author;

            const likeButton = document.createElement("button");
            likeButton.classList.add("btn-success");
            likeButton.innerHTML = `Likes: <span>${quote.likes.length}</span>`;

            
            likeButton.addEventListener("click", () => {
                fetch(quoteLikeUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    body: JSON.stringify({ quoteId: quote.id }),
                })
                .then(response => response.json())
                .then(like => {
                    
                    const likesSpan = likeButton.querySelector("span");
                    likesSpan.textContent = parseInt(likesSpan.textContent) + 1;
                })
                .catch(error => console.error("server POST failed", error));
            });

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("btn-danger");
            deleteButton.textContent = "Delete";

           
            deleteButton.addEventListener("click", () => {
                fetch(`${quoteDeleteUrl}/${quote.id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                })
                .then(() => {
                    quoteCard.remove();
                })
                .catch(error => console.error("server DELETE failed", error));
            });

            blockquote.appendChild(quoteText);
            blockquote.appendChild(quoteAuthor);
            blockquote.appendChild(document.createElement("br"));
            blockquote.appendChild(likeButton);
            blockquote.appendChild(deleteButton);

            quoteCard.appendChild(blockquote);

            quotesList.appendChild(quoteCard);

            function addQuote() {
                const quoteForm = document.getElementById("new-quote-form");


                const submitButton = document.getElementBy("")
            }
        });
    }

    fetchQuotes();
});