var host = process.env.CORS_HOST || '0.0.0.0';
var port = process.env.CORS_PORT || 8080;

var cors_proxy = require('cors-anywhere');
cors_proxy
  .createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: [],
    removeHeaders: []
  })
  .listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
  });
