# Email reports

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
