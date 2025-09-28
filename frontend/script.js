/*
 * VocabMaster - SAT Vocabulary Learning App JavaScript
 * Main application logic with modular architecture
 */

// External library imports (available via CDN)
// lodash is available globally as _

// Application State Management
class VocabApp {
    constructor() {
        this.currentUser = this.loadUserData();
        this.currentLevel = 'beginner';
        this.currentExercise = null;
        this.exerciseData = null;
        this.exerciseScore = 0;
        this.exerciseAnswers = [];
        this.vocabularyData = this.initializeVocabularyData();
        
        this.init();
    }

    // Initialize the application
    init() {
        this.bindEventListeners();
        this.updateDashboard();
        this.showView('dashboard');
    }

    // Load user data from memory (no localStorage in Claude environment)
    loadUserData() {
        return {
            wordsLearned: 0,
            accuracyRate: 0,
            currentStreak: 0,
            timeSpent: 0,
            levelProgress: {
                beginner: 0,
                intermediate: 0,
                advanced: 0,
                expert: 0
            },
            recentActivity: [],
            settings: {
                wordsPerSession: 10,
                difficultyAdaptation: true
            }
        };
    }

    // Save user data to memory
    saveUserData() {
        // In a real app, this would save to localStorage or backend
        // For Claude environment, we keep data in memory during session
        console.log('User data saved:', this.currentUser);
    }

    // Initialize SAT vocabulary data (sample subset)
    initializeVocabularyData() {
        return {
            beginner: [
                {
                    word: "abundant",
                    definition: "existing or available in large quantities; plentiful",
                    difficulty: 1,
                    partOfSpeech: "adjective",
                    example: "The region has abundant natural resources."
                },
                {
                    word: "benevolent",
                    definition: "well meaning and kindly; charitable",
                    difficulty: 1,
                    partOfSpeech: "adjective",
                    example: "She was a benevolent ruler who cared for her people."
                },
                {
                    word: "candid",
                    definition: "truthful and straightforward; frank",
                    difficulty: 1,
                    partOfSpeech: "adjective",
                    example: "I appreciate your candid feedback on my work."
                },
                {
                    word: "diligent",
                    definition: "having or showing care and conscientiousness",
                    difficulty: 1,
                    partOfSpeech: "adjective",
                    example: "She was diligent in her studies and always completed assignments early."
                },
                {
                    word: "eloquent",
                    definition: "fluent or persuasive in speaking or writing",
                    difficulty: 1,
                    partOfSpeech: "adjective",
                    example: "The speaker delivered an eloquent address to the graduating class."
                }
            ],
            intermediate: [
                {
                    word: "facilitate",
                    definition: "make an action or process easier or help bring about",
                    difficulty: 2,
                    partOfSpeech: "verb",
                    example: "The new software will facilitate communication between departments."
                },
                {
                    word: "gregarious",
                    definition: "fond of the company of others; sociable",
                    difficulty: 2,
                    partOfSpeech: "adjective",
                    example: "His gregarious nature made him popular at social gatherings."
                },
                {
                    word: "hypothesis",
                    definition: "a supposition or proposed explanation made as a starting point",
                    difficulty: 2,
                    partOfSpeech: "noun",
                    example: "The scientist tested her hypothesis through careful experimentation."
                },
                {
                    word: "ingenious",
                    definition: "clever, original, and inventive",
                    difficulty: 2,
                    partOfSpeech: "adjective",
                    example: "She devised an ingenious solution to the complex problem."
                },
                {
                    word: "juxtapose",
                    definition: "place or deal with close together for contrasting effect",
                    difficulty: 2,
                    partOfSpeech: "verb",
                    example: "The artist chose to juxtapose light and dark elements in the painting."
                }
            ],
            advanced: [
                {
                    word: "knavish",
                    definition: "dishonest and unscrupulous",
                    difficulty: 3,
                    partOfSpeech: "adjective",
                    example: "His knavish behavior eventually caught up with him."
                },
                {
                    word: "lugubrious",
                    definition: "looking or sounding sad and dismal",
                    difficulty: 3,
                    partOfSpeech: "adjective",
                    example: "The lugubrious melody perfectly matched the somber occasion."
                },
                {
                    word: "magnanimous",
                    definition: "generous or forgiving, especially toward a rival or less powerful person",
                    difficulty: 3,
                    partOfSpeech: "adjective",
                    example: "She was magnanimous in victory, praising her opponent's efforts."
                },
                {
                    word: "nefarious",
                    definition: "extremely wicked or villainous",
                    difficulty: 3,
                    partOfSpeech: "adjective",
                    example: "The detective uncovered the villain's nefarious plot."
                },
                {
                    word: "ostentatious",
                    definition: "characterized by vulgar or pretentious display",
                    difficulty: 3,
                    partOfSpeech: "adjective",
                    example: "His ostentatious lifestyle reflected his need for attention."
                }
            ],
            expert: [
                {
                    word: "perspicacious",
                    definition: "having a ready insight into and understanding of things",
                    difficulty: 4,
                    partOfSpeech: "adjective",
                    example: "Her perspicacious analysis revealed the hidden flaws in the argument."
                },
                {
                    word: "quixotic",
                    definition: "extremely idealistic and unrealistic",
                    difficulty: 4,
                    partOfSpeech: "adjective",
                    example: "His quixotic quest to end all poverty was admirable but impractical."
                },
                {
                    word: "recondite",
                    definition: "little known; abstruse; dealing with very profound subject matter",
                    difficulty: 4,
                    partOfSpeech: "adjective",
                    example: "The professor's recondite theories were difficult for students to grasp."
                },
                {
                    word: "sycophantic",
                    definition: "behaving obsequiously to gain advantage; fawning",
                    difficulty: 4,
                    partOfSpeech: "adjective",
                    example: "His sycophantic behavior toward the boss was obvious to everyone."
                },
                {
                    word: "truculent",
                    definition: "eager or quick to argue or fight; aggressively defiant",
                    difficulty: 4,
                    partOfSpeech: "adjective",
                    example: "The truculent customer refused to listen to reason."
                }
            ]
        };
    }

