require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require('body-parser');
const components = require('./components');

const OpenAI = require('openAI').OpenAI;

const api = new OpenAI(process.env.OPENAI_API_KEY);

app.use(bodyParser.json());

app.post('/completion', async (req, res) => {
    console.log(req.body)
    const completion = await api.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: req.body.input }]
    });

    res.json(completion);

});

app.post('/components', async (req, res) => {

    res.json({ components: components })

});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})
