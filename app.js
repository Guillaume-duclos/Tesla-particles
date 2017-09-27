  //Unitialize variables

  import particle from './particle';

  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');

  //Web Audio API
  const ctxAudio = new(window.AudioContext || window.webkitAudioContext)()
  const osc = ctxAudio.createOscillator();
  osc.type = 'sine';
  osc.frequency.value = 200;
  osc.start();

  var connect = false;

  if(connect == true) {
    osc.connect(ctxAudio.destination);
  }

  var minDist = 100;
	var dist;

  let mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
  }

  var mainCircle;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  class Particle {
    constructor(x, y, radius, dx, dy) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.dx = dx;
      this.dy = dy;
      this.speedX = this.dx;
      this.speedY = this.dy;

      let angleX = 0;
      let angleY = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = '#f66397';
      ctx.fill();
      calcul();
    }

    update() {
      if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        let sign = this.x < 0 ? 1 : -1;
        this.angleX = Math.random() * 2 * sign;
        this.speedX = -this.speedX;
      }

      if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        let sign = this.y < 0 ? 1 : -1;
        this.angleY = Math.random() * 2 * sign;
        this.speedY = -this.speedY;
      }

      //this.x += this.speedX + this.angleX;
      //this.y += this.speedY + this.angleY;

      this.x += this.speedX;
      this.y += this.speedY;

      this.draw();
    }

  };

  //Mouse event

  addEventListener('mousemove', function(evt) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  });

  addEventListener('resize', function(evt) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  });

  //Create Particle

  var particleArray = [];

  for(var i = 0; i < 60; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let radius = 6;
    let dx = (Math.random() - 0.5) * 3;
    let dy = (Math.random() - 0.5) * 3;

    particleArray.push(new Particle(x, y, radius, dx, dy));
  }

  function init() {
    mainCircle = new Particle(mouse.x, mouse.y, 15, .2, .2);
    particleArray.push(mainCircle);
  }

  function calcul() {
    for (var i = 0; i < particleArray.length; i++) {
      var p = particleArray[i];

      for(var j = i + 1; j < particleArray.length; j++) {
        var p2 = particleArray[j];
        distance(p, p2);
      }
    }
  }

  // Distance calculator between two particles
  function distance(p, p2) {

    var dist,
      vx = p.x - p2.x,
      vy = p.y - p2.y

    dist = Math.sqrt(vx * vx + vy * vy);

    if(dist <= minDist ) {
      ctx.beginPath();
      ctx.strokeStyle = "rgba(131,137,255,"+ (1.2-dist/minDist) +")";
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
      ctx.closePath();
      connect = true;
    }
  }

  //Function animate

  const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(var i = 0; i < particleArray.length; i++) {
      particleArray[i].update();
    }

    mainCircle.x = mouse.x;
    mainCircle.y = mouse.y;
    mainCircle.update();
  };

  init();
  animate();
