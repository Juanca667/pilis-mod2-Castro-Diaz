/*key api*/
const APP_ID = '84d99436b79c264cf2576b9cb3ee7622';
const latitude = '-24.18324151350297';
const longitude = '-65.3312335298994';
const lang = 'sp';

/*Log recibe la posicion del usuario*/
const fetchData = posicion => {
    /*const { latitude, longitude } = posicion.coords;*/
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APP_ID}&lang=${lang}`)
        .then(response => response.json())
        .then(data => setWeatherData(data));
        //.then(data => console.log(data));
}

const setWeatherData = data => {
    const weatherData = {
        location: data.name,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: Math.floor(data.main.temp),
        date: getDate(),
    }

    Object.keys(weatherData).forEach( key => {
        setTextContent(key, weatherData[key]);
    });

}

const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${ ('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
}

const setTextContent = (element, text) => {
    document.getElementById(element).textContent = text;
}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}