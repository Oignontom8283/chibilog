import chalk from "chalk";
import * as path from "path";
import * as fs from "fs";
import { StandardsDateFormatter, LogLevel, LogLevelColors, DefaultTagsType, DateFormatter, clearAnsiCode, colorizeTagString, getEnumKey, generateId } from "./utils";

export * from "./utils";

type LoggerSettings = {
    logDir:string;
    minimumLogLevel: LogLevel;
    customId: string;
    fileNameFormatter: (time:Date) => string;
    logFormatter:(time:string, level:LogLevel, content:string, tags:string[]) => string;
    dateFormatter: DateFormatter;
    logToConsole:boolean;
    clearANSIColorInFile:boolean;
    clearANSICOlorInConsole:boolean;
}

type ParamsLogFunction = any[];

type Tag = DefaultTagsType | (string & {});

class ChibiLog {

    private settings:LoggerSettings

    public id:string;

    constructor(loggerSettings:Partial<LoggerSettings>) {

        this.settings = {...{
            logDir: './logs',
            minimumLogLevel: LogLevel.info,
            customId: !loggerSettings.customId?.trim() ? generateId() : loggerSettings.customId,
            fileNameFormatter: this.defaultLogFileNameFormater,
            logFormatter: this.defaultLogTextFormater,
            logToConsole: true,
            dateFormatter: StandardsDateFormatter.ISO_8601,
            clearANSIColorInFile: true,
            clearANSICOlorInConsole: false
        }, ...loggerSettings};

        // Ensure the log folder is an absolute path
        if (!path.isAbsolute(this.settings.logDir)) this.settings.logDir = path.resolve(this.settings.logDir)

        // Define the logger ID
        this.id = this.settings.customId;

        console.debug('ChibiLog constructor');
    }

    private logging(text:string, level:LogLevel, date:Date = new Date(), tags:string[] = []) {
        const time = this.settings.dateFormatter(date);
        const content = this.settings.logFormatter(time, level, text, tags);
        const logFile = path.join(this.settings.logDir, this.settings.fileNameFormatter(date));

        const consoleContent = this.settings.clearANSICOlorInConsole ? clearAnsiCode(content) : content;
        const fileContent = this.settings.clearANSIColorInFile ? clearAnsiCode(content) : content;

        // Log to the console
        if (this.settings.logToConsole && level >= this.settings.minimumLogLevel) {
            // Log to the console based on the log level
            if (level === LogLevel.debug || level === LogLevel.trace)      console.debug(consoleContent);
            else if (level === LogLevel.info)                              console.info(consoleContent);
            else if (level === LogLevel.warn)                              console.warn(consoleContent);
            else if (level === LogLevel.error || level === LogLevel.fatal) console.error(consoleContent);
            else                                                           console.log(consoleContent);
        }

        // Log to the file
        this.writeLineToFile(fileContent, logFile);
    }

    private preLogger(text:string[], level:LogLevel, tags:string[], sep:string=' ') {
        this.logging(text.join(sep), level, new Date(), tags);
    }

    
    private writeLineToFile(content:string, file:string) {
        
        // Ensure the log folder exists
        if (!fs.existsSync(file)) {
            fs.mkdirSync(path.dirname(file), {recursive: true})
            fs.writeFileSync(file, '');
        }
        
        // Append the content to the file
        fs.appendFileSync(file, "\n" + content);
    }
    

    // Default function to setting

    private defaultLogTextFormater(time:string, level:LogLevel, content:string, tags:string[]):string {
        const timeString = chalk.gray(time);
        const levelString = LogLevelColors[level](getEnumKey(LogLevel, level)!.toUpperCase());
        let tagsString = tags.map(tag => chalk.bold(colorizeTagString(tag.toUpperCase()))).join(", ");
        if (tagsString !== "") tagsString = ` <${tagsString}>`;
    
        return `[${timeString}] [${levelString}]${tagsString}: ${content}`;
    }
    
    private defaultLogFileNameFormater(time:Date):string {
        const day = `${time.getDate().toString().padStart(2, '0')}-${(time.getMonth() + 1).toString().padStart(2, '0')}-${time.getFullYear()}`;
        return `log_${process.pid}_${day}.log`;
    }

    //

    public trace(...text:ParamsLogFunction) {
        this.preLogger(text, LogLevel.trace, []);
    }

    public debug(...text:ParamsLogFunction) {
        this.preLogger(text, LogLevel.debug, []);
    }

    public info(...text:ParamsLogFunction) {
        this.preLogger(text, LogLevel.info, []);
    }

    public log(...text:ParamsLogFunction) {
        this.preLogger(text, LogLevel.info, []);
    }

    public warn(...text:ParamsLogFunction) {
        this.preLogger(text, LogLevel.warn, []);
    }

    public error(...text:ParamsLogFunction) {
        this.preLogger(text, LogLevel.error, []);
    }

    public fatal(...text:ParamsLogFunction) {
        this.preLogger(text, LogLevel.fatal, []);
    }

    public logger(level:LogLevel, ...text:ParamsLogFunction) {
        this.preLogger(text, level, []);
    }
}

export default ChibiLog;