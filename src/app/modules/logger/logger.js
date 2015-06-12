var LoggerModel = require('./model');

var logger = {
  register: function(level, message) {
    log = new LoggerModel({
      level: level,
      message: message
    });

    log.save(function(err) {
      if (err)
        return console.error(err);
    });
  }
};

module.exports = logger;
