   // Part 2: JavaScript Functions — Scope, Parameters & Return Values
        
        // Global variables
        const clubName = "BookNook Club";
        let totalRatings = 0;
        let sumOfRatings = 0;
        
        // Function with parameters and return value
        function calculateAverageRating(newRating) {
            // Local variables within function scope
            totalRatings++;
            sumOfRatings += newRating;
            return sumOfRatings / totalRatings;
        }
        
        // Function demonstrating different scopes
        function submitRating() {
            const ratingInput = document.getElementById('ratingInput');
            const rating = parseInt(ratingInput.value);
            
            if (isNaN(rating) || rating < 1 || rating > 5) {
                document.getElementById('ratingResult').textContent = "Please enter a valid rating between 1 and 5.";
                return; // Early return if invalid
            }
            
            // Calling function with parameter and capturing return value
            const averageRating = calculateAverageRating(rating);
            
            // Using template literals for string interpolation
            document.getElementById('ratingResult').textContent = 
                `Thank you for your ${rating}-star rating! Club average: ${averageRating.toFixed(2)}/5 (${totalRatings} ratings)`;
            
            ratingInput.value = ""; // Clear input
        }
        
        // Another function with parameters and return value
        function calculateReadingHours(pageCount, readingSpeed) {
            // Default parameter value if readingSpeed is not provided
            const speed = readingSpeed || 30;
            return pageCount / speed;
        }
        
        function calculateReadingTime() {
            const pageCount = parseInt(document.getElementById('pageCount').value);
            const readingSpeed = parseInt(document.getElementById('readingSpeed').value);
            
            if (isNaN(pageCount) || pageCount <= 0) {
                document.getElementById('readingTimeResult').textContent = "Please enter a valid page count.";
                return;
            }
            
            // Calling function with multiple parameters
            const hoursNeeded = calculateReadingHours(pageCount, readingSpeed);
            
            let resultText;
            if (hoursNeeded < 1) {
                const minutes = Math.round(hoursNeeded * 60);
                resultText = `Estimated reading time: ${minutes} minutes`;
            } else if (hoursNeeded < 8) {
                resultText = `Estimated reading time: ${hoursNeeded.toFixed(1)} hours`;
            } else {
                const days = (hoursNeeded / 2).toFixed(1); // Assuming 2 hours reading per day
                resultText = `At 2 hours per day, you'll finish in about ${days} days`;
            }
            
            document.getElementById('readingTimeResult').textContent = resultText;
        }
        
        // Function with different return types based on input
        function getBookRecommendation(genre) {
            // Object containing book recommendations by genre
            const recommendations = {
                'fantasy': { title: 'The Name of the Wind', author: 'Patrick Rothfuss' },
                'mystery': { title: 'Gone Girl', author: 'Gillian Flynn' },
                'sci-fi': { title: 'Dune', author: 'Frank Herbert' },
                'non-fiction': { title: 'Educated', author: 'Tara Westover' },
                'romance': { title: 'Pride and Prejudice', author: 'Jane Austen' }
            };
            
            // Return the recommendation based on genre or a default
            return recommendations[genre] || { title: 'The Alchemist', author: 'Paulo Coelho' };
        }
        
        function getRecommendation() {
            const genre = document.getElementById('genreSelect').value;
            
            // Get recommendation object from function
            const recommendation = getBookRecommendation(genre);
            
            document.getElementById('recommendationResult').textContent = 
                `Based on your interest in ${genre}, we recommend: "${recommendation.title}" by ${recommendation.author}`;
        }
        
        // Part 3: Combining CSS Animations with JavaScript
        
        // Store which book details are expanded
        const expandedBooks = [false, false, false, false];
        
        function toggleBookDetails(bookIndex) {
            const bookDetails = document.getElementById(`bookDetails${bookIndex}`);
            
            // Toggle the expanded state
            expandedBooks[bookIndex] = !expandedBooks[bookIndex];
            
            // Apply or remove the expanded class to trigger CSS animation
            if (expandedBooks[bookIndex]) {
                bookDetails.classList.add('expanded');
            } else {
                bookDetails.classList.remove('expanded');
            }
            
            // Close other expanded books
            for (let i = 0; i < expandedBooks.length; i++) {
                if (i !== bookIndex && expandedBooks[i]) {
                    document.getElementById(`bookDetails${i}`).classList.remove('expanded');
                    expandedBooks[i] = false;
                }
            }
        }
        
        function animateBooks() {
            const books = document.querySelectorAll('.shelf-book');
            
            books.forEach((book, index) => {
                // Use JavaScript to set a timeout and apply CSS transforms
                setTimeout(() => {
                    book.style.transform = 'translateY(-20px)';
                    
                    // Return to original position after a delay
                    setTimeout(() => {
                        book.style.transform = 'translateY(0)';
                    }, 500);
                }, index * 200); // Stagger the animations
            });
        }
        
        // Initialize page with some animations
        window.onload = function() {
            // Animate the header pulse on load
            const pulse = document.querySelector('.pulse');
            pulse.style.animation = 'pulse 2s infinite';
            
            // Animate progress bars on scroll into view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const progressBar = entry.target.querySelector('.progress-bar');
                        // This will trigger the CSS transition
                        progressBar.style.width = progressBar.style.width;
                    }
                });
            }, { threshold: 0.5 });
            
            // Observe all book cards with progress bars
            document.querySelectorAll('.book-card').forEach(card => {
                observer.observe(card);
            });
        };