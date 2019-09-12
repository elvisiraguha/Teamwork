const select = (element) => {
  return document.querySelector(element);
};

const selectAll = (elements) => {
  return [...document.querySelectorAll(elements)];
};

const hide = (selector) => {
  const element = select(selector);
  return element.classList.remove('flex'), element.classList.add('hidden');
};

const show = (selector) => {
  const element = select(selector);
  return element.classList.remove('hidden'), element.classList.add('flex');
};

selectAll('.edit-article').forEach(element => {
  element.addEventListener('click', () => {
    show('.modal');
    show('.modal-edit');
  });
});

selectAll('.delete-article').forEach(element => {
  element.addEventListener('click', () => {
    show('.modal');
    show('.modal-delete');
  });
});

selectAll('.comment-article').forEach(element => {
  element.addEventListener('click', () => {
    show('.modal');
    show('.modal-comment');
  });
});

selectAll('.btn-close-modal').forEach(element => {
  element.addEventListener('click', () => {
    hide('.modal');
    hide('.modal-delete');
    hide('.modal-edit');
    hide('.modal-comment');
  });
});

select('.btn-my-articles').addEventListener('click', ({target}) => {
  hide('.other-articles');
  show('.my-articles');

  target.classList.add('btn__highlight');
  select('.btn-other-articles').classList.remove('btn__highlight');
});

select('.btn-other-articles').addEventListener('click', ({target}) => {
  hide('.my-articles');
  show('.other-articles');
  
  target.classList.add('btn__highlight');
  select('.btn-my-articles').classList.remove('btn__highlight');
});
