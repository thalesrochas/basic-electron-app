// Importando os módulos
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

// Recebendo os dados passados pelo 'main.js'
ipcRenderer.on('dados', function (event, message) {
    // Coletando ID do tbody
    let tbody = document.getElementById('corpoTabela');

    message.forEach(function(data) {
        let tr = document.createElement('tr');
        let th = document.createElement('th');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');

        th.textContent = data.matricula;
        td1.textContent = data.nome_empregado;
        td2.textContent = data.rua;
        td3.textContent = data.cidade;

        tr.appendChild(th);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tbody.appendChild(tr);
    });
});