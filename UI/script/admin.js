
// selection functions

const select = (element) => {
  return document.querySelector(element);
};

const selectAll = (elements) => {
  return [...document.querySelectorAll(elements)];
};

// hide and show functions

const hide = (selector) => {
  const element = select(selector);
  return element.classList.remove('flex'), element.classList.add('hidden');
};

const show = (selector) => {
  const element = select(selector);
  return element.classList.remove('hidden'), element.classList.add('flex');
};

// show edit box when admin clicks on edit

selectAll('.edit-article').forEach(element => {
  element.addEventListener('click', () => {
    show('.modal');
    show('.modal-edit');
  });
});

// show confirmation modal when admin clicks on delete

selectAll('.delete-article').forEach(element => {
  element.addEventListener('click', () => {
    show('.modal');
    show('.modal-delete');
  });
});

// show comment box when admin clicks on edit

selectAll('.comment-article').forEach(element => {
  element.addEventListener('click', () => {
    show('.modal');
    show('.modal-comment');
  });
});

// show confirmation modal when admin clicks on flag

selectAll('.flag').forEach(element => {
  element.addEventListener('click', () => {
    show('.modal');
    show('.modal-flag');
  });
});

// close modal when admin clicks on cancel, update, comment, delete, or flag

selectAll('.btn-close-modal').forEach(element => {
  element.addEventListener('click', () => {
    hide('.modal');
    hide('.modal-delete');
    hide('.modal-edit');
    hide('.modal-comment');
    hide('.modal-flag');
  });
});

// hide other articles and flagged articles when admin clicks on my articles tab
// and highlight this tab

select('.btn-my-articles').addEventListener('click', ({ target }) => {
  hide('.other-articles');
  hide('.flagged-articles');
  show('.my-articles');

  target.classList.add('btn__highlight');
  select('.btn-other-articles').classList.remove('btn__highlight');
  select('.btn-flagged').classList.remove('btn__highlight');
});

// hide my articles and flagged articles when admin clicks on all articles tab
// and highlight this tab

select('.btn-other-articles').addEventListener('click', ({ target }) => {
  hide('.my-articles');
  hide('.flagged-articles');
  show('.other-articles');

  target.classList.add('btn__highlight');
  select('.btn-my-articles').classList.remove('btn__highlight');
  select('.btn-flagged').classList.remove('btn__highlight');
});

// hide my articles and all articles when admin clicks on flagged articles tab
// and highlight this tab

select('.btn-flagged').addEventListener('click', ({ target }) => {
  hide('.my-articles');
  hide('.other-articles');
  show('.flagged-articles');

  target.classList.add('btn__highlight');
  select('.btn-other-articles').classList.remove('btn__highlight');
  select('.btn-my-articles').classList.remove('btn__highlight');
});
