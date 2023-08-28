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

    /*
    todo: establish a prompt chain (? need to look into how it works. basically just a 
    series of promps that kinda establishes a convo. we'll need to plug the user input in there
    somewhere, possibly in multiple places)

    first thoguht
    1. here's all the components.(json of components) I'm building an interface for a back end of a restaurant web blalblabla I'm going to ask you sometihng in a minute
    2. Given these, I'm a {user input} and I mostly care about {user input, maybe a pre-canned description of the job} 
        Which of these components would be most useful on my dashboard? Please respond with JSON that includes only elements from the list I provided you previously
        Please avoid very similar components (i.e. sales with labor costs and sales without labor costs)
    3. Could you arrange that list in order of importance? (or some other post processing of the list. Maybe have it double check that each component exists in the map from the first question?)

    we can add caveats and change wording and what not 
    
    */
    res.json({ components: components })

});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})
