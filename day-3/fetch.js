// // async function getGitHubUser() {
// //     try {
// //         console.log("Fetching GitHub user...");

// //         const response = await fetch(
// //             "https://api.github.com/users/octocat"
// //         );

// //         if (!response.ok) {
// //             throw new Error(`HTTP Error: ${response.status}`);
// //         }

// //         const user = await response.json();

// //         console.log("Username:", user.login);
// //         console.log("Name:", user.name);
// //         console.log("Repositories:", user.public_repos);
// //         console.log("Followers:", user.followers);

// //     } catch (error) {
// //         console.error("Something went wrong:", error.message);
// //     }
// // }

// // getGitHubUser();
// //<             multiple users
// const usernames = ["octocat", "y7rdy73ey3", "facebook"];

// async function getMultipleUsers() {
//     try {
//         const promises = usernames.map(async (username) => {
//             const response = await fetch(
//                 `https://api.github.com/users/${username}`
//             );

//             if (!response.ok) {
//                 throw new Error(`Failed to fetch ${username}`);
//             }

//             return response.json();
//         });

//         const users = await Promise.all(promises);

//         users.forEach((user) => {
//             console.log(user.login, user.followers);
//         });

//     } catch (error) {
//         console.log("Error:", error.message);
//     }
// }

// getMultipleUsers();
const usernames = ["octocat", "y7rdy73ey3", "facebook"];

async function getMultipleUsers() {
    const promises = usernames.map(async (username) => {
        const response = await fetch(
            `https://api.github.com/users/${username}`
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch ${username}`);
        }

        return response.json();
    });

    const results = await Promise.allSettled(promises);

    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            console.log(
                "Username:",
                result.value.login,
                "| Followers:",
                result.value.followers
            );
        } else {
            console.log(
                "Failed:",
                usernames[index],
                "| Reason:",
                result.reason.message
            );
        }
    });
}

getMultipleUsers();
