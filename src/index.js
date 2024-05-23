require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder, Embed } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (c) =>  {
    console.log(`✔ ${c.user.tag} is online.`);
});

client.on('messageCreate', (message) => {
    if (message.author.bot) {
        return;
    } else {
        if (message.content == "name") {
            message.reply("Hajimeru");
        }
        if (message.content === 'embed') {
            const embed = new EmbedBuilder().setTitle("Embed title")
            .setDescription('This is an embed description')
            .setColor(0x16024c)
            .addFields({
                name: 'Field tile',
                value: 'field value here',
                inline:true
            });
            message.channel.send({ embeds: [embed]})
        }
    }

});

client.on('interactionCreate', (interaction) => {
    if (interaction.isChatInputCommand()) {
        if (interaction.commandName === 'add') {
            const num1 = interaction.options.get('first-number').value;
            const num2 = interaction.options.get('second-number').value;
            const num3 = interaction.options.get('third-number')?.value;
            interaction.reply(`The sum is ${num1 + num2}`);
        }
        if (interaction.commandName === 'embed') {
            const embed = new EmbedBuilder().setTitle("Embed title")
            .setDescription('This is an embed description')
            .setColor(0x16024c)
            .addFields({
                name: 'Field tile',
                value: 'field value here',
                inline:true
            },
            {
                name: 'Field tile',
                value: 'field value here',
                inline:true
            },
            {
                name: 'Field tile',
                value: 'field value here',
                inline:true
            });

            interaction.reply({ embeds: [embed] });
        }
    }

});



client.login(process.env.TOKEN);