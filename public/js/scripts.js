function editFields(list) {
  var el = document.getElementById(list);
  let elId = el.addEventListener('click', function (e) {
    console.log(e.target.id);
    elId = e.target.id;

    var btn = document.getElementById(elId);
    var id = btn.id.slice(4);
    var btnE = document.getElementById('btnE' + id);
    
    var realId = document.getElementById('id'+id)
    var name = document.getElementById('name' + id);
    var email = document.getElementById('email' + id);
    var password = document.getElementById('pass' + id);
    var cpf = document.getElementById('cpf' + id);
    var type = document.getElementById('type' + id);

    var uptadeButton = document.getElementById('updateForm');
    var createButton = document.getElementById('createForm');

    if (btnE.id === elId) {
      var formName = document.getElementById('formName');
      var formEmail = document.getElementById('formEmail');
      var formPass = document.getElementById('formPass');
      var formCpf = document.getElementById('formCpf');
      var formType = document.getElementById('formType');
      var formId = document.getElementById('updateFormId');
      var form = document.getElementById('formAdmin');

      form.setAttribute('action', '/admin/editar');

      formName.setAttribute('value', name.getAttribute('value'));
      formEmail.setAttribute('value', email.getAttribute('value'));
      formPass.setAttribute('value', password.getAttribute('value'));
      formCpf.setAttribute('value', cpf.getAttribute('value'));
      formType.setAttribute('value', type.getAttribute('value'));
      formId.setAttribute('value', realId.getAttribute('value'));

      createButton.toggleAttribute('hidden');
      uptadeButton.toggleAttribute('hidden');
    }
    if (uptadeButton === elId) {
        
    }
  });
}

editFields('adminList');

function _cpf(cpf) {
  var Soma = 0;
  var Resto;

  var strCPF = String(cpf).replace(/[^\d]/g, '');

  if (strCPF == '') {
    return -1;
  }

  if (strCPF.length !== 11) return false;

  if (
    [
      '00000000000',
      '11111111111',
      '22222222222',
      '33333333333',
      '44444444444',
      '55555555555',
      '66666666666',
      '77777777777',
      '88888888888',
      '99999999999'
    ].indexOf(strCPF) !== -1
  )
    return false;

  for (i = 1; i <= 9; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);

  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;

  if (Resto != parseInt(strCPF.substring(9, 10))) return false;

  Soma = 0;

  for (i = 1; i <= 10; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);

  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;

  if (Resto != parseInt(strCPF.substring(10, 11))) return false;

  return true;
}

function validarCPF(el) {
  if (_cpf(el.value) == false) {
    alert('cpf inválido');
    // apaga o valor
    el.value = '';
    document.getElementById('cpf').focus();
  }
}
