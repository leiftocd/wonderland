document.addEventListener('DOMContentLoaded', () => {
    const listTab = document.querySelectorAll('.wrapper-menu__item');
    const listContent = document.querySelectorAll('.wrapper-img .box-img img');
    const popup = document.querySelector('.popup');
    const popUpImg = document.getElementById('popUpImg');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const btnLoadMore = document.getElementById('load-more');

    let currentTab = 'all';
    let currentIndex = 0;
    let imgRender;

    function setActiveContent() {
        listContent.forEach(content => {
            const contentTab = content.getAttribute('data-tab');
            content.classList.toggle('active', currentTab === 'all' || contentTab === currentTab);
        });

        const contentText = document.querySelectorAll('.wrapper-img .box-wrapper .box-text');
        contentText.forEach(c => {
            c.classList.toggle('active', currentTab === 'tab1');
        });
    }

    function setFilter(filter) {
        currentTab = filter;
        openPopup();
        setActiveContent();
        listTab.forEach(t => t.classList.toggle('active', t.getAttribute('data-filter') === filter));

        imgRender = window.innerWidth >= 450 ? 12 : 5;
        renderItem(imgRender);
    }

    listTab.forEach(item => {
        item.addEventListener('click', () => setFilter(item.getAttribute('data-filter')));
    });

    setFilter(currentTab);

    function handleImageClick(event) {
        const targetImg = event.target.closest('.wrapper-img .box-img img.active');
        if (targetImg) {
            popup.style.display = 'block';
            popUpImg.src = targetImg.src;
        }
    }

    function openPopup() {
        popup.style.display = 'none';
        document.addEventListener('click', handleImageClick);
        document.getElementById('close-btn').addEventListener('click', () => {
            popup.style.display = 'none';
            document.removeEventListener('click', handleImageClick);
        });
        nextBtn.addEventListener('click', handleNextClick);
        prevBtn.addEventListener('click', handlePrevClick);
    }

    function handleNextClick() {
        currentIndex = (currentIndex + 1) % listContent.length;
        popUpImg.src = listContent[currentIndex].src;
    }

    function handlePrevClick() {
        currentIndex = (currentIndex - 1 + listContent.length) % listContent.length;
        popUpImg.src = listContent[currentIndex].src;
    }

    function renderItem(imgRender) {
        listContent.forEach((img, index) => {
            const contentTab = img.getAttribute('data-tab');
            img.classList.toggle('active', (index < imgRender) && (currentTab === 'all' || contentTab === currentTab));
        });
    }

    function moreImg() {
        btnLoadMore.addEventListener('click', () => {
            imgRender += 3;
            console.log('imgRender:', imgRender);

            listContent.forEach((img, index) => {
                const contentTab = img.getAttribute('data-tab');
                const isVisibleTab = currentTab === 'all' || contentTab === currentTab;

                if (index < imgRender && isVisibleTab) {
                    img.classList.add('active');
                } else {
                    img.classList.remove('active');
                }
            });

            if (imgRender >= listContent.length) {
                btnLoadMore.classList.add('hidden');
            }
        });
    }
    moreImg();

    // Update imgRender on window resize
    window.addEventListener('resize', () => {
        imgRender = window.innerWidth >= 450 ? 12 : 5;
        renderItem(imgRender);
    });
});
