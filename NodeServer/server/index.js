require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require('body-parser');
const _components = require('./components');
const _dashboards = require('./dashboards');

const { OpenAI } = require('langchain/llms/openai');
const { LLMChain, SequentialChain } = require('langchain/chains');
const { PromptTemplate } = require('langchain/prompts');
const { StructuredOutputParser } = require("langchain/output_parsers");

const llm = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0.5,
    modelName: "gpt-4"
})


app.use(bodyParser.json());

app.post('/completion', async (req, res) => {
    const completion = await llm.predict(req.body.input);

    res.json(completion);

});

const setupPrompt = `Hey There! We're working on setting up some dashboards for restuarant back-of-house users.
Given this list of components {componentsAll}, here are some sample dashboards for different users {dashboardsExample}.
 I'm going to ask you something soon, could you provide some key takeaways for yourself that might help later?`

const createActionPrompt = `
Given these components and sample dashboards, I'm a {role} and my areas of concern are mostly {problemAreas}. Could you suggest a dashboard that would fit my needs best?
Please respond using only the components in the following list - {componentsAll}.
Do not include any explanations, only provide a COMPLETE RFC8259 compliant JSON response following this format without deviation.
{{"components": [{{
    "name": "component_name",
    "purpose": "the purpose of the component",
    "goodFor": "the type of user this component is good for"
  }}]}}
  The JSON response:
`

const correctionPrompt = `
    Given this output {result}, please correct the output to only include items from the list and be RFC8259 compliant JSON.
    {{"components": [{{
        "name": "component_name",
        "purpose": "the purpose of the component",
        "goodFor": "the type of user this component is good for"
      }}]}}
      The JSON response:
`

const updateActionPrompt = `
Given these components and my current dashboard - {dashboard}, I'd like to make the following updates - {userRequest}. If you're able to make the update, please respond with the updated dashboard. If you're not able to make the update, please respond with a polite appology that you're not able to make the update.
Please respond with JSON containing only the appology or using only the components in the following list - {componentsAll}.
the output is should include all components from my dashboard with the updates I've requested and be RFC8259 compliant JSON.
    {{"components": [{{
        "name": "component_name",
        "purpose": "the purpose of the component",
        "goodFor": "the type of user this component is good for"
      }}]}}
      The JSON response:
`
app.post('/components', async (req, res) => {

    var parser = StructuredOutputParser.fromNamesAndDescriptions({
        components: "list of components"
    })
    const formatInstructions = parser.getFormatInstructions();

    const setupPromptTemplate = PromptTemplate.fromTemplate(setupPrompt);
    const actionPromptTemplate = PromptTemplate.fromTemplate(createActionPrompt, { partialVariables: { format_instructions: formatInstructions } });
    const correctionPromptTemplate = PromptTemplate.fromTemplate(correctionPrompt);

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
    
    const correctionChain = new LLMChain({
        llm,
        prompt: correctionPromptTemplate,
        inputVariables: ["result", "componentsAll"],
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

    if (parse['components']) {
        parse = parse['components']
    }

    res.send({ components: parse });

});

app.post('/components/update', async (req, res) => {
    const setupPromptTemplate = PromptTemplate.fromTemplate(setupPrompt);
    var parser = StructuredOutputParser.fromNamesAndDescriptions({
        components: "list of components",
        message: "message"
    })
    const formatInstructions = parser.getFormatInstructions();
    const actionPromptTemplate = PromptTemplate.fromTemplate(updateActionPrompt, { partialVariables: { format_instructions: formatInstructions } });


    const setupChain = new LLMChain({
        llm,
        prompt: setupPromptTemplate,
        inputVariables: ["componentsAll", "dashboardsExample"],
        outputKey: "setupResult"
    });

    const actionChain = new LLMChain({
        llm,
        prompt: actionPromptTemplate,
        inputVariables: ["userRequest", "dashboard", "setupResult", "componentsAll"],
        outputKey: "result"
    });

    const overallChain = new SequentialChain({
        chains: [setupChain, actionChain],
        inputVariables: ["componentsAll", "dashboardsExample", "dashboard", "userRequest"],
        verbose: true,
        outputKey: "result"

    });

    const inputValues = {
        componentsAll: JSON.stringify(_components),
        dashboardsExample: JSON.stringify(_dashboards),
        dashboard: JSON.stringify(req.body.dashboard),
        userRequest: req.body.userRequest,
    };

    const result = await overallChain.call(inputValues);
    console.log(result);

    try {
        let parse = JSON.parse(result['result']);
        res.send({ components: parse['components'] });
    } catch (error) {
        if (error instanceof SyntaxError) {
            res.send({ message: result });
        } else {
            console.error(error);
            res.status(500).send({ error });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})

/* 

edit workflow
send json
could you please add a component which does {request}. If there is a component that matches, please response with the dashboard provided with that component included.
if there is not a component that matches that description, please respond with a polite appology that there is no component that matches that description.
Please respond in Json Format (ie. components: jsonArray, message: string)

*/

/*
---PROMPT ARCHIVE---

const prompt1 = `Hey there! I work for a restaurant chain as a {role} and my biggest day-to-day concerns involve {problemAreas}.
 Given this list of components {componentsJson}, which would you suggest for me to place on my dashboard? 
Please respond with JSON that includes only elements from the list I provided you previously. 
Please avoid very similar components (i.e. sales with labor costs and sales without labor costs).`
*/