export default class Person {
    #name;
    constructor(name) {
        this.#name = name;
    }

    walk() {
        console.log("walk");
    }

    getName() {
        return this.#name;
    }
}