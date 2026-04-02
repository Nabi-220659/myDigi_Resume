// ============================================
// CUSTOM JAVASCRIPT FOR DIGITAL RESUME
// ============================================

$(document).ready(function() {
    console.log('Document ready - Portfolio initialized');

    // ============================================
    // 1. INITIALIZE TOOLTIPS
    // ============================================
    initializeTooltips();

    // ============================================
    // 2. INITIALIZE POPOVERS
    // ============================================
    initializePopovers();

    // ============================================
    // 3. FORM HANDLING
    // ============================================
    handleContactForm();

    // ============================================
    // 4. SMOOTH SCROLLING
    // ============================================
    smoothScrolling();

    // ============================================
    // 5. NAVBAR ACTIVE STATE
    // ============================================
    updateNavbarActiveState();

    // ============================================
    // 6. SCROLL ANIMATIONS
    // ============================================
    initializeScrollAnimations();

    // ============================================
    // 7. PROGRESS BAR ANIMATION
    // ============================================
    animateProgressBars();

    // ============================================
    // 8. BACK TO TOP BUTTON
    // ============================================
    backToTopButton();

    // ============================================
    // 9. FORM VALIDATION
    // ============================================
    validateForm();
});

// ============================================
// FUNCTION: Initialize Tooltips
// ============================================
function initializeTooltips() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    console.log('Tooltips initialized: ' + tooltipList.length);
}

// ============================================
// FUNCTION: Initialize Popovers
// ============================================
function initializePopovers() {
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
    console.log('Popovers initialized: ' + popoverList.length);
}

// ============================================
// FUNCTION: Handle Contact Form
// ============================================
function handleContactForm() {
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();

        // Get form values
        var firstName = $('#firstName').val();
        var lastName = $('#lastName').val();
        var email = $('#email').val();
        var subject = $('#subject').val();
        var message = $('#message').val();
        var contactPref = $('input[name="contactPref"]:checked').val();
        var newsletter = $('#newsletter').is(':checked');

        // Validate form
        if (!firstName || !lastName || !email || !subject || !message) {
            showAlert('Please fill in all required fields!', 'danger');
            return;
        }

        // Display success message
        showAlert('Thank you for your message, ' + firstName + '! We will get back to you soon.', 'success');

        // Log form data
        console.log({
            firstName: firstName,
            lastName: lastName,
            email: email,
            subject: subject,
            message: message,
            contactPref: contactPref,
            newsletter: newsletter
        });

        // Reset form
        this.reset();

        // Reset validation classes
        $(this).find('.form-control, .form-select').removeClass('is-valid is-invalid');
    });
}

// ============================================
// FUNCTION: Smooth Scrolling
// ============================================
function smoothScrolling() {
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        if ($(target).length) {
            $('html, body').animate({
                scrollTop: $(target).offset().top - 70
            }, 1000);
        }
    });
}

// ============================================
// FUNCTION: Update Navbar Active State
// ============================================
function updateNavbarActiveState() {
    $(window).on('scroll', function() {
        var scrollPosition = $(window).scrollTop();
        
        $('section').each(function() {
            var section = $(this);
            var sectionTop = section.offset().top - 100;
            var sectionId = section.attr('id');

            if (scrollPosition >= sectionTop) {
                $('a.nav-link').removeClass('active');
                $('a.nav-link[href="#' + sectionId + '"]').addClass('active');
            }
        });
    });
}

// ============================================
// FUNCTION: Scroll Animations
// ============================================
function initializeScrollAnimations() {
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                $(entry.target).addClass('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    $('section, .card, .alert').each(function() {
        observer.observe(this);
    });
}

// ============================================
// FUNCTION: Animate Progress Bars
// ============================================
function animateProgressBars() {
    $(window).on('scroll', function() {
        if ($('#skills').isInViewport()) {
            $('.progress-bar').each(function() {
                var width = $(this).attr('aria-valuenow');
                $(this).css('width', width + '%');
            });
        }
    });
}

// ============================================
// FUNCTION: Back to Top Button
// ============================================
function backToTopButton() {
    // Create button
    var backToTopBtn = $('<button id="backToTop" class="btn btn-primary" style="position: fixed; bottom: 30px; right: 30px; display: none; z-index: 999; border-radius: 50%; width: 50px; height: 50px; padding: 0;"><i class="bi bi-arrow-up"></i></button>');
    $('body').append(backToTopBtn);

    // Show/hide button on scroll
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 300) {
            $('#backToTop').fadeIn();
        } else {
            $('#backToTop').fadeOut();
        }
    });

    // Scroll to top when clicked
    $('#backToTop').on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 1000);
    });

    // Add hover effect
    $('#backToTop').on('mouseenter', function() {
        $(this).css('transform', 'scale(1.2)');
    }).on('mouseleave', function() {
        $(this).css('transform', 'scale(1)');
    });
}

