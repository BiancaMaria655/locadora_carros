function adminToolsNav(btnId) {
    var btnCall = document.getElementById(btnId)

    var navLinks = document.getElementsByClassName('nav-link');
}

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

        formH2.innerHTML = 'Atualizar Admin';
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

function editFieldsCar(list) {
    var el = document.getElementById(list);


    var btn = document.getElementById(el);
    var id = list.id.slice(7);
    var btnE = document.getElementById('btnEcar' + id);

    var realId = document.getElementById('id' + id);
    var nome = document.getElementById('carNome' + id);
    var modelo = document.getElementById('carModelo' + id);
    var ano = document.getElementById('carAno' + id);
    var fabricante = document.getElementById('carFab' + id);
    var valor = document.getElementById('carValor' + id);
    var cor = document.getElementById('carCor' + id);
    var adicionais = document.getElementById('carAdic' + id);
    var disponivel = document.getElementById('carDisp' + id);
    var imgName = document.getElementById('carImg' + id);

    var uptadeButton = document.getElementById('updateFormCar');
    var createButton = document.getElementById('createFormCar');
    var cancelBtn = document.getElementById('cancelUpdateCar');

    if (btnE.id === list.id) {
        var formH2 = document.getElementById('formH2car');
        var formNome = document.getElementById('formNomeCarro');
        var formModelo = document.getElementById('formModelo');
        var formAno = document.getElementById('formAno');
        var formFab = document.getElementById('formFabricante');
        var formValor = document.getElementById('formValor');
        var formCor = document.getElementById('formCor');
        var formAdic = document.getElementById('formAdicionais');
        var formDisponivel = document.getElementById('formDisponivel');
        var formImg = document.getElementById('formImgName');
        var form = document.getElementById('formCar')

        form.setAttribute('action', '/carro/editar');

        formH2.innerHTML = 'Atualizar Carro';
        formNome.setAttribute('value', nome.innerHTML);
        formModelo.setAttribute('value', modelo.innerHTML);
        formAno.setAttribute('value', ano.innerHTML);
        formFab.setAttribute('value', fabricante.innerHTML);
        formValor.setAttribute('value', valor.innerHTML);
        formCor.setAttribute('value', cor.innerHTML);
        formAdic.setAttribute('value', adicionais.innerHTML);
        formDisponivel.setAttribute('value', disponivel.innerHTML);
        formImg.setAttribute('value', imgName.innerHTML);


        createButton.setAttribute('hidden', true);
        uptadeButton.removeAttribute('hidden');
        cancelBtn.removeAttribute('hidden');
    }
}

function cancelButton() {
    var cancelBtn = document.getElementById('cancelUpdate');
    var uptadeButton = document.getElementById('updateForm');
    var createButton = document.getElementById('createForm');

    var formName = document.getElementById('formName');
    var formEmail = document.getElementById('formEmail');
    var formPass = document.getElementById('formPass');
    var formCpf = document.getElementById('formCpf');
    var formType = document.getElementById('formType');
    var formId = document.getElementById('updateFormId');
    var form = document.getElementById('formAdmin');
    var formH2 = document.getElementById('formH2');

    formH2.innerHTML = 'Cadastro de Admin';
    form.setAttribute('action', '/admin/add');
    cancelBtn.toggleAttribute('hidden');
    createButton.toggleAttribute('hidden');
    uptadeButton.toggleAttribute('hidden');

    formName.setAttribute('value', '');
    formEmail.setAttribute('value', '');
    formPass.setAttribute('value', '');
    formCpf.setAttribute('value', '');
    formType.setAttribute('value', '');
    formId.setAttribute('value', '');
}

function cancelButtonCar() {
    var cancelBtn = document.getElementById('cancelUpdateCar');
    var uptadeButton = document.getElementById('updateFormCar');
    var createButton = document.getElementById('createFormCar');

    var formH2 = document.getElementById('formH2car');
    var formNome = document.getElementById('formNomeCarro');
    var formModelo = document.getElementById('formModelo');
    var formAno = document.getElementById('formAno');
    var formFab = document.getElementById('formFabricante');
    var formValor = document.getElementById('formValor');
    var formCor = document.getElementById('formCor');
    var formAdic = document.getElementById('formAdicionais');
    var formDisponivel = document.getElementById('formDisponivel');
    var formImg = document.getElementById('formImgName');
    var form = document.getElementById('formCar')


    formH2.innerHTML = 'Cadastro de Veículos';
    form.setAttribute('action', '/carro/adicionar');
    cancelBtn.toggleAttribute('hidden');
    createButton.toggleAttribute('hidden');
    uptadeButton.toggleAttribute('hidden');

    formNome.setAttribute('value', '');
    formModelo.setAttribute('value', '');
    formAno.setAttribute('value', '');
    formFab.setAttribute('value', '');
    formValor.setAttribute('value', '');
    formCor.setAttribute('value', '');
    formAdic.setAttribute('value', '');
    formDisponivel.setAttribute('value', '');
    formImg.setAttribute('value', '');

}

function verifyIfCarIsAvaliable() {
    btnAlugar = document.getElementById('btnAlugar');
    info = document.getElementById('dispInfo');

    btnAlugar.setAttribute('disabled', true)

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

        // apaga o valor
        // el.value = '';
        // document.getElementById('cpf').focus();
        document.getElementById("msgcpf").innerHTML = "<font color='red'>CPF inválido </font>";
        document.getElementById("btn_cadastrar").disabled = true;
    } else {
        document.getElementById("msgcpf").innerHTML = "";
        document.getElementById("btn_cadastrar").disabled = false;
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
            document.getElementById("msgcnh").innerHTML = "<font color='red'>CNH inválido </font>";
            document.getElementById("btn_cadastrar").disabled = true;
        }
    } else {
        document.getElementById("msgcnh").innerHTML = "";
        document.getElementById("btn_cadastrar").disabled = false;
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

function validateEmail(email) {
    usuario = email.value.substring(0, email.value.indexOf("@"));
    dominio = email.value.substring(email.value.indexOf("@") + 1, email.value.length);

    if ((usuario.length >= 1) &&
        (dominio.length >= 3) &&
        (usuario.search("@") == -1) &&
        (dominio.search("@") == -1) &&
        (usuario.search(" ") == -1) &&
        (dominio.search(" ") == -1) &&
        (dominio.search(".") != -1) &&
        (dominio.indexOf(".") >= 1) &&
        (dominio.lastIndexOf(".") < dominio.length - 1)) {
        document.getElementById("msgemail").innerHTML = "";
        document.getElementById("btn_cadastrar").disabled = false;

    } else {
        document.getElementById("msgemail").innerHTML = "<font color='red'>E-mail inválido </font>";
        document.getElementById("btn_cadastrar").disabled = true;

    }
}