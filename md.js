/* Meedo Graphic — script.js
   Handles:
   - year in footer
   - contact form fake submit + message
   - like buttons persisted to localStorage
*/

document.addEventListener("DOMContentLoaded", function () {
  // Footer year
  document.getElementById("year").textContent = new Date().getFullYear();

  // CONTACT FORM (simple client-side flow)
  const contactForm = document.getElementById("contactForm");
  const responseEl = document.getElementById("formResponse");
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      responseEl.style.color = "crimson";
      responseEl.textContent = "Please complete all fields.";
      return;
    }

    // Simulate successful send (replace with real API endpoint if available)
    responseEl.style.color = "green";
    responseEl.textContent = `Thanks ${name}! I received your message. I'll get back to you shortly.`;
    contactForm.reset();
  });

  // ===== Likes system (localStorage) =====
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    const id = card.dataset.id;
    const likeBtn = card.querySelector(".like-btn");
    const likeCountEl = card.querySelector(".like-count");

    // load saved values
    const savedCount = parseInt(localStorage.getItem(`meedo-likes-${id}`), 10);
    const savedLiked = localStorage.getItem(`meedo-liked-${id}`) === "true";

    likeCountEl.textContent = Number.isFinite(savedCount) ? savedCount : 0;
    if (savedLiked) likeBtn.classList.add("liked");

    likeBtn.addEventListener("click", function () {
      let count = parseInt(likeCountEl.textContent, 10) || 0;
      const liked = likeBtn.classList.toggle("liked");

      if (liked) count += 1;
      else count = Math.max(0, count - 1);

      likeCountEl.textContent = count;
      localStorage.setItem(`meedo-likes-${id}`, count);
      localStorage.setItem(`meedo-liked-${id}`, liked);
    });
  });
});
