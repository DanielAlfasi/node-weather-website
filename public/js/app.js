
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''


weatherForm.addEventListener('submit' , (e) => {
    e.preventDefault()
    messageOne.textContent = ''
    messageTwo.textContent = 'Loading...'

    const location = search.value
    
   
    fetch('http://localhost:3000/weather?address='+ location).then((response) => {
       response.json().then((data) => {
          if(data.error)
            {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            } else {
                messageOne.textContent = 'It is currently ' + data.forecastData.weatherdescription + ' in ' + data.location
                messageTwo.textContent = 'The current Temperature is ' + data.forecastData.temp + ' degrees although it feels like ' + data.forecastData.feelstemp 
             }
    })
})
})