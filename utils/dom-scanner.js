export function scanPage() {
  const elements = [];
  const selectors = ['p', 'div', 'h1', 'h2', 'h3', 'a', 'button', 'img', 'input', 'textarea', 'select', 'section', 'article', 'li'];
  for (const sel of selectors) {
    document.querySelectorAll(sel).forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 20 && rect.height > 20 && rect.top < window.innerHeight && rect.bottom > 0) {
        elements.push({
          element: el, x: rect.left, y: rect.top, w: rect.width, h: rect.height,
          text: el.innerText?.slice(0, 50) || '', tag: el.tagName.toLowerCase(),
          classes: Array.from(el.classList), isLink: el.tagName === 'A', isImage: el.tagName === 'IMG'
        });
      }
    });
  }
  return elements;
}
