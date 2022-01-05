document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    $(".load-wrap").fadeOut(700);
    gsap.from(".home-title", {
      duration: 1.5,
      x: "-20px",
      opacity: 0,
    })
    gsap.from(".image-con", {
      duration: 1.5,
      x: "40px",
      opacity: 0,
    })
    gsap.from(".nav-items > li, .nav-items div", {
      duration: .91,
      x: "40px",
      opacity: 0,
      stagger: .2
    })
    gsap.from(".logo", {
      duration: 1,
      x: "-40px",
      opacity: 0,
    })
  },800);
});

const nav_li1 = document.querySelector(".item1");
const nav_li2 = document.querySelector(".item2");
const body = document.querySelector("body");
const card_data = document.querySelectorAll(".feature-item");
const toggler = document.querySelector("#toggle-svg-container")

const pairSvgTl = gsap.timeline()

// caching theme
if (localStorage.getItem("theme") != null) {
  if (localStorage.getItem("theme") === "dark") {
    body.className = "dark"
    togglerAnimate("light")
  } else {
    body.className = "light"
    togglerAnimate("dark")
  }
  
}else {
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if(userPrefersDark){
      toggler.classList.add("dark")
      toggler.classList.remove("light")
      body.className = "dark";
      localStorage.setItem("theme", "dark")
      togglerAnimate("light")
    }else {
      body.className = "light";
      localStorage.setItem("theme", "light")
      togglerAnimate("dark")
    }
}

//toggler
toggler.addEventListener("click", ()=> {
  if (toggler.classList.contains("dark")) {
    togglerAnimate("dark")
  }else {
    togglerAnimate("light")
  }
});


function togglerAnimate(run) {
  if (run === "dark"){
    gsap.to("#sun-toggle", .5, {x: "-15", opacity: 0, ease: Power1.easeInOut});
    gsap.to("#cloud", .5, {opacity: 0, ease: Power1.easeInOut});
    gsap.to("#moon-toggle", .5, {x: "-15", rotate: -360, transformOrigin: "center", opacity: 1, ease: Power1.easeInOut});
    gsap.to(".stars", .5, {opacity: 1, ease: Power1.easeInOut});
    gsap.to("#background", .5, {fill: "#224f6d", stroke: "#cad4d8", ease: Power1.easeInOut});
    toggler.classList.add("light")
    toggler.classList.remove("dark")
    body.className = "light"
    toDaysvg()
    cacheTheme(body.className)
  }
  else {
    gsap.to("#sun-toggle", .5, {x: 0, opacity: 1, ease: Power1.easeInOut});
    gsap.to("#cloud", 1, {opacity: 1, ease: Power1.easeInOut});
    gsap.to("#moon-toggle", .5, {opacity: 0, x: 0, rotate: 360, transformOrigin: "center", ease: Power1.easeInOut});
    gsap.to(".stars", 1, {opacity: 0, ease: Power1.easeInOut});
    gsap.to("#background", .5, {fill: "#9CD6EF", stroke: "#65c0e7", ease: Power1.easeInOut});
    toggler.classList.add("dark")
    toggler.classList.remove("light")
    body.className = "dark"
    toNightsvg()
    cacheTheme(body.className)
  }
}

function cacheTheme(theme) {
  if (theme === "dark") {
    localStorage.setItem("theme", "dark")
  }else {
    localStorage.setItem("theme", "light")
  }
}

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

// home svg 
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


// --------------------------------------footer animation 
  
gsap.fromTo(
  '.sun-light',
  2.5,
  {
    scale: 0.9,
    transformOrigin: 'center center',
  },
  {
    scale: 1.1,
    repeat: -1,
    yoyo: true,
    ease: Power1.easeInOut,
  }
);
const zeppelinAnimationTime = 4.47;
gsap.to(
  '#zeppelin',
  zeppelinAnimationTime,
  {
    yPercent: 20,
    repeat: -1,
    yoyo: true,
    ease: Back.easeInOut.config(5),
  }
);
gsap.to(
  '#tracks',
  zeppelinAnimationTime,
  {
    y: -5,
    repeat: -1,
    yoyo: true,
    ease: Back.easeInOut.config(3),
  }
);
[...document.querySelectorAll('.track')].map((track, i) => {
  const trackLength = track.getTotalLength();

  gsap.set(track, {
    'stroke-dasharray': trackLength,
  });
  gsap.fromTo(
    track,
    zeppelinAnimationTime / 5,
    {
      'stroke-dashoffset': trackLength * .7,
    },
    {
      'stroke-dashoffset': 0,
      delay: i * zeppelinAnimationTime / 8,
      repeat: -1,
      yoyo: true,
      ease: Power1.easeInOut,
    }
  );
});


const backClouds = document.getElementById('clouds-back')
const backCloudsWidth = 3716; 
gsap.fromTo(
  backClouds,
  17.43,
  {
    x: -backCloudsWidth / 2,
  },
  {
    x: 0,
    repeat: -1,
    ease: Power0.easeNone,
  },
)

const copyEmail = document.getElementById('email-address');
copyEmail.addEventListener('click', () => {
  navigator.clipboard.writeText(copyEmail.textContent);
  copyEmail.classList.add("copied")

  copyEmail.addEventListener("mouseleave", () => {
    copyEmail.addEventListener("transitionend", ()=> {
      copyEmail.classList.remove("copied")
    })
  })
})

// // nighit svg footer
if (localStorage.getItem("theme") === "dark"){
  toNightsvg()
}else {
  toDaysvg()
}

function toNightsvg() {
  gsap.to(".footer-background-svg", { fill: 'url("#linearGradient-2")'})
  gsap.to(".sun-light", {fill: "#a2b5bf"})
  gsap.to(".sun-core", {fill: "#a2b5bf"})
  gsap.to("#clouds-back", {fill: "#999997", opacity: .2})
}

function toDaysvg() {
  gsap.to(".footer-background-svg", { fill: 'url("#linearGradient-1")'})
  gsap.to(".sun-light", {fill: "#FFFF66"})
  gsap.to(".sun-core", {fill: "#FFFF66"})
  gsap.to("#clouds-back", {fill: "#FFFF66", opacity: 1})
}