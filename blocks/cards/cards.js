export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const newImg = document.createElement('img');
    const url = new URL(img.src);
    url.searchParams.set('width', '2000');
    newImg.src = url.toString();
    newImg.alt = img.alt;
    newImg.loading = 'lazy';

    img.closest('picture').replaceWith(newImg);
  });

  block.replaceChildren(ul);
}
