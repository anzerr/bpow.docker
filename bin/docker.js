
const util = require('dockerfile.util');

const ENUM = {BUILD: 0, FINAL: 1};

class Node extends util.Build {

	constructor() {
		super();
		this.dockerfile.push(new util.Dockerfile());
		this.author = 'anzerr';
		this.path = './';
		this.dockerName = 'Dockerfile';
		this.env = {
			VERSION: '1.0.0'
		};
	}

	build() {
		return super.build().then(() => {
			this.dockerfile[ENUM.BUILD]
				.from('rust:1-slim-buster')
				.copy('. /app')
				.run([
					'apt-get update && apt-get upgrade -y',
					'apt-get install -y ocl-icd-opencl-dev build-essential',
					'cd /app/nano-work-server',
					'cargo build --release',
					'cd target/release',
					'cd /app/boompow/client/',
					'rm -Rf bin logs *.bat *.md .gitignore'
				]);
			this.dockerfile[ENUM.FINAL]
				.from('python:3.8-rc-slim-buster')
				.env({
					address: '"ban_3zi3ku5dqbdn1uzggcu9gggut1bojsa1a1jurdqnmcnohy94nu6bo3fo19cp"',
					type: '"-c 4"',
					work: '"any"',
					PYTHONUNBUFFERED: '"1"'
				})
				.copy('--from=0 /app/nano-work-server/target/release/nano-work-server /app/nano-work-server')
				.copy('--from=0 /app/boompow/client /app/client')
				.copy('bin/supervisord.conf /etc/supervisord.conf')
				.run([
					'apt-get update && apt-get upgrade -y',
					'apt-get install -y ocl-icd-libopencl1 supervisor',
					'mkdir -p /app/client/logs && mkdir -p /logs/',
					'echo "" > /app/client/logs/bpow.log && echo "" > /logs/bpow.log',
					'cd /app/client && pip3 install --user -r requirements.txt'
				])
				.cmd('["/usr/bin/supervisord"]');
		});
	}

}

module.exports = Node;
