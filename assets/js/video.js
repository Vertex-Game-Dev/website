document.addEventListener('DOMContentLoaded', () => {
    const videoFileIds = [
        'your_google_drive_file_id_1',
        'your_google_drive_file_id_2',
        'your_google_drive_file_id_3',
    ];

    const sliderContainer = document.getElementById('video-slider');

    videoFileIds.forEach(fileId => {
        const videoSlide = document.createElement('div');
        videoSlide.className = 'swiper-slide';
        videoSlide.innerHTML = `
            <video controls class="w-full h-auto">
                <source src="https://drive.google.com/uc?export=download&id=${fileId}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
        sliderContainer.appendChild(videoSlide);
    });

    const swiper = new Swiper('.video-swiper', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        spaceBetween: 20,
        slidesPerView: 1,
    });
});
