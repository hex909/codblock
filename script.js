const nav_li1 = document.querySelector(".item1");
const nav_li2 = document.querySelector(".item2");
const body = document.querySelector("body");
const card_data = document.querySelectorAll(".feature-item");



// ----------------------loading
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    $(".load-wrap").fadeOut(1000);
    document.querySelector(".wrapper").classList.remove("wrapper");
  }, 500);
});

// home effect
var tl = gsap.timeline();

gsap.from("#white-hand", {
  rotate: "-.5deg",
  duration: 1,
  repeat: "-1",
  yoyo: true,
});
gsap.from("#black-hand", {
  rotate: "10deg",
  duration: 1,
  repeat: "-1",
  yoyo: true,
});
gsap.from("#black-hair , #black-head", {
  rotation: 1,
  duration: 1,
  repeat: "-1",
  yoyo: true,
});
gsap.from("#white-hair , #white-head", {
  rotateZ: "1deg",
  duration: 1,
  repeat: "-1",
  yoyo: true,
});

// monitor text
tl.from("#computer-text *", { opacity: 0, duration: 1, stagger: 0.1 });
tl.to(".errMess *", { fill: "red" }, "-=.5");
tl.to(".errMess *", { fill: "lightgreen" }, "+=1");
tl.to(".errMess *", { onComplete: () => { tl.restart();},},"+=1");


//-------------------hover effect
class HoverCard {
  constructor(el, b, scale= 1.05) {
    this.el = el;
    this.b = b;
    this.scale = scale;
    this.hover = false;
    this.calculatePosition();
    this.attachEventsListener();
  }

  attachEventsListener() {
    window.addEventListener("mousemove", (e) => {
      this.calculatePosition(e);
      this.onMouseMove(e);
    });
    window.addEventListener("resize", (e) => this.calculatePosition(e));
  }

  calculatePosition() {
    gsap.set(this.el, {
      x: 0,
      y: 0,
      scale: 1,
    });
    const box = this.el.getBoundingClientRect();
    this.x = box.left + box.width * 0.5;
    this.y = box.top + box.height * 0.5;
    this.width = box.width;
    this.height = box.height;
  }

  onMouseMove(e) {
    let hover = false;
    let hoverArea = this.hover ? 0.7 : 0.5;
    let x = e.clientX - this.x;
    let y = e.clientY - this.y;
    let distance = Math.sqrt(x * x + y * y);
    if (distance < this.width * hoverArea) {
      hover = true;
      if (!this.hover) {
        this.hover = true;
      }
      this.onHover(e.clientX, e.clientY);
    }

    if (!hover && this.hover) {
      this.onLeave();
      this.hover = false;
    }
  }

  onHover(x, y) {
    gsap.to(this.el, {
      x: (x - this.x) * this.b,
      y: (y - this.y) * this.b,
      scale: this.scale,
      ease: "power2.out",
      duration: 0.4,
    });
    this.el.style.zIndex = 10;
  }
  onLeave() {
    gsap.to(this.el, {
      x: 0,
      y: 0,
      scale: 1,
      ease: "elastic.out(1.2, 0.4)",
      duration: 0.7,
    });
    this.el.style.zIndex = 1;
  }
}


card_data.forEach((e) => {
  new HoverCard(e, .02, 1.02);
});

new HoverCard(nav_li1, 0.2);
new HoverCard(nav_li2, 0.2);

// --------------------------------------------------------------feature scroll
const feature_scroll = document.querySelector(".features-items")
feature_scroll.scrollLeft = 0

let pos = {x:0, left:0}

const mouseDownHandler = function (e) {
  feature_scroll.style.cursor = 'grabbing';
  pos = {
      left: feature_scroll.scrollLeft,
      x: e.clientX,
  };

  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);
};

const mouseMoveHandler = function (e) {
  const dx = e.clientX - pos.x;

  feature_scroll.scrollLeft = pos.left - dx;
};

const mouseUpHandler = function () {
  document.removeEventListener('mousemove', mouseMoveHandler);
  document.removeEventListener('mouseup', mouseUpHandler);

  feature_scroll.style.cursor = 'grab';
};


feature_scroll.addEventListener("mousedown", mouseDownHandler)


// mousewheel scroll slider
// feature_scroll.addEventListener("wheel", (e) => {
//     e.preventDefault();
//     feature_scroll.scrollLeft += e.deltaY + 20;
// });
