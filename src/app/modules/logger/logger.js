var LoggerModel = require('./model');

function logger(level, message, output) {
  log = new LoggerModel({
    level: level,
    message: message
  });

  log.save(function(err) {
    if (err)
      return console.error(err);
  });

  if (!output || output == true)
    console.log('[' + log.createdAt + '][' + log.level + ']: ' + log.message);
}

module.exports = logger;
