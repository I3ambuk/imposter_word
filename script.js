document.getElementById('playerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const numPlayers = document.getElementById('numPlayers').value;
    fetch('words.json')
        .then(response => response.json())
        .then(wordPairs => {
            startGame(numPlayers, wordPairs);
        });
});

document.getElementById('newGame').addEventListener('click', function() {
    localStorage.removeItem('playerWord');
    location.reload();
});

function startGame(numPlayers, wordPairs) {
    const selectedPair = wordPairs[Math.floor(Math.random() * wordPairs.length)];
    const words = Array(parseInt(numPlayers) - 1).fill(selectedPair.word1);
    words.splice(Math.floor(Math.random() * words.length), 0, selectedPair.word2);
    
    let playerId = prompt("Enter your player ID (from 1 to " + numPlayers + "):");
    playerId = parseInt(playerId);

    if (playerId > 0 && playerId <= numPlayers) {
        const playerWord = words[playerId - 1];
        localStorage.setItem('playerWord', playerWord);
        displayWord(playerWord);
    } else {
        alert("Invalid player ID.");
    }
}

function displayWord(word) {
    document.getElementById('playerForm').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block';
    document.getElementById('wordDisplay').textContent = word;
}

// Check if there's a saved word in local storage
const savedWord = localStorage.getItem('playerWord');
if (savedWord) {
    document.getElementById('playerForm').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block';
    document.getElementById('wordDisplay').textContent = savedWord;
}
