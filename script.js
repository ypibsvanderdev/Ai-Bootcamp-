document.addEventListener('DOMContentLoaded', () => {
    // 1. Cursor Glow Effect
    const cursorGlow = document.getElementById('cursor-glow');
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        // Use GSAP for smooth follow
        gsap.to(cursorGlow, {
            x: x,
            y: y,
            duration: 0.6,
            ease: "power2.out"
        });
    });

    // 2. Glitch Text Interaction
    const glitches = document.querySelectorAll('.glitch-text');
    glitches.forEach(glitch => {
        setInterval(() => {
            if (Math.random() > 0.95) {
                glitch.style.textShadow = `
                    ${Math.random()*10}px ${Math.random()*10}px var(--accent-cyan),
                    ${Math.random()*-10}px ${Math.random()*10}px var(--accent-purple)
                `;
                setTimeout(() => {
                    glitch.style.textShadow = '';
                }, 100);
            }
        }, 200);
    });

    // 3. GSAP Scroll Animations
    // Ensure GSAP and ScrollTrigger are loaded
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Feature cards reveal
        gsap.from('.feature-card', {
            scrollTrigger: {
                trigger: '.feature-grid',
                start: 'top 80%',
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });

        // Hero Content Reveal
        gsap.from('.glitch-text', {
            y: 100,
            opacity: 0,
            duration: 1.5,
            ease: "expo.out"
        });

        // Stats Reveal
        gsap.from('.stat', {
            scrollTrigger: {
                trigger: '.mission',
                start: 'top 70%',
            },
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.3,
            ease: "power2.out"
        });

        // Title Reveal Animations
        document.querySelectorAll('.title-reveal').forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 90%',
                },
                x: -50,
                opacity: 0,
                duration: 1,
                ease: "power2.out"
            });
        });
    }

    // 4. Simple Background Particles
    const particleContainer = document.getElementById('particles-js');
    if (particleContainer) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random styling for particles
            const size = Math.random() * 3;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.opacity = Math.random() * 0.5;
            
            particleContainer.appendChild(particle);

            // Animate each particle slightly
            gsap.to(particle, {
                y: `+=${Math.random() * 100 - 50}`,
                x: `+=${Math.random() * 100 - 50}`,
                duration: 10 + Math.random() * 10,
                repeat: -1,
                yoyo: true,
                ease: "linear"
            });
        }
    }

    // 5. Auth Modal Logic
    const authModal = document.getElementById('auth-modal');
    window.toggleAuthModal = () => {
        const isVisible = authModal.style.display === 'flex';
        authModal.style.display = isVisible ? 'none' : 'flex';
    };

    window.switchAuth = () => {
        const title = document.getElementById('modal-title');
        title.innerText = title.innerText === 'ASCEND' ? 'CREATE CORE' : 'ASCEND';
    };

    window.simulateGoogleLogin = () => {
        const title = document.getElementById('modal-title');
        title.innerText = "CONNECTING...";
        
        setTimeout(() => {
            loginSuccess("Google AI User");
        }, 1500);
    };

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = e.target.querySelector('input[type="email"]').value;
            loginSuccess(email.split('@')[0]);
        });
    }

    function loginSuccess(name) {
        // Update UI
        document.getElementById('auth-buttons').style.display = 'none';
        document.getElementById('user-profile').style.display = 'flex';
        document.getElementById('user-name').innerText = name;
        
        // Hide landing sections, show dashboard
        document.getElementById('hero').style.display = 'none';
        document.getElementById('features').style.display = 'none';
        document.getElementById('mission').style.display = 'none';
        document.getElementById('join').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        
        // Close modal
        authModal.style.display = 'none';
        
        // Scroll to top
        window.scrollTo(0,0);

        // Terminal Greeting
        const terminal = document.querySelector('.terminal-view');
        if (terminal) {
            const newLine = document.createElement('div');
            newLine.className = 'terminal-line';
            newLine.innerText = `> Welcome back, ${name}. Systems initialized.`;
            terminal.appendChild(newLine);
        }
    }

    window.logout = () => {
        window.location.reload(); 
    };
});

// CSS for particles (adding dynamically to satisfy 'tuff' requirements)
const style = document.createElement('style');
style.textContent = `
    #particles-js {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -2;
        background: radial-gradient(circle at center, #111 0%, #000 100%);
    }
    .particle {
        position: absolute;
        background: #fff;
        border-radius: 50%;
        pointer-events: none;
        box-shadow: 0 0 10px rgba(255,255,255,0.3);
    }
`;
document.head.appendChild(style);
