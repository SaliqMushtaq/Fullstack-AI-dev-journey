const studentPromise = new Promise((resolve, reject) => {
    let marks = 75;

    if (marks >= 40) {
        resolve("Student passed!");
    } else {
        reject("Student failed!");
    }
});

studentPromise
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        console.log("Result checking completed.");
    });
    function getStudent() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Student data received");

            resolve({ name: "Saliq" });
        }, 2000);
    });
}
function getMarks(){
    return new Promise
    ((resolve)=>{
        setTimeout(()=>{
            console.log("students marks received");
            resolve(75);   
        },1000);
    })
}
getStudent()
    .then((student) => {
        return getMarks().then((marks) => {
            console.log("Student:", student.name);
            console.log("Marks:", marks);

            const result = marks >= 40 ? "Pass" : "Fail";
            console.log("Result:", result);
        });
    })
    .catch((error) => {
        console.log("Error:", error);
    });