# Elasticsearch, Logstash and Kibana

link to tutorial: https://levelup.gitconnected.com/docker-compose-made-easy-with-elasticsearch-and-kibana-4cb4110a80dd

commands:

```
docker-compose up -d
docker-compose stop
```

[Kibana:5601](http://localhost:5601)
[Elasticsearch:9200](http://localhost:9200)

## Log levels

The following are the default npm logging levels:

- 0: error
- 1: warn
- 2: info
- 3: http
- 4: verbose
- 5: debug
- 6: silly

Anything at a particular level or higher will be logged. For instance, by specifying the info level, anything at level error, warn, or info will be logged.


## Multiple logger instances

https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-winston-and-morgan-to-log-node-js-applications/#working-with-multiple-loggers-in-winston