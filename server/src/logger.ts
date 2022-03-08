const { createLogger, transports, format, } = require('winston');
const customFormat = format.combine(

    format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }
    ), format.printf((info: any) => {
        return ` ${info.timestamp} - [${info.level.toLocaleUpperCase().padEnd(7)}] - ${info.message} `
    }
    )
)
const logger = createLogger(
    {
        format: customFormat,

        level: 'debug',
        transports: [

            new transports.Console(),
            new transports.File({ filename: 'app.log', level: 'info' })
        ],


    }
);
module.exports = logger;