// ============================================
// FUNCTION: Form Validation
// ============================================
function validateForm() {
    $('#contactForm').on('input', function() {
        var form = this;
        
        // Validate email
        var email = $('#email').val();
        if (email && !isValidEmail(email)) {
            $('#email').removeClass('is-valid').addClass('is-invalid');
        } else if (email) {
            $('#email').removeClass('is-invalid').addClass('is-valid');
        }

        // Validate name fields
        var firstName = $('#firstName').val();
        if (firstName) {
            $('#firstName').removeClass('is-invalid').addClass('is-valid');
        }

        var lastName = $('#lastName').val();
        if (lastName) {
            $('#lastName').removeClass('is-invalid').addClass('is-valid');
        }

        // Validate message
        var message = $('#message').val();
        if (message && message.length >= 10) {
            $('#message').removeClass('is-invalid').addClass('is-valid');
        }
    });
}

// ============================================
// FUNCTION: Email Validation
// ============================================
function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================
// FUNCTION: Show Alert
// ============================================
function showAlert(message, type) {
    var alertHtml = '<div class="alert alert-' + type + ' alert-dismissible fade show" role="alert">' +
                    message +
                    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
                    '</div>';
    
    $(alertHtml).prependTo('body').css({
        'position': 'fixed',
        'top': '80px',
        'left': '50%',
        'transform': 'translateX(-50%)',
        'z-index': '9999',
        'min-width': '300px',
        'max-width': '500px',
        'box-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)'
    });

    // Auto-dismiss after 5 seconds
    setTimeout(function() {
        $('.alert').fadeOut(function() {
            $(this).remove();
        });
    }, 5000);
}

// ============================================
// FUNCTION: Check if Element is in Viewport
// ============================================
$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
};

// ============================================
// UTILITY: Console Log Helper
// ============================================
var logger = {
    log: function(message, data) {
        console.log('%c[Portfolio]', 'color: #007bff; font-weight: bold;', message, data || '');
    },
    error: function(message, error) {
        console.error('%c[Portfolio Error]', 'color: #dc3545; font-weight: bold;', message, error || '');
    },
    success: function(message, data) {
        console.log('%c[Portfolio Success]', 'color: #28a745; font-weight: bold;', message, data || '');
    }
};

// ============================================
// EVENT: Window Load
// ============================================
$(window).on('load', function() {
    logger.success('Portfolio fully loaded');
    
    // Trigger animations
    $('body').addClass('loaded');
});

// ============================================
// EVENT: Window Resize
// ============================================
$(window).on('resize', function() {
    logger.log('Window resized to: ' + $(window).width() + 'px x ' + $(window).height() + 'px');
});

// ============================================
// EVENT: Before Unload
// ============================================
$(window).on('beforeunload', function() {
    logger.log('Page unloading...');
});

// ============================================
// CLICK EVENT: Project Modal Trigger
// ============================================
$('.card-body .btn').on('click', function() {
    var projectName = $(this).closest('.card').find('.card-title').text();
    logger.log('Project Details Opened:', projectName);
});

// ============================================
// CLICK EVENT: Download CV
// ============================================
$('[data-bs-toggle="tooltip"]').on('click', function() {
    logger.log('Download CV clicked');
    // Add download logic here
});

// ============================================
// HOVER EFFECTS
// ============================================
$('.card').on('mouseenter', function() {
    $(this).css('transition', 'all 0.3s ease');
}).on('mouseleave', function() {
    // Reset on mouse leave
});

// ============================================
// DYNAMIC SKILL PERCENTAGE UPDATE
// ============================================
function updateSkillPercentage(skillName, percentage) {
    var progressBar = $('span.fw-bold:contains("' + skillName + '")').siblings('.progress').find('.progress-bar');
    if (progressBar.length) {
        progressBar.css('width', percentage + '%').attr('aria-valuenow', percentage).text(percentage + '%');
        logger.success('Skill updated: ' + skillName + ' to ' + percentage + '%');
    }
}

// ============================================
// INIT: Console Welcome Message
// ============================================
console.log('%cWelcome to Chakrapani Behera\'s Portfolio!', 'font-size: 20px; color: #007bff; font-weight: bold;');
console.log('%cBuilt with Bootstrap 5 and jQuery', 'font-size: 14px; color: #6c757d;');
