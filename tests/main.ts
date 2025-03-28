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
logger.print('Hello, world !')
logger.json({ name: "Alice", age: 25, active: true, hobbies: null, friends:["franck", "patrick"], edge:{general:0.2, strict:"Chemin des bille", su:true} })

logger.info("ID :", logger.id)
