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
        if (data.weather.length > 0)
            data.weather_details = {
                description: data.weather[0].description,
                iconUrl: this.getWeatherIconUrl(data.weather[0].icon)
            };
        console.log(data);
        return data;
    }

    private getWeatherIconUrl(code: string) {
        return `http://openweathermap.org/img/wn/${code}@2x.png`;
    }
}

const weather = new WeatherService();

export default weather;

