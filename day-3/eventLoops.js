console.log("1. app started");
setTimeout(() => {
console.log("2. timer completed");}
, 5000);
Promise.resolve().then(() => {
console.log("3. promise completed");});
console.log("4. app finished");
