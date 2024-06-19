document.getElementById('playerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const numPlayers = document.getElementById('numPlayers').value;
    fetch('words.json')
        .then(response => response.json())
        .then(wordPairs => {
            startGame(numPlayers, wordPairs);
        });
});

function startGame(numPlayers, wordPairs) {
    const selectedPair = wordPairs[Math.floor(Math.random() * wordPairs.length)];
    const words = Array(numPlayers - 1).fill(selectedPair.word1);
    words.splice(Math.floor(Math.random() * numPlayers), 0, selectedPair.word2);
    
    let playerId = prompt("Enter your player ID (from 1 to " + numPlayers + "):");
    playerId = parseInt(playerId);

    if (playerId > 0 && playerId <= numPlayers) {
        document.getElementById('playerForm').style.display = 'none';
        document.getElementById('gameArea').style.display = 'block';
        document.getElementById('wordDisplay').textContent = words[playerId - 1];
    } else {
        alert("Invalid player ID.");
    }
}
