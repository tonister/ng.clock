# ng.clock
## AngularJS 1.X clock module with customisable circular analog and digital clock
###Getting started
First You need to install the ng.clock module as a dependency for Your project via npm:
<pre>npm i -s ng.clock</pre>

Second You need to add AngularJS 1.X and ng.clock references to Your project:
```html
<script src="node_modules/angular/angular.js"></script>
<script src="node_modules/ng.clock/index.js"></script>
```

Third You need to simply add the ng.clock module as a dependency to Your app:
```javascript
angular.module('myApp', ['ng.clock'])
```

Then You can finally use the directives to add either the analog clock or the digital clock to Your project:
```html
<digital-clock></digital-clock>
<!-- or -->
<analog-clock></analog-clock>
```

### Customising
Both of these directives have some attributes to modify how the clock looks like

#### The digital clock 
By default the digital clock has only hours and minutes displayed and the colon in between them is used to reference the seconds passing by blinking.

If You want to also display the seconds as numbers, set the _seconds_ attribute true:
```html
<digital-clock seconds="true"></digital-clock>
```
This will stop the colon blinking and instead will append the seconds to the end.

#### The analog clock
By default the analog clock has only hours and minutes hands visible and the default color for everything is black.

You can change the colors of each of the hands and the number dots separately with _hour-color_, _min-color_, _sec-color_ and _num-color_.
```html
<analog-clock hour-color="blue" min-color="#aabbcc" sec-color="red" num-color=""green></analog-clock>
```
You could also change both main hands colors at the same time with _main-hands-color_.
```html
<analog-clock main-hands-color="navy" sec-color="red"></analog-clock>
```
Also You could turn the seconds hand on by setting the attribute _sec-hand_
```html
<analog-clock sec-hand="true"></analog-clock>
```

The seconds hand is turned on by either the parameter _sec-hand_ or by setting the color for the seconds hand with _sec-color_.


