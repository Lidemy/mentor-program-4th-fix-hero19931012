const FAQ = document.querySelector('.wrapper__FAQ');
FAQ.addEventListener('click', (e) => {
  if (e.target.classList.contains('valid')) {
    const area = e.target.closest('.question__area');
    const answer = area.querySelector('.answer');
    answer.classList.toggle('answer__hide');
  }
});
