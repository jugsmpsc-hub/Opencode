const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Configuração do alvo (Sistema BTR)
const BTR_URL = process.env.RAILWAY_URL || "https://btr-production-d856.up.railway.app";

// Serve a interface HTML estática
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Endpoint Principal: Executa comandos do OpenCode
app.post("/run", (req, res) => {
    const userCommand = req.body.command;
    
    if (!userCommand) {
        return res.status(400).json({ error: "Nenhum comando enviado" });
    }

    // Lógica de ponte: 
    // Se o comando for apenas 'logs', ele injeta automaticamente a URL do BTR
    let finalCommand = userCommand;
    if (userCommand.startsWith("opencode logs")) {
        finalCommand = `${userCommand} --url ${BTR_URL}`;
    }

    console.log(`Executando: ${finalCommand}`);

    exec(finalCommand, (error, stdout, stderr) => {
        // Retornamos stdout e stderr para o terminal web
        res.json({
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
