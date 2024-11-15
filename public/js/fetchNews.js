async function fetchNews() {
  try {
    const response = await fetch('/api/news');
    const newData = await response.json();
    const newsContent = document.getElementsById('news-content');

    newsData.articles.forEach((article) => {
      const newsItem = document.createElement('div');
      newsItem.classList.add('col-md-4', 'mb-3');
      newsItem.innerHTML = `
        <div class = "card">
          <img src = "${article.urlToImage}" class = "card-img-top" alt = "${article.title}"
          <div class = "card-body">
            <h5 class = "card-title">${article.title}</h5>
            <p class = "card-text">${article.description}</p>
            <a href = "${article.url}" class = "btn btn-primary" target = "_blank"> Read More</a>
          </div>
        </div>`;
      newsContent.appendChild(newsItem);
    });
  } catch(error) {
    console.error('Error fetching news:', error);
  }
}

document.addEventListener('DOMContentLoaded', fetchNews);