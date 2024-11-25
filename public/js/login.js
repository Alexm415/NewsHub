const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };
  console.log("form data:", formData);
  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  console.log("response data:", data); 
  if (data.success) {
    window.location.href = "/profile";
  } else {
    alert(data.message || "An error occurred");
  }
});
