// Luxury Property Showcase with Connected Parallelogram Design

class LuxuryPropertyShowcase {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupEventListeners();
                this.setupScrollAnimations();
                this.setupPropertyCardInteractions();
                this.setupParallelogramEffects();
            });
        } else {
            this.setupEventListeners();
            this.setupScrollAnimations();
            this.setupPropertyCardInteractions();
            this.setupParallelogramEffects();
        }
    }

    setupEventListeners() {
        // Handle See More button
        const seeMoreBtn = document.querySelector('.see-more-btn');
        if (seeMoreBtn) {
            seeMoreBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleSeeMore();
            });
        }

        // Enhanced interactions for featured property
        // const featuredWrapper = document.querySelector('.featured-property-wrapper');
        // if (featuredWrapper) {
        //     featuredWrapper.addEventListener('mouseenter', () => {
        //         this.addFeaturedHoverEffect();
        //     });
        //     featuredWrapper.addEventListener('mouseleave', () => {
        //         this.removeFeaturedHoverEffect();
        //     });
        // }

    }

    setupParallelogramEffects() {
        const parallelogramMain = document.querySelector('.parallelogram-main');
        const propertyImage = document.querySelector('.property-image');
        
        if (parallelogramMain && propertyImage) {
            // Add synchronized hover effects
            const featuredWrapper = document.querySelector('.featured-property-wrapper');
            
            if (featuredWrapper) {
                featuredWrapper.addEventListener('mouseenter', () => {
                    this.addSynchronizedHoverEffect();
                });
                
                featuredWrapper.addEventListener('mouseleave', () => {
                    this.removeSynchronizedHoverEffect();
                });
            }

            // Add subtle parallax effect
            window.addEventListener('scroll', () => {
                this.addParallaxEffect();
            });
        }

        console.log('Parallelogram effects setup complete');
    }

    setupPropertyCardInteractions() {
        const propertyCards = document.querySelectorAll('.property-card');
        
        propertyCards.forEach((card, index) => {
            const propertyId = card.dataset.propertyId;
            
            // Add click handler for entire card
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('view-details-btn')) {
                    this.handlePropertyCardClick(propertyId, card);
                }
            });

            // Handle View Details button specifically
            const viewDetailsBtn = card.querySelector('.view-details-btn');
            if (viewDetailsBtn) {
                viewDetailsBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.handlePropertyCardClick(propertyId, card);
                });
            }

            // Enhanced hover effects
            card.addEventListener('mouseenter', (e) => {
                this.addCardHoverEffect(card);
            });

            card.addEventListener('mouseleave', (e) => {
                this.removeCardHoverEffect(card);
            });

            // Touch support for mobile
            card.addEventListener('touchstart', (e) => {
                this.addCardHoverEffect(card);
            });

            card.addEventListener('touchend', (e) => {
                setTimeout(() => {
                    this.removeCardHoverEffect(card);
                }, 2000);
            });
        });

        console.log('Property card interactions setup complete');
    }

    setupScrollAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Animate property cards on scroll
        const propertyCards = document.querySelectorAll('.property-card');
        propertyCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
            card.classList.add('animate-on-scroll');
            observer.observe(card);
        });

        // Animate featured property
        const featuredWrapper = document.querySelector('.featured-property-wrapper');
        if (featuredWrapper) {
            featuredWrapper.style.opacity = '0';
            featuredWrapper.style.transform = 'translateY(30px)';
            featuredWrapper.style.transition = 'opacity 1s ease 0.3s, transform 1s ease 0.3s';
            featuredWrapper.classList.add('animate-on-scroll');
            observer.observe(featuredWrapper);
        }

        // Animate see more section
        const seeMoreSection = document.querySelector('.see-more-section');
        if (seeMoreSection) {
            seeMoreSection.style.opacity = '0';
            seeMoreSection.style.transform = 'translateY(30px)';
            seeMoreSection.style.transition = 'opacity 0.8s ease 0.8s, transform 0.8s ease 0.8s';
            seeMoreSection.classList.add('animate-on-scroll');
            observer.observe(seeMoreSection);
        }

        console.log('Scroll animations setup complete');
    }

    addSynchronizedHoverEffect() {
        const parallelogramMain = document.querySelector('.parallelogram-main');
        const propertyImage = document.querySelector('.property-image');
        const featureItems = document.querySelectorAll('.feature-item');

        if (parallelogramMain) {
            parallelogramMain.style.transform = 'translate(-50%, -50%) skewX(-13deg) scale(1.02)';
        }

        if (propertyImage) {
            propertyImage.style.transform = 'scale(1.05)';
        }

        featureItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateY(-2px)';
                item.style.background = 'rgba(255, 255, 255, 0.4)';
            }, index * 50);
        });
    }

    removeSynchronizedHoverEffect() {
        const parallelogramMain = document.querySelector('.parallelogram-main');
        const propertyImage = document.querySelector('.property-image');
        const featureItems = document.querySelectorAll('.feature-item');

        if (parallelogramMain) {
            parallelogramMain.style.transform = 'translate(-50%, -50%) skewX(-13deg)';
        }

        if (propertyImage) {
            propertyImage.style.transform = 'scale(1)';
        }

        featureItems.forEach(item => {
            item.style.transform = '';
            item.style.background = '';
        });
    }

    addParallaxEffect() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.1;
        const parallelogramBg = document.querySelector('.parallelogram-background');
        
        if (parallelogramBg && scrolled < window.innerHeight) {
            parallelogramBg.style.transform = `translateY(${rate}px)`;
        }
    }

    handleFeaturedPropertyClick() {
        this.showLuxuryNotification(
            'Featured Property Inquiry',
            'Thank you for your interest in the Oceanfront Penthouse Paradise ($4,750,000). Our luxury real estate specialist will contact you within 24 hours to arrange an exclusive private viewing of this premium oceanfront property.',
            'success'
        );

        // Add click animation
        const wrapper = document.querySelector('.featured-property-wrapper');
        if (wrapper) {
            wrapper.style.transform = 'scale(0.98)';
            setTimeout(() => {
                wrapper.style.transform = '';
            }, 200);
        }

        console.log('Featured property clicked');
    }

    handlePropertyCardClick(propertyId, card) {
        // Get property information
        const title = card.querySelector('.card-title').textContent;
        const price = card.querySelector('.card-price').textContent;
        const location = card.querySelector('.card-location').textContent;
        
        // Create a luxury notification
        this.showLuxuryNotification(
            'Property Inquiry',
            `Thank you for your interest in ${title} (${price}) located at ${location}. Our luxury real estate specialist will contact you within 24 hours to arrange a private viewing.`,
            'success'
        );

        // Add click animation
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 200);

        console.log('Property card clicked:', propertyId, title);
    }

    handleSeeMore() {
        this.showLuxuryNotification(
            'Explore More Properties',
            'Discover our complete collection of luxury properties. Our concierge team will curate a personalized selection based on your preferences and arrange exclusive viewings.',
            'info'
        );
        
        // Add button animation
        const btn = document.querySelector('.see-more-btn');
        if (btn) {
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 200);
        }

        console.log('See more clicked');
    }

    addFeaturedHoverEffect() {
        const parallelogramMain = document.querySelector('.parallelogram-main');
        const parallelogramShadow = document.querySelector('.parallelogram-shadow');
        
        if (parallelogramMain) {
            parallelogramMain.style.boxShadow = `
                inset 0 2px 25px rgba(255, 255, 255, 0.25),
                inset 0 -2px 25px rgba(0, 0, 0, 0.2),
                0 20px 50px rgba(212, 175, 55, 0.4),
                0 8px 25px rgba(0, 0, 0, 0.25)
            `;
        }

        if (parallelogramShadow) {
            parallelogramShadow.style.background = 'rgba(0, 0, 0, 0.4)';
        }
    }

    removeFeaturedHoverEffect() {
        const parallelogramMain = document.querySelector('.parallelogram-main');
        const parallelogramShadow = document.querySelector('.parallelogram-shadow');
        
        if (parallelogramMain) {
            parallelogramMain.style.boxShadow = '';
        }

        if (parallelogramShadow) {
            parallelogramShadow.style.background = '';
        }
    }

    addCardHoverEffect(card) {
        const specs = card.querySelectorAll('.spec');
        specs.forEach((spec, index) => {
            setTimeout(() => {
                spec.style.transform = 'translateY(-1px)';
                spec.style.background = 'rgba(212, 175, 55, 0.2)';
                spec.style.borderColor = 'rgba(212, 175, 55, 0.4)';
            }, index * 50);
        });
    }

    removeCardHoverEffect(card) {
        const specs = card.querySelectorAll('.spec');
        specs.forEach(spec => {
            spec.style.transform = '';
            spec.style.background = '';
            spec.style.borderColor = '';
        });
    }

    showLuxuryNotification(title, message, type = 'info') {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.luxury-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create luxury notification element
        const notification = document.createElement('div');
        notification.className = `luxury-notification luxury-notification--${type}`;
        notification.innerHTML = `
            <div class="luxury-notification__content">
                <div class="luxury-notification__header">
                    <div class="luxury-notification__icon">🏛️</div>
                    <h4 class="luxury-notification__title">${title}</h4>
                    <button class="luxury-notification__close" aria-label="Close notification">&times;</button>
                </div>
                <p class="luxury-notification__message">${message}</p>
                <div class="luxury-notification__accent"></div>
            </div>
        `;

        // Add notification styles
        const baseStyles = {
            position: 'fixed',
            top: '2rem',
            right: '2rem',
            backgroundColor: '#1a2332',
            color: '#ffffff',
            padding: '0',
            borderRadius: '15px',
            boxShadow: '0 20px 40px rgba(26, 35, 50, 0.3), 0 0 0 2px #d4af37',
            zIndex: '10000',
            maxWidth: '420px',
            minWidth: '350px',
            backdropFilter: 'blur(20px)',
            transform: 'translateX(100%)',
            transition: 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
            fontFamily: 'Inter, sans-serif',
            overflow: 'hidden'
        };

        Object.assign(notification.style, baseStyles);

        // Style the content
        const content = notification.querySelector('.luxury-notification__content');
        Object.assign(content.style, {
            position: 'relative',
            padding: '1.5rem'
        });

        // Style the accent line
        const accent = notification.querySelector('.luxury-notification__accent');
        Object.assign(accent.style, {
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '4px',
            background: 'linear-gradient(90deg, #d4af37 0%, #ffd700 50%, #b8860b 100%)'
        });

        // Style the header
        const header = notification.querySelector('.luxury-notification__header');
        Object.assign(header.style, {
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            marginBottom: '1rem'
        });

        // Style the icon
        const icon = notification.querySelector('.luxury-notification__icon');
        Object.assign(icon.style, {
            fontSize: '1.5rem',
            flexShrink: '0'
        });

        // Style the title
        const titleEl = notification.querySelector('.luxury-notification__title');
        Object.assign(titleEl.style, {
            margin: '0',
            fontSize: '1.2rem',
            fontWeight: '600',
            color: '#d4af37',
            fontFamily: 'Playfair Display, serif',
            flex: '1'
        });

        // Style the message
        const messageEl = notification.querySelector('.luxury-notification__message');
        Object.assign(messageEl.style, {
            margin: '0',
            fontSize: '0.95rem',
            lineHeight: '1.6',
            color: 'rgba(255, 255, 255, 0.9)',
            marginLeft: '2.25rem'
        });

        // Style the close button
        const closeBtn = notification.querySelector('.luxury-notification__close');
        Object.assign(closeBtn.style, {
            background: 'linear-gradient(135deg, #d4af37 0%, #b8860b 100%)',
            color: '#1a2332',
            border: 'none',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            cursor: 'pointer',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            flexShrink: '0'
        });

        // Add hover effect to close button
        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.transform = 'scale(1.1)';
            closeBtn.style.boxShadow = '0 4px 15px rgba(212, 175, 55, 0.4)';
        });

        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.transform = 'scale(1)';
            closeBtn.style.boxShadow = 'none';
        });

        // Add to DOM
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Close button handler
        closeBtn.addEventListener('click', () => {
            this.hideNotification(notification);
        });

        // Auto-hide after 8 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                this.hideNotification(notification);
            }
        }, 8000);

        console.log('Notification shown:', title);
    }

    hideNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 500);
    }
}

