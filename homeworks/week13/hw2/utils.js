/* eslint-disable */
function htmlEscape(str) {
  return ''.concat(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function addCommentToDOM(container, comment, isPrepend) {
  const html = `
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">${htmlEscape(comment.nickname)}</h5>
        <p class="card-text">${htmlEscape(comment.content)}</p>
      </div>
    </div>
  `;

  if (isPrepend) {
    container.prepend(html)
  } else {
    container.append(html)
  }
}