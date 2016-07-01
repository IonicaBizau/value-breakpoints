
# value-breakpoints

 [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![AMA](https://img.shields.io/badge/ask%20me-anything-1abc9c.svg)](https://github.com/IonicaBizau/ama) [![Version](https://img.shields.io/npm/v/value-breakpoints.svg)](https://www.npmjs.com/package/value-breakpoints) [![Downloads](https://img.shields.io/npm/dt/value-breakpoints.svg)](https://www.npmjs.com/package/value-breakpoints) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> Run specific stuff when value reaches a specific range.

## :cloud: Installation

```sh
$ npm i --save value-breakpoints
```


## :clipboard: Example



```js
const ValueBreakpoints = require("value-breakpoints");

let value = 0;

setInterval(() => ++value, 500);

let brks = new ValueBreakpoints([
    {
        min: 10
      , max: 30
      , start: () => {
            console.log("Start");
        }
      , inside: () => {
            console.log("Inside");
        }
      , end: () => {
            console.log("End");
        }
    }
  , {
        min: 5
      , max: 10
      , end: () => {
            console.log("Second End");
        }
    }
]);

brks.check(() => {
    console.log(value);
    return value;
});
// 0
// 2
// 4
// 6
// 7
// 9
// 11
// Start
// Inside
// Second End
// 13
// Inside
// 15
// Inside
// 17
// Inside
// 19
// Inside
// 21
// Inside
// 23
// Inside
// 25
// Inside
// 27
// Inside
// 29
// Inside
// 31
// End
// 33
// 35
// 37
// ...
```

## :memo: Documentation


### `BreakpointObj(input)`
Creates a breakpoint object instance.

#### Params
- **Object** `input`: An object containing the following fields:
  - `min` (Number): The min value to be caught (default: `-Infinity`).
  - `max` (Number): The max value to be caught (default: `+Infinity`).
  - `start` (Function): The start handler (optional).
  - `inside` (Function): The inside handler (optional).
  - `end` (Function): The end handler (optional).
  - `event` (String): The event to be emitted when the value is in the specific range.

#### Return
- **BreakpointObj** The `BreakpointObj` instance containing the following fields:
  - `min` (Number): The min value to be caught (default: `-Infinity`).
  - `max` (Number): The max value to be caught (default: `+Infinity`).
  - `handlers` (Object):

     - `start` (Function): The start handler (optional).
     - `inside` (Function): The inside handler (optional).
     - `end` (Function): The end handler (optional).

  - `started` (Boolean): `true`, if the value reached the min number, `false` otherwise.
  - `ended` (Boolean): `true`, if the value reached the max number, `false` otherwise.
  - `event` (String): The event to be emitted when the value is in the specific range.
  - `_` (Object): The original input object.

### `check(val)`

#### Params
- **Number** `val`: The value to be checked.

#### Return
- **Object** An object containing the following fields:
 - `handlers` (Array): The array of functions to call.
 - `isInside` (Boolean): `true`, if the value is in the specified range.
 - `wasInside` (Boolean): `true`, if the value was in the specified range one step before.

### `ValueBreakpoints(brks)`
Run specific stuff when value reaches a specific range.

#### Params
- **Array** `brks`: An array of breakpoint objects.

#### Return
- **ValueBreakpoints** The `ValueBreakpoints` extended from `EventEmitter`.

### `stop()`
Stops all the intervals.

#### Return
- **ValueBreakpoints** The current `ValueBreakpoints` instance.

### `add(brk)`
Adds one or more breakpoints.

#### Params
- **Object** `brk`: The breakpoint object or an array of breakpoints.

#### Return
- **ValueBreakpoints** The current `ValueBreakpoints` instance.

### `check(fn, interval)`

#### Params
- **Function|Number** `fn`: The function to be called when checking the value automatically. Manual checking is possible by passing a number.
- **Number** `interval`: The interval duration.

#### Return
- **ValueBreakpoints** The current `ValueBreakpoints` instance (if a number was passed), or an object:
 - `stop` (Function): If called, it will stop the checking.
 - `fn` (Function): The function checking the value.



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].


## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2016#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
