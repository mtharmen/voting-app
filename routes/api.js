exports.send = function(req,res) {
    var test = {
      id: '99', 
      owner: 'server' , 
      title: 'Testing', 
      data: [5,12,9], 
      labels: ['Choice One', 'Choice Two', 'Choice Three']
    }
    res.json(test);
};

exports.save = function(req,res) {
    console.log(req.body)
    res.send('poll saved')
};

