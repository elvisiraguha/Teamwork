const select = (element) => {
  return document.querySelector(element);
};
const selectAll = (elements) => {
  return [...document.querySelectorAll(elements)];
};

selectAll('.edit-article').forEach(element => {
  element.addEventListener('click', () => {
    select('.modal').classList.remove('hidden');
    select('.modal').classList.add('flex');
  });
});
selectAll('.btn-update').forEach(element => {
  element.addEventListener('click', () => {
    select('.modal').classList.remove('flex');
    select('.modal').classList.add('hidden');
  });
});
selectAll('.btn-close-modal').forEach(element => {
  element.addEventListener('click', () => {
    select('.modal').classList.remove('flex');
    select('.modal').classList.add('hidden');
  });
});
