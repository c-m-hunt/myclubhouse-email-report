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

## Sample output

```
date,time,opened,dropped,sent
30/10/2021, 22:53:00,1,0,1
29/10/2021, 09:11:00,12,0,0
28/10/2021, 22:26:00,129,5,101
24/10/2021, 16:17:00,2,0,0
24/10/2021, 15:52:00,1,0,0
24/10/2021, 15:46:00,1,0,0
23/10/2021, 13:04:00,0,0,1
23/10/2021, 08:43:00,3,0,0
22/10/2021, 20:30:00,0,0,1
22/10/2021, 17:40:00,2,0,0
22/10/2021, 12:54:00,2,0,0
20/10/2021, 21:32:00,1,0,0
20/10/2021, 21:07:00,128,5,110
20/10/2021, 16:29:00,1,0,0
19/10/2021, 21:43:00,1,0,0
19/10/2021, 20:54:00,1,0,0
18/10/2021, 21:10:00,1,0,0
18/10/2021, 18:23:00,3,0,2
18/10/2021, 12:02:00,1,0,0
17/10/2021, 18:37:00,1,0,0
17/10/2021, 14:58:00,0,0,1
```
