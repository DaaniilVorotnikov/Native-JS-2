const postData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
 };

 const getResource = async (url) => {
    const res = await fetch(url);
    
    if(!res.ok){
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
 };


    // axios.get('http://localhost:3000/menu')
    //     .then(data =>{
    //         data.data.forEach(({img, altimg,title, descr, price}) => {
    //         new TabContent(img, altimg, title, descr, price, '.menu .container').render();
    //     });
    // });

    // Вызов метода render через вызов класса TabContent;
    //  new TabContent(
    //      "img/tabs/vegy.jpg",
    //      "vegy",
    //      "Фитнес",
    //      'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //       9,
    //      '.menu .container',
    //      'menu__item',
    //      'big'
    //  ).render();



export {postData, getResource};


            // fetch('server.php', {
            //      method: "POST",
            //      headers: {
            //          'Content-type': 'aplication/json'
            //      },
            //     body: JSON.stringify(object)
            // })