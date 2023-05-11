const fs = require("node:fs");
const chalk = require("chalk");

// Load Events
const loadEvents = async function (client) {
    const eventFolders = fs.readdirSync("./events");
    for (const folder of eventFolders) {
        const eventFiles = fs
        .readdirSync(`./events/${folder}`)
        .filter((file) => file.endsWith(".js"));
        
        for (const file of eventFiles) {
            const event = require(`../events/${folder}/${file}`);
            
            if (event.name) {
                console.log("EVENT: Sucess! --- " + file + " loaded");
            } else {
                console.log(chalk.gray(`${new Date().toLocaleString()}`), chalk.red("EVENT: ERROR"), chalk.whiteBright(`--- Error loading the event: ${file}`));
                continue;
            }
            
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            }
        }
    }
}

// Load Prefix Commands
const loadCommands = async function (client) {
    const commandFolders = fs.readdirSync("./PrefixCommands");
    for (const folder of commandFolders) {
        const commandFiles = fs
        .readdirSync(`./PrefixCommands/${folder}`)
        .filter((file) => file.endsWith(".js"));
        
        for (const file of commandFiles) {
            const command = require(`../PrefixCommands/${folder}/${file}`);
            
            if (command.name) {
                client.commands.set(command.name, command);
                console.log("PREFIX COMMAND: Sucess! ---" + file + " loaded");
            } else {
                console.log(chalk.gray(`${new Date().toLocaleString()}`), chalk.red("PREFIX COMMAND: ERROR"), chalk.whiteBright(`--- Error loading the command: ${file}`));
                continue;
            }
            
            if (command.aliases && Array.isArray(command))
            command.aliases.forEach((alias) => client.aliases.set(alias, command.name));
        }
    }
}

//Carregar slashcommands
const loadSlashCommands = async function (client) {
    let slash = []

    const commandFolders = fs.readdirSync("./SlashCommands");
    for (const folder of commandFolders) {
        const commandFiles = fs
        .readdirSync(`./SlashCommands/${folder}`)
        .filter((file) => file.endsWith(".js"));
        
        for (const file of commandFiles) {
            const command = require(`../SlashCommands/${folder}/${file}`);
            
            if (command.name) {
                client.slash.set(command.name, command);
                slash.push(command)
                console.log("SLASH COMMAND: Sucess! --- " + file + " loaded");
            } else {
                console.log(chalk.gray(`${new Date().toLocaleString()}`), chalk.red("SLASH COMMAND: ERROR"), chalk.whiteBright(`--- Error loading the command: ${file}`));
                continue;
            }
        }
    }

    client.on("ready", async() => {
        await client.application.commands.set(slash)
    })
}

module.exports = {
    loadEvents,
    loadCommands,
    loadSlashCommands
}