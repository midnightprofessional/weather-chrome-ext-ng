import { getTempetureScale, getHomeCityWeather, addCity } from '../shared/city-weather.service';

console.info('Hi from background');

chrome.runtime.onInstalled.addListener(details => {
    chrome.contextMenus.create({
        contexts: ['selection'],
        title: 'Add city to weather extension',
        id: 'weatherExtension'
    });

    chrome.alarms.create({ periodInMinutes: 1 / 6 });
});


chrome.contextMenus.onClicked.addListener(async event => {
    console.log(event);
    const city = event.selectionText;
    if (!city)
        await addCity(city!);
});

chrome.alarms.onAlarm.addListener(() => {
    refreshBadgeText();
})


async function refreshBadgeText() {
    const badgeText = await getBadgeText();
    chrome.action.setBadgeText({
        text: badgeText ?? ''
    });
}

async function getBadgeText() {
    const [, weather] = await getHomeCityWeather() ?? [];
    const temp = weather?.main.temp;

    if (!temp)
        return undefined;

    const scale = await getTempetureScale();
    const symbol = scale === 'metric' ? '\u2103' : '\u2109';

    return Math.round(temp) + symbol;
}
