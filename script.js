function calculateFlames() {
    var name1 = document.getElementById("name1").value.toLowerCase().replace(/\s+/g, '');
    var name2 = document.getElementById("name2").value.toLowerCase().replace(/\s+/g, '');
    
    var flames = "FLAMES";
    var relationship = ["Friends", "Love", "Affection", "Marriage", "Enemy", "Siblings"];

    // Calculate common letters
    for (var i = 0; i < name1.length; i++) {
        var char = name1[i];
        if (name2.includes(char)) {
            name1 = name1.replace(char, '');
            name2 = name2.replace(char, '');
            i--; // Restart loop due to updated string
        }
    }

    // Calculate FLAMES index
    var count = name1.length + name2.length;
    var index = count % flames.length;

    if (index === 0) {
        index = flames.length - 1;
    } else {
        index = index - 1;
    }
    var result = relationship[index];
    document.getElementById("result").innerText = "Your relationship is: " + result;
}

// Mute button functionality
var isMuted = false;
var muteButton = document.getElementById('mute-button');
var spotifyPlayer = document.getElementById('spotify-player');

muteButton.addEventListener('click', function() {
    isMuted = !isMuted;
    if (isMuted) {
        spotifyPlayer.src = "";
        muteButton.querySelector('.mute-icon').innerText = "🔇";
    } else {
        spotifyPlayer.src = "https://open.spotify.com/embed/track/43uRGlsrRRGJqaq8ZgmSgA?si=d67ca8a46f064e35";
        muteButton.querySelector('.mute-icon').innerText = "🔈";
    }
});
