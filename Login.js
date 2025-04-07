
  let captcha = "";

  function generateCaptcha() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById("captchaText").innerText = captcha;
  }

  function loginUser() {
    const enteredUser = document.getElementById("username").value;
    const enteredPass = document.getElementById("password").value;
    const enteredCaptcha = document.getElementById("captchaInput").value;

    // Replace with your actual username and password
    const correctUser = localStorage.getItem("tempEmail");
    const correctPass = localStorage.getItem("tempPassword");
    

    if (enteredUser !== correctUser || enteredPass !== correctPass) {
      alert("Invalid username or password!");
      return false;
    }

    if (enteredCaptcha !== captcha) {
      alert("Incorrect captcha. Please try again.");
      generateCaptcha(); // refresh captcha
      return false;
    }

    alert("Login successful!");
    window.location.href = "/form/fir/fir-form.html"; // redirect to your form page
    return false; // prevent actual form submission for demo
  }

  // Generate captcha on page load
  window.onload = generateCaptcha;
