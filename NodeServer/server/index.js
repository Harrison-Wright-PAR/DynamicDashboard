require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require('body-parser');
const _components = require('./components');
const _dashboards = require('./dashboards');

const { OpenAI } = require('langchain/llms/openai');
const { ChatOpenAI } = require('langchain/chat_models/openai');
const { LLMChain, SequentialChain } = require('langchain/chains');
const { PromptTemplate } = require('langchain/prompts');
const { BufferMemory, SimpleMemory } = require('langchain/memory');

const llm = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0.5
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
Given this list of components {componentsAll}, here are some sample dashboards for different users {dashboardsExample}.
 I'm going to ask you something soon, could you provide some key takeaways for yourself that might help later?`

const actionPrompt = `
Given these components and sample dashboards, I'm a {role} and my areas of concern are mostly {problemAreas}. Could you suggest a dashboard that would fit my needs best?
Please respond with JSON (ie. components: jsonArray) using only the components I've provided here - {componentsAll}. Try to avoid very similar or duplicate components (i.e. sales with labor costs and sales without labor costs).
`
app.post('/components', async (req, res) => {
    const memory = new BufferMemory();

    const setupPromptTemplate = PromptTemplate.fromTemplate(setupPrompt);
    const actionPromptTemplate = PromptTemplate.fromTemplate(actionPrompt);

    const setupChain = new LLMChain({
        llm,
        prompt: setupPromptTemplate,
        inputVariables: ["componentsAll", "dashboardsExample"],
        outputKey: "setupResult"
    });

    const actionChain = new LLMChain({
        llm,
        prompt: actionPromptTemplate,
        inputVariables: ["role", "problemAreas", "setupResult", "componentsAll"],
        outputKey: "components"
    });

    const overallChain = new SequentialChain({
        chains: [setupChain, actionChain],
        inputVariables: ["componentsAll", "dashboardsExample", "role", "problemAreas"],
        verbose: true,
        outputVariables: ["components"]
    });

    const inputValues = {
        componentsAll: JSON.stringify(_components),
        dashboardsExample: JSON.stringify(_dashboards),
        role: req.body.role,
        problemAreas: req.body.problemAreas,
    };

    const result = await overallChain.call(inputValues);

    let parse = JSON.parse(result['components'])

    if(parse['components']){
        parse = parse['components']
    }

    res.send({ components: parse });

});
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})
