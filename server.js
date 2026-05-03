const express = require("express");
const cors = require("cors"); // Importa o CORS
const { exec } = require("child_process");

const app = express();

// Habilita o CORS para que qualquer página (como a nossa interface) 
// possa enviar comandos para a API
app.use(cors()); 

app.use(express.json());

// Endpoint que chama o OpenCode
app.post("/run", (req, res) => {
  const command = req.body.command || "opencode --help";

  // Executa o comando no sistema
  exec(command, (error, stdout, stderr) => {
    if (error) {
      // Se houver erro de execução, retorna o erro
      return res.status(500).json({ error: stderr || error.message });
    }
    // Retorna a saída padrão do comando
    res.json({ output: stdout });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`OpenCode API rodando na porta ${PORT}`);
});
