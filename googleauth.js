// googleauth.js  (for Firebase 7.22.1)
// Requires that firebase-app.js, firebase-auth.js, firebase-database.js etc. are already loaded
// and firebase.initializeApp(...) has already run in your main script.

(function() {
  // --- UI element for status text ---
  var statusText = document.createElement("div");
  statusText.id = "google-login-status";
  statusText.style.position = "fixed";
  statusText.style.left = "50%";
  statusText.style.bottom = "10px";
  statusText.style.transform = "translateX(-50%)";
  statusText.style.background = "rgba(0,0,0,0.6)";
  statusText.style.color = "#fff";
  statusText.style.padding = "6px 10px";
  statusText.style.borderRadius = "8px";
  statusText.style.fontFamily = "sans-serif";
  statusText.style.fontSize = "14px";
  statusText.style.zIndex = "9999";
  statusText.innerText = "Not signed in (anonymous)";
  document.body.appendChild(statusText);

  // --- Keybind listener ---
  window.addEventListener("keydown", function(e) {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "g") {
      e.preventDefault();
      googleLogin();
    }
  });

  function googleLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(function(result) {
        var user = result.user;
        console.log("✅ Google sign-in success:", user.email);
        statusText.innerText = "Signed in as " + user.email;
      })
      .catch(function(error) {
        console.error("❌ Google sign-in error:", error);
        statusText.innerText = "Sign-in failed: " + (error.message || error.code);
      });
  }

  // --- Update status on auth changes ---
  firebase.auth().onAuthStateChanged(function(user) {
    if (user && user.email) {
      console.log("Currently signed in as:", user.email);
      statusText.innerText = "Signed in as " + user.email;
    } else if (user) {
      // anonymous
      statusText.innerText = "Signed in anonymously";
    } else {
      statusText.innerText = "Not signed in";
    }
  });
})();
