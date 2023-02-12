
const inputContainer = document.querySelector('.content')


async function weatherInfo(lat, lon) {
    const weatherContent = document.querySelector('.weatherContent');
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f67785957067386909a3a8accf86d30a`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            weatherContent.innerHTML = `
                <h2 class="locationName">${data.name}, ${data.sys.country}</h2>
                <div class="dataContainer">
                    <h2 class="temp">${Math.round((data.main.temp - 273.15) * (9/5) + 32)} F</h2>
                    <div class="dataSpecifications">
                        <h2>Feels Like ${Math.round((data.main.feels_like - 273.15) * (9/5) + 32)} F</h2>
                        <h2>Wind: ${data.wind.speed} mph</h2>
                        <h2>Humidity: ${data.main.humidity}%</h2>
                    </div>
                </div>
                
            `
        })
}

export default function apiCalls() {
    const weatherContent = document.querySelector('.weatherContent');
    weatherContent.removeChild(weatherContent.lastChild);
    const place = document.querySelector('.weatherInput').value;
    
    console.log(place.split(', '));
    let apiPlace = '';

    place.split(', ').forEach(word => {
        apiPlace += `${word},`
    });

    apiPlace = apiPlace.slice(0, -1)

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${apiPlace}&appid=f67785957067386909a3a8accf86d30a`)
        .then((response) => response.json())
        .then((data) => {
            try {
                const latitude = data[0].lat
                const longitude = data[0].lon
                weatherInfo(latitude, longitude);
            } catch(err) {
                console.log("Whoops")
                weatherContent.innerHTML = `
                    <h1>Could not find location, please try again</h1>
                    <p>The only things it can take are 'city', 'city, state', or 'city, country'</p>
                `
                
            }
            
        })
}