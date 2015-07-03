# Logger Module

## Assinatura

`logger(errorLevel, message[, consoleOutput = true])`

## Exemplo

```javascript
var logger = require('/path/to/logger');

logger.register('error', 'An error has occoured');
logger.register('warning', 'Warning message');
logger.register('info', 'Info message');
```
