/**
 * Extract YouTube video ID from various YouTube URL formats
 * @param {string} url The YouTube URL
 * @returns {string|null} The video ID or null
 */
function getYouTubeVideoId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ];

  // eslint-disable-next-line no-restricted-syntax
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

/**
 * Decorates the hero block
 * @param {Element} block The hero block element
 */
export default async function decorate(block) {
  // Check if there's a video link in the hero (YouTube or MP4)
  const videoLink = block.querySelector('a[href*="youtube.com"], a[href*="youtu.be"], a[href*=".mp4"]');

  if (videoLink) {
    const videoUrl = videoLink.href;
    const youtubeId = getYouTubeVideoId(videoUrl);

    if (youtubeId) {
      // Create YouTube iframe embed
      const iframe = document.createElement('iframe');
      iframe.classList.add('hero-background-video');
      iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`;
      iframe.setAttribute('allow', 'autoplay; encrypted-media');
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('frameborder', '0');
      iframe.title = 'Background video';

      // Remove the column/div containing the video link
      videoLink.closest('div').remove();

      // Insert iframe as background (will cause CLS as no space is reserved)
      block.appendChild(iframe);
    } else if (videoUrl.endsWith('.mp4')) {
      // Create native video element for MP4
      const video = document.createElement('video');
      video.setAttribute('autoplay', '');
      video.setAttribute('muted', '');
      video.setAttribute('loop', '');
      video.setAttribute('playsinline', '');
      video.classList.add('hero-background-video');

      const source = document.createElement('source');
      source.src = videoUrl;
      source.type = 'video/mp4';

      video.appendChild(source);

      // Remove the column/div containing the video link
      videoLink.closest('div').remove();

      // Insert video as background (will cause CLS as no space is reserved)
      block.appendChild(video);
    }
  }
}
