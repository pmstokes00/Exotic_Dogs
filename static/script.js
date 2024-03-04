// Define image descriptions and initialize the game with descriptions
const descriptions = {
	    "Beagle.jpeg": {
        showName: "Beagle",
        description: "With its droopy ears and soulful eyes, is a breed known for its friendly disposition and boundless energy. Originally bred as scent hounds, theu posses an exceptional sense of smell this dog brings joy and companionship to any household."
    },
    "Pomsky.jpeg": {
        showName: "Pomsky",
        description: "The result of mixing a Pomeranian with a Husky, these fluff balls are like a double shot of espresso in a teacup. They're so small yet so energetic, they could power a small city with their zoomies."
    },
    "Corgi_Dalmatian_Mix.jpeg": {
        showName: "Corgi Dalmatian Mix",
        description: "This breed is proof that sometimes you just can't stick to one color scheme. With the body of a Corgi and the spots of a Dalmatian, they're like walking works of art."
    },
    "Golden_Dox.jpeg": {
        showName: "Golden Dox",
        description: "Part Golden Retriever, part Dachshund, this breed is the epitome of 'short legs, big heart'. They may not fetch sticks as gracefully, but they'll retrieve them with twice the enthusiasm."
    },
    "Bernedoodle.jpeg": {
        showName: "Bernedoodle",
        description: "Cross a Bernese Mountain Dog with a Poodle, and you get a Bernedoodle - a breed that's as majestic as it is fluffy. Their favorite hobbies include stealing hearts and spreading joy."
    },
    "Cavapoo.jpeg": {
        showName: "Cavapoo",
        description: "A cross between a Cavalier King Charles Spaniel and a Poodle, the Cavapoo is the canine equivalent of a teddy bear come to life. They excel at cuddles, snoozing, and stealing the spotlight."
    },
    "Shih_Poo.jpeg": {
        showName: "Shih-Poo",
        description: "The Shih-Poo, a mix between a Shih Tzu and a Poodle, is proof that good things come in small packages. With a fluffy coat and an affectionate nature, they're the ultimate lap dogs."
    },
    "Puggle.jpeg": {
        showName: "Puggle",
        description: "A Puggle is what happens when a Pug and a Beagle decide to start a family. These adorable goofballs are equal parts charming and mischievous, making them the life of any party."
    },
    "Aussiedoodle.jpeg": {
        showName: "Aussiedoodle",
        description: "Cross an Australian Shepherd with a Poodle, and you get te - a breed that's as smart as it is stunning. Their boundless energy and intelligence make them excellent companions for adventurous souls."
    },
    "Chug.jpeg": {
        showName: "Chug",
        description: "The Chug is a mix between a Chihuahua and a Pug, resulting in a tiny package with a big personality. They may be small, but they've got enough attitude to fill a room."
    },
    "Labradoodle.jpeg": {
        showName: "Labradoodle",
        description: "The Labradoodle is a cross between a Labrador Retriever and a Poodle, combining the intelligence of both breeds with the low-shedding coat of the Poodle. They're the perfect blend of brains and beauty."
    }
};

// Initialize the game with descriptions
initializeGame(descriptions);

// Initialize the game with descriptions
initializeGame(descriptions);

