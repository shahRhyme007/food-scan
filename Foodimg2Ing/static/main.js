// Modern JavaScript for AI Recipe Generator
// Compatible with Alpine.js and the new Tailwind CSS interface

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing AI Recipe Generator...');
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
        console.log('✅ Lucide icons initialized');
    }
    
    // Initialize the upload functionality
    initializeUpload();
    
    // Add smooth scroll behavior
    addSmoothScrolling();
    
    // Add intersection observer for animations
    addScrollAnimations();
    
    console.log('✅ AI Recipe Generator initialized successfully!');
});

// Upload functionality
function initializeUpload() {
    console.log('🔧 Initializing upload functionality...');
    
    const wrapper = document.querySelector(".upload-wrapper");
    const fileName = document.querySelector(".file-name");
    const defaultBtn = document.querySelector("#default-btn");
    const customBtn = document.querySelector("#custom-btn");
    const cancelBtn = document.querySelector("#cancel-btn i");
    const img = document.querySelector("#foodimage");
    const imgform = document.querySelector("#foodimgform");
    
    console.log('📋 Upload elements found:', {
        wrapper: !!wrapper,
        fileName: !!fileName,
        defaultBtn: !!defaultBtn,
        customBtn: !!customBtn,
        cancelBtn: !!cancelBtn,
        img: !!img,
        imgform: !!imgform
    });
    
    if (!defaultBtn || !imgform) {
        console.warn('⚠️ Required upload elements not found');
        return;
    }
    
    let regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;

    // File input change handler
    defaultBtn.addEventListener("change", function(){
        console.log('📁 File input changed');
        const file = this.files[0];
        if(file){
            console.log('📄 File selected:', file.name, 'Size:', file.size, 'Type:', file.type);
            
            // Validate file type
            if (!file.type.startsWith('image/')) {
                console.error('❌ Invalid file type:', file.type);
                showNotification('Please select an image file', 'error');
                return;
            }
            
            // Validate file size (10MB limit)
            if (file.size > 10 * 1024 * 1024) {
                console.error('❌ File too large:', file.size);
                showNotification('File size must be less than 10MB', 'error');
                return;
            }
            
            console.log('✅ File validation passed');
            
            const reader = new FileReader();
            reader.onload = function(){
                console.log('📸 File read successfully');
                const result = reader.result;
                if (img) {
                    img.src = result;
                    console.log('🖼️ Image preview updated');
                }
                
                // Update UI state
                if (wrapper) {
                    wrapper.classList.add("active");
                    console.log('🎨 Upload wrapper activated');
                }
                
                // Show loading and hide info
                showLoading();
                
                // Submit form
                console.log('📤 Submitting form...');
                imgform.submit();
            }
            
            reader.onerror = function() {
                console.error('❌ Error reading file');
                showNotification('Error reading file', 'error');
            }
            
            reader.readAsDataURL(file);
        }
        
        // Update filename display
        if(this.value && fileName){
            let valueStore = this.value.match(regExp);
            fileName.textContent = valueStore;
        }
    });

    // Cancel button handler (only if it exists)
    if (cancelBtn) {
        cancelBtn.addEventListener("click", function(){
            console.log('❌ Cancel button clicked');
            if (img) img.src = "";
            if (wrapper) wrapper.classList.remove("active");
            window.location.href = "";
        });
    }

    // Custom button click handler
    if (customBtn) {
        customBtn.addEventListener("click", function(){
            console.log('🖱️ Custom upload button clicked');
            defaultBtn.click();
        });
    }
}

// Show loading overlay
function showLoading() {
    console.log('⏳ Showing loading overlay');
    const infoSection = document.getElementById("info");
    const loadingSection = document.getElementById("loading");
    
    if (infoSection) {
        infoSection.style.display = "none";
        console.log('📱 Info section hidden');
    }
    if (loadingSection) {
        loadingSection.style.display = "flex";
        console.log('⏳ Loading section shown');
    }
}

