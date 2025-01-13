class Button {
    constructor(number, color) {
        this.number = number;
        this.color = color;
        this.element = null;
    }

    create() {
        const button = document.createElement('button');
        button.className = 'game-button';
        button.style.backgroundColor = this.color;
        button.textContent = this.number;
        this.element = button;
        return button;
    }

    hideNumber() {
        this.element.textContent = '';
    }

    showNumber() {
        this.element.textContent = this.number;
    }

    setPos(x, y) {
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
    }
}

class GameBoard {
    constructor() {
        this.buttons = [];
        this.gameArea = document.getElementById('gameArea');
        this.scrambling = false;
    }

    createButtons(count) {
        this.clear();
    
        const buttonWidth = 10 * 16; 
        
        for (let i = 0; i < count; i++) {
            const randomColor = this.getRandomColor();
    
            const button = new Button(i + 1, randomColor);
            this.buttons.push(button);
            const element = button.create();
            this.gameArea.appendChild(element);
    
            button.setPos(i * (buttonWidth + 10), 0); 
        }
    }
    
    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    

    clear() {
        this.buttons = [];
        this.gameArea.innerHTML = '';
    }

    async scrambleButtons(times) {
        this.scrambling= true;
        const gameArea = this.gameArea.getBoundingClientRect();
        const buttonRect = this.buttons[0].element.getBoundingClientRect();
        const buttonWidth = buttonRect.width;
        const buttonHeight = buttonRect.height;

        for (let i = 0; i < times; i++) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            this.buttons.forEach(button => {
                const x = Math.random() * (gameArea.width - buttonWidth);
                const y = Math.random() * (gameArea.height - buttonHeight);
                button.setPos(x, y);
            });
        }
        
        this.scrambling = false;
    }
}

class Game {
    constructor() {
        this.gameBoard = new GameBoard();
        this.currentIndex = 0;
        this.setupEventListeners();
    }

    setupEventListeners() {
        const startButton = document.getElementById('startGame');
        startButton.addEventListener('click', () => this.startGame());
    }

    async startGame() {
        const input = document.getElementById('buttonCount');
        const count = parseInt(input.value);

        document.getElementById('message').textContent = '';
        
        if (count < 3 || count > 7) {
            document.getElementById('message').textContent = MESSAGES.INVALID_INPUT;
            return;
        }

        this.currentIndex = 0;
        this.gameBoard.createButtons(count);
        
        await new Promise(resolve => setTimeout(resolve, count * 1000));
        
        await this.gameBoard.scrambleButtons(count);
        
        this.gameBoard.buttons.forEach(button => {
            button.hideNumber();
            button.element.addEventListener('click', () => this.handleButtonClick(button));
        });
    }

    handleButtonClick(button) {
        if (this.gameBoard.scrambling) return;
        
        const correctNumber = this.currentIndex + 1;
        button.showNumber();

        if (button.number === correctNumber) {
            this.currentIndex++;
            if (this.currentIndex === this.gameBoard.buttons.length) {
                document.getElementById('message').textContent = MESSAGES.EXCELLENT_MEMORY;
            }
        } else {
            document.getElementById('message').textContent = MESSAGES.WRONG_ORDER;
            this.gameBoard.buttons.forEach(b => b.showNumber());
        }
    }
}

new Game();