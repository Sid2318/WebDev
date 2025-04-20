// task 3
const cross = document.querySelector(".cross_task1");

function showSidebar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = 'flex';
}

cross.addEventListener("click",() => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = 'none';
})

let currentIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    if (index >= slides.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = slides.length - 1;
    } else {
        currentIndex = index;
    }
    const carouselInner = document.getElementById('carouselInner');
    carouselInner.style.transform = `translateX(${-currentIndex * 100}%)`;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

document.addEventListener('DOMContentLoaded', () => {
    setInterval(() => {
        nextSlide();
    }, 2000);
});

const start = document.querySelector('.start')
start.addEventListener('click',()=>{
    const container = document.querySelector('.container2')
    const task3 = document.querySelector('.block3')
    container.style.display = 'none';
    task3.style.display = 'block';
})
