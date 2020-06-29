"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function isComponent(t) {
  return typeof t === 'function';
}

var DefaultWrap = function DefaultWrap(props) {
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "modal-x-wrap"
  });
};

var store = {
  ready: false,
  update: function update() {
    throw Error('modal-x store is not ready');
  }
};

var ModalXRoot = function ModalXRoot(props) {
  var mapping = props.mapping;

  var _useState = (0, _react.useState)(function () {
    return Object.keys(mapping).reduce(function (acc, k) {
      acc[k] = {
        show: false
      };
      return acc;
    }, {});
  }),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  var onClose = (0, _react.useCallback)(function (key) {
    setData(function (data) {
      return _objectSpread(_objectSpread({}, data), {}, _defineProperty({}, key, {
        show: false
      }));
    });
  }, []);
  (0, _react.useEffect)(function () {
    if (!store.ready) {
      store.ready = true;
      store.update = setData;
      Object.freeze(store);
    }
  }, []);
  return Object.keys(mapping).map(function (k) {
    var modalItem = mapping[k];
    var modalOnClose = onClose.bind(null, k);
    var isModalAComp = isComponent(modalItem);
    var Wrap = isModalAComp ? props.wrap : modalItem.wrap || props.wrap;
    var ModalComp = isModalAComp ? modalItem : modalItem.component;
    return data[k] && data[k].show ? /*#__PURE__*/_react["default"].createElement(Wrap, {
      key: k,
      onClose: modalOnClose
    }, /*#__PURE__*/_react["default"].createElement(ModalComp, _extends({}, data[k], {
      onClose: modalOnClose
    }))) : null;
  });
};

ModalXRoot.defaultProps = {
  wrap: DefaultWrap,
  mapping: {}
};

function init(props) {
  var $root = document.createElement('div');
  $root.setAttribute('data-modal', true);
  document.body.appendChild($root);

  _reactDom["default"].render( /*#__PURE__*/_react["default"].createElement(ModalXRoot, props), $root);
}

var modalX = function modalX() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      wrap = _ref.wrap,
      mapping = _ref.mapping;

  init({
    wrap: wrap,
    mapping: mapping
  });
  return {
    open: function open(key, extra) {
      store.update(function (data) {
        return _objectSpread(_objectSpread({}, data), {}, _defineProperty({}, key, _objectSpread({
          show: true
        }, extra)));
      });
    },
    close: function close(key) {
      store.update(function (data) {
        return _objectSpread(_objectSpread({}, data), {}, _defineProperty({}, key, {
          show: false
        }));
      });
    }
  };
};

var _default = modalX;
exports["default"] = _default;
