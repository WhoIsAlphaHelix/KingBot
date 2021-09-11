const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');
const {token, clientId} = require('./config.json');
const fs = require("fs");

const commands = []
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    commands.push(command.data.toJSON())
}

const rest = new REST({version: '9'}).setToken(token);

(async () => {
    try {
        await rest.put(
            Routes.applicationGuildCommands(clientId, "812695655852015628"),
            {body: commands}
        );

        console.log("Successfully registered application commands.")
    } catch (e) {
        console.error(e)
    }
})();