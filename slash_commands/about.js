const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Obtén información sobre el bot'),
    execute(interaction) {
        const yourUserId = '598886496883310593'; // Reemplaza con tu ID de usuario

        const aboutEmbed = {
            color: 39423,
            title: 'Sobre Mí',
            description: '¡Hola! Soy Orumitender, un Orumit que está aquí para servirte. Aquí tienes algunas cosas sobre mí:',
            fields: [
                {
                    name: 'Creado por',
                    value: `<@${yourUserId}>`,
                    inline: true,
                },
                {
                    name: 'Versión',
                    value: '1.0.0',
                    inline: true,
                },
                {
                    name: 'Descripción',
                    value: 'Camarero del Orumit Bar, siempre dispuesto a tomarle nota de cualquier pedido y listo para cualquier cosa!',
                },
            ],
            thumbnail: {
                url: 'attachment://ORUMITENDER.png', // Ruta de la imagen relativa a la raíz del bot
            },
            footer: {
                text: '¡Gracias por pasarte por el Orumit Bar!',
            },
        };

        interaction.reply({
            embeds: [aboutEmbed],
            files: [{
                attachment: 'ORUMITENDER.png', // Ruta de la imagen relativa a la raíz del bot
                name: 'ORUMITENDER.png',
            }],
        });
    },
};
