// function first(callback) {
//     console.log("First");

//     setTimeout(() => {
//         console.log("Second");
//         callback();
//     }, 2000);
// }

// function third() {
//     console.log("Third");
// }

// first(third);

// console.log("Fourth");
function getStudent(callback) {
    setTimeout(() => {
        console.log("Student data received");
        callback();
    }, 5000);
}

function getMarks(callback) {
    setTimeout(() => {
        console.log("Student marks received");
        callback();
    }, 4000);
}

function calculateResult() {
    console.log("Result calculated");
}

getStudent(() => {
    getMarks(() => {
        calculateResult();
    });
});

console.log("Application running");