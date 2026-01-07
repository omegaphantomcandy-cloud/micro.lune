// ===========================
// PROJECT PAGE INTERACTIONS
// ===========================

// Feedback form handling
const feedbackForm = document.getElementById('feedbackForm');
const feedbackText = document.getElementById('feedbackText');

if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const feedback = feedbackText.value.trim();

        // Simple analytics tracking (you can replace with actual backend)
        console.log('Feedback received:', feedback);

        // Show thank you message
        feedbackForm.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--color-accent-primary);">
                <h3 style="font-family: var(--font-display); margin-bottom: 1rem;">Thank You! 🙏</h3>
                <p style="color: var(--color-text-secondary);">Your feedback has been received. I appreciate you taking the time!</p>
            </div>
        `;

        // Optional: Send to backend/analytics
        // fetch('/api/feedback', { method: 'POST', body: JSON.stringify({ feedback, page: 'cyber-luna' }) });
    });
}

// Scroll animations for project page
gsap.from('.project-stats .stat', {
    scrollTrigger: {
        trigger: '.project-stats',
        start: 'top 80%'
    },
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: 0.2,
    ease: 'power2.out'
});

gsap.from('.feature', {
    scrollTrigger: {
        trigger: '.feature-grid',
        start: 'top 75%'
    },
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power2.out'
});

gsap.from('.trust-card', {
    scrollTrigger: {
        trigger: '.trust-grid',
        start: 'top 75%'
    },
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power2.out'
});