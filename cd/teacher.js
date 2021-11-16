import Person from "./person.js";

export function oui() {
    console.log("oui");
}

export default class Teacher extends Person {
    constructor(name) {
        super(name);
    }

    teach() {
        console.log("teach");
    }
}