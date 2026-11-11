// only photos that still look sharp blown up to full screen
var photos = [
  'arrangement-2.jpg',
  'ba-3-linear-light.jpg',
  'bh-3-saturation.jpg',
  'big-leaf.jpg',
  'bzs-4-crt.jpg',
  'car-window.jpg',
  'crossbar-fence.jpg',
  'cupid-lizard-1.jpg',
  'divide-1.jpg',
  'exit-print.jpg',
  'exit-shadow-more-editing.jpg',
  'fence-close-up.jpg',
  'fs-1-hard-light.jpg',
  'g-3-hard-light.jpg',
  'grasshopper-1.jpg',
  'grasshopper-2.jpg',
  'grasshopper-and-spider.jpg',
  'gwr-1-exclusion.jpg',
  'horizontal-green-and-pink-leaves.jpg',
  'horizontal-rainflowers.jpg',
  'hot-pink-flowers-signpost.jpg',
  'ii-5-lighten.jpg',
  'lb-1-divide.jpg',
  'lb-double-layer-2.jpg',
  'leaf-house.jpg',
  'leaves-sky-motion-blur.jpg',
  'lll-8-colour-dodge.jpg',
  'ln-1-lighter-colour.jpg',
  'lob-3-linear-light.jpg',
  'm-5-linear-dodge.jpg',
  'magenta-traffic-cone.jpg',
  'maine-flower-streaks.jpg',
  'p6-pin-light.jpg',
  'pin-light-3-fave.jpg',
  'pink-and-green-raindrops.jpg',
  'pink-bush.jpg',
  'pink-coneflowers.jpg',
  'pink-drums.jpg',
  'pink-fence.jpg',
  'pink-lamp.jpg',
  'pink-pipes.jpg',
  'pink-spiderweb-1.jpg',
  'pink-spiderweb-2.jpg',
  'pink-spiderweb-3.jpg',
  'pink-vines.jpg',
  'portrait-1.jpg',
  'portrait-2.jpg',
  'portrait-3.jpg',
  'roses-1.jpg',
  'roses-2.jpg',
  'spider-on-leaf.jpg',
  'ss-4-colour-dodge.jpg',
  'ssd-1-lighter-colour.jpg',
  'sunset-castle.jpg',
  'swirl-house.jpg',
  'tall-green-and-pink-plants.jpg',
  'watering-can.jpg',
  'wild-sky-castle.jpg',
  'zp-2-colour-dodge.jpg'
];

var box = document.querySelector('.slideshow');
var imgs = [new Image(), new Image()];
var front = 0;
var n = 0;

// shuffle so the order is different every visit
for (var i = photos.length - 1; i > 0; i--) {
  var j = Math.floor(Math.random() * (i + 1));
  var t = photos[i]; photos[i] = photos[j]; photos[j] = t;
}

imgs.forEach(function (img) {
  img.alt = '';
  box.appendChild(img);
});

function next() {
  var back = imgs[1 - front];

  back.onload = function () {
    back.classList.add('on');
    imgs[front].classList.remove('on');
    front = 1 - front;
  };
  back.src = 'img/' + photos[n];
  n = (n + 1) % photos.length;
}

next();
setInterval(next, 4000);
