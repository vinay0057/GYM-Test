// ==========================================
// POWERHOUSE GYM - Complete JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. LOADER
    // ==========================================
    const loader = document.getElementById('loader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.classList.add('hidden');
        }, 1500);
    });

    // Fallback - hide loader after 3 seconds regardless
    setTimeout(function() {
        loader.classList.add('hidden');
    }, 3000);

    // ==========================================
    // 2. NAVBAR SCROLL EFFECT
    // ==========================================
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    
    function handleScroll() {
        const scrollY = window.scrollY;
        
        // Navbar effect
        if (scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Back to top button
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', handleScroll);

    // ==========================================
    // 3. MOBILE MENU
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

    function toggleMobileMenu() {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    function closeMobileMenu() {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    mobileOverlay.addEventListener('click', closeMobileMenu);
    
    mobileNavLinks.forEach(function(link) {
        link.addEventListener('click', closeMobileMenu);
    });

    // ==========================================
    // 4. SMOOTH SCROLLING FOR ANCHOR LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // 5. BACK TO TOP BUTTON
    // ==========================================
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ==========================================
    // 6. STATS COUNTER ANIMATION
    // ==========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 60;
        const duration = 2000;
        const stepTime = duration / 60;
        
        const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, stepTime);
    }

    function checkStatsVisibility() {
        if (statsAnimated) return;
        
        const statsSection = document.querySelector('.stats');
        if (!statsSection) return;
        
        const rect = statsSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
            statsAnimated = true;
            statNumbers.forEach(function(stat) {
                const target = parseInt(stat.getAttribute('data-count'));
                animateCounter(stat, target);
            });
        }
    }

    window.addEventListener('scroll', checkStatsVisibility);
    checkStatsVisibility(); // Check on load

    // ==========================================
    // 7. SERVICE MODAL
    // ==========================================
    const serviceModal = document.getElementById('serviceModal');
    const modalClose = document.getElementById('modalClose');
    //const modalImage = document.getElementById('modalImage');
    const modalImage = serviceModal.querySelector('.modal-header img');

    const modalIcon = document.getElementById('modalIcon');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalBenefits = document.getElementById('modalBenefits');
    const modalSuited = document.getElementById('modalSuited');
    const serviceCards = document.querySelectorAll('.service-card');

    // Service data
    const serviceData = {
        strength: {
            title: 'Strength Training',
            icon: '<i class="fas fa-dumbbell"></i>',
            image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c149a?w=800',
            description: 'Our comprehensive strength training program is designed to help you build muscle mass, increase overall strength, and improve your physical performance. Using a combination of free weights, machines, and bodyweight exercises, our certified trainers will guide you through progressive overload techniques to ensure consistent growth and development.',
            benefits: [
                'Increase muscle mass and definition',
                'Boost metabolism for enhanced fat burning',
                'Improve bone density and joint health',
                'Enhance functional strength for daily activities',
                'Personalized workout plans based on your goals'
            ],
            suited: 'Beginners to advanced athletes looking to build muscle, increase strength, or improve body composition. Perfect for those who want structured progressive training with measurable results.'
        },
        personal: {
            title: 'Personal Training',
            icon: '<i class="fas fa-user-check"></i>',
            image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800',
            description: 'Get exclusive one-on-one attention from our certified personal trainers who will design a customized workout and nutrition plan tailored specifically to your goals, fitness level, and schedule. Whether you want to lose weight, build muscle, or train for a specific event, our trainers are here to guide you every step of the way.',
            benefits: [
                'Customized workout plans for your specific goals',
                'Proper form correction and injury prevention',
                'Nutrition guidance and meal planning',
                'Accountability and consistent motivation',
                'Flexible scheduling to fit your lifestyle'
            ],
            suited: 'Anyone seeking personalized attention, faster results, or those new to fitness who want to learn proper techniques. Ideal for busy professionals who need efficient, effective workouts.'
        },
        cardio: {
            title: 'Cardio Zone',
            icon: '<i class="fas fa-heartbeat"></i>',
            image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800',
            description: 'Our state-of-the-art cardio zone features the latest equipment including treadmills, ellipticals, rowing machines, and stationary bikes. Whether you prefer steady-state cardio or high-intensity interval training (HIIT), our cardio programs are designed to improve your cardiovascular health, boost endurance, and help you burn calories efficiently.',
            benefits: [
                'Improve heart health and cardiovascular endurance',
                'Burn calories and support weight loss goals',
                'Reduce stress and improve mental clarity',
                'Multiple equipment options for variety',
                'Guided HIIT sessions available'
            ],
            suited: 'Anyone looking to improve their heart health, lose weight, or increase their overall endurance. Great for all fitness levels from beginners to marathon runners.'
        },
        crossfit: {
            title: 'CrossFit',
            icon: '<i class="fas fa-fire-alt"></i>',
            image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=800',
            description: 'Experience the intensity and community of CrossFit at Powerhouse. Our CrossFit program combines elements of high-intensity interval training, Olympic weightlifting, plyometrics, powerlifting, gymnastics, and other exercises. Each workout is varied, challenging, and designed to improve your overall fitness across multiple domains.',
            benefits: [
                'Full-body functional fitness training',
                'Improved strength, speed, and agility',
                'Strong community and team motivation',
                'Scalable workouts for all fitness levels',
                'Competitive and fun atmosphere'
            ],
            suited: 'Those who thrive in group settings and enjoy varied, challenging workouts. Perfect for people who get bored with traditional gym routines and want a supportive community.'
        },
        weightloss: {
            title: 'Weight Loss Program',
            icon: '<i class="fas fa-weight"></i>',
            image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800',
            description: 'Our scientifically-designed weight loss program combines targeted exercise routines with comprehensive nutrition guidance to help you shed unwanted pounds and keep them off. Our approach focuses on sustainable lifestyle changes rather than quick fixes, ensuring long-term success in your weight management journey.',
            benefits: [
                'Customized meal plans and nutrition coaching',
                'Metabolic assessment and body composition analysis',
                'Combination of cardio and strength training',
                'Regular progress tracking and adjustments',
                'Sustainable lifestyle modification guidance'
            ],
            suited: 'Individuals looking to lose weight in a healthy, sustainable way. Ideal for those who have struggled with yo-yo dieting and want a comprehensive approach to weight management.'
        },
        yoga: {
            title: 'Yoga & Stretching',
            icon: '<i class="fas fa-spa"></i>',
            image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
            description: 'Find balance between body and mind with our yoga and stretching classes. From gentle restorative yoga to power yoga, our certified instructors offer a variety of styles to suit your needs. These sessions focus on improving flexibility, reducing stress, enhancing mind-body connection, and promoting overall wellness.',
            benefits: [
                'Improved flexibility and range of motion',
                'Stress reduction and mental clarity',
                'Better posture and body awareness',
                'Enhanced recovery from other workouts',
                'Mind-body connection and inner peace'
            ],
            suited: 'Everyone from beginners to advanced practitioners. Perfect for athletes looking for recovery, stressed professionals seeking relaxation, or anyone wanting to improve flexibility and mindfulness.'
        }
    };

    function openServiceModal(serviceKey) {
        const service = serviceData[serviceKey];
        if (!service) return;

        modalImage.src = service.image;
        modalImage.alt = service.title;
        modalIcon.innerHTML = service.icon;
        modalTitle.textContent = service.title;
        modalDescription.textContent = service.description;
        modalSuited.textContent = service.suited;
        
        // Clear and populate benefits
        modalBenefits.innerHTML = '';
        service.benefits.forEach(function(benefit) {
            const li = document.createElement('li');
            li.innerHTML = '<i class="fas fa-check-circle"></i> ' + benefit;
            modalBenefits.appendChild(li);
        });

        serviceModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeServiceModal() {
        serviceModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    serviceCards.forEach(function(card) {
        card.addEventListener('click', function() {
            const serviceKey = this.getAttribute('data-service');
            openServiceModal(serviceKey);
        });
    });

    modalClose.addEventListener('click', closeServiceModal);
    
    serviceModal.addEventListener('click', function(e) {
        if (e.target === serviceModal) {
            closeServiceModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeServiceModal();
            closeMobileMenu();
        }
    });

    // ==========================================
    // 8. TESTIMONIAL SLIDER
    // ==========================================
    const testimonialTrack = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    let currentTestimonial = 0;
    const totalTestimonials = 3;
    let autoSlideInterval;

    function updateTestimonialSlider() {
        const translateX = -currentTestimonial * 100;
        testimonialTrack.style.transform = 'translateX(' + translateX + '%)';
        
        testimonialDots.forEach(function(dot, index) {
            dot.classList.toggle('active', index === currentTestimonial);
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
        updateTestimonialSlider();
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
        updateTestimonialSlider();
    }

    function goToTestimonial(index) {
        currentTestimonial = index;
        updateTestimonialSlider();
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextTestimonial, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    nextBtn.addEventListener('click', function() {
        stopAutoSlide();
        nextTestimonial();
        startAutoSlide();
    });

    prevBtn.addEventListener('click', function() {
        stopAutoSlide();
        prevTestimonial();
        startAutoSlide();
    });

    testimonialDots.forEach(function(dot) {
        dot.addEventListener('click', function() {
            stopAutoSlide();
            const index = parseInt(this.getAttribute('data-index'));
            goToTestimonial(index);
            startAutoSlide();
        });
    });

    // Touch/Swipe support for testimonials
    let touchStartX = 0;
    let touchEndX = 0;

    testimonialTrack.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
    }, false);

    testimonialTrack.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoSlide();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (diff > swipeThreshold) {
            nextTestimonial();
        } else if (diff < -swipeThreshold) {
            prevTestimonial();
        }
    }

    startAutoSlide();

    // ==========================================
    // 9. CONTACT FORM VALIDATION
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const resetFormBtn = document.getElementById('resetForm');

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return re.test(phone.replace(/\s/g, ''));
    }

    function showError(inputId) {
        const formGroup = document.getElementById(inputId).closest('.form-group');
        formGroup.classList.add('error');
    }

    function hideError(inputId) {
        const formGroup = document.getElementById(inputId).closest('.form-group');
        formGroup.classList.remove('error');
    }

    function validateForm() {
        let isValid = true;

        // Name validation
        const name = document.getElementById('name').value.trim();
        if (name.length < 2) {
            showError('name');
            isValid = false;
        } else {
            hideError('name');
        }

        // Email validation
        const email = document.getElementById('email').value.trim();
        if (!validateEmail(email)) {
            showError('email');
            isValid = false;
        } else {
            hideError('email');
        }

        // Phone validation
        const phone = document.getElementById('phone').value.trim();
        if (!validatePhone(phone)) {
            showError('phone');
            isValid = false;
        } else {
            hideError('phone');
        }

        // Enquiry type validation
        const enquiry = document.getElementById('enquiry').value;
        if (!enquiry) {
            showError('enquiry');
            isValid = false;
        } else {
            hideError('enquiry');
        }

        return isValid;
    }

    // Real-time validation
    ['name', 'email', 'phone', 'enquiry'].forEach(function(fieldId) {
        const field = document.getElementById(fieldId);
        field.addEventListener('blur', function() {
            const value = this.value.trim();
            
            switch(fieldId) {
                case 'name':
                    if (value.length >= 2) hideError(fieldId);
                    break;
                case 'email':
                    if (validateEmail(value)) hideError(fieldId);
                    break;
                case 'phone':
                    if (validatePhone(value)) hideError(fieldId);
                    break;
                case 'enquiry':
                    if (value) hideError(fieldId);
                    break;
            }
        });
    });

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Simulate form submission
            const submitBtn = contactForm.querySelector('.form-submit');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(function() {
                contactForm.style.display = 'none';
                formSuccess.classList.add('active');
            }, 1500);
        }
    });

    resetFormBtn.addEventListener('click', function() {
        contactForm.reset();
        contactForm.style.display = 'block';
        formSuccess.classList.remove('active');
        
        const submitBtn = contactForm.querySelector('.form-submit');
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        submitBtn.disabled = false;
        
        // Clear any error states
        document.querySelectorAll('.form-group').forEach(function(group) {
            group.classList.remove('error');
        });
    });

    // ==========================================
    // 10. SCROLL ANIMATIONS
    // ==========================================
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    function checkAnimation() {
        const triggerBottom = window.innerHeight * 0.85;
        
        animatedElements.forEach(function(element) {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('animated');
            }
        });
    }

    window.addEventListener('scroll', checkAnimation);
    checkAnimation(); // Check on load

    // ==========================================
    // 11. GALLERY VIDEO INTERACTION
    // ==========================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(function(item) {
        const video = item.querySelector('video');
        
        if (video) {
            item.addEventListener('mouseenter', function() {
                video.play();
            });
            
            item.addEventListener('mouseleave', function() {
                video.pause();
                video.currentTime = 0;
            });
            
            item.addEventListener('click', function() {
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        }
    });

    // ==========================================
    // 12. MEMBERSHIP BUTTON CLICKS
    // ==========================================
    const membershipBtns = document.querySelectorAll('.membership-btn');
    
    membershipBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const contactSection = document.getElementById('contact');
            const navbarHeight = navbar.offsetHeight;
            
            window.scrollTo({
                top: contactSection.offsetTop - navbarHeight,
                behavior: 'smooth'
            });
            
            // Pre-select membership inquiry in the form
            setTimeout(function() {
                document.getElementById('enquiry').value = 'membership';
            }, 500);
        });
    });

    // ==========================================
    // 13. FOOTER NEWSLETTER
    // ==========================================
    const newsletterForm = document.querySelector('.footer-newsletter');
    const newsletterInput = newsletterForm.querySelector('input');
    const newsletterBtn = newsletterForm.querySelector('button');

    newsletterBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const email = newsletterInput.value.trim();
        
        if (validateEmail(email)) {
            newsletterBtn.innerHTML = '<i class="fas fa-check"></i>';
            newsletterBtn.style.background = 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)';
            newsletterInput.value = '';
            
            setTimeout(function() {
                newsletterBtn.innerHTML = '<i class="fas fa-arrow-right"></i>';
                newsletterBtn.style.background = '';
            }, 2000);
            
            // Show notification
            showNotification('Thanks for subscribing!', 'success');
        } else {
            newsletterInput.style.borderColor = '#ff3366';
            setTimeout(function() {
                newsletterInput.style.borderColor = '';
            }, 2000);
            
            showNotification('Please enter a valid email', 'error');
        }
    });

    // ==========================================
    // 14. NOTIFICATION SYSTEM
    // ==========================================
    function showNotification(message, type) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = 'notification ' + type;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add styles dynamically
        notification.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 30px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)' : 'linear-gradient(135deg, #ff3366 0%, #ff6b35 100%)'};
            color: ${type === 'success' ? '#0a0a0a' : '#ffffff'};
            padding: 15px 25px;
            border-radius: 50px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 600;
            z-index: 9999;
            animation: slideInRight 0.3s ease;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(function() {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(function() {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100px);
            }
        }
    `;
    document.head.appendChild(style);

    // ==========================================
    // 15. HERO VIDEO FALLBACK
    // ==========================================
    const heroVideo = document.querySelector('.hero-video');
    
    if (heroVideo) {
        heroVideo.addEventListener('error', function() {
            // If video fails to load, show poster image
            this.style.display = 'none';
            const hero = document.querySelector('.hero');
            hero.style.backgroundImage = 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920)';
            hero.style.backgroundSize = 'cover';
            hero.style.backgroundPosition = 'center';
        });
        
        // Attempt to play video
        heroVideo.play().catch(function() {
            // Autoplay failed, user interaction needed
            console.log('Video autoplay failed');
        });
    }

    // ==========================================
    // 16. ACTIVE NAV LINK HIGHLIGHTING
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function highlightNavLink() {
        const scrollY = window.scrollY;
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // ==========================================
    // 17. PARALLAX EFFECT FOR HERO
    // ==========================================
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight) {
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = 'translateY(' + (scrollY * 0.3) + 'px)';
                heroContent.style.opacity = 1 - (scrollY / window.innerHeight);
            }
        }
    });

    // ==========================================
    // 18. HOVER EFFECTS FOR CARDS
    // ==========================================
    const cards = document.querySelectorAll('.service-card, .trainer-card, .stat-card, .membership-card');
    
    cards.forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
    });

    // ==========================================
    // 19. PRELOAD IMAGES
    // ==========================================
    const imagesToPreload = [
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920',
        'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800',
        'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=600'
    ];

    imagesToPreload.forEach(function(src) {
        const img = new Image();
        img.src = src;
    });

    // ==========================================
    // 20. CONSOLE WELCOME MESSAGE
    // ==========================================
    console.log('%c POWERHOUSE GYM ', 
        'background: linear-gradient(135deg, #00ff88, #00d4ff); color: #0a0a0a; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
    console.log('%c Welcome to Powerhouse Gym! 💪', 
        'color: #00ff88; font-size: 14px;');

});