const select = (element) => {
  return document.querySelector(element);
};

const hide = (selector) => {
  const element = select(selector);
  return element.classList.remove('flex'), element.classList.add('hidden');
};

const show = (selector) => {
  const element = select(selector);
  return element.classList.remove('hidden'), element.classList.add('flex');
};

select('.btn-top--signup').addEventListener('click', ({target}) => {
  hide('.register--signin');
  show('.register--signup');

  target.classList.add('btn__highlight');
  select('.btn-top--signin').classList.remove('btn__highlight');
});
select('.btn-top--signin').addEventListener('click', ({target}) => {
  show('.register--signin');
  hide('.register--signup');

  target.classList.add('btn__highlight');
  select('.btn-top--signup').classList.remove('btn__highlight');
});