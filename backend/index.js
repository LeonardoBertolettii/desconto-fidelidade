const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const clientesRoutes = require('./clientes/clientesRoutes');

app.use(cors());
app.use(express.json());

// Todas as rotas de clientes ficam em /clientes
app.use('/clientes', clientesRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});