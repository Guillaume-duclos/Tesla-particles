/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //Unitialize variables

var _particle = __webpack_require__(1);

var _particle2 = _interopRequireDefault(_particle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

//Web Audio API
var ctxAudio = new (window.AudioContext || window.webkitAudioContext)();
var osc = ctxAudio.createOscillator();
osc.type = 'sine';
osc.frequency.value = 200;
osc.start();

var connect = false;

if (connect == true) {
  osc.connect(ctxAudio.destination);
}

var minDist = 100;
var dist;

var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

var mainCircle;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var Particle = function () {
  function Particle(x, y, radius, dx, dy) {
    _classCallCheck(this, Particle);

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.speedX = this.dx;
    this.speedY = this.dy;

    var angleX = 0;
    var angleY = 0;
  }

  _createClass(Particle, [{
    key: 'draw',
    value: function draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = '#f66397';
      ctx.fill();
      calcul();
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        var sign = this.x < 0 ? 1 : -1;
        this.angleX = Math.random() * 2 * sign;
        this.speedX = -this.speedX;
      }

      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        var _sign = this.y < 0 ? 1 : -1;
        this.angleY = Math.random() * 2 * _sign;
        this.speedY = -this.speedY;
      }

      //this.x += this.speedX + this.angleX;
      //this.y += this.speedY + this.angleY;

      this.x += this.speedX;
      this.y += this.speedY;

      this.draw();
    }
  }]);

  return Particle;
}();

;

//Mouse event

addEventListener('mousemove', function (evt) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener('resize', function (evt) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

//Create Particle

var particleArray = [];

for (var i = 0; i < 60; i++) {
  var x = Math.random() * canvas.width;
  var y = Math.random() * canvas.height;
  var radius = 6;
  var dx = (Math.random() - 0.5) * 3;
  var dy = (Math.random() - 0.5) * 3;

  particleArray.push(new Particle(x, y, radius, dx, dy));
}

function init() {
  mainCircle = new Particle(mouse.x, mouse.y, 15, .2, .2);
  particleArray.push(mainCircle);
}

function calcul() {
  for (var i = 0; i < particleArray.length; i++) {
    var p = particleArray[i];

    for (var j = i + 1; j < particleArray.length; j++) {
      var p2 = particleArray[j];
      distance(p, p2);
    }
  }
}

// Distance calculator between two particles
function distance(p, p2) {

  var dist,
      vx = p.x - p2.x,
      vy = p.y - p2.y;

  dist = Math.sqrt(vx * vx + vy * vy);

  if (dist <= minDist) {
    ctx.beginPath();
    ctx.strokeStyle = "rgba(131,137,255," + (1.2 - dist / minDist) + ")";
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
    ctx.closePath();
    connect = true;
  }
}

//Function animate

var animate = function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
  }

  mainCircle.x = mouse.x;
  mainCircle.y = mouse.y;
  mainCircle.update();
};

init();
animate();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var particle = function () {
  function particle(x, y, radius, dx, dy, ctx) {
    _classCallCheck(this, particle);

    this.x = x;
    this.y = y;
    this.radius = 3;
    this.dx = dx;
    this.dy = dy;
    this.speedX = this.dx;
    this.speedY = this.dy;
    this.ctx = ctx;

    var angleX = 0;
    var angleY = 0;
  }

  _createClass(particle, [{
    key: 'draw',
    value: function draw(ctx) {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      this.ctx.fillStyle = '#ffffff';
      this.ctx.fill();
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        var sign = this.x < 0 ? 1 : -1;
        this.angleX = Math.random() * 2 * sign;
        this.speedX = -this.speedX;
      }

      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        var _sign = this.y < 0 ? 1 : -1;
        this.angleY = Math.random() * 2 * _sign;
        this.speedY = -this.speedY;
      }

      //this.x += this.speedX + this.angleX;
      //this.y += this.speedY + this.angleY;

      this.x += this.speedX;
      this.y += this.speedY;

      this.draw();
    }
  }]);

  return particle;
}();

;

exports.default = particle;

/***/ })
/******/ ]);