    // Event Listener Binding
    bindEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const view = e.currentTarget.dataset.view;
                this.showView(view);
            });
        });

        // Level Selection
        document.querySelectorAll('.level-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const level = e.currentTarget.dataset.level;
                this.selectLevel(level);
            });
        });

        // Exercise Selection
        document.querySelectorAll('.exercise-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const exercise = e.currentTarget.dataset.exercise;
                this.startExercise(exercise);
            });
        });

        // Back buttons
        document.getElementById('back-to-exercises')?.addEventListener('click', () => {
            this.showExerciseMenu();
        });
        document.getElementById('back-to-exercises-mc')?.addEventListener('click', () => {
            this.showExerciseMenu();
        });

        // Exercise controls
        document.getElementById('submit-answer')?.addEventListener('click', () => {
            this.submitFillBlankAnswer();
        });
        document.getElementById('mc-submit-answer')?.addEventListener('click', () => {
            this.submitMultipleChoiceAnswer();
        });

        // Hint buttons
        document.getElementById('hint-btn')?.addEventListener('click', () => {
            this.showHint();
        });
        document.getElementById('mc-hint-btn')?.addEventListener('click', () => {
            this.showContextHint();
        });

        // Modal controls
        document.getElementById('practice-again')?.addEventListener('click', () => {
            this.hideModal('results-modal');
            this.showExerciseMenu();
        });

        // Settings
        document.getElementById('words-per-session')?.addEventListener('change', (e) => {
            this.currentUser.settings.wordsPerSession = parseInt(e.target.value);
            this.saveUserData();
        });

        document.getElementById('difficulty-adaptation')?.addEventListener('change', (e) => {
            this.currentUser.settings.difficultyAdaptation = e.target.checked;
            this.saveUserData();
        });

        document.getElementById('reset-progress')?.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
                this.resetProgress();
            }
        });
    }

    // View Management
    showView(viewName) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.view === viewName);
        });

        // Update views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.toggle('active', view.id === viewName);
        });

        // Update view-specific data
        switch (viewName) {
            case 'dashboard':
                this.updateDashboard();
                break;
            case 'practice':
                this.showExerciseMenu();
                break;
            case 'progress':
                this.updateProgressView();
                break;
            case 'settings':
                this.updateSettingsView();
                break;
        }
    }

    // Level Selection
    selectLevel(level) {
        this.currentLevel = level;
        
        // Update UI
        document.querySelectorAll('.level-card').forEach(card => {
            card.classList.toggle('selected', card.dataset.level === level);
        });

        // Add activity log
        this.addActivity('Level Selected', `Switched to ${level} level`);
    }

    // Dashboard Updates
    updateDashboard() {
        const stats = this.calculateUserStats();
        
        document.getElementById('words-learned').textContent = stats.wordsLearned;
        document.getElementById('accuracy-rate').textContent = stats.accuracyRate + '%';
        document.getElementById('current-streak').textContent = stats.currentStreak;
        document.getElementById('time-spent').textContent = stats.timeSpent + 'h';
    }

    calculateUserStats() {
        return {
            wordsLearned: this.currentUser.wordsLearned,
            accuracyRate: this.currentUser.accuracyRate,
            currentStreak: this.currentUser.currentStreak,
            timeSpent: Math.round(this.currentUser.timeSpent)
        };
    }

    // Exercise Management
    showExerciseMenu() {
        document.getElementById('exercise-menu').style.display = 'block';
        document.getElementById('fill-blank-exercise').style.display = 'none';
        document.getElementById('multiple-choice-exercise').style.display = 'none';
    }

    startExercise(exerciseType) {
        this.currentExercise = exerciseType;
        this.exerciseScore = 0;
        this.exerciseAnswers = [];
        
        const words = this.getWordsForLevel(this.currentLevel);
        const selectedWords = _.sampleSize(words, this.currentUser.settings.wordsPerSession);
        
        this.exerciseData = {
            words: selectedWords,
            currentIndex: 0,
            totalQuestions: selectedWords.length
        };

        document.getElementById('exercise-menu').style.display = 'none';

        if (exerciseType === 'fill-blank') {
            this.showFillBlankExercise();
        } else if (exerciseType === 'multiple-choice') {
            this.showMultipleChoiceExercise();
        }
    }

    getWordsForLevel(level) {
        return this.vocabularyData[level] || [];
    }

    // Fill in the Blank Exercise
    showFillBlankExercise() {
        document.getElementById('fill-blank-exercise').style.display = 'block';
        this.generateFillBlankQuestion();
    }

    generateFillBlankQuestion() {
        const currentWord = this.exerciseData.words[this.exerciseData.currentIndex];
        const allWords = this.getWordsForLevel(this.currentLevel);
        const distractors = _.sampleSize(allWords.filter(w => w.word !== currentWord.word), 3);
        const options = _.shuffle([currentWord, ...distractors]);

        // Create passage with blank
        const passages = [
            `The successful candidate must be ${this.createBlank()} in their approach to problem-solving, demonstrating both creativity and analytical thinking.`,
            `Her ${this.createBlank()} personality made her the perfect choice for leading the community outreach program.`,
            `The research findings were ${this.createBlank()}, providing clear evidence to support the hypothesis.`,
            `Despite facing numerous challenges, he remained ${this.createBlank()} in pursuing his goals.`,
            `The committee's decision was based on ${this.createBlank()} evidence presented during the hearing.`
        ];

        const passage = _.sample(passages);
        
        // Update UI
        document.getElementById('question-counter').textContent = 
            `${this.exerciseData.currentIndex + 1} of ${this.exerciseData.totalQuestions}`;
        document.getElementById('current-score').textContent = this.exerciseScore;
        document.getElementById('passage-text').innerHTML = passage;

        // Generate word options
        this.generateWordOptions(options);
        
        // Reset submit button
        document.getElementById('submit-answer').disabled = true;
    }

    createBlank() {
        return '<span class="blank" data-answer=""></span>';
    }

    generateWordOptions(words) {
        const container = document.getElementById('word-options');
        container.innerHTML = '';

        words.forEach(wordObj => {
            const option = document.createElement('div');
            option.className = 'word-option';
            option.textContent = wordObj.word;
            option.dataset.word = wordObj.word;
            option.dataset.definition = wordObj.definition;

            // Add hover effect for definition
            option.addEventListener('mouseenter', (e) => {
                this.showDefinitionTooltip(e, wordObj);
            });
            
            option.addEventListener('mouseleave', () => {
                this.hideDefinitionTooltip();
            });

            option.addEventListener('click', () => {
                this.selectWordOption(option);
            });

            container.appendChild(option);
        });
    }

    selectWordOption(selectedOption) {
        // Remove previous selections
        document.querySelectorAll('.word-option').forEach(opt => {
            opt.classList.remove('selected');
        });

        // Select current option
        selectedOption.classList.add('selected');

        // Fill the blank
        const blank = document.querySelector('.blank');
        if (blank) {
            blank.textContent = selectedOption.dataset.word;
            blank.dataset.answer = selectedOption.dataset.word;
            blank.classList.add('filled');
        }

        // Enable submit button
        document.getElementById('submit-answer').disabled = false;
    }

    showDefinitionTooltip(event, wordObj) {
        const tooltip = document.getElementById('definition-tooltip');
        const wordTerm = tooltip.querySelector('.word-term');
        const wordDefinition = tooltip.querySelector('.word-definition');

        wordTerm.textContent = wordObj.word;
        wordDefinition.textContent = wordObj.definition;

        // Position tooltip
        const rect = event.target.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - 150 + 'px';
        tooltip.style.top = rect.bottom + 10 + 'px';

        tooltip.classList.add('show');
    }

    hideDefinitionTooltip() {
        document.getElementById('definition-tooltip').classList.remove('show');
    }

    submitFillBlankAnswer() {
        const blank = document.querySelector('.blank');
        const userAnswer = blank.dataset.answer;
        const correctWord = this.exerciseData.words[this.exerciseData.currentIndex];
        const isCorrect = userAnswer.toLowerCase() === correctWord.word.toLowerCase();

        // Update score
        if (isCorrect) {
            this.exerciseScore += 10;
            blank.classList.add('correct');
        } else {
            blank.classList.add('incorrect');
        }

        // Record answer
        this.exerciseAnswers.push({
            question: this.exerciseData.currentIndex,
            userAnswer,
            correctAnswer: correctWord.word,
            isCorrect
        });

        // Update UI
        document.getElementById('current-score').textContent = this.exerciseScore;
        
        // Move to next question after delay
        setTimeout(() => {
            this.nextFillBlankQuestion();
        }, 1500);
    }

    nextFillBlankQuestion() {
        this.exerciseData.currentIndex++;
        
        if (this.exerciseData.currentIndex >= this.exerciseData.totalQuestions) {
            this.completeExercise();
        } else {
            this.generateFillBlankQuestion();
        }
    }

    // Multiple Choice Exercise
    showMultipleChoiceExercise() {
        document.getElementById('multiple-choice-exercise').style.display = 'block';
        this.generateMultipleChoiceQuestion();
    }

    generateMultipleChoiceQuestion() {
        const currentWord = this.exerciseData.words[this.exerciseData.currentIndex];
        const allWords = this.getWordsForLevel(this.currentLevel);
        const distractors = _.sampleSize(allWords.filter(w => w.word !== currentWord.word), 3);
        const options = _.shuffle([currentWord, ...distractors]);

        // Update UI
        document.getElementById('mc-question-counter').textContent = 
            `${this.exerciseData.currentIndex + 1} of ${this.exerciseData.totalQuestions}`;
        document.getElementById('mc-current-score').textContent = this.exerciseScore;
        document.getElementById('target-word').textContent = currentWord.word;

        // Generate options
        this.generateMultipleChoiceOptions(options, currentWord);
        
        // Reset submit button
        document.getElementById('mc-submit-answer').disabled = true;
    }

    generateMultipleChoiceOptions(options, correctWord) {
        const container = document.getElementById('mc-options');
        container.innerHTML = '';

        options.forEach((wordObj, index) => {
            const option = document.createElement('div');
            option.className = 'mc-option';
            option.innerHTML = `<strong>${String.fromCharCode(65 + index)}.</strong> ${wordObj.definition}`;
            option.dataset.word = wordObj.word;
            option.dataset.isCorrect = wordObj.word === correctWord.word;

            option.addEventListener('click', () => {
                this.selectMultipleChoiceOption(option);
            });

            container.appendChild(option);
        });
    }

    selectMultipleChoiceOption(selectedOption) {
        // Remove previous selections
        document.querySelectorAll('.mc-option').forEach(opt => {
            opt.classList.remove('selected');
        });

        // Select current option
        selectedOption.classList.add('selected');

        // Enable submit button
        document.getElementById('mc-submit-answer').disabled = false;
    }

    submitMultipleChoiceAnswer() {
        const selectedOption = document.querySelector('.mc-option.selected');
        const isCorrect = selectedOption.dataset.isCorrect === 'true';
        const correctWord = this.exerciseData.words[this.exerciseData.currentIndex];

        // Update score
        if (isCorrect) {
            this.exerciseScore += 10;
            selectedOption.classList.add('correct');
        } else {
            selectedOption.classList.add('incorrect');
            // Highlight correct answer
            document.querySelectorAll('.mc-option').forEach(opt => {
                if (opt.dataset.isCorrect === 'true') {
                    opt.classList.add('correct');
                }
            });
        }

        // Record answer
        this.exerciseAnswers.push({
            question: this.exerciseData.currentIndex,
            userAnswer: selectedOption.dataset.word,
            correctAnswer: correctWord.word,
            isCorrect
        });

        // Update UI
        document.getElementById('mc-current-score').textContent = this.exerciseScore;
        
        // Move to next question after delay
        setTimeout(() => {
            this.nextMultipleChoiceQuestion();
        }, 2000);
    }

    nextMultipleChoiceQuestion() {
        this.exerciseData.currentIndex++;
        
        if (this.exerciseData.currentIndex >= this.exerciseData.totalQuestions) {
            this.completeExercise();
        } else {
            this.generateMultipleChoiceQuestion();
        }
    }

    showHint() {
        const currentWord = this.exerciseData.words[this.exerciseData.currentIndex];
        alert(`Hint: This word is a ${currentWord.partOfSpeech} that means "${currentWord.definition}"`);
    }

    showContextHint() {
        const currentWord = this.exerciseData.words[this.exerciseData.currentIndex];
        alert(`Context: "${currentWord.example}"`);
    }

    // Exercise Completion
    completeExercise() {
        const correctAnswers = this.exerciseAnswers.filter(a => a.isCorrect).length;
        const accuracy = Math.round((correctAnswers / this.exerciseAnswers.length) * 100);

        // Update user stats
        this.currentUser.wordsLearned += correctAnswers;
        this.currentUser.accuracyRate = this.calculateOverallAccuracy();
        this.updateStreak(accuracy >= 80);
        this.currentUser.timeSpent += 0.25; // Estimate 15 minutes per session

        // Update level progress
        const levelKey = this.currentLevel;
        this.currentUser.levelProgress[levelKey] += correctAnswers;

        // Add activity
        this.addActivity('Practice Session', 
            `Completed ${this.currentExercise} exercise: ${correctAnswers}/${this.exerciseAnswers.length} correct`);

        // Save progress
        this.saveUserData();

        // Show results
        this.showExerciseResults(correctAnswers, accuracy);
    }

    calculateOverallAccuracy() {
        // Simplified calculation - in real app would track historical data
        return Math.min(95, this.currentUser.accuracyRate + 1);
    }

    updateStreak(wasSuccessful) {
        if (wasSuccessful) {
            this.currentUser.currentStreak++;
        } else {
            this.currentUser.currentStreak = 0;
        }
    }

    showExerciseResults(correctAnswers, accuracy) {
        document.getElementById('final-score').textContent = this.exerciseScore;
        document.getElementById('correct-answers').textContent = 
            `${correctAnswers}/${this.exerciseAnswers.length}`;
        document.getElementById('accuracy-percentage').textContent = `${accuracy}%`;

        this.showModal('results-modal');
    }

    // Progress View
    updateProgressView() {
        const levels = ['beginner', 'intermediate', 'advanced', 'expert'];
        const wordsPerLevel = 875;

        levels.forEach(level => {
            const progress = this.currentUser.levelProgress[level];
            const percentage = Math.min(100, (progress / wordsPerLevel) * 100);
            
            document.getElementById(`${level}-progress`).textContent = `${progress}/${wordsPerLevel}`;
            document.getElementById(`${level}-fill`).style.width = `${percentage}%`;
        });

        this.updateActivityLog();
    }

    updateActivityLog() {
        const container = document.getElementById('activity-log');
        container.innerHTML = '';

        if (this.currentUser.recentActivity.length === 0) {
            container.innerHTML = '<p style="color: var(--gray-500); text-align: center; padding: 2rem;">No recent activity</p>';
            return;
        }

        this.currentUser.recentActivity.slice(-10).reverse().forEach(activity => {
            const item = document.createElement('div');
            item.className = 'activity-item';
            
            const iconClass = activity.type === 'practice' ? 'practice' : 'achievement';
            const icon = activity.type === 'practice' ? 'fas fa-dumbbell' : 'fas fa-trophy';
            
            item.innerHTML = `
                <div class="activity-icon ${iconClass}">
                    <i class="${icon}"></i>
                </div>
                <div class="activity-details">
                    <div class="activity-title">${activity.title}</div>
                    <div class="activity-time">${activity.time}</div>
                </div>
            `;
            
            container.appendChild(item);
        });
    }

    addActivity(title, description) {
        const activity = {
            title,
            description,
            time: new Date().toLocaleString(),
            type: title.includes('Practice') ? 'practice' : 'achievement'
        };

        this.currentUser.recentActivity.push(activity);
        
        // Keep only last 50 activities
        if (this.currentUser.recentActivity.length > 50) {
            this.currentUser.recentActivity = this.currentUser.recentActivity.slice(-50);
        }
    }

    // Settings View
    updateSettingsView() {
        document.getElementById('words-per-session').value = this.currentUser.settings.wordsPerSession;
        document.getElementById('difficulty-adaptation').checked = this.currentUser.settings.difficultyAdaptation;
    }

    resetProgress() {
        this.currentUser = this.loadUserData();
        this.saveUserData();
        this.updateDashboard();
        this.updateProgressView();
        alert('All progress has been reset.');
    }

    // Modal Management
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    // Loading Management
    showLoading() {
        document.getElementById('loading-overlay').classList.add('show');
    }

    hideLoading() {
        document.getElementById('loading-overlay').classList.remove('show');
    }

    // Utility Functions
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    formatTime(hours) {
        if (hours < 1) {
            return `${Math.round(hours * 60)}m`;
        }
        return `${Math.round(hours)}h`;
    }

    // Adaptive Difficulty (placeholder for future enhancement)
    adaptDifficulty(userAccuracy) {
        if (!this.currentUser.settings.difficultyAdaptation) return;
        
        // Logic to adjust word selection based on performance
        // This would be expanded in a full implementation
        if (userAccuracy > 90) {
            console.log('Consider increasing difficulty');
        } else if (userAccuracy < 60) {
            console.log('Consider decreasing difficulty');
        }
    }
}

