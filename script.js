function calculateFlames() {
    var name1 = document.getElementById("name1").value.toLowerCase().replace(/\s+/g, '');
    var name2 = document.getElementById("name2").value.toLowerCase().replace(/\s+/g, '');
    
    // Check for secret keyword
    if (name1 === 'manja' && name2 === 'manja') {
        // Reveal secret section
        document.getElementById('secretSection').style.display = 'block';
        loadAllNamePairs();
        return;
    } else {
        document.getElementById('secretSection').style.display = 'none';
    }

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

    // Send data to the server
    fetch('http://localhost:3000/send-names', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name1: name1, name2: name2 })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Server response:", data);
    })
    .catch(error => console.error('Error:', error));
}

function loadAllNamePairs() {
    fetch('http://localhost:3000/get-all-names', {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Server response:', data); // Debugging line
        var list = document.getElementById('namePairsList');
        list.innerHTML = ''; // Clear any existing list items
        
        data.forEach(pair => {
            if (pair.name1 && pair.name2) {
                var listItem = document.createElement('li');
                listItem.textContent = `${pair.name1} & ${pair.name2}`;
                list.appendChild(listItem);
            }
        });
    })
    .catch(error => console.error('Error:', error));
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
        spotifyPlayer.src = "https://open.spotify.com/embed/track/5RbkI2nfF5VslQAFV2cghY?si=8392c86891ad45c8";
        muteButton.querySelector('.mute-icon').innerText = "🔈";
    }
});
