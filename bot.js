const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./auth.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}


client.once('ready', () => {
	console.log('Ready!');
});

client.login(token);

client.on('ready', () => {
	client.guild.channels.message.get(745144720652501064);
});

// Same code as above
client.on('messageReactionAdd', (reaction, user) => {
	const message = reaction.message, emoji = reaction.emoji;

	if (emoji.name == '✅') {
		// We don't have the member, but only the user...
		// Thanks to the previous part, we know how to fetch it
		message.guild.fetchMember(user.id).then(member => {
			member.addRole(745149116564242534);
		});
	}
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName);

	try {
		command.execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});