// Utility functions for enhanced user experience
class LuxuryUtils {
    static addLoadingAnimations() {
        // Add stagger animation to property cards
        const cards = document.querySelectorAll('.property-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }

    static setupResponsiveAdjustments() {
        // Add resize handler for responsive adjustments
        window.addEventListener('resize', () => {
            const connectedLayout = document.querySelector('.connected-layout');
            if (connectedLayout && window.innerWidth < 768) {
                connectedLayout.style.height = 'auto';
            }
        });
    }

    static addGoldShimmer() {
        // Add shimmer effect to gold elements
        const goldElements = document.querySelectorAll('.parallelogram-main, .see-more-btn');
        goldElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                if (element.classList.contains('parallelogram-main')) {
                    element.style.background = 'linear-gradient(135deg, #ffd700 0%, #d4af37 30%, #ffd700 70%, #b8860b 100%)';
                }
            });
            element.addEventListener('mouseleave', () => {
                if (element.classList.contains('parallelogram-main')) {
                    element.style.background = '';
                }
            });
        });
    }

    static addKeyboardNavigation() {
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const focusedElement = document.activeElement;
                if (focusedElement.classList.contains('property-card')) {
                    e.preventDefault();
                    focusedElement.click();
                }
                if (focusedElement.classList.contains('featured-property-wrapper')) {
                    e.preventDefault();
                    focusedElement.click();
                }
            }
        });

        // Make cards focusable
        const cards = document.querySelectorAll('.property-card');
        cards.forEach(card => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `View details for ${card.querySelector('.card-title').textContent}`);
        });

        // Make featured property focusable
        const featuredWrapper = document.querySelector('.featured-property-wrapper');
        if (featuredWrapper) {
            featuredWrapper.setAttribute('tabindex', '0');
            featuredWrapper.setAttribute('role', 'button');
            featuredWrapper.setAttribute('aria-label', 'View details for Oceanfront Penthouse Paradise');
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing luxury property showcase...');
    
    // Initialize main functionality
    const luxuryShowcase = new LuxuryPropertyShowcase();
    window.luxuryShowcase = luxuryShowcase; // Make available globally
    
    // Add utility enhancements
    LuxuryUtils.addLoadingAnimations();
    LuxuryUtils.setupResponsiveAdjustments();
    LuxuryUtils.addGoldShimmer();
    LuxuryUtils.addKeyboardNavigation();
    
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add loading state management
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        console.log('Page fully loaded');
    });

    // Add page visibility API to handle focus/blur
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            console.log('Page hidden');
        } else {
            console.log('Page visible');
        }
    });

    console.log('🏠 Luxury Property Showcase with Connected Parallelogram Design initialized successfully');
});

// Fallback initialization if DOMContentLoaded already fired
if (document.readyState === 'loading') {
    // Document is still loading, wait for DOMContentLoaded
} else {
    // Document is already loaded
    console.log('Document already loaded, initializing immediately...');
    const luxuryShowcase = new LuxuryPropertyShowcase();
    window.luxuryShowcase = luxuryShowcase;
    LuxuryUtils.addLoadingAnimations();
    LuxuryUtils.setupResponsiveAdjustments();
    LuxuryUtils.addGoldShimmer();
    LuxuryUtils.addKeyboardNavigation();
}