FROM alpine:3

WORKDIR /

ENTRYPOINT ["/entrypoint.sh"]

COPY ["entrypoint.sh", "release-filter.jq", "/"]
