var lowRoundAggregation = [
  {$match: {score: {$gt: 65}}},
  {$project: {_id: 0, "golfer_name":1, "score":1}},
  {$group: {_id: "$golfer_name", low_score: {$min: "$score"} }},
  {$project: {_id:0, golfer: '$_id', low_score: "$low_score"}}
]

var highRoundAggregation = [
  {$match: {score: {$gt: 65}}},
  {$project: {_id: 0, "golfer_name":1, "score":1}},
  {$group: {_id: "$golfer_name", high_score: {$max: "$score"} }},
  {$project: {_id: 0, golfer: '$_id', high_score: "$high_score"}}
]

var totalRoundsAggregation = [
  {$match: {score: {$gt: 65}}},
  {$project: {_id: 1, golfer_name: "$golfer_name"}},
  {$group: {_id: "$golfer_name", totalRounds: {$sum: 1} }},
  {$project: {_id: 0, golferName: '$_id', totalRounds: "$totalRounds"}}
]

var avgGirAggregation = [
  {$match: {score: {$gt: 65}}},
  {$project: {_id: 0, golfer_name: "$golfer_name", gir: "$gir"}},
  {$group: {_id: "$golfer_name", avgGir: {$avg: "$gir"} }},
  {$project: {_id: 0, golferName: '$_id', avgGir: "$avgGir"}}
]

var avgPuttGirAggregation = [
  {$match: {score: {$gt: 65}}},
  {$project: {_id: 0, golfer_name: "$golfer_name", puttGir: "$putt_gir"}},
  {$group: {_id: "$golfer_name", avgPuttGir: {$avg: "$puttGir"} }},
  {$project: {_id: 0, golferName: '$_id', avgPuttGir: "$avgPuttGir"}}
]

var avgRoundScoreAggregation = [
  {$match: {score: {$gt: 65}}},
  {$project: {_id: 0, golfer_name: "$golfer_name", score: "$score"}},
  {$group: {_id: "$golfer_name", avgRound: {$avg: "$score"} }},
  {$project: {_id: 0, golferName: '$_id', avgRound: "$avgRound"}}
]

var avgFairwayAggregation = [
  {$match: {score: {$gt: 65}}},
  {$project: {_id: 0, golfer_name: "$golfer_name", fairway: "$fwy"}},
  {$group: {_id: "$golfer_name", avgFairway: {$avg: "$fairway"} }},
  {$project: {_id: 0, golferName: '$_id', avgFairway: "$avgFairway"}}
]

var mostPlayedCourseAggregation = [
  {$match: {score: {$gt: 65}}},
  {$project: {_id: 0, golferName: "$golfer_name", course: "$course"}},
  {$group: {
    _id: {golferName: "$golferName", course: "$course"},
    playCount: {$sum: 1 }}},
  {$project: {
    _id: 0,
    golferName: "$_id.golferName",
    course:     "$_id.course",
    playCount:  "$playCount"}},
  {$sort: {"golferName": 1, "playCount": 1}}
]