// Additional Utility Functions
class VocabularyGenerator {
    static generatePassage(word, difficulty = 1) {
        const templates = {
            1: [ // Beginner templates
                `The student's work was {word}, showing clear understanding of the subject matter.`,
                `Her {word} approach to the problem impressed everyone in the room.`,
                `The results of the experiment were {word} and left no room for doubt.`,
                `His {word} nature made him well-liked among his colleagues.`,
                `The presentation was {word}, capturing the audience's attention throughout.`
            ],
            2: [ // Intermediate templates
                `The committee's decision to {word} the new policy changes was met with approval.`,
                `Her {word} personality traits became evident during the team-building exercises.`,
                `The researcher's {word} about climate change was supported by extensive data.`,
                `The architect's {word} design solution addressed all the structural challenges.`,
                `The author chose to {word} different themes throughout the narrative.`
            ],
            3: [ // Advanced templates
                `The politician's {word} behavior during the scandal damaged his reputation.`,
                `The {word} melody of the funeral march conveyed the solemnity of the occasion.`,
                `She demonstrated {word} leadership by supporting her defeated rival.`,
                `The detective uncovered the criminal's {word} scheme to defraud investors.`,
                `His {word} lifestyle attracted criticism from more modest community members.`
            ],
            4: [ // Expert templates
                `The critic's {word} analysis revealed subtle flaws in the artist's technique.`,
                `His {word} crusade to reform the education system faced practical obstacles.`,
                `The professor's {word} theories were difficult for undergraduate students to comprehend.`,
                `The employee's {word} flattery toward management was transparent to colleagues.`,
                `The witness's {word} testimony complicated the prosecutor's case.`
            ]
        };

        const templateList = templates[difficulty] || templates[1];
        const template = templateList[Math.floor(Math.random() * templateList.length)];
        return template.replace('{word}', '<span class="blank" data-answer=""></span>');
    }

