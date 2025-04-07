
document.addEventListener("DOMContentLoaded", () => {
  const fname = document.getElementById("fname");
  const mname = document.getElementById("mname");
  const lname = document.getElementById("lname");
  const fullname = document.getElementById("fullname");

  function updateFullName() {
    const full = [fname.value, mname.value, lname.value].filter(Boolean).join(" ");
    fullname.value = full;
  }

  fname.addEventListener("input", updateFullName);
  mname.addEventListener("input", updateFullName);
  lname.addEventListener("input", updateFullName);
});
document.getElementById("photo").addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;
  
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSize = 1 * 1024 * 1024; // 1MB in bytes
  
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPEG, JPG, or PNG formats are allowed.");
      this.value = ""; // clear file input
      return;
    }
  
    if (file.size > maxSize) {
      alert("File size must be under 1MB.");
      this.value = ""; // clear file input
    }
  });
  
  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault(); // ❗ Do this only once at top
  
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
  
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return false;
    }
    localStorage.setItem("tempEmail", document.getElementById("email").value);
    localStorage.setItem("tempPassword", document.getElementById("password").value);
    // ✅ If passwords match, redirect
    alert("Register successful!");
    window.location.href = "../login/Login.html";
  });
  
 
 