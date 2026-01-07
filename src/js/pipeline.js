document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial Hero Animation
    const heroTimeline = gsap.timeline();

    heroTimeline
        .to(".pipeline-title .word", {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power4.out"
        })
        .to(".pipeline-subtitle", {
            opacity: 1,
            duration: 1,
            ease: "power2.out"
        }, "-=0.5")
        .to(".pipeline-description", {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out"
        }, "-=0.8")
        .to(".scroll-indicator", {
            opacity: 1,
            duration: 1
        }, "-=0.5");

    // Scroll Flow Animation
    // Animate the line drawing down
    gsap.from(".pipeline-line", {
        scaleY: 0,
        transformOrigin: "top top",
        scrollTrigger: {
            trigger: ".pipeline-hero",
            start: "bottom center",
            end: "bottom bottom",
            scrub: true
        }
    });

    // Animate Phase Blocks
    const phases = document.querySelectorAll(".phase-block");

    phases.forEach((phase, index) => {
        // Determine direction based on class or index
        // Left blocks slide from left, right blocks from right
        const isRight = phase.classList.contains("right");
        const xOffset = isRight ? 50 : -50;

        gsap.fromTo(phase,
            {
                opacity: 0,
                x: xOffset,
                y: 50
            },
            {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: phase,
                    start: "top 80%", // When top of element hits 80% of viewport
                    end: "bottom 30%", // Deactivate when bottom hits 30% from top
                    toggleActions: "play reverse play reverse"
                }
            }
        );
    });
});
