"use strict";

const deffy = require("deffy")
    , EventEmitter = require("events").EventEmitter
    , fnResult = require("fn-result")
    ;

class BreakpointObj {
    /**
     * BreakpointObj
     * Creates a breakpoint object instance.
     *
     * @name BreakpointObj
     * @function
     * @param {Object} input An object containing the following fields:
     *
     *   - `min` (Number): The min value to be caught (default: `-Infinity`).
     *   - `max` (Number): The max value to be caught (default: `+Infinity`).
     *   - `start` (Function): The start handler (optional).
     *   - `inside` (Function): The inside handler (optional).
     *   - `end` (Function): The end handler (optional).
     *   - `event` (String): The event to be emitted when the value is in the specific range.
     *
     * @returns {BreakpointObj} The `BreakpointObj` instance containing the following fields:
     *
     *   - `min` (Number): The min value to be caught (default: `-Infinity`).
     *   - `max` (Number): The max value to be caught (default: `+Infinity`).
     *   - `handlers` (Object):
     *
     *      - `start` (Function): The start handler (optional).
     *      - `inside` (Function): The inside handler (optional).
     *      - `end` (Function): The end handler (optional).
     *
     *   - `started` (Boolean): `true`, if the value reached the min number, `false` otherwise.
     *   - `ended` (Boolean): `true`, if the value reached the max number, `false` otherwise.
     *   - `event` (String): The event to be emitted when the value is in the specific range.
     *
     */
    constructor (input) {
        this.min = deffy(input.min, -Infinity);
        this.max = deffy(input.max, Infinity);

        this.handlers = {
            start: input.start
          , inside: input.inside
          , end: input.end
        };

        this.started = false;
        this.ended = false;

        this.event = input.event;
    }

    /**
     * check
     *
     * @name check
     * @function
     * @param {Number} val The value to be checked.
     * @returns {Object} An object containing the following fields:
     *
     *  - `handlers` (Array): The array of functions to call.
     *  - `isInside` (Boolean): `true`, if the value is in the specified range.
     *  - `wasInside` (Boolean): `true`, if the value was in the specified range one step before.
     *
     */
    check (val) {
        let handlers = [];

        let isInside = this.min <= val && val < this.max;
        let wasInside = this.wasInside;

        if (this.handlers.start && isInside && !this.started) {
            handlers.push(this.handlers.start);
            this.started = true;
        }

        if (this.handlers.inside && isInside) {
            handlers.push(this.handlers.inside);
        }

        if (this.handlers.end && wasInside && val > this.max && !this.ended) {
            handlers.push(this.handlers.end);
            this.ended = true;
        }

        this.wasInside = isInside;

        return {
            handlers: handlers
          , isInside: isInside
          , wasInside: wasInside
        };
    }
}

class ValueBreakpoints extends EventEmitter {

    /**
     * ValueBreakpoints
     * Run specific stuff when value reaches a specific range.
     *
     * @name ValueBreakpoints
     * @function
     * @param {Array} brks An array of breakpoint objects.
     * @returns {ValueBreakpoints} The `ValueBreakpoints` extended from `EventEmitter`.
     */
    constructor (brks) {
        super();
        this.brks = [];
        this.add(brks);
        this._intervals = [];
    }

    /**
     * stop
     * Stops all the intervals.
     *
     * @name stop
     * @function
     * @returns {ValueBreakpoints} The current `ValueBreakpoints` instance.
     */
    stop () {
        this._intervals.forEach(c => c.stop());
    }

    /**
     * add
     * Adds one or more breakpoints.
     *
     * @name add
     * @function
     * @param {Object} brk The breakpoint object or an array of breakpoints.
     * @returns {ValueBreakpoints} The current `ValueBreakpoints` instance.
     */
    add (brk) {
        if (Array.isArray(brk)) {
            brk.forEach(c => this.add(c));
        } else {
            this.brks.push(new BreakpointObj(brk));
        }
        return this;
    }

    /**
     * check
     *
     * @name check
     * @function
     * @param {Function|Number} fn The function to be called when checking the value automatically. Manual checking is possible by passing a number.
     * @param {Number} interval The interval duration.
     * @returns {ValueBreakpoints} The current `ValueBreakpoints` instance (if a number was passed), or an object:
     *
     *  - `stop` (Function): If called, it will stop the checking.
     *  - `fn` (Function): The function checking the value.
     */
    check (fn, interval) {
        if (typeof fn !== "function") {
            this.brks.forEach(c => {
                let res = c.check(fn);
                res.isInside && c.event && this.emit(c.event, c, fn, res);
                res.handlers.forEach(cFn => cFn(c, fn, res));
            });
            return this;
        } else {
            interval = deffy(interval, 1000);

            let res = {
                stop () {
                    this.stopped = true;
                }
              , fn: () => {
                    if (res.stopped) { return; }
                    fnResult(fn, (err, val) => {
                        if (err) { return this.emit("error", err); }
                        this.check(val);
                        setTimeout(res.fn, interval);
                    });
                }
            };
            res.fn();
            this._intervals.push(res);

            return res;
        }
    }
}

module.exports = ValueBreakpoints;
