exports.test = function(req,res) {
    var test = {"city":{"id":6167865,"name":"Toronto","coord":{"lon":-79.416298,"lat":43.700111},"country":"CA","population":0},"cod":"200","message":0.2675,"cnt":2,"list":[{"dt":1474995600,"temp":{"day":292.87,"min":285.09,"max":292.87,"night":285.09,"eve":289.96,"morn":292.87},"pressure":1003.27,"humidity":66,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"speed":6.61,"deg":221,"clouds":0},{"dt":1475082000,"temp":{"day":293.66,"min":288.18,"max":294.04,"night":289.79,"eve":292.25,"morn":288.18},"pressure":1011.99,"humidity":66,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":4.77,"deg":108,"clouds":56,"rain":0.45}]};
    res.json(test);
};
