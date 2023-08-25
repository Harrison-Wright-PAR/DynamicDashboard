require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require('body-parser');

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

    res.json({ components: [helloUserComponent, salesReportComponent] })

});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})

const helloUserComponent = {
    name: "HelloUser",
    purpose: "Greet the user",
    goodFor: "everyone"
}

const salesReportComponent = {
    name: "SalesReport",
    purpose: "Show the user the sales report",
    goodFor: "sales, marketing, management"
}


// export default class Api {

//     // private _configuration: ClientOptions;
//     private _api : OpenAI;
//     public constructor () {
//         this._api = new OpenAI({apiKey : process.env.REACT_APP_OPENAI_API_KEY});
//     }

//     public async generate(input: string) {
//         try {
//             const completion = await this._api.chat.completions.create({
//                 model: "gpt-3.5-turbo",
//                 messages: [{role:"user", content:this.generatePrompt(input)}]
//             });
//             console.log(completion);
//             return completion;
//         } catch (error: any) {
//             console.error(error);
//             // Consider adjusting the error handling logic for your use case
//             // if (error.response) {
//             //     console.error(error.response.status, error.response.data);
//             //     res.status(error.response.status).json(error.response.data);
//             // } else {
//             //     console.error(`Error with OpenAI API request: ${error.message}`);
//             //     res.status(500).json({
//             //         error: {
//             //             message: 'An error occurred during your request.',
//             //         }
//             //     });
//             // }
//         }
//     }

//     public generatePrompt(animal: string) {
//         const capitalizedAnimal =
//             animal[0].toUpperCase() + animal.slice(1).toLowerCase();
//         return `Suggest three names for an animal that is a superhero.

// Animal: Cat
// Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
// Animal: Dog
// Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
// Animal: ${capitalizedAnimal}
// Names:`;
//     }
// }