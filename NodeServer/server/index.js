require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require('body-parser');
const _components = require('./components');
const _dashboards = require('./dashboards');

const { OpenAI } = require('langchain/llms/openai');
const { ChatOpenAI } = require('langchain/chat_models/openai');
const { LLMChain, SimpleSequentialChain } = require('langchain/chains');
const { PromptTemplate } = require('langchain/prompts');
const { BufferMemory } = require('langchain/memory');

const llm = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
})

const chat = new ChatOpenAI({
    temperature: 0.5
});
// const OpenAI = require('openAI').OpenAI;

// const api = new OpenAI(process.env.OPENAI_API_KEY);


app.use(bodyParser.json());

app.post('/completion', async (req, res) => {
    // console.log(req.body)
    // const completion = await api.chat.completions.create({
    //     model: "gpt-3.5-turbo",
    //     messages: [{ role: "user", content: req.body.input }]
    // });
    const completion = await llm.predict(req.body.input);

    res.json(completion);

});

const prompt1 = `Hey there! I work for a restaurant chain as a {role} and my biggest day-to-day concerns involve {problemAreas}.
 Given this list of components {componentsJson}, which would you suggest for me to place on my dashboard? 
Please respond with JSON that includes only elements from the list I provided you previously. 
Please avoid very similar components (i.e. sales with labor costs and sales without labor costs).`

const setupPrompt = `Hey There! We're working on setting up some dashboards for restuarant back-of-house users.
Given this list of components {_components}, here are some sample dashboards for different users {_dashboards}. I'm going to ask you something soon`

const actionPrompt = `
Given these components and sample dashboards, I'm a {role} and my areas of concern are mostly {problemAreas}. Could you suggest a dashboard that would fit my needs best?
Please respond with JSON using only the components I've provided in the original list. Try to avoid very similar or duplicate components (i.e. sales with labor costs and sales without labor costs).
`

app.post('/components', async (req, res) => {
    const memory = new BufferMemory();
    // const prompt = PromptTemplate.fromTemplate(prompt1);

    var setupPromptTemplate = new PromptTemplate({
        prompt: setupPrompt,
        inputVariables: ["components", "dashboards"]
    });

    const setupChain = new LLMChain({
        llm,
        prompt: setupPromptTemplate,
    });

    const actionPromptTemplate = new PromptTemplate({
        prompt: actionPrompt,
        inputVariables: ["role", "problemAreas"]
    });

    const actionChain = new LLMChain({
        llm,
        prompt: actionPromptTemplate,
    });

    const overallChain = new SimpleSequentialChain({
        chains: [setupChain, actionChain],
        verbose: true,
        memory
    });

    var res = overallChain.call({
        _components,
        _dashboards,
        role: req.body.role,
        problemAreas: req.body.problemAreas
    });
    // const chain = new LLMChain({
    //     llm,
    //     prompt,
    //     memory
    // });

    // const result = await chain.call({
    //     role: req.body.role,
    //     componentsJson: JSON.stringify(_components),
    //     problemAreas: req.body.problemAreas
    // });

    // var formatted = JSON.parse(result['text']);

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
    res.json({ components: formatted })

});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})
