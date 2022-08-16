const {
    SlashCommandBuilder
} = require('@discordjs/builders');

const {
    MessageEmbed,
} = require('discord.js')

const gifs = [
    'https://c.tenor.com/X-dsWnwJkZAAAAAd/succulent-chinese-meal-democracy-manifest.gif',
    'https://c.tenor.com/p2nzLP2fqdgAAAAd/charles-dozsa-under-arrest.gif',
    'https://c.tenor.com/0xnVtnrCJnAAAAAd/charles-dozsa-succulent-chinese-meal.gif',
]

const score = async function charge(interaction) {
    var embed = new MessageEmbed()
    .setColor('#FFDB69')
    const index = Math.floor(Math.random() * 3);
    embed
        .setDescription('What is the charge?')
        .setImage(gifs[index])
    interaction.reply({
        embeds: [embed]
    })

    var score = 1

    return score
}

module.exports = {
    name: "succ",
    timeout: 5,
    data: new SlashCommandBuilder()
        .setName('succ')
        .setDescription('succulent')
        .addUserOption(option => 
            option
                .setName('user')
                .setDescription('Who do you want to succ')
                .setRequired(true)
        ),

    async execute(client, interaction, cache) {
        const member = interaction.member
        const targetMember = interaction.options.getUser('user');

        if (member.id === targetMember.id) {
            var res = new MessageEmbed()
                .setDescription(`You are cheeky - you can't give yourself points... not very succulent of you...\n`)

            interaction.channel.respond({
                content: `<@${member.id}>`,
                embeds: [res]
            });
        } else {
            var initCache = cache.get(targetMember.id);
            if (initCache === undefined || initCache === null || initCache === NaN)
                initCache = 0;

            await score(interaction).then(() => {
                const xp = initCache + 1;
                cache.set(targetMember.id, xp);

                var checkCache = cache.get(targetMember.id);
                var res = new MessageEmbed()
                    .setDescription(`You have **${checkCache}** succulent points!\n`)

                interaction.channel.respond({
                    content: `<@${targetMember.id}>`,
                    embeds: [res]
                })
            })
        }
    }
}