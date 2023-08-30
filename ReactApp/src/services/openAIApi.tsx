
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
            const components = await fetch("/components", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userInput }) });
            console.log(components);
            return components.json();
        } catch (error: any) {
            console.error(error);
        }
    }

    public async updateDashboard(dashboard: string = "", userRequest: string = "") {
        const updatedDashboard = await fetch("/components/update", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ dashboard: dashboard, userRequest: userRequest }) });
        console.log(updatedDashboard);
        return updatedDashboard.json();
    }
}
