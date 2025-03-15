var swiper = new Swiper('.movie-slider', {
    slidesPerView: 5,
    spaceBetween: 10,
    loop: false,
    centeredSlides: false,
    watchOverflow: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    on: {
        init: function () {
            this.update();
            checkEnd(this);
        },
        slideChange: function () {
            checkEnd(this);
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

function checkEnd(swiper) {
    if (swiper.isEnd) {
        swiper.navigation.nextEl.classList.add('swiper-button-disabled');
    } else {
        swiper.navigation.nextEl.classList.remove('swiper-button-disabled');
    }

    if (swiper.isBeginning) {
        swiper.navigation.prevEl.classList.add('swiper-button-disabled');
    } else {
        swiper.navigation.prevEl.classList.remove('swiper-button-disabled');
    }
}

swiper.on('init', function () {
    checkEnd(this);
});
swiper.on('slideChange', function () {
    checkEnd(this);
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