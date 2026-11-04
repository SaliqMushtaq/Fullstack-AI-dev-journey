const first = new Promise((resolve) => {
    setTimeout(() => resolve("First completed"), 1000);
});

const second = new Promise((resolve) => {
    setTimeout(() => resolve("Second completed"), 3000);
});

Promise.race([first, second])
    .then((result) => {
        console.log(result);
    });
    