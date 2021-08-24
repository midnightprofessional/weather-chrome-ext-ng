import weather from '../shared/open-weather.service';
import storage from '../shared/local-storage.service';
import { TempetureScale } from 'projects/shared/open-weather.data-model';

console.info('Hi from background');

chrome.contextMenus.create({
    contexts: ['selection'],
    title: 'Add city to weather extension',
    id: 'weatherExtension'
});

chrome.contextMenus.onClicked.addListener(async event => {
    console.log(event);
    const city = event.selectionText;
    if (!city)
        return;

    await weather.fetchWeatherData(city);
    await storage.addCity(city);
});

let symbol = '';
Promise.all([storage.getTempetureScale(), storage.getHomeCity()])
    .then(([scale, home]) => {
        symbol = scale === 'metric' ? '\u2103' : '\u2109';
        return home ? weather.fetchWeatherData(home, scale) : undefined;
    })
    .then(weather => {
        if (weather)
            chrome.action.setBadgeText({
                text: Math.round(weather.main.temp).toString() + symbol
            });
    })


