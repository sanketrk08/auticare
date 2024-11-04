document.addEventListener('DOMContentLoaded', () => {
    // Sketchy Background Animation
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const backgroundAnimation = document.getElementById('background-animation');
    if (backgroundAnimation) {
        backgroundAnimation.appendChild(canvas);
    }

    let w, h;

    function init() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        drawBackground();
    }

    function drawBackground() {
        ctx.clearRect(0, 0, w, h);
        ctx.strokeStyle = '#4A90E2';
        ctx.lineWidth = 2;

        // Draw sketchy circles
        for (let i = 0; i < 20; i++) {
            drawSketchyCircle(Math.random() * w, Math.random() * h, Math.random() * 50 + 10);
        }

        // Draw sketchy lines
        for (let i = 0; i < 30; i++) {
            drawSketchyLine(
                Math.random() * w, Math.random() * h,
                Math.random() * w, Math.random() * h
            );
        }
    }

    function drawSketchyCircle(x, y, radius) {
        ctx.beginPath();
        for (let i = 0; i < Math.PI * 2; i += 0.2) {
            const offsetX = (Math.random() - 0.5) * 4;
            const offsetY = (Math.random() - 0.5) * 4;
            const px = x + Math.cos(i) * radius + offsetX;
            const py = y + Math.sin(i) * radius + offsetY;
            ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
    }

    function drawSketchyLine(x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;
        ctx.quadraticCurveTo(midX + offsetX, midY + offsetY, x2, y2);
        ctx.stroke();
    }

    init();
    window.addEventListener('resize', init);

    // Navigation
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-section');
            sections.forEach(section => {
                section.classList.remove('active');
            });
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                link.classList.add('active');
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // AI Bot
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }

    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    function sendMessage() {
        if (userInput && chatMessages) {
            const message = userInput.value.trim();
            if (message) {
                appendMessage('You', message);
                setTimeout(() => {
                    appendMessage('Learning Buddy', 'That\'s a great question! Let\'s explore it together. Can you tell me more about what you already know?');
                }, 1000);
                userInput.value = '';
            }
        }
    }

    function appendMessage(sender, message) {
        if (chatMessages) {
            const messageElement = document.createElement('div');
            messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
            messageElement.style.marginBottom = '10px';
            chatMessages.appendChild(messageElement);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    // Game Selection
    const gameThumbnails = document.querySelectorAll('.game-thumbnail');
    const gameContainer = document.getElementById('game-container');
    const gameContents = document.querySelectorAll('.game-content');

    gameThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const gameType = thumbnail.getAttribute('data-game');
            if (gameContainer) {
                gameContainer.classList.remove('hidden');
            }
            gameContents.forEach(content => {
                content.classList.remove('active');
            });
            const selectedGame = document.getElementById(`${gameType}-game`);
            if (selectedGame) {
                selectedGame.classList.add('active');
            }
        });
    });

    // Where Is My Shadow Game
    const shadowGameCanvas = document.getElementById('shadow-game-canvas');
    const startShadowGameButton = document.getElementById('start-shadow-game');
    const shadowGameScoreElement = document.getElementById('shadow-game-score');

    let shadowGameCtx, shadowGameLoop, shadowGamePlayer, shadowGameTarget, shadowGameScore;

    if (shadowGameCanvas) {
        shadowGameCtx = shadowGameCanvas.getContext('2d');
        shadowGameCanvas.width = 300;
        shadowGameCanvas.height = 300;

        if (startShadowGameButton) {
            startShadowGameButton.addEventListener('click', startShadowGame);
        }
    }

    function startShadowGame() {
        shadowGamePlayer = { x: shadowGameCanvas.width / 2, y: shadowGameCanvas.height / 2, radius: 20 };
        shadowGameTarget = getRandomPosition();
        shadowGameScore = 0;
        if (shadowGameScoreElement) {
            shadowGameScoreElement.textContent = 'Score: 0';
        }
        if (shadowGameLoop) clearInterval(shadowGameLoop);
        shadowGameLoop = setInterval(updateShadowGame, 20);
    }

    function updateShadowGame() {
        shadowGameCtx.clearRect(0, 0, shadowGameCanvas.width, shadowGameCanvas.height);
        
        // Move player
        if (keys.ArrowLeft) shadowGamePlayer.x -= 5;
        if (keys.ArrowRight) shadowGamePlayer.x += 5;
        if (keys.ArrowUp) shadowGamePlayer.y -= 5;
        if (keys.ArrowDown) shadowGamePlayer.y += 5;

        // Keep player within bounds
        shadowGamePlayer.x = Math.max(shadowGamePlayer.radius, Math.min(shadowGameCanvas.width - shadowGamePlayer.radius, shadowGamePlayer.x));
        shadowGamePlayer.y = Math.max(shadowGamePlayer.radius, Math.min(shadowGameCanvas.height - shadowGamePlayer.radius, shadowGamePlayer.y));

        // Draw player
        shadowGameCtx.fillStyle = '#4A90E2';
        shadowGameCtx.beginPath();
        shadowGameCtx.arc(shadowGamePlayer.x, shadowGamePlayer.y, shadowGamePlayer.radius, 0, Math.PI * 2);
        shadowGameCtx.fill();

        // Draw target
        shadowGameCtx.fillStyle = '#F5A623';
        shadowGameCtx.fillRect(shadowGameTarget.x, shadowGameTarget.y, 30, 30);

        // Check if player found the target
        if (
            shadowGamePlayer.x > shadowGameTarget.x &&
            shadowGamePlayer.x < shadowGameTarget.x + 30 &&
            shadowGamePlayer.y > shadowGameTarget.y &&
            shadowGamePlayer.y < shadowGameTarget.y + 30
        ) {
            shadowGameScore++;
            if (shadowGameScoreElement) {
                shadowGameScoreElement.textContent = 'Score: ' + shadowGameScore;
            }
            shadowGameTarget = getRandomPosition();
        }
    }

    function getRandomPosition() {
        return {
            x: Math.random() * (shadowGameCanvas.width - 30),
            y: Math.random() * (shadowGameCanvas.height - 30)
        };
    }

    const keys = {};
    document.addEventListener('keydown', (e) => keys[e.code] = true);
    document.addEventListener('keyup', (e) => keys[e.code] = false);

    // Half n Half Game
    const halfnhalfControls = document.getElementById('halfnhalf-controls');
    const halfnhalfIframeContainer = document.getElementById('halfnhalf-iframe-container');
    const startHalfnhalfGameButton = document.getElementById('start-halfnhalf-game');
    const halfnhalfScoreElement = document.getElementById('halfnhalf-score');

    let halfnhalfScore = 0;

    if (startHalfnhalfGameButton) {
        startHalfnhalfGameButton.addEventListener('click', () => {
            halfnhalfScore = 0;
            if (halfnhalfScoreElement) {
                halfnhalfScoreElement.textContent = 'Score: 0';
            }
            if (halfnhalfControls) {
                halfnhalfControls.classList.add('hidden');
            }
            if (halfnhalfIframeContainer) {
                halfnhalfIframeContainer.classList.remove('hidden');
            }
        });
    }

    // Match Animal Game
    const matchAnimalGrid = document.getElementById('match-animal-grid');
    const startMatchAnimalButton = document.getElementById('start-match-animal-game');
    const matchAnimalScoreElement = document.getElementById('match-animal-score');

    const animals = ['cat', 'dog', 'elephant', 'giraffe', 'lion', 'monkey', 'panda', 'penguin', 'tiger', 'zebra'];
    let matchAnimalCards = [];
    let flippedMatchAnimalCards = [];
    let matchAnimalScore = 0;

    function createMatchAnimalCards() {
        matchAnimalCards = [];
        animals.forEach(animal => {
            matchAnimalCards.push({ animal, type: 'image' });
            matchAnimalCards.push({ animal, type: 'name' });
        });
        shuffleArray(matchAnimalCards);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function renderMatchAnimalGrid() {
        if (matchAnimalGrid) {
            matchAnimalGrid.innerHTML = '';
            matchAnimalCards.forEach((card, index) => {
                const cardElement = document.createElement('div');
                cardElement.classList.add('card');
                cardElement.dataset.index = index;
                cardElement.style.backgroundImage = `url('/placeholder.svg?height=100&width=100')`;
                cardElement.addEventListener('click', flipMatchAnimalCard);
                matchAnimalGrid.appendChild(cardElement);
            });
        }
    }

    function flipMatchAnimalCard() {
        const index = parseInt(this.dataset.index);
        if (flippedMatchAnimalCards.length < 2 && !flippedMatchAnimalCards.includes(index)) {
            const card = matchAnimalCards[index];
            if (card.type === 'image') {
                this.style.backgroundImage = `url('/placeholder.svg?text=${card.animal}&height=100&width=100')`;
            } else {
                this.textContent = card.animal;
                this.style.backgroundImage = 'none';
                this.style.display = 'flex';
                this.style.justifyContent = 'center';
                this.style.alignItems = 'center';
                this.style.fontSize = '14px';
                this.style.fontWeight = 'bold';
                this.style.color = '#4A90E2';
            }
            flippedMatchAnimalCards.push(index);

            if (flippedMatchAnimalCards.length === 2) {
                setTimeout(checkMatchAnimalMatch, 1000);
            }
        }
    }

    function checkMatchAnimalMatch() {
        const [index1, index2] = flippedMatchAnimalCards;
        const card1 = matchAnimalCards[index1];
        const card2 = matchAnimalCards[index2];

        if (card1.animal === card2.animal && card1.type !== card2.type) {
            matchAnimalScore++;
            if (matchAnimalScoreElement) {
                matchAnimalScoreElement.textContent = 'Score: ' + matchAnimalScore;
            }
            document.querySelectorAll(`.card[data-index="${index1}"], .card[data-index="${index2}"]`).forEach(card => {
                card.style.visibility = 'hidden';
            });
        } else {
            document.querySelectorAll(`.card[data-index="${index1}"], .card[data-index="${index2}"]`).forEach(card => {
                card.style.backgroundImage = `url('/placeholder.svg?height=100&width=100')`;
                card.textContent = '';
                card.style.display = 'block';
            });
        }

        flippedMatchAnimalCards = [];

        if (matchAnimalScore === animals.length) {
            alert('Congratulations! You\'ve matched all the animals!');
        }
    }

    if (startMatchAnimalButton) {
        startMatchAnimalButton.addEventListener('click', () => {
            matchAnimalScore = 0;
            if (matchAnimalScoreElement) {
                matchAnimalScoreElement.textContent = 'Score: 0';
            }
            createMatchAnimalCards();
            renderMatchAnimalGrid();
        });
    }

    // Music Player
    const audioPlayer = document.getElementById('audio-player');
    const playPauseButton = document.getElementById('play-pause');
    const prevTrackButton = document.getElementById('prev-track');
    const nextTrackButton = document.getElementById('next-track');
    const playlist = document.getElementById('playlist');

    const tracks = [
        { title: 'Sensory Music', src: 'music/Sensory Music for Autism Sensory Visuals.mp3' },
        { title: 'Calming Music', src: 'music/calming sensory.mp3' },
        { title: 'Relaxing Music', src: 'music/Relaxing Music.mp3' }
    ];

    let currentTrackIndex = 0;

    function loadTrack(index) {
        if (audioPlayer) {
            audioPlayer.src = tracks[index].src;
            audioPlayer.load();
        }
    }

    function updatePlaylist() {
        if (playlist) {
            playlist.innerHTML = '';
            tracks.forEach((track, index) => {
                const li = document.createElement('li');
                li.textContent = track.title;
                
                li.addEventListener('click', () => {
                    currentTrackIndex = index;
                    loadTrack(currentTrackIndex);
                    if (audioPlayer) audioPlayer.play();
                    updatePlayPauseButton();
                });
                playlist.appendChild(li);
            });
        }
    }

    function updatePlayPauseButton() {
        if (playPauseButton) {
            playPauseButton.textContent = audioPlayer && audioPlayer.paused ? 'Play' : 'Pause';
        }
    }

    if (playPauseButton) {
        playPauseButton.addEventListener('click', () => {
            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
            updatePlayPauseButton();
        });
    }

    if (prevTrackButton) {
        prevTrackButton.addEventListener('click', () => {
            currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
            loadTrack(currentTrackIndex);
            if (audioPlayer) audioPlayer.play();
            updatePlayPauseButton();
        });
    }

    if (nextTrackButton) {
        nextTrackButton.addEventListener('click', () => {
            currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
            loadTrack(currentTrackIndex);
            if (audioPlayer) audioPlayer.play();
            updatePlayPauseButton();
        });
    }

    loadTrack(currentTrackIndex);
    updatePlaylist();

    // Quiz
    const quizContainer = document.getElementById('quiz-container');
    const questionContainer = document.getElementById('question-container');
    const answerButtons = document.getElementById('answer-buttons');
    const nextButton = document.getElementById('next-button');

    let currentQuestionIndex = 0;
    const quizQuestions = [
        {
            question: 'What color is the sky on a clear day?',
            answers: [
                { text: 'Blue', correct: true },
                { text: 'Green', correct: false },
                { text: 'Red', correct: false },
                { text: 'Yellow', correct: false }
            ]
        },
        {
            question: 'How many legs does a cat have?',
            answers: [
                { text: 'Two', correct: false },
                { text: 'Four', correct: true },
                { text: 'Six', correct: false },
                { text: 'Eight', correct: false }
            ]
        }
    ];

    function startQuiz() {
        currentQuestionIndex = 0;
        showQuestion(quizQuestions[currentQuestionIndex]);
    }

    function showQuestion(question) {
        if (questionContainer) {
            questionContainer.innerText = question.question;
        }
        if (answerButtons) {
            answerButtons.innerHTML = '';
            question.answers.forEach(answer => {
                const button = document.createElement('button');
                button.innerText = answer.text;
                button.classList.add('answer-button');
                if (answer.correct) {
                    button.dataset.correct = answer.correct;
                }
                button.addEventListener('click', selectAnswer);
                answerButtons.appendChild(button);
            });
        }
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct;
        setStatusClass(document.body, correct);
        Array.from(answerButtons.children).forEach(button => {
            setStatusClass(button, button.dataset.correct);
        });
        if (quizQuestions.length > currentQuestionIndex + 1) {
            if (nextButton) nextButton.classList.remove('hide');
        } else {
            if (nextButton) {
                nextButton.innerText = 'Restart';
                nextButton.classList.remove('hide');
            }
        }
    }

    function setStatusClass(element, correct) {
        clearStatusClass(element);
        if (correct) {
            element.classList.add('correct');
        } else {
            element.classList.add('wrong');
        }
    }

    function clearStatusClass(element) {
        element.classList.remove('correct');
        element.classList.remove('wrong');
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizQuestions.length) {
                showQuestion(quizQuestions[currentQuestionIndex]);
            } else {
                startQuiz();
            }
        });
    }

    startQuiz();

    // Booking Form
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(bookingForm);
            const bookingData = Object.fromEntries(formData.entries());
            console.log('Booking submitted:', bookingData);
            alert('Thank you for booking a consultation. We will contact you soon!');
            bookingForm.reset();
        });
    }
});
