const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Super AI Backend Aktif");
});

app.post("/api/chat", async (req, res) => {
    try {
        const message = req.body.message;

        if (!message) {
            return res.status(400).json({
                error: "Pesan kosong"
            });
        }

        const response = await client.responses.create({
            model: "gpt-5.6",
            input: message
        });

        res.json({
            reply: response.output_text
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Gagal menghubungkan ke AI"
        });
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server berjalan di port ${PORT}`);
});
