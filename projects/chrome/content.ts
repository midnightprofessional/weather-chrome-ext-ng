import { MessageType } from "../shared/message.data-model";

console.log('Hello from content');

let contentUi: any;

const toggle = () => {
    if (!contentUi) {
        contentUi = document.createElement('content-page');
        document.body.appendChild(contentUi);
    }

    if (contentUi.getAttribute('active'))
        contentUi.removeAttribute('active');
    else
        contentUi.setAttribute('active', 'true');
};

chrome.runtime.onMessage.addListener((message: MessageType, sender, sendResponse) => {
    console.log('content recieving data...');
    if (message === 'TOGGLE_OVERLAY') {
        toggle();
        console.info(message);
    }
    sendResponse();
});
