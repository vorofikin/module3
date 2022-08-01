const $getCityName = document.querySelector('input#cityName');

const $form = document.getElementById('weather');

$form.addEventListener('submit', (event) => {
    event.preventDefault();
    const cityName = $getCityName.value;
    getWeather(cityName);
})
let degreesCelcius = String.fromCodePoint(8451);
const $ul = document.getElementById('list');

function getWeather ($getCityName){
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+$getCityName+'&appid=f389f8951d936487d518c244be0da7eb&units=metric';
    axios.get(apiUrl)
        .then(function (responseData) {
            const $li = document.createElement('li');
            $li.className = 'list-group-item';
            $li.innerText = 'Temperature in ' + $getCityName + ' is ' + responseData["data"]["main"]["temp"] + degreesCelcius;
            $ul.appendChild($li);
        });
}
