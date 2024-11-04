document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audio-player');
    const playPauseButton = document.getElementById('play-pause');
    const playlist = document.getElementById('playlist');
    const currentTrackSpan = document.getElementById('current-track');

    const tracks = [
        { 
            title: 'Sensory Music for Autism Sensory Visuals', 
            src: 'music/Sensory Music for Autism Sensory Visuals.mp3'
        }
        // Add more tracks here as you upload them
    ];

    let currentTrackIndex = 0;

    function loadTrack(index) {
        audioPlayer.src = tracks[index].src;
        audioPlayer.load();
        currentTrackSpan.textContent = tracks[index].title;
    }

    function updatePlaylist() {
        playlist.innerHTML = '';
        tracks.forEach((track, index) => {
            const li = document.createElement('li');
            li.textContent = track.title;
            li.addEventListener('click', () => {
                currentTrackIndex = index;
                loadTrack(currentTrackIndex);
                audioPlayer.play();
                updatePlayPauseButton();
            });
            playlist.appendChild(li);
        });
    }

    function updatePlayPauseButton() {
        playPauseButton.textContent = audioPlayer.paused ? 'Play' : 'Pause';
    }

    playPauseButton.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
        updatePlayPauseButton();
    });

    audioPlayer.addEventListener('ended', () => {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        loadTrack(currentTrackIndex);
        audioPlayer.play();
    });

    audioPlayer.addEventListener('play', updatePlayPauseButton);
    audioPlayer.addEventListener('pause', updatePlayPauseButton);

    loadTrack(currentTrackIndex);
    updatePlaylist();
    updatePlayPauseButton();
});
