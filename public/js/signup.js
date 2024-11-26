const form = document.querySelector("form");
console.log(form);
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("click");
  console.log(document.getElementById("username"));
  const formData = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  console.log("form data:", formData);

  const response = await fetch("/signup", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data.success) {
    console.log("success");
    window.location.href = "/";
  } else {
    alert(data.message);
  }
});

