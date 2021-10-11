
 const form = document.querySelector('form');
  const emailError = document.querySelector('.email.error');
  const passwordError = document.querySelector('.password.error');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // reset errors
    emailError.textContent = '';
    passwordError.textContent = '';

    // get values
    const name = form.elements[1].value;
    const number = form.elements[2].value;
    const email = form.elements[3].value;
    const password = form.elements[4].value;

    try {
      const res = await fetch('/signup', { 
        method: 'POST', 
        body: JSON.stringify({ email, password }),
        headers: {'Content-Type': 'application/json'}
      });
      const data = await res.json();
      console.log(data);
      if (data.errors) {
        emailError.textContent = data.errors.email;
        passwordError.textContent = data.errors.password;
      }
      if (data.user) {
        location.assign('task');
      }

    }
    catch (err) {
      console.log(err);
    }

  });