    static generateDistractors(correctWord, wordBank, count = 3) {
        const filtered = wordBank.filter(w => 
            w.word !== correctWord.word && 
            w.partOfSpeech === correctWord.partOfSpeech
        );
        
        return this.shuffleArray(filtered).slice(0, count);
    }

    static shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
}

// Performance Analytics
class PerformanceTracker {
    constructor() {
        this.sessionData = {
            startTime: Date.now(),
            interactions: [],
            errors: []
        };
    }

    trackInteraction(type, data) {
        this.sessionData.interactions.push({
            type,
            data,
            timestamp: Date.now()
        });
    }

    trackError(error, context) {
        this.sessionData.errors.push({
            error: error.message,
            context,
            timestamp: Date.now()
        });
    }

    getSessionSummary() {
        const duration = Date.now() - this.sessionData.startTime;
        return {
            duration,
            interactionCount: this.sessionData.interactions.length,
            errorCount: this.sessionData.errors.length
        };
    }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the vocabulary learning application
    window.vocabApp = new VocabApp();
    window.performanceTracker = new PerformanceTracker();
    
    // Add global error handling
    window.addEventListener('error', function(event) {
        window.performanceTracker?.trackError(event.error, 'Global error handler');
        console.error('Application error:', event.error);
    });

    // Add performance monitoring
    window.addEventListener('beforeunload', function() {
        const summary = window.performanceTracker?.getSessionSummary();
        console.log('Session Summary:', summary);
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        // ESC to close modals
        if (event.key === 'Escape') {
            document.querySelectorAll('.modal.show').forEach(modal => {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            });
        }
        
        // Number keys for navigation
        if (event.key >= '1' && event.key <= '4') {
            const views = ['dashboard', 'practice', 'progress', 'settings'];
            const viewIndex = parseInt(event.key) - 1;
            if (views[viewIndex]) {
                window.vocabApp.showView(views[viewIndex]);
            }
        }
    });

    console.log('VocabMaster application initialized successfully!');
});
