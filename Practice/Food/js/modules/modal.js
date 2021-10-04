    // Функция modalOpen() добавляет класс show и убирает класс hide для элемента с классом modal и глобально убирает скролл со страницы; 
    const modalOpen = (modalSelector, modalTimerId) => {
        const modal = document.querySelector(modalSelector);

        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';

        console.log(modalTimerId);

        if(modalTimerId){
        clearInterval(modalTimerId);
        }
    }
    // Функция modalClose() добавляет класс hide и убирает класс show для элемента с классом modal и глобально возвращает скролл на страницу;
    const modalClose = (modalSelector) => {
        const modal = document.querySelector(modalSelector);

        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }


function modal(triggerSelector, modalSelector, modalTimerId){
        //Modal Window

    // Получение элементов DOM-дерева по внутренним аргументам элементов и по классу;
    const dataModals = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);

    // Для каждо кнопки вызова модального окна добавляется обработчик событий
    dataModals.forEach(dataModal => {
        dataModal.addEventListener('click', () => modalOpen(modalSelector, modalTimerId));
    })
    // Закрывает модальное окно если была нажата кнопка закрыть и  прокликана свободная область вокруг окна но не внутри;
        modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == ''){
            modalClose(modalSelector);
        }
    });

    // Закрывает модальное окно при клике на клавишу Esc;
    document.addEventListener('keydown', (e) =>{
        if(e.code === 'Escape' && modal.classList.contains('show')){
            modalClose(modalSelector);
        }
    });
    
    const showModalByScroll = () =>{
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            modalOpen(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll)
}

export default modal;
export{modalOpen, modalClose};