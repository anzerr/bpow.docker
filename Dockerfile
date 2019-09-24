FROM rust:1-slim-buster
COPY . /app
RUN apt-get update && apt-get upgrade -y && \
	apt-get install -y ocl-icd-opencl-dev build-essential && \
	cd /app/nano-work-server && \
	cargo build --release && \
	cd target/release && \
	cd /app/boompow/client/ && \
	rm -Rf bin logs *.bat *.md .gitignore

FROM python:3.8-rc-slim-buster
ENV address="ban_3zi3ku5dqbdn1uzggcu9gggut1bojsa1a1jurdqnmcnohy94nu6bo3fo19cp"
ENV type="-c 4"
ENV work="any"
ENV PYTHONUNBUFFERED="1"
COPY --from=0 /app/nano-work-server/target/release/nano-work-server /app/nano-work-server
COPY --from=0 /app/boompow/client /app/client
COPY bin/supervisord.conf /etc/supervisord.conf
RUN apt-get update && apt-get upgrade -y && \
	apt-get install -y ocl-icd-libopencl1 supervisor && \
	mkdir -p /app/client/logs && mkdir -p /logs/ && \
	echo "" > /app/client/logs/bpow.log && echo "" > /logs/bpow.log && \
	cd /app/client && pip3 install --no-cache-dir --user -r requirements.txt
ENTRYPOINT ["/usr/bin/supervisord"]