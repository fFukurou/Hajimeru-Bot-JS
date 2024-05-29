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

client.on('interactionCreate', async (interaction) => {
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
    try {
        if (interaction.isButton()) {

            await interaction.deferReply({ ephemeral: true });
    
            const role = interaction.guild.roles.cache.get(interaction.customId);
            if (!role) {
                interaction.editReply({
                    content: ' 404 role not found',
                })
                return;
            }
            
            const hasRole = interaction.member.roles.cache.has(role.id);
    
            if (hasRole) {
                await interaction.member.roles.remove(role);
                await interaction.editReply(`The role ${role} has been removed.`)
                return;
            } else {
                await interaction.member.roles.add(role);
                await interaction.editReply(`The role ${role} has been added.`)
            }
        }
    } catch (error) {
        console.log(error);
    }



});


client.login(process.env.TOKEN);