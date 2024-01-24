/* 

видео : https://www.youtube.com/watch?v=eKCD9djJQKc


как используя нативный JS мы можем взыимодействовать с сервером через ассинхронные запросы.

мы разберём 2 способы, 1) через XHR и метод fetch.



1) придумываем какой то url,  по которому можем делать ассинхронные запросы - для этого к примеру такой сервис :  https://jsonplaceholder.typicode.com

 
jsonplaceholder это фейк онлайн REST API для тестинга. (Free fake API for testing and prototyping.)




*/




const requestURL = "https://jsonplaceholder.typicode.com/users";
// первый cпособ XHR = XMLHttpRequest

// const xhr = new XMLHttpRequest();
// GET - для получение данных, POST- для создание данных, Delete -  для удаление данных, PUT- для полного обновления элемента, PATCH - длЯ частичного обновления элементов
// xhr.open('GET', requestURL); // tek dirnaq ichinde yazilir methodlar
// делать только "open" недостаточно, после того как получили данные, надо их отправлять с помошью send() 
// xhr.responseType = 'json'; // маленькими буквами

// чтобы взаимодействовать с этими данными, пока у нас нету возвожностей проитерировать массив, поэтому для того чтобы оброботать эти данные, мы можем обратиться к нашему файлу xhr 
// xhr.onload = () => {
    // console.log(xhr.response); // string - потому что по сети когда у нас данные гулают и летают, они передаются  в формате стринг (стора), там объектов быть не может.
    // в Js нам  бы хотелось взаимодействовать именно с объектами.


     //способ 1:
    // самым простым способом чтобы получить тут объект в JS-е,  это обратиться к глобальному объекту JSON и вызвать у него метод (parse):

    // console.log(xhr.response); // это уже не ввиде строки, а ввиде объект
    

     //способ 2:
     // это сверъу после xml.open -a надо указать объекту XHR  т укахать его тип в виде JSON; for exmp -=> xhr.responseType = 'Json'; (response - это ответ)



    // чтобы обробатывать нетворк ошибки:

//     if(xhr.status >= 400){
//         console.error(xhr.response)
//     }else {
//         console.log(xhr.response); 
//     }






// }

// ==================
// чтобы обробатывать ошибки:
// xhr.onerror = () => {
//     console.log(xhr.response);
// };








// ВАЖНО! Это надо делать перед отправкой запроса (send ), потому что в начале мы должны добавить новую слушатель




// xhr.send();
// ===============================================




// работаем с promise 
function sendRequest(method, url, body = null){
    return new Promise( (resolve, reject) => {
            const xhr = new XMLHttpRequest(); // смело можно везде использовать, все браузеры поддерживают
            xhr.open(method, url);
            xhr.responseType = 'json';
            xhr.setRequestHeader('Content-Type', 'application/json')

            xhr.onload = () => {

                if (xhr.status >= 400) {
                    reject(xhr.response);
                } else {
                    resolve(xhr.response);
                }
            };

            xhr.onerror = () => {
                console.log(xhr.response);
            };

            xhr.send(JSON.stringify(body));//надо отправлять стринг файл, а не в виде объекта, для это мы используем json s metodom stringify()
        });
    
}

// sendRequest('GET', requestURL)
// .then(data => console.log(data))
// .catch(err => console.log(err))




// method post
const body = {
    name: 'vladimir', 
    age: 35               
}
sendRequest('POST', requestURL, body)
.then(data => console.log(data))
.catch(err => console.log(err))