const db = require('./db');

function adicionarCliente(nome, cpf) {
  const stmt = db.prepare(`INSERT INTO clientes (nome, cpf) VALUES (?, ?)`);
  stmt.run(nome, cpf);
}

function buscarCliente(cpf) {
  const stmt = db.prepare(`SELECT * FROM clientes WHERE cpf = ?`);
  return stmt.get(cpf);
}

function adicionarEntrada(cpf) {
  const stmt = db.prepare(`
    UPDATE clientes
    SET numero_entradas = numero_entradas + 1
    WHERE cpf = ?
  `);
  stmt.run(cpf);
}

function temDesconto(cpf) {
  const cliente = buscarCliente(cpf);
  if (cliente && cliente.numero_entradas >= 10) {
    const stmt = db.prepare('UPDATE clientes SET numero_entradas = 0 WHERE cpf = ?');
    stmt.run(cpf);
    return true;
  }
  return false;
}
function listarClientes() {
  const stmt = db.prepare('SELECT * FROM clientes');
  const clientes = stmt.all();
  return clientes;
}

module.exports = {
  adicionarCliente,
  buscarCliente,
  adicionarEntrada,
  temDesconto,
  listarClientes,
};
