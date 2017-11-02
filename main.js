const electron = require('electron');
const mysql = require('mysql');
const url = require('url');
const path = require('path');

const {app, BrowserWindow} = electron;

let mainWindow;

// Listen for app to be ready
app.on('ready', function() {
    // Creating connection
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'lista4'
    });

    // Connecting with database
    connection.connect(function(err) {
        if (err) {
            console.error('Erro na conexão: ' + err.stack);
            console.log('Encerrando aplicação!');
            app.exit();
        }
        console.log('Conexão bem sucedida!\nConection ID: ' + connection.threadId);
    });

    // SQL Query

    let cidade = 'Sobral';

    connection.query('SELECT nome_empregado, cidade FROM empregado WHERE cidade = ?', [cidade],
    function(error, results, fields) {
        results.forEach(function(data) {
            console.log('Nome: ' + data.nome_empregado + '\tCidade: ' + data.cidade);
        });
    });

    // Create new window
    mainWindow = new BrowserWindow({});
    // Load html file into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
});