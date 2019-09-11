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

    select('.modal-edit').classList.remove('hidden');
    select('.modal-edit').classList.add('flex');
  });
});
selectAll('.delete-article').forEach(element => {
  element.addEventListener('click', () => {
    select('.modal').classList.remove('hidden');
    select('.modal').classList.add('flex');

    select('.modal-delete').classList.remove('hidden');
    select('.modal-delete').classList.add('flex');
  });
});
selectAll('.btn-close-modal').forEach(element => {
  element.addEventListener('click', () => {
    select('.modal').classList.remove('flex');
    select('.modal').classList.add('hidden');

    select('.modal-delete').classList.add('hidden');
    select('.modal-edit').classList.add('hidden');
  });
});
