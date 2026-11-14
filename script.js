(function () {
  var photos = document.querySelectorAll(".carrousel-photo");
  var zonePoints = document.querySelector(".carrousel-points");
  var precedent = document.getElementById("photo-precedente");
  var suivante = document.getElementById("photo-suivante");
  var boutonPause = document.getElementById("carrousel-pause");

  if (!photos.length) {
    return;
  }

  var DELAI = 5000;
  var index = 0;
  var minuteur = null;
  var enPause = false;
  var points = [];

  function afficher(numero) {
    index = (numero + photos.length) % photos.length;
    for (var i = 0; i < photos.length; i++) {
      if (i === index) {
        photos[i].classList.add("active");
        points[i].classList.add("actif");
      } else {
        photos[i].classList.remove("active");
        points[i].classList.remove("actif");
      }
    }
  }

  function arreter() {
    if (minuteur) {
      clearInterval(minuteur);
      minuteur = null;
    }
  }

  function demarrer() {
    arreter();
    if (!enPause) {
      minuteur = setInterval(function () {
        afficher(index + 1);
      }, DELAI);
    }
  }

  function aller(numero) {
    afficher(numero);
    demarrer();
  }

  for (var i = 0; i < photos.length; i++) {
    (function (n) {
      var point = document.createElement("button");
      point.type = "button";
      point.className = "point";
      point.setAttribute("aria-label", "Photo " + (n + 1));
      point.addEventListener("click", function () {
        aller(n);
      });
      zonePoints.appendChild(point);
      points.push(point);
    })(i);
  }

  precedent.addEventListener("click", function () {
    aller(index - 1);
  });

  suivante.addEventListener("click", function () {
    aller(index + 1);
  });

  boutonPause.addEventListener("click", function () {
    enPause = !enPause;
    boutonPause.textContent = enPause ? "Lecture" : "Pause";
    boutonPause.setAttribute(
      "aria-label",
      enPause ? "Relancer le diaporama" : "Mettre le diaporama en pause"
    );
    demarrer();
  });

  afficher(0);
  demarrer();
})();