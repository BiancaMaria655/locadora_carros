function verifyIfCarIsAvaliable() {
  var lista = document.getElementById('listaCarros');
  console.log(lista);
  try {
    for (var i = 0; i != null; i++) {
      var info = lista.children[i].querySelector('');
    }
  } catch (err) {
    console.log(err);
  }
}

verifyIfCarIsAvaliable();
