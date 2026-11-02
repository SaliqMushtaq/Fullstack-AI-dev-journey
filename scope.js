function createBankAccount() {
    let balance = 1000;

    return {
        deposit(amount) {
            balance += amount;
            console.log("Balance:", balance);
        },

        checkBalance() {
            console.log("Current Balance:", balance);
        },

        createCounter() {
            let count = 0;

            return {
                inc() {
                    count++;
                    console.log("Count:", count);
                }
            };
        }
    };
}

const account = createBankAccount();

// Bank account
account.checkBalance();
account.deposit(500);
account.deposit(200);

// Counter
const counter = account.createCounter();
const counter2 = account.createCounter();
counter.inc();
counter.inc();
counter2.inc();
