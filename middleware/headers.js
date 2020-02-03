module.exports = function(req, res, next) { 
    //tells the server specific origin locations that can be communicated with the server
    res.header('Access-Control-Allow-Origin', '*');//requests are allowed originating from anywhere
    res.header('access-control-allow-methods', 'OPTIONS, GET, POST, PUT, DELETE'); //our server will only accept these 4 request methods
    res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); //specific header types the server will accept fom the client 
next(); //pre-flight request - if passes then sends the request along to the next destination
};