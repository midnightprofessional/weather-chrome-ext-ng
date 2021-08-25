# Mobile302

A simple Weather Widget Chrome Extension. It's built with Angular 12 + TailwindCSS, Tyepscript and theming with [DaisyUI](https://daisyui.com/)

---

## Internals

*projects > ng* : Angular project with TailwindCSS setup. UI elements are implemeneted as Angular Element. 

*projects > chrome* : Chrome Extension configuration, assets, UI templates and background scripts.

*projects > shared* : Common Typescript services and models that shared by **ng** and **chrome** projects.

---

## Development Build
```bash
npm run watch
```
- Open Chome Extensions Manager: [chrome://extensions/](chrome://extensions/)
- Enable **Developer mode**
- Click **Load unpacked** button and select "*dist*" folder

---

## Release Build
* TODO
