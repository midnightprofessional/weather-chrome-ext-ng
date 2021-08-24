import { OpenWeatherData } from "./open-weather.data-model";
import storage from './local-storage.service';
import weather from './open-weather.service';

export type CityWeather = [string, OpenWeatherData];

export async function addCity(city: string): Promise<CityWeather[]> {
    if (!city)
        throw new Error('city is empty');

    const [scale, cities] = await Promise.all([storage.getTempetureScale(), storage.getCities()])

    if (cities.some(c => c.toUpperCase() === city.toUpperCase()))
        throw new Error(`${city} is already added`);

    const newCities = [...cities, city];
    const weathers = await Promise.all(newCities.map(c => weather.fetchWeatherData(c, scale)));

    await storage.setCities(newCities);

    return newCities.map((city, index) => [city, weathers[index]]);
}

export async function removeCity(city: string): Promise<CityWeather[]> {
    if (!city)
        throw new Error('city is empty');

    const [scale, cities] = await Promise.all([storage.getTempetureScale(), storage.getCities()])

    if (cities.every(c => c.toUpperCase() !== city.toUpperCase()))
        throw new Error(`${city} not found`);

    const newCities = cities.filter(c => c.toUpperCase() !== city.toUpperCase());
    const weathers = await Promise.all(newCities.map(c => weather.fetchWeatherData(c, scale)));

    await storage.setCities(newCities);

    return newCities.map((city, index) => [city, weathers[index]]);
}

export async function getCityWeathers(): Promise<CityWeather[]> {
    const [scale, cities] = await Promise.all([storage.getTempetureScale(), storage.getCities()])
    const weathers = await Promise.all(cities.map(c => weather.fetchWeatherData(c, scale)));
    return cities.map((city, index) => [city, weathers[index]]);
}


export async function getHomeCityWeather(): Promise<CityWeather | undefined> {
    const [scale, home] = await Promise.all([storage.getTempetureScale(), storage.getHomeCity()]);
    if (!home)
        return undefined;
    const homeWeather = await weather.fetchWeatherData(home, scale);
    return [home, homeWeather];
}