class particle {
  constructor(x, y, radius, dx, dy, ctx) {
    this.x = x;
    this.y = y;
    this.radius = 3;
    this.dx = dx;
    this.dy = dy;
    this.speedX = this.dx;
    this.speedY = this.dy;
    this.ctx = ctx;

    let angleX = 0;
    let angleY = 0;
  }

  draw(ctx) {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fill();
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

export default particle;
