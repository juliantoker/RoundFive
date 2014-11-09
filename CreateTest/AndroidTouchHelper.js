/*
 * AndroidTouchHelper
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2010 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * This helper class stops mouse events from being called too often, which patches an issue in older versions of the
 * Android Browser application. The browser dispatches two mousedown/mouseup events from Canvas elements. By enabling
 * touch, the first mousedown event is supressed (in favour of touchstart). This helper ensures the Stage does not
 * get mouse input events too quickly, so the second event is ignored.
 *
 * Ensure this helper is included <strong>after</strong> the Stage class, and note that you MUST enable touch for this
 * to be a complete solution:
 *
 *      createjs.Touch.enable(stage);
 *
 * @class AndroidTouchHelper
 */
(function () {

    var stageMouseDownHandler = createjs.Stage.prototype._handlePointerDown;
    var stageMouseUpHandler = createjs.Stage.prototype._handlePointerUp;

    if (navigator.userAgent.indexOf("Android") > -1) {
        Stage.prototype._handlePointerDown = function (id, event, clear) {
            if (typeof event.x != 'undefined') {
                event.screenX = event.x;
                event.screenY = event.y;
                stageMouseDownHandler.call(this, id, event, clear);
            }
        }
        Stage.prototype._handlePointerUp = function (id, event, clear) {
            if (typeof event.x != 'undefined') {
                event.screenX = event.x;
                event.screenY = event.y;
                stageMouseUpHandler.call(this, id, event, clear);
            }
        }
    }

}())