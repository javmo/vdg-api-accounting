const app = require('./app');
const logger = require('./services/logger');

app.listen(process.env.PORT || 3000);
logger.info('Server on port ' + `${process.env.PORT || 3000}`);