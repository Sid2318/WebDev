//task1
const cross = document.querySelector(".cross_task1");

function showSidebar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = 'flex';
}

cross.addEventListener("click",() => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = 'none';
})








// task2
const start = document.querySelector('.start')
start.addEventListener('click',()=>{
    const container = document.querySelector('.container2')
    const task2 = document.querySelector('.task2')
    container.style.display = 'none';
    task2.style.display = 'block';
})

document.querySelector('.submit_btn1').addEventListener('click', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    if (validateForm(name, email, phone, message)) {
        alert('Form submitted successfully!');
    } else {
        alert('Form not submitted. Please check your input.');
    }
});


function validateForm(name, email, phone, message) {
    if (!name) {
        alert('Name is required');
        return false;
    }
    if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return false;
    }
    if (!validatePhone(phone)) {
        alert('Please enter a valid phone number');
        return false;
    }
    if (!message) {
        alert('Message is required');
        return false;
    }
    return true;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^\d{10}$/;
    return re.test(phone);
}











// task 3
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
    }, 3000);
});

