
<p align="center">
	<img src="bin/logo.svg" width="200">
</p>

### `Intro`
![GitHub Actions status | test](https://github.com/anzerr/bpow.docker/workflows/docker/badge.svg)

Docker images to setup a client for [boompow](https://bpow.banano.cc/)

### `Clone`
Clone project and sub modules
``` shell
git clone --recursive -j8 git@github.com:anzerr/bpow.docker.git
git submodule update --init --recursive
git checkout master && git pull origin master
```

### `Build`
Build the image locally
``` shell
git clone --recursive -j8 git@github.com:anzerr/bpow.docker.git
docker build -t anzerr/bpow:latest -t bpow .
```

### `Run`
Run with cpu
``` shell
docker run \
	-e "address=ban_3zi3ku5dqbdn1uzggcu9gggut1bojsa1a1jurdqnmcnohy94nu6bo3fo19cp" \
	-e "type=-g 0:0" \
	-e "work=any" \
	--name bpow \
	anzerr/bpow.docker:latest
```
Run with gpu
``` shell
docker run \
	-e "address=ban_3zi3ku5dqbdn1uzggcu9gggut1bojsa1a1jurdqnmcnohy94nu6bo3fo19cp" \
	-e "type=-c 4" \
	-e "work=any" \
	--name bpow \
	anzerr/bpow.docker:latest
```
