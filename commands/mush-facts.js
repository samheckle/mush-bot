const facts = require('./mush-facts.json');

module.exports = {
	name: 'mush-fact',
	description: 'gives a random mushroom fact',
	execute(message, args) {
		const fact = facts[Math.floor(Math.random() * facts.length)].fact;
		message.channel.send(fact);
	},
};