// Function to initialize the game with descriptions
	function initializeGame(descriptions) {
		// Define image data
		const images = Object.keys(descriptions).map(imagePath => ({
			image_path: `static/Images/${imagePath}`,
			show_name: descriptions[imagePath].showName,
			description: descriptions[imagePath].description
		}));

		// Initialize index to track current image, score, and total attempts counter
		let currentIndex = 0;
		let score = 0;
		let totalAttempts = 0; // Add variable to track total attempts
		let incorrectAttempts = 0;
		let soundPlayed = false; // Flag to track whether sound has been played

		// Update total count of images
		document.getElementById('total-count').textContent = images.length;

		// Function to display current image, description, and choices
		function displayImage(index) {
			const image = images[index];
			const currentImage = document.getElementById('current-image');
			currentImage.src = image.image_path;
			currentImage.alt = image.show_name;
			document.getElementById('description').textContent = image.description;
			generateChoices(image.show_name);
		}

    // Function to generate multiple choices
    function generateChoices(correctShowName) {
        const choicesContainer = document.getElementById('choices');
        choicesContainer.innerHTML = ''; // Clear previous choices
        const allShowNames = images.map(image => image.show_name);
        const shuffledShowNames = shuffleArray(allShowNames);
        const correctIndex = shuffledShowNames.indexOf(correctShowName);
        shuffledShowNames.splice(correctIndex, 1); // Remove correct answer from the array
        shuffledShowNames.sort(() => Math.random() - 0.5); // Shuffle remaining options
        shuffledShowNames.splice(Math.floor(Math.random() * 4), 0, correctShowName); // Insert correct answer at a random position
        shuffledShowNames.forEach((showName, index) => {
            if (index < 4) {
                const choiceButton = document.createElement('button');
                choiceButton.textContent = showName;
                choiceButton.classList.add('choice-button');
				choiceButton.addEventListener('click', () => {
					totalAttempts++; // Increment total attempts on each choice
					document.getElementById('attempt-count').textContent = totalAttempts; // Update attempts display
                    if (showName === correctShowName) {
                        choiceButton.style.color = 'white'; // Change text color to white for the correct answer
                        document.getElementById('result').textContent = 'Correct!';
                        document.getElementById('result').style.display = 'block'; // Show result message
                        score++; // Increase score
                        document.getElementById('score-value').textContent = score; // Update score display
                        setTimeout(() => {
                            document.getElementById('result').style.display = 'none'; // Hide result message after 2 seconds
                        }, 2000); // Hide message after 2 seconds
                        nextImage(); // Move to next image
                    } else {
						// Code for incorrect choice
						document.getElementById('result').textContent = 'Incorrect. Try again';
						document.getElementById('result').style.display = 'block'; // Show result message
						incorrectAttempts++; // Increment incorrect attempts
						setTimeout(() => {
							document.getElementById('result').style.display = 'none'; // Hide result message after 2 seconds
						}, 2000); // Hide message after 2 seconds
						if (incorrectAttempts === 3) {
							nextImage(); // Move to next image after 3 incorrect attempts
							incorrectAttempts = 0; // Reset incorrect attempts counter
						}
					}
                });
                choicesContainer.appendChild(choiceButton);
            }
        });
    }

    // Function to shuffle an array (Fisher-Yates algorithm)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Function to move to the next image
    function nextImage() {
        currentIndex++;
        if (currentIndex >= images.length) {
            document.getElementById('game-over').innerHTML = 'Game Over<br>Restart?<br>Click here.';
            document.getElementById('game-over').style.display = 'block'; // Show game over message
            document.getElementById('game-over').addEventListener('click', restartGame);
        } else {
            displayImage(currentIndex);
        }
    }

    // Function to restart the game
    function restartGame() {
        currentIndex = 0; // Reset index
        incorrectAttempts = 0; // Reset incorrect attempts counter
        totalIncorrectAttempts = 0; // Reset total incorrect attempts counter
        score = 0; // Reset score
        document.getElementById('score-value').textContent = score; // Reset score display
        document.getElementById('attempt-count').textContent = totalIncorrectAttempts; // Reset total incorrect attempts display
        displayImage(currentIndex); // Display first image
        document.getElementById('game-over').style.display = 'none'; // Hide game over message
    }

    // Function to move to the next image
    function nextImage() {
        currentIndex++;
        if (currentIndex >= images.length) {
            document.getElementById('game-over').innerHTML = 'Game Over<br>Restart?<br>Click here.';
            document.getElementById('game-over').style.display = 'block'; // Show game over message
            document.getElementById('game-over').addEventListener('click', restartGame);
        } else {
            displayImage(currentIndex);
        }
    }

    // Function to restart the game
    function restartGame() {
        currentIndex = 0; // Reset index
        incorrectAttempts = 0; // Reset incorrect attempts counter
		incorrect =0;
        score = 0; // Reset score
        document.getElementById('score-value').textContent = score; // Reset score display
        displayImage(currentIndex); // Display first image
        document.getElementById('game-over').style.display = 'none'; // Hide game over message
    }

    // Event listener for the play sound button
    document.getElementById('play-sound-button').addEventListener('click', function() {
        // Logic to play the sound when the button is clicked
        const audio = new Audio('static/default_sound.mp3');
        audio.play();
        // Set the flag to true indicating the sound has been played
        soundPlayed = true;
        // Hide the play sound button after playing sound
        document.getElementById('play-sound-button').style.display = 'none';
        // Enable the choice buttons after sound is played
        enableChoiceButtons();
        // Display the first image after the sound is played
        displayImage(currentIndex);
    });

    // Function to enable choice buttons
    function enableChoiceButtons() {
        const choiceButtons = document.querySelectorAll('.choice-button');
        choiceButtons.forEach(button => {
            button.disabled = false; // Enable each choice button
        });
    }

    // Initial display
    // Since we're removing the sound button, we need to call displayImage directly
    displayImage(currentIndex);
	
    // Optional: Add event listeners for keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = images.length - 1; // Wrap around to the last image
            }
            displayImage(currentIndex);
        } else if (event.key === 'ArrowRight') {
            currentIndex++;
            if (currentIndex >= images.length) {
                currentIndex = 0; // Wrap around to the first image
            }
            displayImage(currentIndex);
        }
    });
}
