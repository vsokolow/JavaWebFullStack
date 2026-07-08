// const square_1 = document.querySelector('.square_1');
// const square_2 = document.querySelector('.square_2');

const [square_1, square_2, square_3] = document.querySelectorAll('.square');
const click_btn = document.querySelector('.click_btn');
const squares_container = document.querySelector('.squares_container');

click_btn.addEventListener('click', () => square_1.style.backgroundColor = '#AAFF00');

// square_1.style.backgroundColor = '#AAFF00';

square_3.classList.add('square_3');

// 1. Создать DIV с классом square и добавить его в DIV с классом squares_container
const new_square = document.createElement('div');
new_square.classList.add('square');
squares_container.append(new_square);