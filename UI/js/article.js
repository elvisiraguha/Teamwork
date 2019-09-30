
// selection functions

const select = element => document.querySelector(element);

const selectAll = elements => [...document.querySelectorAll(elements)];

// hide and show functions

const hide = selector => {
  const element = select(selector);
  element.classList.remove('flex');
  element.classList.add('hidden');
};

const show = selector => {
  const element = select(selector);
  element.classList.remove('hidden');
  element.classList.add('flex');
};

selectAll('.comment-article').forEach(element => {
  element.addEventListener('click', () => {
    show('.modal');
    show('.modal-comment');
  });
});

// show confirmation modal when employee clicks on flag

selectAll('.flag').forEach(element => {
  element.addEventListener('click', () => {
    show('.modal');
    show('.modal-flag');
  });
});

// close modal when employee clicks on cancel, update, comment, delete, or flag

selectAll('.btn-close-modal').forEach(element => {
  element.addEventListener('click', () => {
    hide('.modal');
    hide('.modal-comment');
    hide('.modal-flag');
  });
});
