var grid = document.querySelector('.grid');
var pager = document.querySelector('.pages');
var children = Array.from(grid.children);
var perPage = 16;
var pageCount = Math.ceil(children.length / perPage);

var viewer = document.getElementById('viewer');
var big = viewer.querySelector('img');
var caption = viewer.querySelector('.caption');
var versions = viewer.querySelector('.versions');

var items = [];   // photos on the current page
var pos = 0;      // which photo
var ver = 0;      // which version of it


// pages

for (var p = 1; p <= pageCount; p++) {
  var b = document.createElement('button');
  b.textContent = p;
  b.onclick = (function (p) {
    return function () {
      location.hash = p;
      scrollTo(0, 0);
    };
  })(p);
  pager.appendChild(b);
}

function showPage() {
  var p = parseInt(location.hash.slice(1)) || 1;
  if (p < 1 || p > pageCount) p = 1;

  children.forEach(function (el, i) {
    el.hidden = Math.floor(i / perPage) != p - 1;
  });
  pager.querySelectorAll('button').forEach(function (b, i) {
    b.classList.toggle('on', i == p - 1);
  });
}

showPage();
window.addEventListener('hashchange', showPage);


// viewer

// each grid item is a list of links: one for a single photo, several for a set
function linksOf(el) {
  return el.tagName == 'A' ? [el] : Array.from(el.querySelectorAll('a'));
}

children.forEach(function (el) {
  linksOf(el)[0].addEventListener('click', function (e) {
    e.preventDefault();
    var visible = children.filter(function (c) { return !c.hidden; });
    items = visible.map(linksOf);
    open(visible.indexOf(el));
  });
});

function open(i) {
  pos = (i + items.length) % items.length;
  ver = 0;
  versions.innerHTML = '';

  var links = items[pos];
  if (links.length > 1) {
    links.forEach(function (a, n) {
      var b = document.createElement('button');
      b.textContent = a.dataset.label || n + 1;
      b.onclick = function () { show(n); };
      versions.appendChild(b);
    });
  }

  show(0);
  viewer.hidden = false;
  document.body.style.overflow = 'hidden';
}

function show(n) {
  var a = items[pos][n];
  ver = n;
  big.src = a.href;
  big.alt = items[pos][0].querySelector('img').alt;
  caption.textContent = (pos + 1) + ' / ' + items.length;

  versions.querySelectorAll('button').forEach(function (b, k) {
    b.classList.toggle('on', k == n);
  });
}

function close() {
  viewer.hidden = true;
  big.removeAttribute('src');
  document.body.style.overflow = '';
}

viewer.querySelector('.prev').onclick = function () { open(pos - 1); };
viewer.querySelector('.next').onclick = function () { open(pos + 1); };
viewer.querySelector('.close').onclick = close;
big.onclick = function () { open(pos + 1); };

document.addEventListener('keydown', function (e) {
  if (viewer.hidden) return;
  var count = items[pos].length;

  if (e.key == 'Escape') close();
  else if (e.key == 'ArrowRight') open(pos + 1);
  else if (e.key == 'ArrowLeft') open(pos - 1);
  else if (e.key == 'ArrowDown' && count > 1) show((ver + 1) % count);
  else if (e.key == 'ArrowUp' && count > 1) show((ver - 1 + count) % count);
});
