import { OpenWeatherData, TempetureScale } from './open-weather.data-model';

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const API_KEY = 'd3afe7aded0e54d2cdafcdf0d55b6181';

export class WeatherService {

    async fetchWeatherData(city: string, scale: TempetureScale = 'metric') {
        if (!city)
            throw new Error('City is null');

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${scale}`;
        const res = await fetch(url);
        if (!res.ok)
            throw new Error('City not found');
        const data: OpenWeatherData = await res.json();
        console.log(data);
        return data;
    }
}

const weather = new WeatherService();

export default weather;

