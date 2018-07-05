# vue-clicky
Handy debugging function for Vue. Right click any vue component, and it will show you neatly formatted info about it in the console.
### Screenshot
![screenshot](https://github.com/Herteby/vue-clicky/blob/master/screenshot.png)

It shows:
* The Vue component object
* Current data, props and computed properties
* Root DOM element
* If using VueRouter, info about current route
* Parent component. Click on the parent and it will display the same info about it.

### Installation

```bash
npm install vue-clicky
```

```javascript
import clicky from 'vue-clicky'

clicky() // call the exported function to initialize clicky

// you can also pass some options to clicky:
clicky({
  shift:true, //default: false - clicky won't trigger unless shift is pressed
  ctrl:true,  //default: false - clicky won't trigger unless ctrl is pressed
  stop:true,  //default: false - stops regular context menu from appearing when clicky is triggered (should only be used together with shift:true or ctrl:true)
  left:true  //default: false - trigger on left click instead of right click
})
```
### Changelog
#### 2.0
* Method of initializing and setting options has been changed.
* Now using Rollup to build multiple versions for better compatibility.
* Rewrote code to be more organized.
* Shows component's root element
* If using VueRouter, also shows info about current Route.
#### 1.3
* Added options to require `ctrl` or `shift` to be pressed (off by default). 
#### 1.2
* With Chrome version 60+, the "class hack" that I used before to get things to display nicely is no longer necessary.
* Now uses lodash.cloneDeep to fetch all the values so that you no longer see a bunch of (...) that you have to click on. This means that NPM is now required. If you want to use vue-clicky without NPM, you can grab the previous version [here](https://github.com/Herteby/vue-clicky/tree/378ad071689e5e9b56cef8c4aeaca8be36b283db)
