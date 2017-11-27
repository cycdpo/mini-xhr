/**
 * mock ajax api
 * @param apiName
 * @param data
 * @param timeout
 * @returns {function(*, *=, *=)}
 */
module.exports = ({
                    apiName,
                    data = null,
                    timeout = 200,
                  }) => {
  return () => {
    apiName = '[' + apiName + ']';

    return (req, res, next) => {

      var remoteAddress = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress
      ;

      // set res header
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Content-Type", "application/json;charset=UTF-8");

      // receive client data
      req.on('data', e => {

        // log
        console.log(
          apiName + ' Receive a require' + '\n' +
          apiName + ' -----------------' + '\n' +
          apiName + ' Method: ' + req.method + '\n' +
          apiName + ' RemoteAddress: ' + remoteAddress + '\n' +
          apiName + ' Data: ' + e + '\n'
        );

        // deferred execution
        setTimeout(() => {
          res.end(JSON.stringify(data));
          next();
        }, timeout);
      });

      // error handle
      req.on('err', err => {
        // print error
        console.log(
          apiName + ' Error: ' + err + '\n'
        );

        res.end('Error:' + err);
        next();
      });
    };
  };
};