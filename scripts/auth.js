// Login validation logic

// Function to verify user before showing content
document.addEventListener('DOMContentLoaded', () => {
    const langOptions = document.querySelectorAll('.lang-option');
    const displayBtn = document.getElementById('current-lang-display');

    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault(); // Prevents the page from jumping

            const selectedLang = option.getAttribute('data-lang');

            // Update the main button text
            displayBtn.innerText = `Language (${selectedLang})`;

            // Log for your future JS updates
            console.log(`Language changed to: ${selectedLang}`);

            // Optional: Close menu after selection
            option.parentElement.style.opacity = "0";
            setTimeout(() => option.parentElement.style.opacity = "", 500);
        });
    });
});
/* ==========================================================================
   PORTAL NAVIGATION LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Logic for "Login" button on the Home Page
    const homeLoginBtn = document.querySelector('.login-btn');
    if (homeLoginBtn) {
        homeLoginBtn.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }

    // 2. Logic for Judge Portal
    const judgeBtn = document.querySelector('.judge-btn');
    if (judgeBtn) {
        judgeBtn.addEventListener('click', () => {
            console.log("Redirecting to Judge Dashboard...");
            // Add your dashboard link here later: window.location.href = 'judge-dash.html';
            alert("Entering Judge Portal...");
        });
    }

    // 3. Logic for Lawyer Portal
    const lawyerBtn = document.querySelector('.lawyer-btn');
    if (lawyerBtn) {
        lawyerBtn.addEventListener('click', () => {
            console.log("Redirecting to Lawyer Dashboard...");
            // Add your dashboard link here later: window.location.href = 'lawyer-dash.html';
            alert("Entering Lawyer Portal...");
        });
    }
});
