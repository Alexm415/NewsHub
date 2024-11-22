// async function fetchNews() {
//   fetch(apiLink)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       const newsContainer = document.getElementById("news-container");
//       newsContainer.innerHTML = "";

//       data.articles.forEach((article) => {
//         const articleElement = document.createElement("div");
//         articleElement.classList.add("article", "mb-4");
//         articleElement.innerHTML = `
//           <div class = "card">
//             <img src = "${article.urlToImage}" class = "card-img-top" alt = "${article.title}"
//             <div class = "card-body">
//               <h5 class = "card-title">${article.title}</h5>
//               <p class = "card-text">${article.description}</p>
//               <a href = "${article.url}" class = "btn btn-primary" target = "_blank"> Read More</a>
//             </div>
//           </div>`;
//         newsContainer.appendChild(articleElement);

//         try {
//           const newsContainer = document.getElementById("news-container");
//           newsContainer.innerHTML = "";

//           data.articles.forEach((article) => {
//             const articleElement = document.createElement("div");
//             articleElement.classList.add("article", "mb-4");
//             articleElement.innerHTML = `
//                <div class = "card">
//                 <img src = "${article.urlToImage}" class = "card-img-top" alt = "${article.title}"
//                  <div class = "card-body">
//                    <h5 class = "card-title">${article.title}</h5>
//                  <p class = "card-text">${article.description}</p>
//                  <a href = "${article.url}" class = "btn btn-primary" target = "_blank"> Read More</a>
//                  </div>
//                </div>`;
//             newsContent.appendChild(newsItem);
//           });
//         } catch (error) {
//           console.error("Error fetching news:", error);
//         }
//       });
//     })
//     .catch(function (error) {
//       console.error("Error fetching news:", error);
//     });
// }

// document.addEventListener("DOMContentLoaded", fetchNews);
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
    const articleTtile = article.querySelector("h5").textContent;
    const articleUrl = article.querySelector("a").href;
    const articleDecription = article.querySelector("p").textContent;
    console.log(articleTtile);
    console.log(articleUrl);
    console.log(articleDecription);
    /// cehcking they work

    // fetch request to a api endpoint
    fetch("/api/rating/save", {
      method: "POST",
      body: JSON.stringify({
        starrating: starRating,
        articletitle: articleTtile,
        articleimg: articleImage,
        articleurl: articleUrl,
        articledecription: articleDecription,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((responce) => responce.json())
      .then((data) => {
        console.log(data);
      });
  });
});
