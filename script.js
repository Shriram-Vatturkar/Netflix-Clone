var swiper = new Swiper('.movie-slider', {
    slidesPerView: 5,
    spaceBetween: 10,
    loop: false,
    centeredSlides: false,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    on: {
        init: function () {
            this.update(); // Initial update to calculate slides
            this.checkEnd(); // Check if the end is reached on initialization
        },
        slideChange: function () {
            this.checkEnd(); // Check if the end is reached on slide change
        },
    },
    checkEnd: function () {
        if (this.isEnd) {
            this.navigation.nextEl.classList.add('swiper-button-disabled');
        } else {
            this.navigation.nextEl.classList.remove('swiper-button-disabled');
        }

        if (this.isBeginning){
             this.navigation.prevEl.classList.add('swiper-button-disabled');
        } else {
            this.navigation.prevEl.classList.remove('swiper-button-disabled');
        }
    }
});