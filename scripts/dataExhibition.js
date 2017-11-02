// Importando os módulos
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

// Recebendo os dados passados pelo 'main.js'
ipcRenderer.on('dados', function(event, message) {
    // Coletando ID do div
    let div = document.getElementById('nomes');
    
    // Para cada elemento recebido
    message.forEach(function(data) {
        let h3 = document.createElement('h3'); // Cria um elemento h1
        let ul = document.createElement('ul'); // Cria um elemento ol
        let li1 = document.createElement('li'); // Cria um elemento li
        let li2 = document.createElement('li'); // Cria um elemento li
        let li3 = document.createElement('li'); // Cria um elemento li

        h3.textContent = data.nome_empregado; // Atribui um valor ao texto de h1
        li1.textContent = data.matricula;
        li2.textContent = data.rua;
        li3.textContent = data.cidade;
        
        ul.appendChild(li1);
        ul.appendChild(li2);
        ul.appendChild(li3);

        div.appendChild(h3);
        div.appendChild(ul);
    });
});