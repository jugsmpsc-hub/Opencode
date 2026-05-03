const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// URL do seu sistema BTR (pode ser alterada via painel do Railway)
const BTR_URL = process.env.RAILWAY_URL || "https://btr-production-d856.up.railway.app";

// Serve a interface HTML
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Execução de comandos
app.post("/run", (req, res) => {
    const userCommand = req.body.command;
    
    if (!userCommand) {
        return res.status(400).json({ error: "Comando vazio" });
    }

    // Injeção automática da URL do BTR para comandos de logs
    let finalCommand = userCommand;
    if (userCommand.includes("opencode logs") && !userCommand.includes("--url")) {
        finalCommand = `${userCommand} --url ${BTR_URL}`;
    }

    console.log(`> Executando: ${finalCommand}`);

    exec(finalCommand, (error, stdout, stderr) => {
        res.json({
            output: stdout || "",
            error: stderr || "",
            exitCode: error ? error.code : 0
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`[OK] Terminal Bridge Online na porta ${PORT}`);
});        res.json({
            output: stdout || "",
            error: stderr || "",
            exitCode: error ? error.code : 0,
            targetUrl: BTR_URL
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Painel OpenCode rodando na porta ${PORT}`);
    console.log(`Monitorando BTR em: ${BTR_URL}`);
});
