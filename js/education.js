document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const tabIdParam = urlParams.get('tab') || 'tab0';
  const asideMenus = document.querySelectorAll('.aside .aside-menu');
  const tabContent = document.querySelectorAll('.content');
  const mySwiper = initializeSwiper('.education-swiper', handleSwiperChange);

  asideMenus.forEach(item => {
    item.addEventListener('click', handleTabClick);
  });

  if (tabIdParam) {
    updateAsideMenuActiveState(tabIdParam);
  }

  const showAco = document.querySelectorAll('.division-box .division-box__title ');

  showAco.forEach(title => {
    title.addEventListener('click', handleAccordionClick);
  });

  function handleSwiperChange() {
    const currentIndex = mySwiper.activeIndex;
    const imgSrc = `./assets/Image/IntroducePage/Education/Popup/${currentIndex + 1}.jpg`;
    document.getElementById('largeImg').setAttribute('src', imgSrc);
  }

  function handleTabClick() {
    const tab = this.getAttribute('data-tabs');
    if (tab) {
      updateAsideMenuActiveState(tab);
      urlParams.set('tab', tab);
      history.replaceState(null, null, `?${urlParams.toString()}`);
    }
  }

  function updateAsideMenuActiveState(tabId) {
    asideMenus.forEach(menu => {
      menu.classList.remove('active');
      const arrowRight = menu.querySelector('.img-active');
      arrowRight?.classList.remove('active');
    });

    const activeAsideMenu = document.querySelector(`.aside-menu[data-tabs="${tabId}"]`);
    const activeArrowRight = activeAsideMenu?.querySelector('.img-active');

    if (activeAsideMenu && activeArrowRight) {
      activeAsideMenu.classList.add('active');
      activeArrowRight.classList.add('active');
    }

    tabContent.forEach(content => {
      const hasItems = content.querySelectorAll(`[data-tabs="${tabId}"]`).length > 0;
      content.classList.toggle('active', hasItems);

      content.querySelectorAll(`[data-tabs]`).forEach(item => {
        item.classList.toggle('active', item.getAttribute('data-tabs') === tabId);
      });
    });
  }

  function handleAccordionClick() {
    const content = this.parentElement.querySelector('.division-box__content');
    const arrowBtn = this.parentElement.querySelector('.division-box__title svg');

    content.classList.toggle('active');
    arrowBtn.classList.toggle('active');
  }

  function initializeSwiper(selector, onChangeCallback) {
    return new Swiper(selector, {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      autoplay: { delay: 2000 },
      speed: 3000,
      breakpoints: {
        0: { slidesPerView: 0 },
        450: { slidesPerView: 1 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 3 },
        1440: { slidesPerView: 4 },
      },
      on: {
        slideChange: onChangeCallback,
      },
    });
  }

  // Education Popup
  const educationPopup = {
    popup: document.querySelector('.popup'),
    popUpImg: document.getElementById('popUpImg'),
    nextBtn: document.querySelector('.next-btn'),
    prevBtn: document.querySelector('.prev-btn'),
    isOpen: false,
    currentIndex: 0,

    thumbnailImages: Array.from({ length: mySwiper.slides.length }, (_, i) =>
      `./assets/Image/IntroducePage/Education/Popup/${i + 1}.jpg`
    ),

    preloadImages: async function () {
      for (let i = 0; i < this.thumbnailImages.length; i++) {
        await this.loadImageAsync(i);
      }
    },

    loadImageAsync: function (index) {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = `./assets/Image/IntroducePage/Education/Popup/${index + 1}.jpg`;
        img.onload = resolve;
      });
    },

    attachThumbnailListeners: function () {
      document.querySelectorAll('.edu-slide__box img').forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', async () => {
          if (!this.isOpen) {
            this.isOpen = true;
            await this.loadImageAsync(index);
            this.currentIndex = index;
            this.openPopup();
          }
        });
      });
    },

    openPopup: function () {
      mySwiper.autoplay.stop();

      const imgSrc = `./assets/Image/IntroducePage/Education/Popup/${this.currentIndex + 1}.jpg`;
      this.popUpImg.src = imgSrc;

      this.popup.style.display = 'block';

      document.getElementById('close-btn').addEventListener('click', () => {
        this.popup.style.display = 'none';
        setTimeout(() => {
          this.isOpen = false;
          mySwiper.autoplay.start();
        }, 500);
      });

      this.nextBtn.addEventListener('click', async () => {
        await this.loadImageAsync((this.currentIndex + 1) % mySwiper.slides.length);
        this.handleNextClick();
      });

      this.prevBtn.addEventListener('click', async () => {
        await this.loadImageAsync((this.currentIndex - 1 + mySwiper.slides.length) % mySwiper.slides.length);
        this.handlePrevClick();
      });
    },

    handleNextClick: function () {
      this.currentIndex = (this.currentIndex + 1) % mySwiper.slides.length;
      this.popUpImg.src = `./assets/Image/IntroducePage/Education/Popup/${this.currentIndex + 1}.jpg`;
    },

    handlePrevClick: function () {
      this.currentIndex = (this.currentIndex - 1 + mySwiper.slides.length) % mySwiper.slides.length;
      this.popUpImg.src = `./assets/Image/IntroducePage/Education/Popup/${this.currentIndex + 1}.jpg`;
    },
  };

  educationPopup.preloadImages();
  educationPopup.attachThumbnailListeners();

  //kitchen
  const kitchenPopup = {
    popup: document.querySelector('.kitchenPopup'),
    popUpImg: document.getElementById('kitchenPopupImg'),
    nextBtn: document.querySelector('.kitchenPopup .next-btn'),
    prevBtn: document.querySelector('.kitchenPopup .prev-btn'),
    isOpen: false,
    currentIndex: 0,
  
    thumbnailImages: Array.from({ length: swiper4.slides.length }, (_, i) =>
      `./assets/Image/IntroducePage/Kitchen/Popup/${i + 1}.jpg`
    ),
  
    preloadImages: async function () {
      for (let i = 0; i < this.thumbnailImages.length; i++) {
        await this.loadImageAsync(i);
      }
    },
  
    loadImageAsync: function (index) {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = `./assets/Image/IntroducePage/Kitchen/Popup/${index + 1}.jpg`;
        img.onload = resolve;
      });
    },
  
    attachThumbnailListeners: function () {
      document.querySelectorAll('.kitchen-slide__box img').forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', async () => {
          if (!this.isOpen) {
            this.isOpen = true;
            await this.loadImageAsync(index);
            this.currentIndex = index;
            this.openPopup();
          }
        });
      });
    },
  
    openPopup: function () {
      swiper4.autoplay.stop();
  
      const imgSrc = `./assets/Image/IntroducePage/Kitchen/Popup/${this.currentIndex + 1}.jpg`;
      this.popUpImg.src = imgSrc;
  
      this.popup.style.display = 'block';
  
      document.getElementById('kitchenClose-btn').addEventListener('click', () => {
        this.popup.style.display = 'none';
        setTimeout(() => {
          this.isOpen = false;
          swiper4.autoplay.start();
        }, 500);
      });
  
      this.nextBtn.addEventListener('click', async () => {
        await this.loadImageAsync((this.currentIndex + 1) % swiper4.slides.length);
        this.handleNextClick();
      });
  
      this.prevBtn.addEventListener('click', async () => {
        await this.loadImageAsync((this.currentIndex - 1 + swiper4.slides.length) % swiper4.slides.length);
        this.handlePrevClick();
      });
    },
  
    handleNextClick: function () {
      this.currentIndex = (this.currentIndex + 1) % swiper4.slides.length;
      this.popUpImg.src = `./assets/Image/IntroducePage/Kitchen/Popup/${this.currentIndex + 1}.jpg`;
    },
  
    handlePrevClick: function () {
      this.currentIndex = (this.currentIndex - 1 + swiper4.slides.length) % swiper4.slides.length;
      this.popUpImg.src = `./assets/Image/IntroducePage/Kitchen/Popup/${this.currentIndex + 1}.jpg`;
    },
  };
  
  kitchenPopup.preloadImages();
  kitchenPopup.attachThumbnailListeners();
});
