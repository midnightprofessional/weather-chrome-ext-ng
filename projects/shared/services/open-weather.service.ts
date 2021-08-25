import { OpenWeatherData, TempetureScale } from '../models/open-weather.data-model';
import config from '../config';

// https://openweathermap.org/current
export class WeatherService {

    async fetchWeatherData(city: string, scale: TempetureScale = 'metric') {
        if (!city)
            throw new Error('City is null');

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${config.OPEN_WEATHER_MAP.API_KEY}&units=${scale}`;
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

