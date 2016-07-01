"use strict";

const deffy = require("deffy")
    , EventEmitter = require("events").EventEmitter
    , fnResult = require("fn-result")
    ;

/**
 * valueBreakpoints
 * Run specific stuff when value reaches a specific range.
 *
 * @name valueBreakpoints
 * @function
 * @param {Number} a Param descrpition.
 * @param {Number} b Param descrpition.
 * @return {Number} Return description.
 */

class BreakpointObj {
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
        this.prevValue = -Infinity;
    }
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

    constructor (brks, opts) {
        super();
        this.brks = [];
        if (!Array.isArray(brks)) {
            opts = brks;
        } else {
            this.add(brks);
        }
    }

    add (brk) {
        if (Array.isArray(brk)) {
            brk.forEach(c => this.add(c));
        } else {
            this.brks.push(new BreakpointObj(brk));
        }
        return this;
    }

    check (fn, interval) {
        if (typeof fn !== "function") {
            this.brks.forEach(c => {
                let res = c.check(fn);
                res.isInside && c.event && this.emit(c.event, c, fn);
                res.handlers.forEach(cFn => cFn(c, fn));
            });
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

            return res;
        }
    }
}

module.exports = ValueBreakpoints;
