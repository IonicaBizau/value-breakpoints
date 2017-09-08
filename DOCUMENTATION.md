## Documentation

You can see below the API reference of this module.

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

