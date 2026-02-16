// Current page tracker
let currentPage = 1;

// User selections
let selectedFood = '';
let selectedOccasion = '';

// 3D Cup Rotation Variables
let cupsRotationX = 0;
let cupsRotationY = 0;

// Initialize 3D cup interaction
document.addEventListener('DOMContentLoaded', () => {
    // 3D Cup Interactive Rotation
    const cups = document.querySelectorAll('.coffee-cup-3d');
    cups.forEach(cup => {
        cup.addEventListener('mousemove', (e) => {
            const rect = cup.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            const rotateY = (mouseX / (rect.width / 2)) * 15;
            const rotateX = -(mouseY / (rect.height / 2)) * 15;
            
            cup.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        cup.addEventListener('mouseleave', () => {
            cup.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
        
        cup.addEventListener('click', (e) => {
            cup.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            cup.style.transform = 'perspective(1000px) rotateX(360deg) rotateY(360deg) scale(1.05)';
            setTimeout(() => {
                cup.style.transition = '';
                cup.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            }, 600);
        });
    });

    // Food option buttons
    const foodButtons = document.querySelectorAll('[data-food]');
    foodButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove selected class from all food buttons
            foodButtons.forEach(btn => btn.classList.remove('selected'));
            // Add selected class to clicked button
            button.classList.add('selected');
            selectedFood = button.getAttribute('data-food');
            checkFormComplete();
        });
    });

    // Occasion option buttons
    const occasionButtons = document.querySelectorAll('[data-occasion]');
    occasionButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove selected class from all occasion buttons
            occasionButtons.forEach(btn => btn.classList.remove('selected'));
            // Add selected class to clicked button
            button.classList.add('selected');
            selectedOccasion = button.getAttribute('data-occasion');
            checkFormComplete();
        });
    });
});

// Sample cafe data (will be replaced with API data later)
const sampleCafes = [
    {
        name: "Cozy Corner Cafe",
        rating: "4.5 ⭐",
        address: "123 Main Street, Downtown",
        description: "A warm and inviting space perfect for intimate conversations",
        hours: "7:00 AM - 9:00 PM",
        priceRange: "₹₹",
        specialty: "Artisan coffee and homemade pastries"
    },
    {
        name: "The Brown Bean",
        rating: "4.7 ⭐",
        address: "456 Coffee Lane, Arts District",
        description: "Instagrammable aesthetic with amazing natural light",
        hours: "8:00 AM - 10:00 PM",
        priceRange: "₹₹₹",
        specialty: "Specialty lattes and brunch items"
    },
    {
        name: "Sunset Sips",
        rating: "4.6 ⭐",
        address: "789 Harbor View, Waterfront",
        description: "Beautiful sunset views with outdoor seating",
        hours: "9:00 AM - 11:00 PM",
        priceRange: "₹₹",
        specialty: "Fresh juices and healthy bowls"
    },
    {
        name: "Retro Roast",
        rating: "4.4 ⭐",
        address: "321 Vintage Ave, Old Town",
        description: "Vintage vibes with vinyl records and board games",
        hours: "6:00 AM - 8:00 PM",
        priceRange: "₹",
        specialty: "Classic espresso drinks and cookies"
    }
];

// Navigate to next page
function nextPage() {
    if (currentPage < 4) {
        currentPage++;
        updateSlider();
    }
}

// Navigate to previous page
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        updateSlider();
    }
}

// Update slider position
function updateSlider() {
    const slider = document.querySelector('.slider-container');
    const offset = -(currentPage - 1) * 100;
    slider.style.transform = `translateX(${offset}vw)`;
}

// Check if form is complete
function checkFormComplete() {
    const findBtn = document.getElementById('findCafesBtn');
    if (selectedFood && selectedOccasion) {
        findBtn.disabled = false;
    } else {
        findBtn.disabled = true;
    }
}

// Find cafes based on selections
function findCafes() {
    const cafesGrid = document.getElementById('cafesGrid');
    
    // Show loading state
    cafesGrid.innerHTML = '<div class="loading">finding the perfect spots for you... ☕✨</div>';
    
    // Move to results page
    nextPage();
    
    // Simulate API delay
    setTimeout(() => {
        displayCafes(sampleCafes);
    }, 1500);
}

// Display cafes in grid
function displayCafes(cafes) {
    const cafesGrid = document.getElementById('cafesGrid');
    cafesGrid.innerHTML = '';
    
    cafes.forEach((cafe, index) => {
        const cafeCard = document.createElement('div');
        cafeCard.className = 'cafe-card';
        cafeCard.innerHTML = `
            <h3 class="cafe-name">${cafe.name}</h3>
            <div class="cafe-rating">${cafe.rating}</div>
            <p class="cafe-address">📍 ${cafe.address}</p>
            
            <div class="cafe-details">
                <div class="detail-item">
                    <strong>About:</strong> ${cafe.description}
                </div>
                <div class="detail-item">
                    <strong>Hours:</strong> ${cafe.hours}
                </div>
                <div class="detail-item">
                    <strong>Price Range:</strong> ${cafe.priceRange}
                </div>
                <div class="detail-item">
                    <strong>Specialty:</strong> ${cafe.specialty}
                </div>
                <button class="select-cafe-btn" onclick="selectCafe('${cafe.name}')">
                    choose this cafe! 💕
                </button>
            </div>
        `;
        
        // Add click event to expand card
        cafeCard.addEventListener('click', (e) => {
            // Don't expand if clicking the select button
            if (e.target.classList.contains('select-cafe-btn')) return;
            
            // Close all other cards
            document.querySelectorAll('.cafe-card').forEach(card => {
                if (card !== cafeCard) {
                    card.classList.remove('expanded');
                }
            });
            
            // Toggle current card
            cafeCard.classList.toggle('expanded');
        });
        
        cafesGrid.appendChild(cafeCard);
        
        // Stagger animation
        setTimeout(() => {
            cafeCard.style.animation = 'slideUp 0.5s ease forwards';
        }, index * 100);
    });
}

// Add slideUp animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Select cafe and go to thank you page
function selectCafe(cafeName) {
    console.log('Selected cafe:', cafeName);
    nextPage();
}

// Reset app to start
function resetApp() {
    currentPage = 1;
    selectedFood = '';
    selectedOccasion = '';
    
    // Reset form selections
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Disable find button
    document.getElementById('findCafesBtn').disabled = true;
    
    // Clear cafes grid
    document.getElementById('cafesGrid').innerHTML = '';
    
    // Go back to first page
    updateSlider();
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextPage();
    } else if (e.key === 'ArrowLeft') {
        prevPage();
    }
});