console.log('Client side javascript file is loaded')

// This script is running in client side js i.e it will read the response of the web browser
// NOTE - THIS FILE IS RUNNING ON THE BROWSER

// fetch is a browser side funtion
// then method on return value of fetch
// Fetch data from the url, and then run the function
// Fetch will show whatever is available on the web page
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=Boston').then((response) => {
//     response.json().then((data)=>{
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

const weatherForm = document.querySelector('form') // check index.hbs
const search = document.querySelector('input') // check index.hbs

// Added an empty paragraph in index.hbs with id message-1
// Filling it here
const messageOne = document.querySelector('#message-1') // class starts with . but id starts with #
// messageOne.textContent = 'From JavaScript'

const messageTwo = document.querySelector('#message-2')

// Adding even listener on form
// Fetching only when form is submitted
// Calling localhost:3000/weather?address=<location> after reading the form and using fetch.
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value

    console.log(location)

    //let QueryString = 'http://localhost:3000/weather?address=' + location
    let QueryString = '/weather?address=' + location
    
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(QueryString).then((response) => {
    response.json().then((data)=>{
        if (data.error) {
            // console.log(data.error)
            messageOne.textContent = data.error
        } else {
            // console.log(data.location)
            // console.log(data.forecast)
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
})