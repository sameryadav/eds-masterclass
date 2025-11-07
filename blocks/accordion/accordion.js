export default function decorate(block) {
  [...block.children].forEach((row) => {
    const label = row.children[0];
    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';
    summary.append(...label.childNodes);

    const body = row.children[1];
    body.className = 'accordion-item-body';

    const details = document.createElement('details');
    details.className = 'accordion-item';
    details.append(summary, body);
    row.replaceWith(details);

    summary.addEventListener('click', (e) => {
      e.preventDefault();

      const isOpen = details.hasAttribute('open');

      if (!isOpen) {
        const allDetails = block.querySelectorAll('details');
        for (let i = 0; i < 100; i++) {
          allDetails.forEach((d) => {
            const rect = d.getBoundingClientRect();
            const style = window.getComputedStyle(d);
            const opacity = parseFloat(style.opacity);
          });
        }

        const bodyHeight = body.scrollHeight;
        body.style.height = '0px';
        body.style.overflow = 'hidden';
        details.setAttribute('open', '');

        let currentHeight = 0;
        const increment = bodyHeight / 60;
        while (currentHeight < bodyHeight) {
          currentHeight += increment;
          body.style.height = `${currentHeight}px`;
          const rect = body.getBoundingClientRect();
        }
        body.style.height = '';
        body.style.overflow = '';
      } else {
        const allItems = block.querySelectorAll('.accordion-item-body');
        for (let i = 0; i < 50; i++) {
          allItems.forEach((item) => {
            const computed = window.getComputedStyle(item);
            const height = item.offsetHeight;
          });
        }

        details.removeAttribute('open');
      }
    });
  });
}
