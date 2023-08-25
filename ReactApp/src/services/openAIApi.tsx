
export default class Api {

    // private _configuration: ClientOptions;
    public constructor() {
    }

    public async generate(input: string) {
        try {
            const completion = await fetch("/completion", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ input: input }) });
            console.log(completion);
            return completion.json();
        } catch (error: any) {
            console.error(error);

        }
    }

    public async fetchComponents(userInput: string = "") {
        try {
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
            const components = await fetch("/components", { method: "POST" });
            console.log(components);
            return components.json();
        } catch (error: any) {
            console.error(error);
        }
    }

    public generatePrompt(animal: string) {
        const capitalizedAnimal =
            animal[0].toUpperCase() + animal.slice(1).toLowerCase();
        return `Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${capitalizedAnimal}
Names:`;
    }
}
