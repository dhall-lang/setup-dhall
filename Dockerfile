FROM alpine:3

ENTRYPOINT ["/src/entrypoint.sh"]

ADD src /src
