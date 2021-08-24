import { TempetureScale } from "./open-weather.data-model";

export class LocalStorageService {

    async setHomeCity(home: string): Promise<void> {
        return new Promise(resolve => {
            return chrome.storage.local.set({ home }, resolve);
        })
    }

    async getHomeCity(): Promise<string> {
        return new Promise(resolve => {
            chrome.storage.local.get('home', result => {
                resolve(result['home'] ?? '');
            });
        });
    }

    async setTempetureScale(scale: TempetureScale): Promise<void> {
        return new Promise(resolve => {
            return chrome.storage.local.set({ scale }, () => {
                resolve()
            });
        })
    }

    async getTempetureScale(): Promise<TempetureScale> {
        return new Promise(resolve => {
            chrome.storage.local.get('scale', result => {
                resolve(result['scale'] ?? 'metric');
            });
        });
    }

    private async setCities(cities: string[]): Promise<void> {

        if (!cities)
            throw new Error('cities cannot be null');

        return new Promise(resolve => {
            return chrome.storage.local.set({ cities }, () => {
                resolve()
            });
        })
    }

    async getCities(): Promise<string[]> {
        return new Promise(resolve => {
            chrome.storage.local.get('cities', result => {
                resolve(result['cities'] ?? []);
            });
        });
    }

    async addCity(city: string): Promise<string[]> {
        if (!city)
            throw new Error('city is empty');

        const cities = await this.getCities();


        if (cities.some(v => v.toUpperCase() === city.toUpperCase()))
            throw new Error(`${city} is already added`);

        const newCities = [...cities, city];
        await this.setCities(newCities);
        return newCities;
    }

    async removeCity(city: string): Promise<string[]> {
        if (!city)
            throw new Error('city is empty');

        const cities = await this.getCities();

        const newCities = cities.filter(c => c.toUpperCase() !== city.toUpperCase());
        await this.setCities(newCities);
        return newCities;
    }

}

const localStorage = new LocalStorageService();

export default localStorage;


