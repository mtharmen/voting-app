/* GET users listing. */
module.exports = function(app) {
    app.get('/', function(req, res, next) {
        res.send('respond with a resource');
    }); 
};