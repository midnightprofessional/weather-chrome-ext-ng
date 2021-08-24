import weather from '../shared/open-weather.service';
import storage from '../shared/local-storage.service';

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