# vue-clicky
Handy debugging function for Vue. Right click any vue component, and it will show you neatly formatted info about it in the console.

```
npm install --save-dev vue-clicky
```
```javascript
if (process.env.NODE_ENV === 'development') {
  import 'vue-clicky';
}
```
(If you're not using Node/NPM,just download clicky.js and add it to `<head>`)

It has no dependencies, and shouldn't conflict with anything. It just adds a 'contextmenu' listener to `document`.

### Screenshot
![screenshot](https://github.com/Herteby/vue-clicky/blob/master/screenshot.png)

Currently it shows:
* The Vue component object
* Current data, props and computed properties
* Parent component. Open the parent and it will display the same info about it.
