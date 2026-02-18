// landing page interactivity

 // --- Navbar Scroll Effect ---
 window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// --- Improved Footer Year ---
const footer = document.getElementById('footer-text');
footer.innerHTML = `&copy; ${new Date().getFullYear()} <b>EliteTask</b>. All rights reserved.`;

// --- Button Navigation ---
const setupRedirect = (id) => {
    const btn = document.getElementById(id);
    if (btn) {
        btn.addEventListener('click', () => {
           window.location.href = 'signup.html'; 
        });
    }
};

setupRedirect('get-started');
setupRedirect('sign-up');

