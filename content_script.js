// Create speed buttons and container for them
function createSpeedButtons() {
  const speedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 5];
  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.justifyContent = 'center';
  container.style.marginTop = '8px';

  for (const speed of speedOptions) {
    const button = document.createElement('button');
    button.style.margin = '0 4px';
    button.style.padding = '4px 8px';
    button.style.border = '1px solid #ccc';
    button.style.borderRadius = '4px';
    button.style.background = '#f9f9f9';
    button.style.cursor = 'pointer';
    button.style.fontWeight = speed === 1 ? 'bold' : 'normal';
    button.textContent = speed + 'x';
    button.onclick = () => setPlaybackSpeed(speed, container);
    container.appendChild(button);
  }

  return container;
}

// Set the playback speed of the videos and highlight the selected button
function setPlaybackSpeed(speed, container) {
  const videos = document.getElementsByTagName('video');
  for (let i = 0; i < videos.length; i++) {
    videos[i].playbackRate = speed;
  }

  Array.from(container.children).forEach((button) => {
    button.style.fontWeight = parseFloat(button.textContent) === speed ? 'bold' : 'normal';
  });
}

// Main function to wait for the video container and create the speed buttons
function waitForVideoContainer() {
  const videoContainer = document.querySelector('.video-main-player-container');
  if (videoContainer) {
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    videoContainer.parentNode.insertBefore(wrapper, videoContainer);
    wrapper.appendChild(videoContainer);

    const speedButtons = createSpeedButtons();
    wrapper.appendChild(speedButtons);

    // Event handler for fullscreen change
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        speedButtons.style.display = 'none';
      } else {
        speedButtons.style.display = 'flex';
      }
    };

    // Add event listener for fullscreen change
    document.addEventListener('fullscreenchange', handleFullscreenChange);
  } else {
    setTimeout(waitForVideoContainer, 500);
  }
}

// Execute the main function
waitForVideoContainer();
