const {
    SlashCommandBuilder
} = require('@discordjs/builders');

const {
    MessageEmbed,
} = require('discord.js');

const mysql = require('mysql');
const dotenv = require('dotenv');
// import config IDs
dotenv.config();
const USER = process.env.SQL_USER;
const PASSWORD = process.env.SQL_PASSWORD

var connection = mysql.createPool({
    connectionLimit: 10,
    host: 'db-eu-03.sparkedhost.us',
    database: 's73880_succubot',
    user: USER,
    password: PASSWORD
});

module.exports = {
    name: "points",
    timeout: 5,
    data: new SlashCommandBuilder()
        .setName('points')
        .setDescription('Find out how many points someone has')
        .addUserOption(option => 
            option
                .setName('user')
                .setDescription('Who do you want to see points for?')
                .setRequired(true)
        ),

    async execute(client, interaction, cache) {
        var member = interaction.options.getUser('user');
        var score = 0;
        connection.query(`SELECT score FROM succubot WHERE user = ? AND guild = ?`, [String(member.id), String(interaction.guildId)], function (err, result) {
            if (err)
                console.log(err);
            else {
                if (result[0].score === null)
                    score = 0;
                else 
                    score = result[0].score;
            }
            
            return interaction.reply({
                content: `${member.username} has **${score}** succulent ${score === 1 ? "point" : "points"}!\n`
            });
        });
    }
}