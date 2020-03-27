FROM alpine:3

WORKDIR /

ENTRYPOINT ["src/entrypoint.sh"]

ADD src src
