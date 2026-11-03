// 
const students = [
    { name: "Ayan", marks: 80 },
    { name: "Saliq", marks: 75 },
    { name: "Zara", marks: 90 }
];

// MAP
const studentNames = students.map(student => student.name);
const marks = students.map(student => student.marks);

// FILTER
const passedStudents = students.filter(student => student.marks >= 40);

// REDUCE
const totalMarks = marks.reduce((total, mark) => total + mark, 0);

// DESTRUCTURING
const { name, marks: studentMarks } = students[0];

// SPREAD: Add a student name
const newNames = [...studentNames, "Suhail"];

// SPREAD: Add a property to a student
const newStudent = {
    ...students[0],
    college: "CUK"
};

// REST + REDUCE
function sumAll(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

// ERROR HANDLING
try {
    console.log("Student Names:", studentNames);
    console.log("Passed Students:", passedStudents);
    console.log("Total Marks:", totalMarks);
    console.log("First Student:", name, studentMarks);
    console.log("Updated Names:", newNames);
    console.log("New Student:", newStudent);
    console.log("Sum:", sumAll(10, 20, 30, 40));

} catch (error) {
    console.log("Error:", error.message);

} finally {
    console.log("Operation completed");
}