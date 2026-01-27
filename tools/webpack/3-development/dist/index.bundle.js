(self["webpackChunkoutput_management"] = self["webpackChunkoutput_management"] || []).push([["index"],{

/***/ "./node_modules/lodash/join.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/join.js ***!
  \*************************************/
/***/ ((module) => {

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeJoin = arrayProto.join;

/**
 * Converts all elements in `array` into a string separated by `separator`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to convert.
 * @param {string} [separator=','] The element separator.
 * @returns {string} Returns the joined string.
 * @example
 *
 * _.join(['a', 'b', 'c'], '~');
 * // => 'a~b~c'
 */
function join(array, separator) {
  return array == null ? '' : nativeJoin.call(array, separator);
}

module.exports = join;


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_join__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/join */ "./node_modules/lodash/join.js");
/* harmony import */ var lodash_join__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_join__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _print_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./print.js */ "./src/print.js");



function component() {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  element.innerHTML = lodash_join__WEBPACK_IMPORTED_MODULE_0___default()(['Hello', 'webpack'], ' ');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = _print_js__WEBPACK_IMPORTED_MODULE_1__["default"];

  element.appendChild(btn);

  return element;
}
document.body.appendChild(component());


/***/ }),

/***/ "./src/print.js":
/*!**********************!*\
  !*** ./src/print.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ printMe)
/* harmony export */ });
function printMe() {
  console.log('I get called from print.js!');
}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsUUFBUTtBQUNuQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3pCK0I7QUFDRTs7QUFFakM7QUFDQTtBQUNBOztBQUVBLHNCQUFzQixrREFBSTs7QUFFMUI7QUFDQSxnQkFBZ0IsaURBQU87O0FBRXZCOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2hCZTtBQUNmO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vdXRwdXQtbWFuYWdlbWVudC8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvam9pbi5qcyIsIndlYnBhY2s6Ly9vdXRwdXQtbWFuYWdlbWVudC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9vdXRwdXQtbWFuYWdlbWVudC8uL3NyYy9wcmludC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgYXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUpvaW4gPSBhcnJheVByb3RvLmpvaW47XG5cbi8qKlxuICogQ29udmVydHMgYWxsIGVsZW1lbnRzIGluIGBhcnJheWAgaW50byBhIHN0cmluZyBzZXBhcmF0ZWQgYnkgYHNlcGFyYXRvcmAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IEFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gY29udmVydC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbc2VwYXJhdG9yPScsJ10gVGhlIGVsZW1lbnQgc2VwYXJhdG9yLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgam9pbmVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5qb2luKFsnYScsICdiJywgJ2MnXSwgJ34nKTtcbiAqIC8vID0+ICdhfmJ+YydcbiAqL1xuZnVuY3Rpb24gam9pbihhcnJheSwgc2VwYXJhdG9yKSB7XG4gIHJldHVybiBhcnJheSA9PSBudWxsID8gJycgOiBuYXRpdmVKb2luLmNhbGwoYXJyYXksIHNlcGFyYXRvcik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gam9pbjtcbiIsImltcG9ydCBqb2luIGZyb20gJ2xvZGFzaC9qb2luJztcbmltcG9ydCBwcmludE1lIGZyb20gJy4vcHJpbnQuanMnO1xuXG5mdW5jdGlvbiBjb21wb25lbnQoKSB7XG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cbiAgZWxlbWVudC5pbm5lckhUTUwgPSBqb2luKFsnSGVsbG8nLCAnd2VicGFjayddLCAnICcpO1xuXG4gIGJ0bi5pbm5lckhUTUwgPSAnQ2xpY2sgbWUgYW5kIGNoZWNrIHRoZSBjb25zb2xlISc7XG4gIGJ0bi5vbmNsaWNrID0gcHJpbnRNZTtcblxuICBlbGVtZW50LmFwcGVuZENoaWxkKGJ0bik7XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbXBvbmVudCgpKTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByaW50TWUoKSB7XG4gIGNvbnNvbGUubG9nKCdJIGdldCBjYWxsZWQgZnJvbSBwcmludC5qcyEnKTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==