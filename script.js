document.addEventListener('DOMContentLoaded', () => {
    // 1. Cursor Glow Effect
    const cursorGlow = document.getElementById('cursor-glow');
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursorGlow, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // 2. Auth Logic
    window.handleAuth = (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        const name = email.split('@')[0];
        loginSuccess(name);
    };

    window.simulateGoogleLogin = () => {
        const authBox = document.querySelector('.auth-box');
        authBox.style.opacity = '0.5';
        authBox.style.pointerEvents = 'none';
        
        setTimeout(() => {
            loginSuccess("Google AI User");
        }, 1200);
    };

    function loginSuccess(name) {
        document.getElementById('user-display-name').innerText = name;
        
        // Animations to switch screens
        gsap.to('#auth-gate', {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: "power3.inOut",
            onComplete: () => {
                document.getElementById('auth-gate').style.display = 'none';
                const app = document.getElementById('app-interface');
                app.style.display = 'block';
                app.style.opacity = '0';
                gsap.to(app, {
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out"
                });
                initEditor();
            }
        });
    }

    // 3. Editor View Logic
    window.switchView = (view) => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.view-content').forEach(v => v.classList.remove('active'));
        
        if (view === 'editor') {
            document.querySelector('.tab:nth-child(1)').classList.add('active');
            document.getElementById('view-editor').classList.add('active');
        } else {
            document.querySelector('.tab:nth-child(2)').classList.add('active');
            document.getElementById('view-preview').classList.add('active');
            simulatePreviewLoad();
        }
    };

    function initEditor() {
        const lineNumbers = document.querySelector('.line-numbers');
        lineNumbers.innerHTML = '';
        for (let i = 1; i <= 30; i++) {
            const num = document.createElement('div');
            num.innerText = i;
            lineNumbers.appendChild(num);
        }
    }

    function simulatePreviewLoad() {
        const placeholder = document.querySelector('.preview-placeholder');
        placeholder.style.display = 'block';
        setTimeout(() => {
            gsap.to(placeholder, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    placeholder.style.display = 'none';
                    const frame = document.querySelector('.preview-frame');
                    frame.innerHTML = '<h2 style="color:#1f2937; font-family:Inter; font-weight:800; letter-spacing:-1px;">BUILD STATUS: ONLINE</h2>';
                }
            });
        }, 1500);
    }

    // 4. Chat Logic
    window.sendMessage = () => {
        const input = document.getElementById('chat-input');
        const text = input.value.trim();
        if (!text) return;

        addMessage('user', text);
        input.value = '';

        // Simulate AI Response
        setTimeout(() => {
            const responses = [
                "Excellent choice. I'll architect the structural components for that.",
                "Initializing the neural layer for your request...",
                "The code is being computed. Check the editor for the output.",
                "Vander Builder is currently optimizing the deployment strategy."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage('system', randomResponse);
            
            // Simulate code appearing in editor
            updateCode(`// Generating based on: ${text}\nconst AI_LAYER = "OPTIMIZED";\nfunction deploy() {\n    return "SYSTEM_SUCCESS";\n}`);
        }, 1000);
    };

    function addMessage(type, text) {
        const container = document.getElementById('chat-messages');
        const msg = document.createElement('div');
        msg.className = `message ${type}`;
        msg.innerHTML = `<p>${text}</p>`;
        container.appendChild(msg);
        container.scrollTop = container.scrollHeight;
        
        gsap.from(msg, {
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(1.7)"
        });
    }

    function updateCode(newCode) {
        const display = document.getElementById('code-display').querySelector('code');
        display.innerText = newCode;
    }

    // 5. API Modal Logic
    const apiModal = document.getElementById('api-modal');
    window.openApiKeyModal = () => { apiModal.style.display = 'flex'; };
    window.closeApiKeyModal = () => { apiModal.style.display = 'none'; };
    window.saveKeys = () => {
        const btn = document.querySelector('#api-modal .btn-glow');
        btn.innerText = "CONFIG SAVED";
        setTimeout(() => {
            btn.innerText = "SAVE CONFIG";
            closeApiKeyModal();
        }, 1000);
    };

    // 6. Logout
    window.logout = () => { window.location.reload(); };

    // 7. Background Particles
    const particleContainer = document.getElementById('particles-js');
    if (particleContainer) {
        for (let i = 0; i < 60; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            const size = Math.random() * 2 + 1;
            p.style.width = p.style.height = `${size}px`;
            p.style.left = `${Math.random() * 100}%`;
            p.style.top = `${Math.random() * 100}%`;
            particleContainer.appendChild(p);
            gsap.to(p, {
                x: `+=${Math.random() * 100 - 50}`,
                y: `+=${Math.random() * 100 - 50}`,
                duration: 10 + Math.random() * 10,
                repeat: -1,
                yoyo: true,
                ease: "linear"
            });
        }
    }
});
