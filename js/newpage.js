const urlParams = new URLSearchParams(window.location.search);
const tabIdParam = urlParams.get('tab') || 'tab0';
const asideMenus = document.querySelectorAll('.aside .aside-menu');
const arrowRight = document.querySelector('.arrow-right .img-active');

let currentTab = 'all';
let currentIndex = 0;

    asideMenus.forEach(item => {
        item.addEventListener('click', () =>{
            let tab = item.getAttribute('data-tabs')
            if(tab){
                updateAsideMenuActiveState(tab);
                const urlParams = new URLSearchParams();
                urlParams.set('tab', tab);
                history.replaceState(null,null, `?${urlParams.toString()}`)
            }
        })
    })

    // If a tab ID parameter is found, set the active state
    if (tabIdParam) {
        // Update the active state of the aside menu
        updateAsideMenuActiveState(tabIdParam);
    }
    function updateAsideMenuActiveState(tabId) {
        const tabContent = document.querySelectorAll('.new-card .new-card__box');
        
        // Show/hide content for new-card based on the active tab
        tabContent.forEach(content => {
            const isActiveTab = tabId === 'tab0' || content.querySelector(`.tab span[data-tabs="${tabId}"]`);
            content.classList.toggle('active', isActiveTab);
        });
    
        asideMenus.forEach(menu => {
            menu.classList.remove('active');
            const arrowRight = menu.querySelector('.img-active');
            arrowRight?.classList.remove('active');
    
            if (menu.getAttribute('data-tabs') === tabId) {
                menu.classList.add('active');
                arrowRight?.classList.add('active');
            }
        });
    }

     

