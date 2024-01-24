const requestURL = "https://jsonplaceholder.typicode.com/users";
function sendRequest(method, url, body = null){
    const headers = {
        'Content-Type': 'application/json'
    }
   return fetch(url, {
    method : method,
    body: JSON.stringify(body),
    headers: headers
   }).then(response => {
    // return response.text() // возмёт и переведёт этот ридибле стрим переведет к тексту
    if(response.ok ){
        return response.json();
    }else{
        return response.json().then(error =>{
            const e = new Error('something goes wrong')
            e.data = error
            throw e;  // viodayet customnuyu oshibku esli ona est.
        })
    }
    
   }) // metod fetch vozvrashaet nam promise. учитывая то что sendRequest и так у нас возврашает промис. т о мы можем сразу же написать return fetch(); perviy parametr fetcha -url
    
}

// sendRequest('GET', requestURL)
// .then(data => console.log(data))
// .catch(err => console.log(err))


const body = {
    name: 'vladimir', 
    age: 35               
}
sendRequest('POST', requestURL, body)
.then(data => console.log(data))
.catch(err => console.log(err))