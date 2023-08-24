
export default class Api {

    // private _configuration: ClientOptions;
    public constructor() {
    }

    public async generate(input: string) {
        try {
            const completion = await fetch("/completion", { method: "POST", body: JSON.stringify({ input: input }) });
            console.log(completion);
            return completion;
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
