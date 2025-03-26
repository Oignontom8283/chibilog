import chibiLog, { StandardsDateFormatter } from '../dist/index'

const logger = new chibiLog({
    logDir: './logs',
    minimumLogLevel: 0,
    clearANSIColorInFile: true,
    clearANSICOlorInConsole: false,
    dateFormatter: StandardsDateFormatter.ISO_8601
})

logger.trace('Hello, world !')
logger.debug('Hello, world !')
logger.info('Hello, world !')
logger.log('Hello, world !', "slaut", "coucou", {tags: ["tag1", "tag2"], sep: " ▧ "})
logger.error('Hello, world !')
logger.fatal('Hello, world !')

logger.info("ID :", logger.id)
