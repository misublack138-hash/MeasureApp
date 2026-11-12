const sqlite3 =
require("sqlite3").verbose();

const db =
new sqlite3.Database(
    "./measureapp.db"
);

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS usuarios(

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            usuario TEXT UNIQUE,

            senha TEXT

        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS medidas(

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            usuario TEXT,

            valor REAL,

            data TEXT

        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS contestacoes(

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            autor TEXT,

            contestado TEXT,

            motivo TEXT,

            status TEXT,

            resposta TEXT,

            data TEXT

        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS notificacoes(

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            destinatario TEXT,

            mensagem TEXT,

            data TEXT

        )
    `);

    console.log(
        "Tabelas carregadas!"
    );

});

module.exports = db;