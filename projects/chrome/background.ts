import config from '../shared/config';
import { getTempetureScale, getHomeCityWeather, addCity } from '../shared/services/city-weather.service';

console.info('Hi from background');

chrome.runtime.onInstalled.addListener(details => {
    chrome.contextMenus.create({
        contexts: ['selection'],
        title: 'Add city to weather extension',
        id: 'weatherExtension'
    });

    chrome.alarms.create({ periodInMinutes: config.BADGE.REFRESH_PERIOD_IN_MINUTES });
});


chrome.contextMenus.onClicked.addListener(async event => {
    console.log(event);
    const city = event.selectionText;
    if (!city)
        await addCity(city!);
});

refreshBadgeText();
chrome.alarms.onAlarm.addListener(() => {
    refreshBadgeText();
})


async function refreshBadgeText() {
    const badgeText = await getBadgeText();
    chrome.action.setBadgeBackgroundColor({
        color: config.BADGE.BACKGROUND_COLOR
    })
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
