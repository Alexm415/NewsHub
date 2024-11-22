/*let apiLink = `https://newsapi.org/v2/everything?q=tesla&from=2024-10-20&sortBy=publishedAt&apiKey=7e298be2b074469685f446919ba4226b`

async function fetchNews() {
  fetch(apiLink)
    .then(function (response) {
      console.log(response);
      console.log(response);
      return response.json();
    })
    .then(function (data) {
    console.log(data);
    const newsContainer = document.getElementById('news-container');
    const newsContainer = document.getElementById('news-container');
      newsContainer.innerHTML = "";
  
      data.articles.forEach((article) => {
        const articleElement = document.createElement('div');
        articleElement.classList.add("article", "mb-4");
        articleElement.innerHTML = `
          <div class = "card">
            <img src = "${article.urlToImage}" class = "card-img-top" alt = "${article.title}"
            <div class = "card-body">
              <h5 class = "card-title">${article.title}</h5>
              <p class = "card-text">${article.description}</p>
              <a href = "${article.url}" class = "btn btn-primary" target = "_blank"> Read More</a>
            </div>
          </div>`;
        newsContainer.appendChild(articleElement);
    
    // try {
    //   const newsContainer = document.getElementById('news-container');
    //   newsContainer.innerHTML = "";
  
    //   data.articles.forEach((article) => {
    //     const articleElement = document.createElement('div');
    //     articleElement.classList.add("article", "mb-4");
    //     articleElement.innerHTML = `
    //       <div class = "card">
    //         <img src = "${article.urlToImage}" class = "card-img-top" alt = "${article.title}"
    //         <div class = "card-body">
    //           <h5 class = "card-title">${article.title}</h5>
    //           <p class = "card-text">${article.description}</p>
    //           <a href = "${article.url}" class = "btn btn-primary" target = "_blank"> Read More</a>
    //         </div>
    //       </div>`;
    //     newsContent.appendChild(newsItem);
    //   });
    // } catch(error) {
    //   console.error('Error fetching news:', error);
    // }
        newsContainer.appendChild(articleElement);
    
    // try {
    //   const newsContainer = document.getElementById('news-container');
    //   newsContainer.innerHTML = "";
  
    //   data.articles.forEach((article) => {
    //     const articleElement = document.createElement('div');
    //     articleElement.classList.add("article", "mb-4");
    //     articleElement.innerHTML = `
    //       <div class = "card">
    //         <img src = "${article.urlToImage}" class = "card-img-top" alt = "${article.title}"
    //         <div class = "card-body">
    //           <h5 class = "card-title">${article.title}</h5>
    //           <p class = "card-text">${article.description}</p>
    //           <a href = "${article.url}" class = "btn btn-primary" target = "_blank"> Read More</a>
    //         </div>
    //       </div>`;
    //     newsContent.appendChild(newsItem);
    //   });
    // } catch(error) {
    //   console.error('Error fetching news:', error);
    // }
  
  });
})
.catch(function (error) {
  console.error('Error fetching news:', error);
});
}
})
.catch(function (error) {
  console.error('Error fetching news:', error);
});
}

  

document.addEventListener('DOMContentLoaded', fetchNews); */
