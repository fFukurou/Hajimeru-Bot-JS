require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder, Embed, ActionRow, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

const roles = [
    {
        id: '814171224459968542',
        label: 'Cursed'
    },
    {
        id: '818309122209349653',
        label: 'Holy'
    },
    {
        id: '803739545522143273',
        label: 'Offline'
    },
]

client.on('ready', (c) =>  {
    console.log(`✔ ${c.user.tag} is online.`);
});

client.on('ready', async (c) => {
    try {
        const channel = await client.channels.cache.get('1214740257287831602');
        if (!channel) return;

        const row = new ActionRowBuilder();

        roles.forEach((role) => {
            row.components.push (
                new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary)
            )
        })

        await channel.send({
            content: 'Add or remove a role.',
            components: [row],
        });
        process.exit();

    } catch (error) {
        console.log(error)
    }
});


client.login(process.env.TOKEN);