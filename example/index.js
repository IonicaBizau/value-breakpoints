"use strict";

const ValueBreakpoints = require("../lib");

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
