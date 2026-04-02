/**
 * SAURAV CHOUDHARY - PORTFOLIO CORE ENGINE 2026
 * Features: Magnetic Cursor, Intersection Observer, 3D Tilt, Ripple Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. DYNAMIC SCROLL PROGRESS
    const progressBar = document.getElementById('progress-bar');
    const updateScrollProgress = () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalHeight) * 100;
        if (progressBar) progressBar.style.width = `${progress}%`;
    };
    window.addEventListener('scroll', updateScrollProgress);

    // 2. THE 3D TILT EFFECT (For Glass Boxes)
    // Makes cards tilt toward your mouse for a premium feel
    const tiltCards = document.querySelectorAll('.glass-box');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
        });
    });

    // 3. ENHANCED PROFILE INTERACTION
    const profileContainer = document.getElementById('profileContainer');
    if (profileContainer) {
        const triggerRipple = (e) => {
            profileContainer.classList.add('active');
            
            // Haptic Feedback for Mobile (If supported)
            if (window.navigator.vibrate) window.navigator.vibrate(20);
            
            setTimeout(() => profileContainer.classList.remove('active'), 800);
        };
        profileContainer.addEventListener('click', triggerRipple);
    }

    // 4. "STAGGERED" REVEAL ANIMATION
    // Elements slide in one-by-one rather than all at once
    const observerOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a small delay based on index for a "staggered" look
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 100); 
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.glass-box, .roadmap-item').forEach(el => {
        el.classList.add('reveal-init'); // Set initial state in CSS
        revealObserver.observe(el);
    });

    // 5. SMOOTH NAV & ACTIVE LINK TRACKING
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});