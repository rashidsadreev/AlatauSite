
const slider = document.querySelector('.hero-block');
const leftBtn = document.querySelector('.slider__btn_left');
const rightBtn = document.querySelector('.slider__btn_right');

const images = [
    "url('img/index/hero-block_bg.png')",
    "url('img/index/city3.jpg')"
];

let index = 0;

function showBackground(i) {
    slider.style.backgroundImage = images[i];
}

leftBtn.addEventListener('click', () => {
    index = (index - 1 + images.length) % images.length;
    showBackground(index);
});

rightBtn.addEventListener('click', () => {
    index = (index + 1) % images.length;
    showBackground(index);
});


showBackground(index);