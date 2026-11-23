const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise(resolve => rl.question(question, resolve));
}

async function main() {
    const name = await ask('Enter name: ');
    const age = await ask('Enter age: ');
    const email = await ask('Enter email: ');

    const user = { name, age: Number(age), email };
    console.log(user);

    rl.close();
}

main();