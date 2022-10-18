function editFields(list) {
    var el = document.getElementById(list);
    //let elId = el.addEventListener('click', function (e) {});
    //elId = e.target.id;

    var btn = document.getElementById(el);
    //var id = btn.id.slice(4);
    var id = list.id.slice(4);
    var btnE = document.getElementById('btnE' + id);

    var realId = document.getElementById('id' + id);
    var name = document.getElementById('name' + id);
    var email = document.getElementById('email' + id);
    var password = document.getElementById('pass' + id);
    var cpf = document.getElementById('cpf' + id);
    var type = document.getElementById('type' + id);

    var uptadeButton = document.getElementById('updateForm');
    var createButton = document.getElementById('createForm');
    var cancelBtn = document.getElementById('cancelUpdate');

    if (btnE.id === list.id) {
        var formH2 = document.getElementById('formH2');
        var formName = document.getElementById('formName');
        var formEmail = document.getElementById('formEmail');
        var formPass = document.getElementById('formPass');
        var formCpf = document.getElementById('formCpf');
        var formType = document.getElementById('formType');
        var formId = document.getElementById('updateFormId');
        var form = document.getElementById('formAdmin');

        form.setAttribute('action', '/admin/editar');

        formH2.innerHTML = "Atualizar Admin"
        formName.setAttribute('value', name.innerHTML);
        formEmail.setAttribute('value', email.innerHTML);
        formPass.setAttribute('value', password.innerHTML);
        formCpf.setAttribute('value', cpf.innerHTML);
        formType.setAttribute('value', type.innerHTML);
        formId.setAttribute('value', realId.innerHTML);

        createButton.setAttribute('hidden', true);
        uptadeButton.removeAttribute('hidden');
        cancelBtn.removeAttribute('hidden');
    }
}

function cancelButton() {
    var cancelBtn = document.getElementById('cancelUpdate');
    var uptadeButton = document.getElementById('updateForm');
    var createButton = document.getElementById('createForm');
    var form = document.getElementById('formAdmin');
    var formH2 = document.getElementById('formH2');

    formH2.innerHTML = 'Cadastro de Admin'
    form.setAttribute('action', '/admin/add');
    cancelBtn.toggleAttribute('hidden');
    createButton.toggleAttribute('hidden');
    uptadeButton.toggleAttribute('hidden');

}

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

function _cnh(cnh) {
    var char1 = cnh.charAt(0);

    if (cnh.replace(/[^\d]/g, '').length !== 11 || char1.repeat(11) === cnh) {
        return false;
    }

    for (var i = 0, j = 9, v = 0; i < 9; ++i, --j) {
        v += +(cnh.charAt(i) * j);
    }

    var dsc = 0,
        vl1 = v % 11;

    if (vl1 >= 10) {
        vl1 = 0;
        dsc = 2;
    }

    for (i = 0, j = 1, v = 0; i < 9; ++i, ++j) {
        v += +(cnh.charAt(i) * j);
    }

    var x = v % 11;
    var vl2 = x >= 10 ? 0 : x - dsc;

    return '' + vl1 + vl2 === cnh.substr(-2);
}

function validarCNH(el) {
    if (_cnh(el.value) == false) {
        if (el.value != '') {
            alert('Número de CNH inválido');
        }
        // // apaga o valor
        el.value = '';
        document.getElementById('cnh').focus();
    }
}

//confirmação de senha
function validatePassword() {
    var password = document.getElementById('password');
    var confirmPassword = document.getElementById('confirmPassword');
    if (password.value != confirmPassword.value) {
        confirmPassword.setCustomValidity('Senhas diferentes!');
    } else {
        confirmPassword.setCustomValidity('');
    }
}