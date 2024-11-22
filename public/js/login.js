const form = document.getElementById('loginForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = {
    userName: document.getElementById('username').value,
    password: document.getElementById('password').value,
  }
  console.log('form data:', formData);
  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  if (data.success) {
    window.location.href = '/';
  } else {
    alert(data.message);
  }
});
