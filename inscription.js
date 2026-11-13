var CLE = "inscription";

function lireDonnees() {
  try {
    return JSON.parse(sessionStorage.getItem(CLE)) || {};
  } catch (e) {
    return {};
  }
}

function sauvegarder(formulaire) {
  var donnees = lireDonnees();
  var elements = formulaire.elements;

  for (var i = 0; i < elements.length; i++) {
    var el = elements[i];
    if (!el.name) {
      continue;
    }
    if (el.type === "radio") {
      if (el.checked) {
        donnees[el.name] = el.value;
      }
    } else if (el.type === "checkbox") {
      donnees[el.name] = el.checked;
    } else {
      donnees[el.name] = el.value;
    }
  }

  try {
    sessionStorage.setItem(CLE, JSON.stringify(donnees));
  } catch (e) {}
}

function restaurer(formulaire) {
  var donnees = lireDonnees();
  var elements = formulaire.elements;

  for (var i = 0; i < elements.length; i++) {
    var el = elements[i];
    if (!el.name || donnees[el.name] === undefined) {
      continue;
    }
    if (el.type === "radio") {
      el.checked = (el.value === donnees[el.name]);
    } else if (el.type === "checkbox") {
      el.checked = (donnees[el.name] === true);
    } else {
      el.value = donnees[el.name];
    }
  }
}

function suivant(formulaire, page) {
  sauvegarder(formulaire);
  window.location.href = page;
}