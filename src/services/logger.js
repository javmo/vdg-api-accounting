const { createLogger, format, transports } = require('winston');
const { timestamp, combine } = format;
const emoji = require('node-emoji');

const logFormat = format.printf(({level, message, timestamp, stack}) => {
    return `[${timestamp}] ${level} ${stack || emoji.emojify(message)}`;
});

const logger = createLogger({
    format: combine(
        format.colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({stack: true}),
        logFormat),
    transports: [new transports.Console({ level: 'debug' })],
});

module.exports = logger;