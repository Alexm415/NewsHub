const search = document.getElementById("btnsearch");
console.log(search);
search.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log("click");
  const searchData = {
    search: document.getElementById("search").value,
  };
  window.location.href = `/search/${searchData.search}`;
});
