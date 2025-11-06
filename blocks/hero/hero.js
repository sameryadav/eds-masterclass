import { buildBlock, loadBlock, decorateBlock } from '../../scripts/aem.js';

export default async function decorate(block) {
  const videoLink = block.querySelector('a[href*="youtube.com"], a[href*="youtu.be"], a[href*="vimeo.com"], a[href*=".mp4"]');

  if (videoLink) {
    const videoColumn = videoLink.closest('div');
    videoColumn.remove();

    const videoBlock = buildBlock('video', [[videoLink]]);
    videoBlock.classList.add('autoplay', 'background');
    block.appendChild(videoBlock);
    decorateBlock(videoBlock);

    videoBlock.classList.add('hero-background-video');

    loadBlock(videoBlock);
  }
}
