import chalk from "chalk";
import * as path from "path";
import * as fs from "fs";
import { StandardsDateFormatter, LogLevel, LogLevelColors, DefaultTagsType, clearAnsiCode, colorizeTagString, getEnumKey, generateId, DefaultTags, LogArguments } from "./utils";
import { LoggersInstances } from "./instances";

export * from "./utils";

type LoggerSettings = {
    logDir:string;
    minimumLogLevel: LogLevel;
    customId: string;
    fileNameFormatter: (time:Date) => string;
    logFormatter:(time:string, level:LogLevel, content:string, tags:string[]) => string;
    dateFormatter: (date:Date) => string;
    logToConsole:boolean;
    clearANSIColorInFile:boolean;
    clearANSICOlorInConsole:boolean;
}
type InternSettings = Omit<LoggerSettings, 'customId'>


type ParamsLogFunction = (any | { tags?: string[], sep?: string })[];


type Tag = DefaultTagsType | (string & {});


/**
 * The `Logger` class of the **ChibiLog** library.
 */
class Logger {

    private settings:InternSettings;

    /**
     * The unique identifier of the logger instance.
     */
    public readonly id:string;


    constructor(loggerSettings:Partial<LoggerSettings>) {

        const { customId, ...clearSettings } = loggerSettings;

        // Generate a unique identifier for the logger instance
        this.id = customId?.trim().toLocaleLowerCase() || LoggersInstances.createId();

        // Define the settings for the logger instance
        this.settings = {...{
            logDir: './logs',
            minimumLogLevel: LogLevel.info,
            fileNameFormatter: this.default_fileNameFormatter,
            logFormatter: this.default_logFormatter,
            logToConsole: true,
            dateFormatter: StandardsDateFormatter.ISO_8601,
            clearANSIColorInFile: true,
            clearANSICOlorInConsole: false
        }, ...clearSettings};

        // Ensure the log folder is an absolute path
        if (!path.isAbsolute(this.settings.logDir)) this.settings.logDir = path.resolve(this.settings.logDir)

        // Add the logger instance to the collection
        LoggersInstances.add(this);

        console.debug('ChibiLog constructor'); // Debug
    }

    private logging(args:LogArguments) {
        const { message, params, time, level, print } = args;

        const date = this.settings.dateFormatter(time);
        const content = this.settings.logFormatter(date, level, message, params.tags);
        const filePath = path.join(this.settings.logDir, this.settings.fileNameFormatter(time));


        let consoleContent = !print ? content : message;
        consoleContent = this.settings.clearANSICOlorInConsole ? clearAnsiCode(consoleContent) : consoleContent;

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
        this.writeLineToFile(fileContent, filePath);
    }

    private argsExtractor(args: ParamsLogFunction, tags:string[] = []):{ message:string, params: {tags: string[], sep: string} } {
        let sep: string = ' ';
        let message: string[];
    
        // Extract the log parameters from the arguments. And convert them to strings
        const lastArg = args[args.length - 1];
        if (typeof lastArg === "object" && lastArg !== null && ("tags" in lastArg || "sep" in lastArg)) {
            tags = lastArg.tags || [];
            sep = lastArg.sep || ' ';
            message = (args.slice(0, -1) as any[]).map(arg => `${arg}`);
        } else {
            message = (args as any[]).map(arg => `${arg}`);
        }
        
        return { message: message.join(sep), params: { tags, sep} }
    }

    private preLogger(args: ParamsLogFunction, level: LogLevel, tags: Tag[] = [], print:boolean=false):void {
    
        this.logging({
            ...this.argsExtractor(args, tags),
            time: new Date(),
            level,
            print
        });
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

    private default_logFormatter(time:string, level:LogLevel, content:string, tags:string[]):string {
        const timeString = chalk.gray(time);
        const levelString = LogLevelColors[level](getEnumKey(LogLevel, level)!.toUpperCase());
        let tagsString = tags.map(tag => chalk.bold(colorizeTagString(tag.toUpperCase()))).join(", ");
        if (tagsString !== "") tagsString = ` (${tagsString})`;
    
        return `[${timeString}] [${levelString}]${tagsString} ${content}`;
    }
    
    private default_fileNameFormatter(time:Date):string {
        const day = `${time.getDate().toString().padStart(2, '0')}-${(time.getMonth() + 1).toString().padStart(2, '0')}-${time.getFullYear()}`;
        return `log_${process.pid}_${day}.log`;
    }

    //

    public trace(...args:ParamsLogFunction) {
        this.preLogger(args, LogLevel.trace, [DefaultTags.VERBOSE]);
    }

    public debug(...args:ParamsLogFunction) {
        this.preLogger(args, LogLevel.debug, [DefaultTags.DEBUG]);
    }

    public info(...args:ParamsLogFunction) {
        this.preLogger(args, LogLevel.info);
    }

    public log(...args:ParamsLogFunction) {
        this.preLogger(args, LogLevel.info);
    }

    public audit(...args:ParamsLogFunction) {
        this.preLogger(args, LogLevel.info, [DefaultTags.AUDIT]);
    }

    public warn(...args:ParamsLogFunction) {
        this.preLogger(args, LogLevel.warn, [DefaultTags.WARN]);
    }

    public error(...args:ParamsLogFunction) {
        this.preLogger(args, LogLevel.error, [DefaultTags.ERROR]);
    }

    public fatal(...args:ParamsLogFunction) {
        this.preLogger(args, LogLevel.fatal);
    }

    public print(...args:ParamsLogFunction) {
        this.preLogger(args, LogLevel.info, [DefaultTags.PRINT], true);
    }

    public logger(level:LogLevel, ...args:ParamsLogFunction) {
        this.preLogger(args, level);
    }
}

export default Logger;