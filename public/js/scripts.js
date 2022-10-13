function editFields(list) {
    var el = document.getElementById(list);
    let elId = el.addEventListener('click', function(e) {
        console.log(e.target.id);
        elId = e.target.id;

        var btn = document.getElementById(elId);
        var id = btn.id.slice(4)
        var btnS = document.getElementById('btnS' + id)
        var btnE = document.getElementById('btnE' + id)


        if ((btnS.id === elId) || (btnE.id === elId)) {


            btnE.toggleAttribute('hidden');
            btnS.toggleAttribute('hidden')

            var name = document.getElementById('name' + id)
            name.toggleAttribute('disabled')
        }



    });

}

editFields('adminList')