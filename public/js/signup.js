const form = document.getElementById('signupForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = {
    userName: document.getElementById('username').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
  }
  console.log('form data:', formData);
  const response = await fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  if (data.success) {
    console.log('success');
    window.location.href = '/';
  } else {
    alert(data.message);
  }
});
