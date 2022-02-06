const API_KEY = "54df74fdd5d29076300c74f04a6ee9e4"

function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
    fetch(url).then(response => response.json()).then(data=>{
        const weather = document.querySelector("#weather span:first-child");
        const city = document.querySelector("#weather span:last-child");
        weather.innerText = `${data.weather[0].main}, ${data.main.temp} °C /`;
        city.innerText = `@${data.name}`;
    });
}

function onGeoError() {
    alert("can find you. No weather for you.");
}

const pos = navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);