const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise(resolve => rl.question(question, resolve));
}

// -------------------- CLASSES --------------------

class Player {
    constructor(playerId) {
        this.playerId = playerId;
        this.playingArray = [];
    }
}

class Element {
    constructor(elementId, elementValue) {
        this.elementId = elementId;
        this.elementValue = elementValue;
    }
}

class Level {
    constructor(levelNumber, levelType, totalElements) {
        this.levelNumber = levelNumber;
        this.levelType = levelType;
        this.totalElements = totalElements;
        this.isPlayed = false;
    }
}

class Game {
    constructor(numberOfPlayers, levels) {
        this.numberOfPlayers = numberOfPlayers;
        this.levels = levels;
        this.playerArray = [];
        this.elementsArray = [];
        this.gameStatus = 1;
        this.currentLevelIndex = 0;
    }

    addPlayer(player) {
        this.playerArray.push(player);
    }

    addElement(element) {
        this.elementsArray.push(element);
    }

    getCurrentLevel() {
        return this.levels[this.currentLevelIndex];
    }

    resetLevel() {
        this.elementsArray = [];

        this.playerArray.forEach(player => {
            player.playingArray = [];
        });
    }
}

// -------------------- LEVEL DEFINITIONS --------------------

const createElements = (count) => {
    return Array.from({ length: count }, (_, index) => ({
        elementId: index,
        elementValue: index + 1
    }));
};

const levels = [
    new Level(1, "grid", createElements(4)),
    new Level(2, "grid", createElements(9)),
    new Level(3, "grid", createElements(25)),
    new Level(4, "circle", createElements(8)),
    new Level(5, "orion", createElements(7)),
    new Level(6, "scorpius", createElements(8)),
    new Level(7, "cassiopeia", createElements(8))
];

// -------------------- INPUT FUNCTIONS --------------------

async function addNewElement(game, player) {

    while (true) {

        const input = await ask(
            `Player ${player.playerId}, enter a new element value for element ${game.elementsArray.length}: `
        );

        const newElementValue = Number(input.trim());

        const availableElements = game.getCurrentLevel().totalElements;

        // Check whether the entered value belongs to this level
        const isValid = availableElements.some(
            element => element.elementValue === newElementValue
        );

        if (
            !input.trim() ||
            !Number.isInteger(newElementValue) ||
            !isValid
        ) {
            console.log("Invalid element value. Please enter a valid value.");
            continue;
        }

        // Check whether the value has already been added
        const alreadyExists = game.elementsArray.some(
            element => element.elementValue === newElementValue
        );

        if (alreadyExists) {
            console.log("Element value already exists. Enter a unique value.");
            continue;
        }

        const newElement = new Element(
            game.elementsArray.length,
            newElementValue
        );

        game.addElement(newElement);

        // Reset this player's replay progress for their next turn
        player.playingArray = [];

        console.log(
            `\nElement ${newElement.elementId} added successfully!`
        );

        return;
    }
}

async function guessElement(element, game) {

    while (true) {

        const input = await ask(
            `Guess element ${element.elementId}: `
        );

        const guessedValue = Number(input.trim());

        const availableElements = game.getCurrentLevel().totalElements;

        // Check whether the guess is a valid value for this level
        const isValid = availableElements.some(
            item => item.elementValue === guessedValue
        );

        if (
            !input.trim() ||
            !Number.isInteger(guessedValue) ||
            !isValid
        ) {
            console.log("Invalid guess. Enter a value belonging to this level.");
            continue;
        }

        return guessedValue;
    }
}

// -------------------- GAME LOGIC --------------------

async function playTurn(game, player) {

    console.log(`\n========== PLAYER ${player.playerId}'S TURN ==========`);

    // Replay all existing elements in sequence
    for (const element of game.elementsArray) {

        const guessedValue = await guessElement(element, game);

        if (guessedValue !== element.elementValue) {

            console.log("\nIncorrect!");

            console.log(
                `The correct value for element ${element.elementId} was ${element.elementValue}`
            );

            game.gameStatus = 2;
            return;
        }

        console.log(
            `Correct! Player ${player.playerId} recalled element ${element.elementId}.`
        );

        player.playingArray.push(element);
    }

    // Check whether the current level has been completed
    const levelCompleted = checkLevelCompletion(game, player);

    // Stop this turn if the level was completed or the game ended
    if (levelCompleted) {
        return;
    }

    // Player successfully recalled the sequence.
    // Ask them to add a new element.
    await addNewElement(game, player);
}

// -------------------- LEVEL COMPLETION --------------------

function checkLevelCompletion(game, player) {

    if (
        game.elementsArray.length !==
        game.getCurrentLevel().totalElements.length
    ) {
        return false;
    }

    console.log(
        `\nPlayer ${player.playerId} has completed Level ${game.getCurrentLevel().levelNumber}!`
    );

    game.getCurrentLevel().isPlayed = true;

    game.currentLevelIndex++;

    // Check whether all levels have been completed
    if (game.currentLevelIndex >= game.levels.length) {

        console.log("\nCongratulations! All levels completed!");

        game.gameStatus = 2;
        return true;
    }

    // Prepare the game for the next level
    game.resetLevel();

    console.log(
        `\nMoving to Level ${game.getCurrentLevel().levelNumber}`
    );

    console.log(
        `Level type: ${game.getCurrentLevel().levelType}`
    );

    return true;
}

// -------------------- MAIN GAME LOOP --------------------

async function main() {

    try {

        let numberOfPlayers;

        // Validate player count
        while (true) {

            const input = await ask('Enter number of players: ');

            numberOfPlayers = Number(input.trim());

            if (
                Number.isInteger(numberOfPlayers) &&
                numberOfPlayers > 1
            ) {
                break;
            }

            console.log("Please enter a valid number of players (must be greater than 1).");
        }

        const game = new Game(numberOfPlayers, levels);

        // Create players
        for (let i = 0; i < numberOfPlayers; i++) {
            game.addPlayer(new Player(i + 1));
        }

        console.log("\nGame started!");
        console.log(`Total players: ${numberOfPlayers}`);
        console.log(`Current Level: ${game.getCurrentLevel().levelNumber}`);

        // Main game loop
        while (game.gameStatus === 1) {

            for (const player of game.playerArray) {

                if (game.gameStatus !== 1) {
                    break;
                }

                await playTurn(game, player);
            }
        }

        console.log("\n========== GAME OVER ==========");

    } catch (error) {

        console.error("An error occurred:", error);

    } finally {

        rl.close();
    }
}

main();