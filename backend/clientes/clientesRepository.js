const db = require('../db');

function inserirCliente(nome, cpf) {
  const stmt = db.prepare(`INSERT INTO clientes (nome, cpf) VALUES (?, ?)`);
  stmt.run(nome, cpf);
}

function buscarClientePorCpf(cpf) {
  const stmt = db.prepare(`SELECT * FROM clientes WHERE cpf = ?`);
  return stmt.get(cpf);
}

function atualizarEntradas(cpf, entradas) {
  const stmt = db.prepare(`
    UPDATE clientes
    SET numero_entradas = ?
    WHERE cpf = ?
  `);
  stmt.run(entradas, cpf);
}

function incrementarEntrada(cpf) {
  const stmt = db.prepare(`
    UPDATE clientes
    SET numero_entradas = numero_entradas + 1
    WHERE cpf = ?
  `);
  stmt.run(cpf);
}

function listarClientes() {
  const stmt = db.prepare('SELECT * FROM clientes');
  return stmt.all();
}

module.exports = {
  inserirCliente,
  buscarClientePorCpf,
  atualizarEntradas,
  incrementarEntrada,
  listarClientes,
};