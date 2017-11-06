const electron = require('electron');
const mysql = require('mysql');
const url = require('url');
const path = require('path');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

let mainWindow;

// Listen for app to be ready
app.on('ready', function () {
    mainWindow = new BrowserWindow({});

    // Creating connection
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'lista4'
    });

    // Connecting with database
    connection.connect(function (err) {
        if (err) {
            console.error('Erro na conexão: ' + err.stack);
            console.log('Encerrando aplicação!');
            app.exit();
        }
        console.log('Conexão bem sucedida!\nConection ID: ' + connection.threadId);
    });

    mainWindow.loadURL(url.format({
        pathname: 'html/formWindow.html',
        protocol: 'file:',
        slashes: true
    }));
    
    /*// SQL Query
    connection.query('SELECT * FROM `empregado`', function (error, results, fields) {
        // Load html file into window
        mainWindow.loadURL(url.format({
            pathname: 'html/formWindow.html',
            protocol: 'file:',
            slashes: true
        }));

        // Enviando informações para mainWindow.html
        mainWindow.webContents.on('did-finish-load', () => { // Se a página terminou de carregar
            mainWindow.webContents.send('dados', results);   // Envie os dados
        });
    });*/

    // Retorna valores do BD após a entrada de um usuário.
    ipcMain.on('mensagem', function (event, arg) {
        console.log(arg);

        connection.query('SELECT * FROM `empregado` WHERE `nome_empregado` like ?', ('%' + [arg] + '%'),
                function (error, results, fields) {
                    console.log(results.length);
                    if (!results.length) {
                        ('Nenhum resultado encontrado!');
                    }
                    else {
                        mainWindow.loadURL(url.format({
                            pathname: 'html/mainWindow.html',
                            protocol: 'file:',
                            slashes: true
                        }));
    
                        mainWindow.webContents.on('did-finish-load', () => {
                            mainWindow.webContents.send('dados', results);
                        });
                    }
        });
    });
});