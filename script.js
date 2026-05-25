/* ==========================================================================
   INTERACTIVE PORTFOLIO ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize UI Elements
    initStickyNavbar();
    initMobileMenu();
    initScrollSpy();
    initScrollReveal();
    initCopyUtilityGlobal();
    initConsoleGreeting();
});

/* ==========================================================================
   STICKY NAVBAR DYNAMICS
   ========================================================================== */
function initStickyNavbar() {
    const navbar = document.getElementById('navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger immediately to check initial load state
}

/* ==========================================================================
   MOBILE RESPONSIVE MENU
   ========================================================================== */
function initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-toggle-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-item');

    const toggleMenu = () => {
        const isOpen = navMenu.classList.toggle('open');
        toggleBtn.classList.toggle('open');
        toggleBtn.setAttribute('aria-expanded', isOpen);
        
        // Prevent background scrolling when menu is active
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    const closeMenu = () => {
        navMenu.classList.remove('open');
        toggleBtn.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };

    // Toggle menu click
    toggleBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking link items
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close menu when resizing screen to desktop width
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
}

/* ==========================================================================
   SCROLL SPYING (ACTIVE NAV ITEMS)
   ========================================================================== */
function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    const spyOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px', // Focus window centered vertically
        threshold: 0
    };

    const spyCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(spyCallback, spyOptions);
    sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   INTERSECTION OBSERVER SCROLL REVEAL
   ========================================================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const revealOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px', // Reveal slightly before the element fully enters viewport
        threshold: 0.1
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once element is visible
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(revealCallback, revealOptions);
    revealElements.forEach(element => observer.observe(element));
}

/* ==========================================================================
   CLIPBOARD COPYING & TOAST NOTIFICATION UTILITY
   ========================================================================== */
function initCopyUtilityGlobal() {
    // Bind copy function globally so HTML inline events can access it
    window.copyText = (textToCopy, buttonElement) => {
        if (!navigator.clipboard) {
            // Fallback for older browsers
            fallbackCopyText(textToCopy, buttonElement);
            return;
        }

        navigator.clipboard.writeText(textToCopy).then(() => {
            showCopyFeedback(buttonElement);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };
}

function fallbackCopyText(text, buttonElement) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopyFeedback(buttonElement);
        }
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}

function showCopyFeedback(buttonElement) {
    const originalText = buttonElement.textContent;
    buttonElement.textContent = 'Copied!';
    buttonElement.style.color = '#10b981'; // Green accent feedback
    buttonElement.disabled = true;

    // Trigger Toast Notification
    const toast = document.getElementById('toast');
    toast.classList.add('show');

    // Reset button and toast state
    setTimeout(() => {
        buttonElement.textContent = originalText;
        buttonElement.style.color = '';
        buttonElement.disabled = false;
        toast.classList.remove('show');
    }, 2500);
}

/* ==========================================================================
   CONSOLE GREETING (DEVELOPER ACCENT)
   ========================================================================== */
function initConsoleGreeting() {
    console.log(
        '%cHello, curious developer! 🚀',
        'color: #6366f1; font-size: 1.5rem; font-weight: bold;'
    );
    console.log(
        '%c"I am Nikhilesh Gayakwad, a 4th-semester B.Tech CSE student practicing DSA and Web Dev. Feel free to explore my source code!"',
        'color: #94a3b8; font-size: 1rem;'
    );
    console.log(
        '%cIf you like this portfolio, let\'s connect on LinkedIn: %chttps://linkedin.com/in/nikhilesh-gayakwad-39523b31b',
        'color: #94a3b8; font-size: 0.95rem;',
        'color: #0d9488; font-size: 0.95rem; text-decoration: underline;'
    );
}
