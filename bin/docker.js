
const util = require('dockerfile.util');

const ENUM = {BUILD: 0, FINAL: 1};

class Node extends util.Build {

	constructor(version) {
		super();
		this.dockerfile.push(new util.Dockerfile());
		this.author = 'anzerr';
		this.version = `slim-${version}`;
		this.path = './';
		this.dockerName = 'Dockerfile';
		this.cache = true;
		this.env = {
			VERSION: version
		};
	}

	build() {
		return super.build().then(() => {
			this.dockerfile[ENUM.BUILD]
				.from('alpine:3.9') // todo
				.run([
					// todo
				]);
			this.dockerfile[ENUM.FINAL]
				.from('alpine:3.9')
				// todo
				.cmd('["node"]');
		});
	}

}

module.exports = Node;
