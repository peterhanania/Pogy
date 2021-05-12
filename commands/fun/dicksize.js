const Command = require("../../structures/Command");
const Guild = require('../../database/schemas/Guild');
module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			name: "dicksize",
			aliases: ["ds", "pp" ,"ppsize"],
			description: "Shows you your PP size",
			category: "Fun",
			cooldown: 3
		});
	}

	async run(message) {
		let user = message.mentions.users.first();
		if (!user) {
			user = message.author;
		}
		const size = (user.id.slice(-3) % 20) + 1;
		const sizee = size/2.54
		const random = (user.id.slice(-6) % 40) + 3;
		await message.channel.send({
			embed: {
				color: "BLURPLE",
				description: `${sizee.toFixed(2)} inch\n8${"=".repeat(size)}D`,
			},
		});
	}
};
