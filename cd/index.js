import { taMere } from "./test.js";
import Teacher, { oui } from "./teacher.js";


const teacher = new Teacher("Luc");
console.log(teacher.walk());
console.log(teacher.name);
console.log(teacher.getName());

console.log(taMere("Ginette"));

console.log(oui());