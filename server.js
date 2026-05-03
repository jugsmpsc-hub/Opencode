const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do BTR (Alvo)
const BTR_URL = process.env.RAILWAY_URL || "https://btr-production-d856.up.railway.app";

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Serve o index.html automaticamente

// Rota para a interface
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Endpoint de execução
app.post("/run", (req, res) => {
    const { command } = req.body;
    if (!command) return res.status(400).json({ error: "Comando vazio" });

    let finalCommand = command;
    if (command.includes("opencode logs") && !command.includes("--url")) {
        finalCommand = `${command} --url ${BTR_URL}`;
    }

    console.log(`Executando: ${finalCommand}`);

    exec(finalCommand, (error, stdout, stderr) => {
        res.json({
            output: stdout || "",
            error: stderr || "",
            code: error ? error.code : 0
        });
    });
});

// Inicia o servidor em 0.0.0.0 para o Railway encontrar
app.listen(PORT, "0.0.0.0", () => {
    console.log(`>>> Bridge Online na porta ${PORT}`);
    console.log(`>>> Monitorando BTR: ${BTR_URL}`);
});
