document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const semesterPage = document.querySelector('.semester-page');
    const homePage = document.querySelector('.home-page');
    const semesterButtons = document.querySelectorAll('.semester');
    const backButton = document.querySelector('.back-btn');
    
    // Elements for hello world display
    const helloWorldText = document.querySelector('.hello-world-text');
    const helloWorldLanguage = document.querySelector('.hello-world-language');
    const lineNumbers = document.querySelector('.hello-world-line-numbers');
    const fileNameDisplay = document.querySelector('.github-header span');

    // Add hello world examples in different programming languages with file extensions
    const helloWorldExamples = [
        { code: 'console.log("Hello World");', language: 'JavaScript', extension: 'js', tokens: [{ type: 'function', text: 'console.log' }, { type: 'normal', text: '(' }, { type: 'string', text: '"Hello World"' }, { type: 'normal', text: ');' }] },
        { code: 'print("Hello World")', language: 'Python', extension: 'py', tokens: [{ type: 'function', text: 'print' }, { type: 'normal', text: '(' }, { type: 'string', text: '"Hello World"' }, { type: 'normal', text: ')' }] },
        { code: 'System.out.println("Hello World");', language: 'Java', extension: 'java', tokens: [{ type: 'variable', text: 'System.out' }, { type: 'normal', text: '.' }, { type: 'function', text: 'println' }, { type: 'normal', text: '(' }, { type: 'string', text: '"Hello World"' }, { type: 'normal', text: ');' }] },
        { code: 'cout << "Hello World" << endl;', language: 'C++', extension: 'cpp', tokens: [{ type: 'variable', text: 'cout' }, { type: 'normal', text: ' << ' }, { type: 'string', text: '"Hello World"' }, { type: 'normal', text: ' << ' }, { type: 'variable', text: 'endl' }, { type: 'normal', text: ';' }] },
        { code: 'printf("Hello World");', language: 'C', extension: 'c', tokens: [{ type: 'function', text: 'printf' }, { type: 'normal', text: '(' }, { type: 'string', text: '"Hello World"' }, { type: 'normal', text: ');' }] },
        { code: 'fmt.Println("Hello World")', language: 'Go', extension: 'go', tokens: [{ type: 'variable', text: 'fmt' }, { type: 'normal', text: '.' }, { type: 'function', text: 'Println' }, { type: 'normal', text: '(' }, { type: 'string', text: '"Hello World"' }, { type: 'normal', text: ')' }] },
        { code: 'puts "Hello World"', language: 'Ruby', extension: 'rb', tokens: [{ type: 'function', text: 'puts' }, { type: 'normal', text: ' ' }, { type: 'string', text: '"Hello World"' }] },
        { code: 'echo "Hello World";', language: 'PHP', extension: 'php', tokens: [{ type: 'keyword', text: 'echo' }, { type: 'normal', text: ' ' }, { type: 'string', text: '"Hello World"' }, { type: 'normal', text: ';' }] },
        { code: 'Console.WriteLine("Hello World");', language: 'C#', extension: 'cs', tokens: [{ type: 'variable', text: 'Console' }, { type: 'normal', text: '.' }, { type: 'function', text: 'WriteLine' }, { type: 'normal', text: '(' }, { type: 'string', text: '"Hello World"' }, { type: 'normal', text: ');' }] }
    ];

    // These elements might not exist in the current HTML structure
    const semesterNavLink = document.getElementById('semester-nav');
    const exploreButton = document.getElementById('explore-btn');
    const features = document.querySelectorAll('.feature');
    const techStack = document.querySelector('.tech-stack');
    
    // Check if cursor face elements exist before using them
    const cursorFace = document.getElementById('cursor-face');
    const faceEyes = document.querySelectorAll('.face-eye');
    const faceMouth = document.querySelector('.face-mouth');

    // Initialize highlight.js if it exists
    document.querySelectorAll('pre code').forEach(block => {
        if (typeof hljs !== 'undefined') {
            hljs.highlightBlock(block);
        }
    });

    // Only add cursor-following functionality if the elements exist
    if (cursorFace && faceEyes.length && faceMouth) {
        document.addEventListener('mousemove', (e) => {
            // Position the face to follow cursor
            cursorFace.style.left = e.clientX + 'px';
            cursorFace.style.top = e.clientY + 'px';
            
            // Calculate eye positions based on mouse position relative to viewport center
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            
            // Eye movement calculations
            const eyeMaxMove = 3;
            const xRatio = (e.clientX / viewportWidth) - 0.5; // -0.5 to 0.5
            const yRatio = (e.clientY / viewportHeight) - 0.5; // -0.5 to 0.5
            
            // Apply eye movements
            faceEyes.forEach(eye => {
                eye.style.transform = `translate(${xRatio * eyeMaxMove * 2}px, ${yRatio * eyeMaxMove * 2}px)`;
            });
            
            // Change face expression based on screen position
            if (e.clientY < viewportHeight * 0.3) {
                // Top of the screen - surprised expression
                faceMouth.className = 'face-mouth surprised';
            } else if (e.clientX > viewportWidth * 0.7) {
                // Right side - happy expression
                faceMouth.className = 'face-mouth happy';
            } else if (e.clientX < viewportWidth * 0.3) {
                // Left side - slightly different expression
                faceMouth.className = 'face-mouth';
            } else {
                // Default expression
                faceMouth.className = 'face-mouth';
            }
        });
        
        // Hide cursor face when mouse leaves the window
        document.addEventListener('mouseout', (e) => {
            if (e.relatedTarget === null) {
                cursorFace.style.opacity = '0';
            }
        });
        
        // Show cursor face when mouse enters the window
        document.addEventListener('mouseover', () => {
            cursorFace.style.opacity = '0.9';
        });
    }

    // Generate floating code for background
    generateFloatingCode();
    
    // Matrix-like raining code effect for the hero section
    createRainingCodeEffect();

    // Animation for features on scroll
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    features.forEach(feature => {
        observer.observe(feature);
    });
    
    // Observe tech stack section
    observer.observe(techStack);

    // Show semester page
    const showSemesterPage = () => {
        console.log('Opening semester page');
        if (semesterPage) {
            semesterPage.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            // Staggered animation for semester buttons
            semesterButtons.forEach((button, index) => {
                setTimeout(() => {
                    button.style.opacity = '1';
                    button.style.transform = 'translateY(0)';
                }, 100 * index);
            });
        } else {
            console.error('Semester page element not found!');
        }
    };

    // Hide semester page
    const hideSemesterPage = () => {
        console.log('Closing semester page');
        if (semesterPage) {
            semesterPage.classList.add('hidden');
            document.body.style.overflow = '';
            
            // Reset semester buttons for next time
            setTimeout(() => {
                semesterButtons.forEach(button => {
                    button.style.opacity = '0';
                    button.style.transform = 'translateY(20px)';
                });
            }, 500);
        }
    };

    // Event Listeners
    if (semesterNavLink) {
        semesterNavLink.addEventListener('click', (e) => {
            e.preventDefault();
            showSemesterPage();
        });
    }

    if (exploreButton) {
        exploreButton.addEventListener('click', (e) => {
            e.preventDefault();
            showSemesterPage();
        });
    }

    if (backButton) {
        backButton.addEventListener('click', () => {
            hideSemesterPage();
        });
    }

    // Generate floating code
    function generateFloatingCode() {
        const codeContainer = document.querySelector('.code-container');
        const codePhrases = [
            'if (student.studies) { return success; }',
            'for (let day = 1; day <= 365; day++) { practice(); }',
            'while (notSuccessful) { keepTrying(); }',
            'function solve(problem) { return solution; }',
            'const future = await education.complete();',
            'try { learnNewSkill(); } catch (error) { tryAgain(); }',
            'skills.map(skill => improve(skill));',
            'document.querySelector(".opportunity").addEventListener("click", succeed);'
        ];
        
        // Create 20 random code lines floating in the background
        for (let i = 0; i < 20; i++) {
            const codeElem = document.createElement('div');
            codeElem.className = 'floating-code';
            codeElem.textContent = codePhrases[Math.floor(Math.random() * codePhrases.length)];
            
            // Random positioning and timing
            codeElem.style.top = `${Math.random() * 100}%`;
            codeElem.style.left = `${Math.random() * 100}%`;
            codeElem.style.animationDuration = `${10 + Math.random() * 20}s`;
            codeElem.style.animationDelay = `${Math.random() * 5}s`;
            codeElem.style.opacity = '0.03';
            
            codeContainer.appendChild(codeElem);
        }
    }

    // Create matrix-like raining code effect
    function createRainingCodeEffect() {
        const codeContainer = document.querySelector('.code-container');
        const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const columnCount = 20;
        
        for (let i = 0; i < columnCount; i++) {
            const column = document.createElement('div');
            column.className = 'code-rain-column';
            column.style.left = `${(100 / columnCount) * i}%`;
            column.style.animationDelay = `${Math.random() * 5}s`;
            column.style.opacity = '0.05';
            
            const columnContent = [];
            const length = 10 + Math.floor(Math.random() * 15);
            
            for (let j = 0; j < length; j++) {
                columnContent.push(characters.charAt(Math.floor(Math.random() * characters.length)));
            }
            
            column.textContent = columnContent.join('\n');
            codeContainer.appendChild(column);
        }
    }

    // Handle semester selection
    semesterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const semester = button.getAttribute('data-semester');
            const url = button.getAttribute('data-url');
            
            // Create a "selection" animation effect
            button.classList.add('selected');
            
            // Display selection feedback
            const allOtherButtons = [...semesterButtons].filter(btn => btn !== button);
            allOtherButtons.forEach(btn => btn.style.opacity = '0.5');
            
            // Code highlight animation effect
            button.innerHTML += "<div class='code-highlight'></div>";
            
            // Small delay for visual feedback before taking action
            setTimeout(() => {
                if (semester === '1') {
                    // Open Google Drive folder in new tab for Semester 1
                    window.open('https://drive.google.com/drive/u/1/folders/1--YFnLwuq1icWniJ_af7GoSlO9it_g4k', '_blank');
                    
                    // Reset the buttons after selection
                    button.classList.remove('selected');
                    const highlight = button.querySelector('.code-highlight');
                    if (highlight) highlight.remove();
                    allOtherButtons.forEach(btn => btn.style.opacity = '1');
                    
                    // Hide semester page
                    hideSemesterPage();
                } else if (semester === '2') {
                    // Open Google Drive folder in new tab for Semester 2
                    window.open('https://drive.google.com/drive/folders/1_TUy8f7ckFV0pCmfF__4icAoVLzWRedu?usp=drive_link', '_blank');
                    
                    // Reset the buttons after selection
                    button.classList.remove('selected');
                    const highlight = button.querySelector('.code-highlight');
                    if (highlight) highlight.remove();
                    allOtherButtons.forEach(btn => btn.style.opacity = '1');
                    
                    // Hide semester page
                    hideSemesterPage();
                } else if (semester === '3') {
                    // Open Google Drive folder in new tab for Semester 3
                    window.open('https://drive.google.com/drive/folders/1MglRglAiOq8xfIrClq_DQlfc6pKzrEM3?usp=drive_link', '_blank');
                    
                    // Reset the buttons after selection
                    button.classList.remove('selected');
                    const highlight = button.querySelector('.code-highlight');
                    if (highlight) highlight.remove();
                    allOtherButtons.forEach(btn => btn.style.opacity = '1');
                    
                    // Hide semester page
                    hideSemesterPage();
                } else if (semester === '4') {
                    // Open Google Drive folder in new tab for Semester 4
                    window.open('https://drive.google.com/drive/folders/14P8qMZeHxcRz6Q0Qiy14XALTPZoyglXB?usp=drive_link', '_blank');
                    
                    // Reset the buttons after selection
                    button.classList.remove('selected');
                    const highlight = button.querySelector('.code-highlight');
                    if (highlight) highlight.remove();
                    allOtherButtons.forEach(btn => btn.style.opacity = '1');
                    
                    // Hide semester page
                    hideSemesterPage();
                } else if (semester === '5') {
                    // Open Google Drive folder in new tab for Semester 5
                    window.open('https://drive.google.com/drive/folders/1ohrrkXWHW9x2ugQgp7aPGD-LcwW8BIYV?usp=sharing', '_blank');
                    
                    // Reset the buttons after selection
                    button.classList.remove('selected');
                    const highlight = button.querySelector('.code-highlight');
                    if (highlight) highlight.remove();
                    allOtherButtons.forEach(btn => btn.style.opacity = '1');
                    
                    // Hide semester page
                    hideSemesterPage();
                } else if (semester === '6') {
                    // Navigate to the 404 page for semesters 5 and 6
                    window.location.href = '404.html';

                    // No need to reset or hide as we're navigating away
                } else {
                    // Show alert for other semesters (as before)
                    alert(`You selected Semester ${semester}. Content for this semester will be loaded.`);
                    
                    // Reset the buttons after selection
                    button.classList.remove('selected');
                    const highlight = button.querySelector('.code-highlight');
                    if (highlight) highlight.remove();
                    allOtherButtons.forEach(btn => btn.style.opacity = '1');
                    
                    // Here you would typically redirect to a semester-specific page
                    // For now we'll just hide the semester page
                    hideSemesterPage();
                }
            }, 800);
        });
    });

    // Apple-like parallax effect on mouse move for the hero section
    const heroSection = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    const orbit = document.querySelector('.orbit');

    heroSection.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        
        heroContent.style.transform = `translateX(${xAxis}px) translateY(${yAxis}px)`;
        heroImage.style.transform = `translateX(${-xAxis}px) translateY(${-yAxis}px)`;
        orbit.style.boxShadow = `${-xAxis}px ${-yAxis}px 20px rgba(255, 82, 82, 0.1)`;
    });

    heroSection.addEventListener('mouseleave', () => {
        heroContent.style.transform = 'translateX(0) translateY(0)';
        heroImage.style.transform = 'translateX(0) translateY(0)';
        orbit.style.boxShadow = '0 0 20px rgba(255, 82, 82, 0.1)';
    });

    // Tech icons hover effect
    const techIcons = document.querySelectorAll('.tech-icon');
    
    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.querySelector('i').style.transform = 'scale(1.2) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.querySelector('i').style.transform = 'scale(1) rotate(0)';
        });
    });
    
    // Initialize semester buttons with delay effect
    semesterButtons.forEach(button => {
        button.style.opacity = '0';
        button.style.transform = 'translateY(20px)';
    });

    // Enhanced Apple-like UI animations
    const originalAddAppleLikeAnimations = addAppleLikeAnimations;
    addAppleLikeAnimations = function() {
        originalAddAppleLikeAnimations();
        
        // Override the header background color behavior in the original function
        const originalScrollHandler = window.onscroll;
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.main-header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    };
    
    // Call the modified function
    addAppleLikeAnimations();

    // Function to add Apple-like animations and transitions
    function addAppleLikeAnimations() {
        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Enhanced header with depth effect on scroll
        const header = document.querySelector('.main-header');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Change header appearance based on scroll direction
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
                header.style.backdropFilter = 'blur(15px)';
                // Let the CSS class control the background color
            } else {
                // Scrolling up
                header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.06)';
                header.style.backdropFilter = 'blur(10px)';
                // Let the CSS class control the background color
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
        
        // Button hover effect (macOS style)
        const buttons = document.querySelectorAll('.btn-primary, .btn-login');
        buttons.forEach(button => {
            button.addEventListener('mouseover', () => {
                button.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            });
            
            button.addEventListener('mousedown', () => {
                button.style.transform = 'scale(0.95)';
            });
            
            button.addEventListener('mouseup', () => {
                button.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 200);
            });
        });
        
        // Add magnetic hover effect to features (iOS style)
        const features = document.querySelectorAll('.feature');
        
        features.forEach(feature => {
            feature.addEventListener('mousemove', (e) => {
                const rect = feature.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const tiltX = (x - centerX) / (centerX) * 5;
                const tiltY = (y - centerY) / (centerY) * 5;
                
                feature.style.transform = `perspective(1000px) rotateX(${-tiltY}deg) rotateY(${tiltX}deg) translateY(-10px)`;
                feature.style.boxShadow = `
                    0 10px 30px rgba(0, 0, 0, 0.1),
                    ${tiltX * 0.5}px ${tiltY * 0.5}px 15px rgba(0, 0, 0, 0.05)
                `;
            });
            
            feature.addEventListener('mouseleave', () => {
                feature.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
                feature.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
                feature.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
            });
        });
        
        // Enhanced satellite glow effect
        const satellite = document.querySelector('.satellite');
        if (satellite) {
            setInterval(() => {
                satellite.style.boxShadow = '0 0 30px rgba(255, 82, 82, 0.7)';
                
                setTimeout(() => {
                    satellite.style.boxShadow = '0 0 20px rgba(255, 82, 82, 0.5)';
                }, 1000);
            }, 2000);
        }
        
        // Add parallax depth to tech icons
        const techIcons = document.querySelectorAll('.tech-icon');
        techIcons.forEach(icon => {
            icon.addEventListener('mousemove', (e) => {
                const rect = icon.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const moveX = (x - centerX) / 8;
                const moveY = (y - centerY) / 8;
                
                const iconImg = icon.querySelector('i');
                iconImg.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(1.2)`;
            });
            
            icon.addEventListener('mouseleave', () => {
                const iconImg = icon.querySelector('i');
                iconImg.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
                iconImg.style.transform = 'translate3d(0, 0, 0) scale(1)';
            });
        });
        
        // Add glow effect to logo on hover
        const logo = document.querySelector('.logo');
        logo.addEventListener('mouseenter', () => {
            const logoIcon = logo.querySelector('i');
            logoIcon.style.textShadow = '0 0 15px rgba(255, 82, 82, 0.7)';
            logoIcon.style.transform = 'scale(1.2) rotate(180deg)';
            logoIcon.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
        
        logo.addEventListener('mouseleave', () => {
            const logoIcon = logo.querySelector('i');
            logoIcon.style.textShadow = '0 0 5px rgba(255, 82, 82, 0)';
            logoIcon.style.transform = 'scale(1) rotate(0deg)';
        });

        // Add morphing background effect to hero section
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            // Create canvas for background
            const canvas = document.createElement('canvas');
            canvas.classList.add('hero-bg-canvas');
            canvas.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 0;
                opacity: 0.07;
                pointer-events: none;
            `;
            heroSection.appendChild(canvas);
            
            // Set canvas size
            const setCanvasSize = () => {
                canvas.width = heroSection.offsetWidth;
                canvas.height = heroSection.offsetHeight;
            };
            
            setCanvasSize();
            window.addEventListener('resize', setCanvasSize);
            
            // Animate background
            const ctx = canvas.getContext('2d');
            const circles = [];
            
            // Create initial circles
            for (let i = 0; i < 5; i++) {
                circles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: 50 + Math.random() * 100,
                    color: i % 2 === 0 ? '#ff5252' : '#7c4dff',
                    vx: Math.random() * 0.2 - 0.1,
                    vy: Math.random() * 0.2 - 0.1
                });
            }
            
            // Animation loop
            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Update and draw circles
                circles.forEach(circle => {
                    // Update position
                    circle.x += circle.vx;
                    circle.y += circle.vy;
                    
                    // Bounce off edges
                    if (circle.x < 0 || circle.x > canvas.width) circle.vx *= -1;
                    if (circle.y < 0 || circle.y > canvas.height) circle.vy *= -1;
                    
                    // Draw circle with gradient
                    const gradient = ctx.createRadialGradient(
                        circle.x, circle.y, 0,
                        circle.x, circle.y, circle.radius
                    );
                    
                    gradient.addColorStop(0, circle.color + '30');  // 30 = 0.3 opacity in hex
                    gradient.addColorStop(1, circle.color + '00');  // 00 = 0 opacity in hex
                    
                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
                    ctx.fill();
                });
                
                requestAnimationFrame(animate);
            }
            
            animate();
        }
    }

    // SEMS button functionality - macOS Finder style folder view
    const semsButton = document.querySelector('.btn-login');
    if (semsButton) {
        semsButton.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('SEMS button clicked');
            showSemesterPage();
            
            // Add elastic bounce animation to folders when they appear
            if (semesterButtons.length) {
                semesterButtons.forEach((button, index) => {
                    setTimeout(() => {
                        button.classList.add('folder-bounce');
                        setTimeout(() => {
                            button.classList.remove('folder-bounce');
                        }, 500);
                    }, 100 * index);
                });
            }
        });
    } else {
        console.error('SEMS button not found!');
    }
    
    // Add folder hover effects for macOS feel
    semesterButtons.forEach(button => {
        // Add custom folder colors for each semester
        const folderIcon = button.querySelector('.folder-icon i');
        const semNumber = parseInt(button.getAttribute('data-semester'));
        
        // Set different folder colors based on semester number
        switch(semNumber) {
            case 1:
                folderIcon.style.color = '#3498db'; // Blue
                break;
            case 2:
                folderIcon.style.color = '#2ecc71'; // Green
                break;
            case 3:
                folderIcon.style.color = '#9b59b6'; // Purple
                break;
            case 4:
                folderIcon.style.color = '#e74c3c'; // Red
                break;
            case 5:
                folderIcon.style.color = '#f39c12'; // Orange
                break;
            case 6:
                folderIcon.style.color = '#1abc9c'; // Teal
                break;
        }
        
        // Add 3D transform on hover
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const tiltX = (x - centerX) / (centerX) * 8;
            const tiltY = (y - centerY) / (centerY) * 8;
            
            button.style.transform = `perspective(1000px) rotateX(${-tiltY}deg) rotateY(${tiltX}deg) scale(1.05)`;
            
            // Add dynamic shadow based on mouse position
            const shadowX = (x - centerX) / 10;
            const shadowY = (y - centerY) / 10;
            button.style.boxShadow = `${shadowX}px ${shadowY}px 15px rgba(0, 0, 0, 0.1)`;
            
            // Highlight effect
            folderIcon.style.textShadow = `0 0 15px rgba(0, 0, 0, 0.2)`;
            folderIcon.style.transform = `translateY(-5px) scale(1.1)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
            button.style.boxShadow = '';
            folderIcon.style.textShadow = '';
            folderIcon.style.transform = '';
        });
        
        // Add macOS-style click effect
        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = 'scale(1.05)';
            setTimeout(() => {
                button.style.transform = '';
            }, 200);
        });
    });
    
    // Window controls functionality (close, minimize, maximize)
    const closeButton = document.querySelector('.control.close');
    const minimizeButton = document.querySelector('.control.minimize');
    const maximizeButton = document.querySelector('.control.maximize');
    
    if (closeButton) closeButton.addEventListener('click', hideSemesterPage);
    
    if (minimizeButton) {
        minimizeButton.addEventListener('click', () => {
            const macosWindow = document.querySelector('.macos-window');
            if (macosWindow) {
                macosWindow.style.transform = 'scale(0.001)';
                macosWindow.style.opacity = '0';
                setTimeout(() => {
                    hideSemesterPage();
                    macosWindow.style.transform = '';
                    macosWindow.style.opacity = '';
                }, 300);
            }
        });
    }
    
    if (maximizeButton) {
        maximizeButton.addEventListener('click', () => {
            const macosWindow = document.querySelector('.macos-window');
            if (macosWindow) {
                if (macosWindow.classList.contains('maximized')) {
                    macosWindow.classList.remove('maximized');
                    macosWindow.style.width = '85%';
                    macosWindow.style.height = '80vh';
                } else {
                    macosWindow.classList.add('maximized');
                    macosWindow.style.width = '95%';
                    macosWindow.style.height = '90vh';
                }
            }
        });
    }
    
    // Animation for folder opening with elastic bounce
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            @keyframes folderBounce {
                0% { transform: scale(1); }
                40% { transform: scale(1.08); }
                60% { transform: scale(0.98); }
                80% { transform: scale(1.02); }
                100% { transform: scale(1); }
            }
            
            .folder-bounce {
                animation: folderBounce 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
            }
            
            .macos-window.maximized {
                transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
        </style>
    `);

    // Animate Hello World examples with GitHub syntax highlighting
    function animateHelloWorlds() {
        let currentIndex = 0;
        
        function showNextHelloWorld() {
            // Remove previous classes
            helloWorldText.classList.remove('visible');
            helloWorldLanguage.classList.remove('visible');
            helloWorldText.classList.add('fade-out');
            
            // Wait for fade out to complete
            setTimeout(() => {
                // Update content
                const example = helloWorldExamples[currentIndex];
                
                // Apply syntax highlighting
                helloWorldText.innerHTML = '';
                example.tokens.forEach(token => {
                    const span = document.createElement('span');
                    span.textContent = token.text;
                    if (token.type !== 'normal') {
                        span.classList.add('token-' + token.type);
                    }
                    helloWorldText.appendChild(span);
                });
                
                // Update language badge and filename
                helloWorldLanguage.textContent = example.language;
                if (fileNameDisplay) {
                    fileNameDisplay.textContent = `hello-world.${example.extension}`;
                }
                
                // Remove fade out class
                helloWorldText.classList.remove('fade-out');
                
                // Add visible class after a brief delay for the transition to work
                setTimeout(() => {
                    helloWorldText.classList.add('visible');
                    helloWorldLanguage.classList.add('visible');
                }, 50);
                
                // Move to next example
                currentIndex = (currentIndex + 1) % helloWorldExamples.length;
                
                // Schedule next update
                setTimeout(showNextHelloWorld, 3000);
            }, 500);
        }
        
        // Start the animation
        showNextHelloWorld();
    }
    
    // Start hello world animation with GitHub style
    if (helloWorldText && helloWorldLanguage) {
        animateHelloWorlds();
    }

    // Add scroll event handler
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.main-header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Add visual comfort adjustments to reduce sharpness and harshness
    function applyVisualComfort() {
        // Add softer color overlay to the entire page
        const comfortOverlay = document.createElement('div');
        comfortOverlay.className = 'visual-comfort-overlay';
        comfortOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 253, 250, 0.03);
            pointer-events: none;
            z-index: 999;
            mix-blend-mode: overlay;
        `;
        document.body.appendChild(comfortOverlay);
        
        // Apply Arial Rounded font to the entire application
        const fontStyle = document.createElement('style');
        fontStyle.textContent = `
            body, button, input, select, textarea, h1, h2, h3, h4, h5, h6, p, span, div {
                font-family: "Arial Rounded MT Bold", "Arial Rounded", "Helvetica Rounded", Arial, sans-serif !important;
                letter-spacing: -0.01em;
            }
            
            code, pre, .hello-world-text, .code-rain-column, .floating-code {
                font-family: "SF Mono", Consolas, Monaco, "Andale Mono", monospace !important;
            }
            
            /* Adjust header weights for the rounded font */
            h1, h2, h3 {
                font-weight: 600;
            }
            
            /* Slightly increase line height for better readability with rounded font */
            p, li, .sem-desc {
                line-height: 1.7;
            }
        `;
        document.head.appendChild(fontStyle);
        
        // Soften all shadows
        document.querySelectorAll('.feature, .btn-primary, .btn-login, .tech-icon, .testimonial').forEach(element => {
            if (element.style.boxShadow) {
                element.style.boxShadow = element.style.boxShadow.replace(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/g, 
                    (_, r, g, b, a) => `rgba(${r}, ${g}, ${b}, ${parseFloat(a) * 0.7})`);
            }
        });
        
        // Soften all borders
        document.querySelectorAll('.feature, .hello-world-container, .btn-primary').forEach(element => {
            if (element.style.border) {
                element.style.borderColor = element.style.borderColor + '80'; // 50% opacity
            }
        });
        
        // Reduce contrast of text against backgrounds
        document.querySelectorAll('p, li, .sem-desc').forEach(element => {
            element.style.color = '#555';
            element.style.fontWeight = '400';
        });
        
        // Add smooth transitions to all elements
        document.head.insertAdjacentHTML('beforeend', `
            <style>
                * {
                    transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, 
                              box-shadow 0.3s ease, text-shadow 0.3s ease;
                }
                
                /* Soften feature borders */
                .feature::after {
                    opacity: 0.5 !important;
                    filter: saturate(0.7) brightness(1.05) !important;
                }
                
                /* Make feature hover more subtle */
                .feature:hover {
                    transform: translateY(-5px) !important;
                }
                
                /* Reduce the intensity of all animations */
                @keyframes softBorderGradient {
                    0% { background-position: 0% 50%; opacity: 0.4; }
                    50% { background-position: 100% 50%; opacity: 0.6; }
                    100% { background-position: 0% 50%; opacity: 0.4; }
                }
                
                /* Reduce icon color intensity */
                .feature i, .tech-icon i {
                    filter: saturate(0.85);
                }
                
                /* Soften header colors */
                .main-header {
                    background-color: rgba(232, 169, 169, 0.4) !important;
                }
                
                /* Apply soft blur to background elements */
                .planet, .satellite, .code-rain-column {
                    filter: blur(0.3px);
                }
            </style>
        `);
    }
    
    // Apply visual comfort adjustments after a short delay
    setTimeout(applyVisualComfort, 500);
});