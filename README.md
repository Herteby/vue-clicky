# vue-clicky
Handy debugging function for Vue. Right click any vue component, and it will show you neatly formatted info about it in the console.

```bash
npm install --save-dev vue-clicky
```

```javascript
if (process.env.NODE_ENV === 'development') {
  import 'vue-clicky'
}
```

### Screenshot
![screenshot](https://github.com/Herteby/vue-clicky/blob/master/screenshot.png)

Currently it shows:
* The Vue component object
* Current data, props and computed properties
* Parent component. Open the parent and it will display the same info about it.

### Changelog

#### 1.3
* Added options to require `ctrl` or `shift` to be pressed (off by default). Usage:
```javascript
  import { options } from 'vue-clicky'
  options.ctrl = true
  options.shift = true
```
#### 1.2
* With Chrome version 60+, the "class hack" that I used before to get things to display nicely is no longer necessary.
* Now uses lodash.cloneDeep to fetch all the values so that you no longer see a bunch of (...) that you have to click on. This means that NPM is now required. If you want to use vue-clicky without NPM, you can grab the previous version [here](https://github.com/Herteby/vue-clicky/tree/378ad071689e5e9b56cef8c4aeaca8be36b283db)