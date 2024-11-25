const stars = document.querySelectorAll(".stars i");
console.log(stars);

//loop through the stars
stars.forEach((star, index1) => {
  star.addEventListener("click", (e) => {
    console.log(index1);
    stars.forEach((star, index2) => {
      index1 >= index2
        ? star.classList.add("active")
        : star.classList.remove("active");
    });
    const starRating = index1 + 1;
    console.log(e.target);
    const article = e.target.parentNode.parentNode.parentNode;
    const articleImage = article.querySelector("img").src;
    const articleTitle = article.querySelector("h5").textContent;
    const articleUrl = article.querySelector("a").href;
    const articleDescription = article.querySelector("p").textContent;
    console.log(articleTitle);
    console.log(articleUrl);
    console.log(articleDescription);
    /// cehcking they work

    // fetch request to a api endpoint
    fetch("/api/rating/save", {
      method: "POST",
      body: JSON.stringify({
        starrating: starRating,
        articletitle: articleTitle,
        articleimg: articleImage,
        articleurl: articleUrl,
        articledescription: articleDescription,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  });
});