// Hide loading overlay
function hideLoading() {
    console.log('✅ Hiding loading overlay');
    const infoSection = document.getElementById("info");
    const loadingSection = document.getElementById("loading");
    
    if (infoSection) {
        infoSection.style.display = "block";
    }
    if (loadingSection) {
        loadingSection.style.display = "none";
    }
}

// Sample image selection (legacy compatibility)
function select(filename) {
    console.log('🖼️ Sample image selected:', filename);
    const img = document.getElementById('foodimage');
    if (img) {
        img.src = "/static/images/" + filename;
        console.log('📸 Sample image loaded');
    }
    
    showLoading();
    
    // For sample images, we need to trigger the backend
    // Create a form submission for sample selection
    const form = document.getElementById('foodimgform');
    if (form) {
        // Create a hidden input for sample selection
        const sampleInput = document.createElement('input');
        sampleInput.type = 'hidden';
        sampleInput.name = 'sample_image';
        sampleInput.value = filename;
        form.appendChild(sampleInput);
        
        console.log('📤 Submitting sample selection form');
        form.submit();
    }
}

// Tab functionality (legacy compatibility)
function myFunctab1() {
    const tab1 = document.getElementById("tab1");
    const tab2 = document.getElementById("tab2");
    const tabbtn1 = document.getElementById("tabbtn1");
    const tabbtn2 = document.getElementById("tabbtn2");
    
    if (tab1) tab1.style.display = "block";
    if (tab2) tab2.style.display = "none";
    if (tabbtn1) tabbtn1.className = "nav-link active";
    if (tabbtn2) tabbtn2.className = "nav-link";
}

function myFunctab2() {
    const tab1 = document.getElementById("tab1");
    const tab2 = document.getElementById("tab2");
    const tabbtn1 = document.getElementById("tabbtn1");
    const tabbtn2 = document.getElementById("tabbtn2");
    
    if (tab1) tab1.style.display = "none";
    if (tab2) tab2.style.display = "block";
    if (tabbtn1) tabbtn1.className = "nav-link";
    if (tabbtn2) tabbtn2.className = "nav-link active";
}

// Default button activation (legacy compatibility)
function defaultBtnActive() {
    console.log('🔘 Default button activation triggered');
    const defaultBtn = document.querySelector("#default-btn");
    if (defaultBtn) {
        defaultBtn.click();
    }
}

// Notification system
function showNotification(message, type = 'info') {
    console.log('📢 Showing notification:', message, type);
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-2xl shadow-lg transform transition-all duration-300 translate-x-full`;
    
    // Set notification style based on type
    switch(type) {
        case 'error':
            notification.className += ' bg-red-500 text-white';
            break;
        case 'success':
            notification.className += ' bg-green-500 text-white';
            break;
        case 'warning':
            notification.className += ' bg-yellow-500 text-white';
            break;
        default:
            notification.className += ' bg-blue-500 text-white';
    }
    
    notification.innerHTML = `
        <div class="flex items-center space-x-3">
            <i data-lucide="${type === 'error' ? 'alert-circle' : type === 'success' ? 'check-circle' : 'info'}" class="w-5 h-5"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Initialize icon
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Smooth scrolling
function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.group, .bg-white\\/80, .bg-white\\/60').forEach(el => {
        observer.observe(el);
    });
}

// Utility functions for modern features
const utils = {
    // Debounce function
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Format file size
    formatFileSize: function(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export for global access
window.recipeGenerator = {
    showLoading,
    hideLoading,
    showNotification,
    select,
    myFunctab1,
    myFunctab2,
    defaultBtnActive,
    utils
};

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('👁️ Page hidden');
    } else {
        console.log('👁️ Page visible');
        // Reinitialize icons if needed
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
});

// Handle window resize
window.addEventListener('resize', utils.debounce(function() {
    console.log('📏 Window resized');
}, 250));

// Error handling
window.addEventListener('error', function(e) {
    console.error('💥 JavaScript error:', e.error);
    showNotification('An error occurred. Please try again.', 'error');
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', function(e) {
    console.error('💥 Unhandled promise rejection:', e.reason);
    showNotification('An error occurred. Please try again.', 'error');
});

console.log('🎉 AI Recipe Generator script loaded successfully!');


    

