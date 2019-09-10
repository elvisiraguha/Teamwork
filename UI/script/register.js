const select = (element) => {
  return document.querySelector(element);
};

select('.btn-top--signup').addEventListener('click', ({target}) => {
  select('.register--signup').classList.add('flex');
  select('.register--signup').classList.remove('hidden');

  select('.register--signin').classList.add('hidden');
  select('.register--signin').classList.remove('flex');

  target.classList.add('btn__highlight');
  select('.btn-top--signin').classList.remove('btn__highlight');
});
select('.btn-top--signin').addEventListener('click', ({target}) => {
  select('.register--signin').classList.remove('hidden');
  select('.register--signin').classList.add('flex');

  select('.register--signup').classList.add('hidden');
  select('.register--signup').classList.remove('flex');

  target.classList.add('btn__highlight');
  select('.btn-top--signup').classList.remove('btn__highlight');
});