window.addEventListener('DOMContentLoaded', () => {
    //Tabs
    const tabs = document.querySelectorAll('.tabheader__item');
    const tabsContent = document.querySelectorAll('.tabcontent');
    const tabsParent = document.querySelector('.tabheader__items');

    const hideTabContent = () =>{
        tabsContent.forEach(item =>{
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        })
    }
    const showTabContent = ( i = 0 ) => {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) =>{
        const target = e.target;

        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((tab, i) => {
                if(target == tab){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //Timer
    const deadline = '2021-09-18';

    function getTimeRemaining(endTime){
        const t = Date.parse(endTime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t/( 1000 * 60 * 60 ) % 24)),
              minutes = Math.floor((t/1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return{
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if(num >= 0 && num < 10){
            return `0${num}`
        }else{
            return num;
        }
    }

    function setClock(selector, endTime){
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

              updateClock();
        
        function updateClock(){
            const t = getTimeRemaining(endTime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML =getZero(t.seconds);

            if(t.total <=  0){
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);


//Modal Window

const dataModals = document.querySelectorAll('[data-modal]');
const dataClose = document.querySelector('[data-close]');
const modal = document.querySelector('.modal');


const modalOpen = () =>{
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
}

const modalClose = () =>{
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

    dataModals.forEach(dataModal => {
        dataModal.addEventListener('click', modalOpen);
    })
        dataClose.addEventListener('click', modalClose);
        modal.addEventListener('click', (e) => {
        if(e.target === modal){
            modalClose();
        }
    });

//console.log(dataModal);
document.addEventListener('keydown', (e) =>{
    if(e.code === 'Escape' && modal.classList.contains('show')){
        modalClose();
    }
});

});