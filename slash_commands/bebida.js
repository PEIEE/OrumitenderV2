const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bebida')
        .setDescription('Pide una bebida al bot')
        .addStringOption(option =>
            option.setName('frase')
                .setDescription('Frase específica para pedir una bebida')
                .setRequired(true)
                .addChoices(
                    { name: 'Orumit Power', value: 'orumit_power' },
                    { name: 'Zumo de Murbi', value: 'zumo_de_murbi' },
                    { name: 'Licor de Lava de Ragor', value: 'licor_de_lava_de_ragor' }
                )),
    async execute(interaction) {
        try {
            const frase = interaction.options.getString('frase').toLowerCase();

            let respuesta;

            switch (frase) {
                case 'orumit_power':
                    respuesta = `¡Perfecto! Sirviendo un Orumit Power para ti, ${interaction.user} 🥤`;
                    break;
                case 'zumo_de_murbi':
                    respuesta = `¡Claro! Preparando un Zumo de Murbi (🍋) para ti, ${interaction.user} `;
                    break;
                case 'licor_de_lava_de_ragor':
                    respuesta = `¡Salud! Sirviendo un Licor de Lava de Ragor para ti, ${interaction.user} 🥃`;
                    break;
                default:
                    respuesta = 'Lo siento, la frase ingresada no es válida para este comando.';
            }

            await interaction.reply({
                content: respuesta,
                ephemeral: true
            });
        } catch (error) {
            console.error('Error executing "bebida" command:', error);
            await interaction.reply('Hubo un error al procesar tu pedido. Por favor, inténtalo de nuevo.');
        }
    },
};
