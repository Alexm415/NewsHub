let apiKey = "7e298be2b074469685f446919ba4226b";
let apiLink = `https://newsapi.org/v2/everything?q=Apple&sortBy=popularity&apiKey=${apiKey}`;

const search = document.getElementById("search");
search.addEventListener("submit", async (e) => {
  e.preventDefault();
});
