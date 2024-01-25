const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('comida')
        .setDescription('Pide comida al bot')
        .addStringOption(option =>
            option.setName('plato')
                .setDescription('Elige un plato de comida')
                .setRequired(true)
                .addChoices(
                    { name: 'Ensalada de Wyn', value: 'ensalada_de_wyn' },
                    { name: 'Sushi de Jen', value: 'sushi_de_jen' }
                )),
    async execute(interaction) {
        try {
            const plato = interaction.options.getString('plato').toLowerCase();

            let respuesta;

            switch (plato) {
                case 'ensalada_de_wyn':
                    respuesta = `¡Perfecto! Preparando la deliciosa Ensalada de Wyn para ti, ${interaction.user} 🥗`;
                    break;
                case 'sushi_de_jen':
                    respuesta = `¡Genial elección! Preparando el delicioso Sushi de Jen para ti, ${interaction.user} 🍣`;
                    break;
                default:
                    respuesta = 'Lo siento, la opción ingresada no es válida para este comando.';
            }

            await interaction.reply({
                content: respuesta,
                ephemeral: false
            });
        } catch (error) {
            console.error('Error executing "comida" command:', error);
            await interaction.reply('Hubo un error al procesar tu pedido. Por favor, inténtalo de nuevo.');
        }
    },
};
