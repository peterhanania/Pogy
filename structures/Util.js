const fs = require('fs').promises;
const path = require('path');
const Command = require('./Command.js');
const Event = require('./Event.js');
const fetch = require('node-fetch');
const logger = require('../utils/logger');

module.exports = class Util {

	constructor(client) {
		this.client = client;
	}

	isClass(input) {
		return typeof input === 'function' &&
			typeof input.prototype === 'object' &&
			input.toString().substring(0, 5) === 'class';
	}

	trimArray(arr, maxLen = 10) {
		if (arr.length > maxLen) {
			const len = arr.length - maxLen;
			arr = arr.slice(0, maxLen);
			arr.push(`${len} more...`);
		}
		return arr;
	}

	get directory() {
		return `${path.dirname(require.main.filename)}${path.sep}`;
	}

	removeDuplicates(arr) {
		return [...new Set(arr)];
	} 

	capitalise(string) {
		return string
			.split(" ")
			.map((str) => str.slice(0, 1).toUpperCase() + str.slice(1))
			.join(" ");
	}

	async *loadFiles(dir) {
		const files = await fs.readdir(dir);
		for (const file of files) {
			const pathToFile = path.join(dir, file);
			const isDirectory = (await fs.stat(pathToFile)).isDirectory();
			if (isDirectory) {
				yield* this.loadFiles(pathToFile);
			} else {
				yield pathToFile;
			}
		}
	}

	async loadCommands() {
		let success = 0
		let failed = 0
		
		for await (const commandFile of this.loadFiles(`${this.directory}commands`)) {
			delete require.cache[commandFile];
			const { name } = path.parse(commandFile);
			const File = require(commandFile)
			if (!this.isClass(File)) throw new TypeError(`Command ${name} doesn't export a class.`);
			const command = new File(this.client, name.toLowerCase());
			if (!(command instanceof Command)) throw new TypeError(`Comamnd ${name} doesnt belong in Commands.`);
			this.client.commands.set(command.name, command)

			if (command.aliases.length) {
				for (const alias of command.aliases) {
					this.client.aliases.set(alias, command.name);
				}
			}
		}
	}

	async loadEvents() {
		for await (const eventFile of this.loadFiles(`${this.directory}events`)) {
			delete require.cache[eventFile];
			const { name } = path.parse(eventFile);
			const File = require(eventFile);
			if (!this.isClass(File)) throw new TypeError(`Event ${name} doesn't export a class!`);
			const event = new File(this.client, name);
			if (!(event instanceof Event)) throw new TypeError(`Event ${name} doesn't belong in Events`);
			this.client.events.set(event.name, event);
		//logger.info(`✅ loaded: ${event.name}`, { label: 'Events' })
			event.emitter[event.type](name, (...args) => event.run(...args));
		}
	}

};