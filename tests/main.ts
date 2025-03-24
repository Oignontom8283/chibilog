import chibiLog, { StandardsDateFormatter } from '../dist/index'

const logger = new chibiLog({
    logDir: './logs',
    minimumLogLevel: 0,
    clearANSIColorInFile: true,
    clearANSICOlorInConsole: false,
    dateFormat: StandardsDateFormatter.ISO_8601
})

logger.trace('Hello, world !')
logger.debug('Hello, world !')
logger.info('Hello, world !', ["SUCCESS", "AUDIT", "salut"])
logger.log('Hello, world !')
logger.error('Hello, world !')
logger.fatal('Hello, world !')