const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const Guild = require('../../database/schemas/Guild');
const customCommand = require('../../database/schemas/customCommand.js');
let rgx = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
let embedstarted = new Set();

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			name: 'embed',
			aliases: ['embedify', 'embedbuilder'],
			description: `Make a custom embed builder with Pogy!`,
			category: 'Utility',
			guildOnly: true,
			cooldown: 5,
      userPermission: ["MANAGE_MESSAGES"]
		});
	}

	async run(message, args) {
		let channel = message.mentions.channels.first();
		const guildDB = await Guild.findOne({
			guildId: message.guild.id
		});

		const language = require(`../../data/language/${guildDB.language}.json`);
		const prefix = guildDB.prefix;
		if (embedstarted.has(message.author.id))
			return message.channel
				.send(
					new MessageEmbed()
						.setDescription(`${message.client.emoji.fail} ${language.embedd1} `)
						.setColor(message.guild.me.displayHexColor)
				)
				.catch(() => {});
		message.channel
			.send(
				new MessageEmbed()
					.setDescription(
						`${message.client.emoji.success} ${language.embedd2} `
					)
					.setColor(message.guild.me.displayHexColor)
			)
			.catch(() => {});

		message.channel
			.awaitMessages(m => m.author.id == message.author.id, {
				max: 1,
				time: 30000
			})
			.then(collected => {
				if (collected.first().content.toLowerCase() == 'start') {
					embedstarted.add(message.author.id);
					message.delete();
					message.channel.send(`${language.embedd3}`).catch(() => {});
					message.channel
						.awaitMessages(m => m.author.id == message.author.id, {
							max: 1,
							time: 30000
						})
						.then(collected => {
							let title = collected.first().content;
							if (collected.first().content.length < 255) {
								if (collected.first().content == 'cancel')
									return (
										message.channel.send(
											new MessageEmbed()
												.setDescription(
													`${message.client.emoji.fail} ${language.embed15} `
												)
												.setColor(message.guild.me.displayHexColor)
										) + embedstarted.delete(message.author.id)
									);
								message.channel.send(`${language.embedd4}`).catch(() => {});
								message.channel
									.awaitMessages(m => m.author.id == message.author.id, {
										max: 1,
										time: 30000
									})
									.then(collected => {
										if (collected.first().content.length < 2048) {
											if (collected.first().content == 'cancel')
												return (
													message.channel.send(
														new MessageEmbed()
															.setDescription(
																`${message.client.emoji.fail} ${
																	language.embed15
																} `
															)
															.setColor(message.guild.me.displayHexColor)
													) + embedstarted.delete(message.author.id)
												);

											let description = collected.first().content;
											message.channel
												.send(`${language.embedd5}`)
												.catch(() => {});
											message.channel
												.awaitMessages(m => m.author.id == message.author.id, {
													max: 1,
													time: 30000
												})
												.then(collected => {
													if (
														collected.first().content.length < 8 ||
														collected.first().content.toLowerCase() == 'default'
													) {
														if (collected.first().content == 'cancel')
															return (
																message.channel.send(
																	new MessageEmbed()
																		.setDescription(
																			`${message.client.emoji.fail} ${
																				language.embed15
																			} `
																		)
																		.setColor(message.guild.me.displayHexColor)
																) + embedstarted.delete(message.author.id)
															);

														let color = collected.first().content;
														if (
															collected.first().content.toLowerCase() ==
															'default'
														)
															color = `default`;

														message.channel
															.send(`${language.embedd6}`)
															.catch(() => {});

														message.channel
															.awaitMessages(
																m => m.author.id == message.author.id,
																{ max: 1, time: 30000 }
															)
															.then(collected => {
																if (
																	rgx.test(collected.first().content) ||
																	collected.first().content.toLowerCase() ==
																		'none'
																) {
																	let thumbnail = collected
																		.first()
																		.content.toLowerCase();
																	message.channel
																		.send(`${language.embedd7}`)
																		.catch(() => {});

																	message.channel
																		.awaitMessages(
																			m => m.author.id == message.author.id,
																			{ max: 1, time: 30000 }
																		)
																		.then(collected => {
																			if (
																				rgx.test(collected.first().content) ||
																				collected
																					.first()
																					.content.toLowerCase() == 'none'
																			) {
																				let image = collected
																					.first()
																					.content.toLowerCase();

																				message.channel
																					.send(`${language.embedd8}`)
																					.catch(() => {});

																				message.channel
																					.awaitMessages(
																						m =>
																							m.author.id == message.author.id,
																						{ max: 1, time: 30000 }
																					)
																					.then(collected => {
																						if (
																							collected.first().content.length <
																								2048 ||
																							collected
																								.first()
																								.content.toLowerCase() == 'none'
																						) {
																							if (
																								collected.first().content ==
																								'cancel'
																							)
																								return (
																									message.channel.send(
																										new MessageEmbed()
																											.setDescription(
																												`${
																													message.client.emoji
																														.fail
																												} ${language.embed15} `
																											)
																											.setColor(
																												message.guild.me
																													.displayHexColor
																											)
																									) +
																									embedstarted.delete(
																										message.author.id
																									)
																								);

																							let footer = collected.first()
																								.content;
																							let mainfooter = collected.first()
																								.content;

																							if (
																								collected
																									.first()
																									.content.toLowerCase() ==
																								'none'
																							)
																								footer = `none`;

																							message.channel.send(
																								`${language.embedd9}`
																							);
																							message.channel
																								.awaitMessages(
																									m =>
																										m.author.id ==
																										message.author.id,
																									{ max: 1, time: 30000 }
																								)
																								.then(collected => {
																									if (
																										collected
																											.first()
																											.content.toLowerCase() ==
																											'yes' ||
																										collected
																											.first()
																											.content.toLowerCase() ==
																											'no'
																									) {
																										if (
																											collected.first()
																												.content == 'cancel'
																										)
																											return (
																												message.channel.send(
																													new MessageEmbed()
																														.setDescription(
																															`${
																																message.client
																																	.emoji.fail
																															} ${
																																language.embed15
																															} `
																														)
																														.setColor(
																															message.guild.me
																																.displayHexColor
																														)
																												) +
																												embedstarted.delete(
																													message.author.id
																												)
																											);

																										let timestamp = `no`;
																										if (
																											collected
																												.first()
																												.content.toLowerCase() ==
																											'yes'
																										)
																											timestamp = `yes`;

																										//here
																										message.channel
																											.send(
																												`${language.embedd10}`
																											)
																											.catch(() => {});
																										message.channel
																											.awaitMessages(
																												m =>
																													m.author.id ==
																													message.author.id,
																												{ max: 1, time: 30000 }
																											)
																											.then(collected => {
																												if (
																													collected
																														.first()
																														.content.toLowerCase() ==
																														'yes' ||
																													collected
																														.first()
																														.content.toLowerCase() ==
																														'no'
																												) {
																													if (
																														collected.first()
																															.content ==
																														'cancel'
																													)
																														return (
																															message.channel.send(
																																new MessageEmbed()
																																	.setDescription(
																																		`${
																																			message
																																				.client
																																				.emoji
																																				.fail
																																		} ${
																																			language.embed15
																																		} `
																																	)
																																	.setColor(
																																		message
																																			.guild.me
																																			.displayHexColor
																																	)
																															) +
																															embedstarted.delete(
																																message.author
																																	.id
																															)
																														);

																													if (
																														collected
																															.first()
																															.content.toLowerCase() ==
																														'yes'
																													) {
																														message.channel
																															.send(
																																`${
																																	language.embedd11
																																}`
																															)
																															.catch(() => {});
																														//   do stuff

																														message.channel
																															.awaitMessages(
																																m =>
																																	m.author.id ==
																																	message.author
																																		.id,
																																{
																																	max: 1,
																																	time: 30000
																																}
																															)
																															.then(
																																collected => {
																																	let argword = collected.first()
																																		.content;
																																	var myArray = argword.split(
																																		' '
																																	);

																																	if (
																																		myArray.length >
																																		1
																																	)
																																		return (
																																			message.channel.send(
																																				new MessageEmbed()
																																					.setDescription(
																																						`${
																																							message
																																								.client
																																								.emoji
																																								.fail
																																						} ${
																																							language.embed15
																																						} `
																																					)
																																					.setColor(
																																						message
																																							.guild
																																							.me
																																							.displayHexColor
																																					)
																																			) +
																																			embedstarted.delete(
																																				message
																																					.author
																																					.id
																																			)
																																		);
																																	if (
																																		this.client.commands.get(
																																			argword.toLowerCase()
																																		) ||
																																		this.client.aliases.get(
																																			argword.toLowerCase()
																																		)
																																	)
																																		return (
																																			message.channel.send(
																																				`${
																																					language.embedd12
																																				}`
																																			) +
																																			embedstarted.delete(
																																				message
																																					.author
																																					.id
																																			)
																																		);
																																	if (
																																		collected.first()
																																			.content
																																			.length <
																																		30
																																	) {
																																		let name = collected
																																			.first()
																																			.content.toLowerCase();
																																		let content = `embed`;
																																		customCommand.findOne(
																																			{
																																				guildId:
																																					message
																																						.guild
																																						.id,
																																				name
																																			},
																																			async (
																																				err,
																																				data
																																			) => {
																																				if (
																																					!data
																																				) {
																																					customCommand.create(
																																						{
																																							guildId:
																																								message
																																									.guild
																																									.id,
																																							name,
																																							content,
																																							title: title,
																																							description: description,
																																							color: color,
																																							image: image,
																																							thumbnail: thumbnail,
																																							footer: footer,
																																							timestamp: timestamp
																																						}
																																					);
																																					embedstarted.delete(
																																						message
																																							.author
																																							.id
																																					);
																																					message.channel.send(
																																						new MessageEmbed()
																																							.setAuthor(
																																								`${
																																									message
																																										.author
																																										.tag
																																								}`,
																																								message.author.displayAvatarURL(
																																									{
																																										dynamic: true
																																									}
																																								)
																																							)
																																							.setDescription(
																																								`${
																																									language.embedd13
																																								} \`${prefix}${name}\``
																																							)
																																							.setTimestamp()
																																							.setFooter(
																																								'https://pogy.xyz'
																																							)
																																							.setColor(
																																								message
																																									.guild
																																									.me
																																									.displayHexColor
																																							)
																																					);
																																				} else {
																																					return (
																																						message.channel.send(
																																							`${
																																								message
																																									.client
																																									.emoji
																																									.fail
																																							} ${
																																								language.embedd14
																																							}`
																																						) +
																																						embedstarted.delete(
																																							message
																																								.author
																																								.id
																																						)
																																					);
																																				}
																																			}
																																		);

																																		return;
																																	} else
																																		message.channel.send(
																																			new MessageEmbed()
																																				.setDescription(
																																					`${
																																						message
																																							.client
																																							.emoji
																																							.fail
																																					} ${
																																						language.embed15
																																					} `
																																				)
																																				.setColor(
																																					message
																																						.guild
																																						.me
																																						.displayHexColor
																																				)
																																		) +
																																			embedstarted.delete(
																																				message
																																					.author
																																					.id
																																			);
																																}
																															)
																															.catch(() => {
																																message.channel.send(
																																	new MessageEmbed()
																																		.setDescription(
																																			`${
																																				message
																																					.client
																																					.emoji
																																					.fail
																																			} ${
																																				language.embedd16
																																			} `
																																		)
																																		.setColor(
																																			message
																																				.guild
																																				.me
																																				.displayHexColor
																																		)
																																) +
																																	embedstarted.delete(
																																		message
																																			.author.id
																																	);
																															});
																													} else {
																														message.channel
																															.send(
																																`${
																																	language.embedd17
																																}`
																															)
																															.catch(() => {});

																														message.channel
																															.awaitMessages(
																																m =>
																																	m.author.id ==
																																	message.author
																																		.id,
																																{
																																	max: 1,
																																	time: 30000
																																}
																															)
																															.then(
																																collected => {
																																	let channel = collected
																																		.first()
																																		.mentions.channels.first();
																																	if (channel) {
																																		let embed = new MessageEmbed()
																																			.setTitle(
																																				title
																																			)
																																			.setDescription(
																																				description
																																			)

																																			.setFooter(
																																				``
																																			);

																																		if (
																																			image !==
																																			'none'
																																		)
																																			embed.setImage(
																																				image
																																			);
																																		if (
																																			thumbnail !==
																																			'none'
																																		)
																																			embed.setThumbnail(
																																				thumbnail
																																			);

																																		if (
																																			footer !==
																																			'none'
																																		)
																																			embed.setFooter(
																																				mainfooter
																																			);
																																		if (
																																			timestamp !==
																																			'no'
																																		)
																																			embed.setTimestamp();
																																		if (
																																			color ==
																																			'default'
																																		) {
																																			embed.setColor(
																																				message
																																					.guild
																																					.me
																																					.displayHexColor
																																			);
																																		} else
																																			embed.setColor(
																																				`${color}`
																																			);
																																		channel.send(
																																			embed
																																		);
																																		embedstarted.delete(
																																			message
																																				.author
																																				.id
																																		);

																																		return;
																																	} else
																																		message.channel
																																			.send(
																																				new MessageEmbed()
																																					.setDescription(
																																						`${
																																							message
																																								.client
																																								.emoji
																																								.fail
																																						} ${
																																							language.embed15
																																						} `
																																					)
																																					.setColor(
																																						message
																																							.guild
																																							.me
																																							.displayHexColor
																																					)
																																			)
																																			.catch(
																																				() => {}
																																			);
																																	embedstarted.delete(
																																		message
																																			.author.id
																																	);
																																}
																															)
																															.catch(() => {
																																message.channel
																																	.send(
																																		new MessageEmbed()
																																			.setDescription(
																																				`${
																																					message
																																						.client
																																						.emoji
																																						.fail
																																				} ${
																																					language.embedd16
																																				} `
																																			)
																																			.setColor(
																																				message
																																					.guild
																																					.me
																																					.displayHexColor
																																			)
																																	)
																																	.catch(
																																		() => {}
																																	);
																																embedstarted.delete(
																																	message.author
																																		.id
																																);
																															});
																													}
																												} else
																													message.channel
																														.send(
																															new MessageEmbed()
																																.setDescription(
																																	`${
																																		message
																																			.client
																																			.emoji
																																			.fail
																																	} ${
																																		language.embed15
																																	} `
																																)
																																.setColor(
																																	message.guild
																																		.me
																																		.displayHexColor
																																)
																														)
																														.catch(() => {});
																											})
																											.catch(() => {
																												message.channel.send(
																													new MessageEmbed()
																														.setDescription(
																															`${
																																message.client
																																	.emoji.fail
																															} ${
																																language.embedd16
																															} `
																														)
																														.setColor(
																															message.guild.me
																																.displayHexColor
																														)
																												);
																											});
																									} else
																										message.channel
																											.send(
																												new MessageEmbed()
																													.setDescription(
																														`${
																															message.client
																																.emoji.fail
																														} ${
																															language.embed15
																														} `
																													)
																													.setColor(
																														message.guild.me
																															.displayHexColor
																													)
																											)
																											.catch(() => {});
																								})
																								.catch(() => {
																									message.channel
																										.send(
																											new MessageEmbed()
																												.setDescription(
																													`${
																														message.client.emoji
																															.fail
																													} ${
																														language.embedd16
																													} `
																												)
																												.setColor(
																													message.guild.me
																														.displayHexColor
																												)
																										)
																										.catch(() => {});
																									embedstarted.delete(
																										message.author.id
																									);
																								});

																							return;
																						} else
																							message.channel
																								.send(
																									new MessageEmbed()
																										.setDescription(
																											`${
																												message.client.emoji
																													.fail
																											} ${language.embed15}`
																										)
																										.setColor(
																											message.guild.me
																												.displayHexColor
																										)
																								)
																								.catch(() => {});
																						embedstarted.delete(
																							message.author.id
																						);
																					})
																					.catch(() => {
																						message.channel
																							.send(
																								new MessageEmbed()
																									.setDescription(
																										`${
																											message.client.emoji.fail
																										} ${language.embedd16} `
																									)
																									.setColor(
																										message.guild.me
																											.displayHexColor
																									)
																							)
																							.catch(() => {});
																						embedstarted.delete(
																							message.author.id
																						);
																					});
																				return;
																			} else
																				message.channel
																					.send(
																						new MessageEmbed()
																							.setDescription(
																								`${message.client.emoji.fail} ${
																									language.embed15
																								} `
																							)
																							.setColor(
																								message.guild.me.displayHexColor
																							)
																					)
																					.catch(() => {});
																			embedstarted.delete(message.author.id);
																		})
																		.catch(() => {
																			message.channel
																				.send(
																					new MessageEmbed()
																						.setDescription(
																							`${message.client.emoji.fail} ${
																								language.embedd16
																							} `
																						)
																						.setColor(
																							message.guild.me.displayHexColor
																						)
																				)
																				.catch(() => {});
																			embedstarted.delete(message.author.id);
																		});

																	return;
																} else
																	message.channel
																		.send(
																			new MessageEmbed()
																				.setDescription(
																					`${message.client.emoji.fail} ${
																						language.embed15
																					} `
																				)
																				.setColor(
																					message.guild.me.displayHexColor
																				)
																		)
																		.catch(() => {});
																embedstarted.delete(message.author.id);
															})
															.catch(() => {
																message.channel
																	.send(
																		new MessageEmbed()
																			.setDescription(
																				`${message.client.emoji.fail} ${
																					language.embedd16
																				}`
																			)
																			.setColor(
																				message.guild.me.displayHexColor
																			)
																	)
																	.catch(() => {});
																embedstarted.delete(message.author.id);
															});

														return;
													} else
														message.channel
															.send(
																new MessageEmbed()
																	.setDescription(
																		`${message.client.emoji.fail} ${
																			language.embed15
																		} `
																	)
																	.setColor(message.guild.me.displayHexColor)
															)
															.catch(() => {});
													embedstarted.delete(message.author.id);
												})
												.catch(() => {
													message.channel
														.send(
															new MessageEmbed()
																.setDescription(
																	`${message.client.emoji.fail} ${
																		language.embedd16
																	} `
																)
																.setColor(message.guild.me.displayHexColor)
														)
														.catch(() => {});
													embedstarted.delete(message.author.id);
												});

											return;
										} else
											message.channel
												.send(
													new MessageEmbed()
														.setDescription(
															`${message.client.emoji.fail} ${
																language.embed15
															} `
														)
														.setColor(message.guild.me.displayHexColor)
												)
												.catch(() => {});
										embedstarted.delete(message.author.id);
									})
									.catch(() => {
										message.channel
											.send(
												new MessageEmbed()
													.setDescription(
														`${message.client.emoji.fail} ${
															language.embedd16
														}d `
													)
													.setColor(message.guild.me.displayHexColor)
											)
											.catch(() => {});
										embedstarted.delete(message.author.id);
									});

								return;
							} else message.reply('stop');
							embedstarted.delete(message.author.id);
						})
						.catch(() => {
							message.channel
								.send(
									new MessageEmbed()
										.setDescription(
											`${message.client.emoji.fail} ${language.embedd16} `
										)
										.setColor(message.guild.me.displayHexColor)
								)
								.catch(() => {});
							embedstarted.delete(message.author.id);
						});

					return;
				} else message.delete();
				message.channel
					.send(
						new MessageEmbed()
							.setDescription(
								`${message.client.emoji.fail} ${language.embed15} `
							)
							.setColor(message.guild.me.displayHexColor)
					)
					.catch(() => {});
				embedstarted.delete(message.author.id);
			})
			.catch(() => {
				message.channel.send(
					new MessageEmbed()
						.setDescription(
							`${message.client.emoji.fail} ${language.embedd16} `
						)
						.setColor(message.guild.me.displayHexColor)
				);
				embedstarted.delete(message.author.id);
			});
	}
};
