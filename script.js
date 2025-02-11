// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const nav = document.querySelector('.nav');
    let menuOpen = false;

    menuBtn.addEventListener('click', () => {
        if(!menuOpen) {
            menuBtn.classList.add('open');
            nav.classList.add('open');
            menuOpen = true;
        } else {
            menuBtn.classList.remove('open');
            nav.classList.remove('open');
            menuOpen = false;
        }
    });

    // Typing Animation
    const words = ['Web Developer', 'AI Enthusiast', 'Problem Solver'];
    let wordIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deleteSpeed = 50;
    const waitTime = 2000;

    function type() {
        const current = words[wordIndex];
        const subtitle = document.querySelector('.hero__subtitle--animated');

        if (isDeleting) {
            subtitle.textContent = current.substring(0, letterIndex - 1);
            letterIndex--;
        } else {
            subtitle.textContent = current.substring(0, letterIndex + 1);
            letterIndex++;
        }

        if (!isDeleting && letterIndex === current.length) {
            setTimeout(() => {
                isDeleting = true;
            }, waitTime);
        } else if (isDeleting && letterIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        setTimeout(type, isDeleting ? deleteSpeed : typingSpeed);
    }

    type();

    // Scroll Animation
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill__bar').forEach(bar => {
        observer.observe(bar);
        bar.style.setProperty('--level', bar.dataset.level + '%');
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close menu if open
            if (menuOpen) {
                menuBtn.classList.remove('open');
                nav.classList.remove('open');
                menuOpen = false;
            }
        });
    });

    // Parallax Effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.querySelectorAll('.parallax').forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
});


// Show or Hide Back-to-Top Button
window.onscroll = function () {
    let btn = document.querySelector(".back-to-top");
    if (document.documentElement.scrollTop > 300) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};

// Scroll to Top Function
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}
