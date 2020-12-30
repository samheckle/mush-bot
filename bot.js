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
	client.guilds.cache.get('707665433020465184').channels.cache.get('793629352503410688').messages.fetch('793630088218148894');
});

// Same code as above
client.on('messageReactionAdd', (reaction, user) => {

	// variables for message, emoji, and member
	const message = reaction.message;
	const emoji = reaction.emoji;
	const member = message.guild.members.fetch(user.id);

	// logic to add based on emoji, may need to be updated depending
	// each has a promise adding each role
	if (emoji.name == '🎥') {
		member.then(member => {
			member.roles.add('793682817380909118');
		}).catch(function () {
			console.log("Promise Rejected");
	   });
	}
	if (emoji.name == '📚') {
		member.then(member => {
			member.roles.add('793945832365621268');
		}).catch(function () {
			console.log("Promise Rejected");
	   });
	}
	if (emoji.name == '🍪') {
		member.then(member => {
			member.roles.add('793945768293171241');
		}).catch(function () {
			console.log("Promise Rejected");
	   });
	}
	
	if (emoji.name == '🐷') {
		member.then(member => {
			member.roles.add('793946127325462588');
		}).catch(function () {
			console.log("Promise Rejected");
	   });
	}
	if (emoji.name == 'amongusrip') {
		member.then(member => {
			member.roles.add('793946187472175144');
		}).catch(function () {
			console.log("Promise Rejected");
	   });
	}
	if (emoji.name == '🙈') {
		member.then(member => {
			member.roles.add('793313243803680808');
		}).catch(function () {
			console.log("Promise Rejected");
	   });
	}
    console.log(`${user.username} added their "${reaction.emoji.name}" reaction.`);
});

client.on('messageReactionRemove', (reaction, user) => {
	const message = reaction.message;
	const emoji = reaction.emoji;
	const member = message.guild.members.fetch(user.id);

	if (emoji.name == '🎥') {
		member.then(member => {
			member.roles.remove('793682817380909118');
		});
	}
	if (emoji.name == '📚') {
		member.then(member => {
			member.roles.remove('793945832365621268');
		});
	}
	if (emoji.name == '🍪') {
		member.then(member => {
			member.roles.remove('793945768293171241');
		});
	}

	if (emoji.name == '🐷') {
		member.then(member => {
			member.roles.remove('793946127325462588');
		});
	}
	if (emoji.name == 'amongusrip') {
		member.then(member => {
			member.roles.remove('793946187472175144');
		});
	}
	if (emoji.name == '🙈') {
		member.then(member => {
			member.roles.remove('793313243803680808');
		});
	}

    console.log(`${user.username} removed their "${reaction.emoji.name}" reaction.`);
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