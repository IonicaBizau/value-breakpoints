
# value-breakpoints

 [![Support me on Patreon][badge_patreon]][patreon] [![Buy me a book][badge_amazon]][amazon] [![PayPal][badge_paypal_donate]][paypal-donations] [![Version](https://img.shields.io/npm/v/value-breakpoints.svg)](https://www.npmjs.com/package/value-breakpoints) [![Downloads](https://img.shields.io/npm/dt/value-breakpoints.svg)](https://www.npmjs.com/package/value-breakpoints)

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

## :question: Get Help

There are few ways to get help:

 1. Please [post questions on Stack Overflow](https://stackoverflow.com/questions/ask). You can open issues with questions, as long you add a link to your Stack Overflow question.
 2. For bug reports and feature requests, open issues. :bug:
 3. For direct and quick help from me, you can [use Codementor](https://www.codementor.io/johnnyb). :rocket:


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


## :sparkling_heart: Support my projects

I open-source almost everything I can, and I try to reply everyone needing help using these projects. Obviously,
this takes time. You can integrate and use these projects in your applications *for free*! You can even change the source code and redistribute (even resell it).

However, if you get some profit from this or just want to encourage me to continue creating stuff, there are few ways you can do it:

 - Starring and sharing the projects you like :rocket:
 - [![PayPal][badge_paypal]][paypal-donations]—You can make one-time donations via PayPal. I'll probably buy a ~~coffee~~ tea. :tea:
 - [![Support me on Patreon][badge_patreon]][patreon]—Set up a recurring monthly donation and you will get interesting news about what I'm doing (things that I don't share with everyone).
 - **Bitcoin**—You can send me bitcoins at this address (or scanning the code below): `1P9BRsmazNQcuyTxEqveUsnf5CERdq35V6`

    ![](https://i.imgur.com/z6OQI95.png)

Thanks! :heart:



## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[badge_patreon]: http://ionicabizau.github.io/badges/patreon.svg
[badge_amazon]: http://ionicabizau.github.io/badges/amazon.svg
[badge_paypal]: http://ionicabizau.github.io/badges/paypal.svg
[badge_paypal_donate]: http://ionicabizau.github.io/badges/paypal_donate.svg
[patreon]: https://www.patreon.com/ionicabizau
[amazon]: http://amzn.eu/hRo9sIZ
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(https%3A%2F%2Fionicabizau.net)&year=2016#license-mit
[website]: https://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
