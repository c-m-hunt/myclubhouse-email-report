var dates = db.getCollection('emails').aggregate([
{
    $addFields: {
        "sent": {
            "$dateFromString": { 
                "dateString": "$Send Time",
                "format": "%d/%m/%Y %H:%M"
            } 
        },
        "id": { "$toString": "$_id" }
    }
},
{$sort: {"sent": -1}}])

var groups = {}
var groupID = 0
var maxDiff = 180000

var testDate = null
while (dates.hasNext()) {
    var rec = dates.next()
    var nextDate = rec.sent
    var diff = testDate - nextDate
    
    if (testDate == null || diff > maxDiff) {
        testDate = nextDate
        groupID += 1
    }
    
    groups[rec.id] = groupID
}

updates = []
for (var g in groups) {
    updates.push({ updateOne: {
        filter: {_id: ObjectId(g)},
        update: {"$set": {"group": groups[g]}}
    }})
}

print(db.getCollection('emails').bulkWrite(updates))