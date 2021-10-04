function modal(){
        //Modal Window

    // Получение элементов DOM-дерева по внутренним аргументам элементов и по классу;
    const dataModals = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');

    // Функция modalOpen() добавляет класс show и убирает класс hide для элемента с классом modal и глобально убирает скролл со страницы; 
    const modalOpen = () =>{
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }
    // Функция modalClose() добавляет класс hide и убирает класс show для элемента с классом modal и глобально возвращает скролл на страницу;
    const modalClose = () =>{
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    // Для каждо кнопки вызова модального окна добавляется обработчик событий
    dataModals.forEach(dataModal => {
        dataModal.addEventListener('click', modalOpen);
    })
    // Закрывает модальное окно если была нажата кнопка закрыть и  прокликана свободная область вокруг окна но не внутри;
        modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == ''){
            modalClose();
        }
    });

    // Закрывает модальное окно при клике на клавишу Esc;
    document.addEventListener('keydown', (e) =>{
        if(e.code === 'Escape' && modal.classList.contains('show')){
            modalClose();
        }
    });

    const modalTimerId = setTimeout(modalOpen, 30000);

    const showModalByScroll = () =>{
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            modalOpen();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll)
}

module.exports = modal;