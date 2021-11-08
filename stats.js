var c = db.getCollection('emails').aggregate([
{
    $addFields: {
        "sent": {
            "$dateFromString": { 
                "dateString": "$Send Time",
                "format": "%d/%m/%Y %H:%M"
            } 
        },
    }
},
{
    $group: { 
        _id: {group: "$group", status: "$Status"},
        times: {"$addToSet": "$sent"},
        count: {"$count": {}}
    }
},
{
    $group: {
         _id: "$_id.group",
         statuses: {"$push": { k: "$_id.status", v: "$count" }},
         times: { "$push": {"$min": "$times"}}
    }
},
{ $addFields: { group: "$_id.group", status: {"$arrayToObject": "$statuses"}, time: {"$min": "$times"}}},
{ $unset: ["statuses", "times"]},
{ $sort: {"_id": 1}}
])

print("date,time,opened,dropped,sent")
while (c.hasNext()) {
    var rec = c.next()
    print(rec.time.toLocaleString() + "," + (rec.status.Open || 0) + "," + (rec.status.Dropped || 0) + "," + (rec.status.Sent || 0))    
}