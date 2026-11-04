function getStudent() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Student data received");
            resolve({ name: "Saliq" });
        }, 2000);
    });
}

function getMarks() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Student marks received");
            resolve(75);
        }, 1000);
    });
}

async function showStudentResult() {
    try {
        console.log("Checking student details...");

        const student = await getStudent();

        console.log("Student:", student.name);

        console.log("Checking marks...");

        const marks = await getMarks();

        console.log("Marks:", marks);

        console.log(
            "Result:",
            marks >= 40 ? "Pass" : "Fail"
        );

    } catch (error) {
        console.log("Error:", error.message);
    }
}

showStudentResult();