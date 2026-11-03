const student = {
    name: "Saliq",
    age: 21,
    course: "B.Tech CSE"
};
const {name, age, course}=student;
console.log(name);
console.log(age);
console.log(course);
const collage = {
  ...student,
    collage: "Cuk",}
console.log(collage);
const num=[10,20,30,40];
const result= num.reduce((total,marks)=>total+marks,0);
console.log(result);
function sumAll(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sumAll(10, 20, 30, 40));