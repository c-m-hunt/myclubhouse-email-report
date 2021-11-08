# Email reports

## Requirements

- Docker
- Mongo shell - https://docs.mongodb.com/mongodb-shell/install/

## Start a Mongo instance

Docker must be running. Allocate local port for local access

```
docker run -d -p 27017:27017 mongo
```

## Import the data

```
mongoimport --type csv -d sosemtcc -c emails --headerline --drop ./DeliveryReports.csv
```

## Generate groups

```
mongosh sosemtcc -f group_emails.js
```

## Get stats

```
mongosh sosemtcc --quiet -f stats.js
```
