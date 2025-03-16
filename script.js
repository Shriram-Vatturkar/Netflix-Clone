var swiper = new Swiper('.movie-slider', {
    slidesPerView: 5,
    spaceBetween: 10,
    loop: true, // Enable looping
    centeredSlides: false,
    watchOverflow: true,
    loopFillGroupWithBlank: true, // Fill empty space with blank slides
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    on: {
        init: function () {
            this.update();
        },
        slideChange: function () {
            // Stop all videos when the slide changes
            document.querySelectorAll('.swiper-slide video').forEach(video => {
                video.pause();
                video.currentTime = 0;
                video.muted = true;
            });

            // Play video of the current slide
            const activeSlide = this.slides[this.activeIndex];
            const video = activeSlide.querySelector('video');
            if (video) {
                video.muted = false;
                video.play();
            }
        },
    }
});

// Add event listeners to play/pause video on hover
document.querySelectorAll('.swiper-slide').forEach(slide => {
    const video = slide.querySelector('video');
    slide.addEventListener('mouseenter', () => {
        console.log("Mouse enter event triggered");
        if (video) {
            console.log("Video object:", video);
            video.muted = false; // Unmute the video
            video.play().then(() => {
                console.log("Video is playing");
            }).catch(error => {
                console.error("Error playing video:", error);
            });
        }
    });
    slide.addEventListener('mouseleave', () => {
        if (video) {
            video.pause();
            video.currentTime = 0;
            video.muted = true; // Mute the video again
        }
    });
});
