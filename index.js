//dependencias
const Discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json");

//cliente de discord
const Client = new Discord.Client({
    intents: 3276799,
})

//CARGAR COMANDOS
Client.commands = new Discord.Collection();

fs.readdirSync("./slash_commands").forEach((commandfile) => {
    const command = require(`./slash_commands/${commandfile}`);
    Client.commands.set(command.data.name, command);
});

// registrar comandos
const REST = new Discord.REST().setToken(config.CLIENT_TOKEN);

// ...

(async () => {
    try {
        await REST.put(
            Discord.Routes.applicationGuildCommands(config.ClientId, config.guildID),
            {
                body: Client.commands.map((cmd) => cmd.data.toJSON()),
            }
        );
        console.log(`Loaded ${Client.commands.size} slash commands {/}`);
    } catch (error) {
        console.log("Error loading commands.", error);
    }
})();

// ...

Client.on(`interactionCreate`, async (interaction) => {
    try {
        if (interaction.isChatInputCommand()) {
            const command = Client.commands.get(interaction.commandName);
            if (command) {
                await command.execute(interaction);
            }
        } else {
            // Otras acciones en caso de interacciones que no son comandos (puedes manejarlas según tus necesidades)
        }
    } catch (error) {
        console.error('Error handling interaction:', error);
        await interaction.reply({ content: 'Hubo un error al manejar la interacción.', ephemeral: true });
    }
});

// ...


// contenido (eventos)
Client.once("ready", async (client) => {
    console.log("Orumitender Listo");
    Client.user.setActivity('Esperando pedidos!', {type: 1});
});

// Evento interacciónCreate: ejecuta cuando el usuario utiliza la interacción
Client.once(`interactionCreate`, async (interaction) => {
    if (interaction.isChatInputCommand()) {  // Cambio aquí
        const command = Client.commands.get(interaction.commandName);
        if (command) {
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'Hubo un error al ejecutar el comando.', ephemeral: true });
            }
        }
    } else {
        // Otras acciones en caso de interacciones que no son comandos (puedes manejarlas según tus necesidades)
    }
});
// conexión
Client.login(
    "MTE5OTI5NDMwNzk2NjkxMDQ4NA.GXbffr.htbBPT5tVPEhZ3m_1icQ13v9bHZh1LAGBjB_b4"
);
