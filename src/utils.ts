import chalk, { ChalkInstance } from "chalk";

/**
 * Represents the severity levels of log messages.
 * 
 * @enum {number}
 * @property {number} trace - The most detailed level of logging, typically used for development and debugging.
 * @property {number} debug - Used for debugging information that is less detailed than `trace`.
 * @property {number} info - General informational messages that highlight the progress of the application.
 * @property {number} warn - Indicates a potential issue or situation that should be noted.
 * @property {number} error - Represents an error that has occurred, typically requiring attention.
 * @property {number} fatal - The most severe level, indicating a critical failure that may cause the application to terminate.
 */
export enum LogLevel {
    "trace" = 0,
    "debug" = 1,
    "info"  = 2,
    "warn"  = 3,
    "error" = 4,
    "fatal" = 5
}

/**
 * A mapping of log levels to their corresponding color formatting functions.
 * Each log level is associated with a specific color or style provided by the `chalk` library.
 *
 * @remarks
 * This object is used to visually distinguish log messages based on their severity.
 *
 * @example
 * ```typescript
 * console.log(LogLevelColors[LogLevel.info]("This is an info message"));
 * ```
 *
 * @see LogLevel - Enum representing the different log levels.
 * @see chalk - Library used for terminal string styling.
 */
export const LogLevelColors = {
    [LogLevel.trace]: chalk.cyan,
    [LogLevel.debug]: chalk.blue,
    [LogLevel.info]: chalk.greenBright,
    [LogLevel.warn]: chalk.yellow,
    [LogLevel.error]: chalk.red,
    [LogLevel.fatal]: chalk.bgRed.white,
}

/**
 * Enum representing default log tags used for categorizing log messages.
 */
export enum DefaultTags {

    /**
     * The tag for a successful operation.
     */
    SUCCESS = "SUCCESS",

    /**
     * The tag for a important information.
     */
    NOTICE = "NOTICE",

    /**
     * The tag for a verbose information.
     */
    VERBOSE = "VERBOSE",

    /**
     * The tag for a print message.
     */
    PRINT = "PRINT",

    /**
     * The tag for a user action.
     */
    AUDIT = "AUDIT",

    /**
     * The tag for a debug message.
     */
    DEBUG = "DEBUG",

    /**
     * The tag for a warning.
     */
    WARN = "WARN",

    /**
     * The tag for a error.
     */
    ERROR = "ERROR",
}

/**
 * Represents a type that corresponds to the keys of the `DefaultTags` object.
 * 
 * This type is dynamically derived from the keys of the `DefaultTags` object,
 * ensuring that it always reflects the current structure of `DefaultTags`.
 */
export type DefaultTagsType = keyof typeof DefaultTags;

/**
 * A mapping of default log tags to their corresponding chalk color instances.
 * This is used to define the default color scheme for each log tag.
 *
 * @constant
 * @type {Record<DefaultTagsType, ChalkInstance>}
 *
 * @property {ChalkInstance} [LogDefaultTags.SUCCESS] - The color for success messages (green bright).
 * @property {ChalkInstance} [LogDefaultTags.NOTICE] - The color for notice messages (blue bright).
 * @property {ChalkInstance} [LogDefaultTags.VERBOSE] - The color for verbose messages (gray).
 * @property {ChalkInstance} [LogDefaultTags.AUDIT] - The color for audit messages (yellow).
 * @property {ChalkInstance} [LogDefaultTags.ERROR] - The color for error messages (red bright).
 */
export const DefaultTagsColors: Record<DefaultTagsType, ChalkInstance> = {
    [DefaultTags.SUCCESS]: chalk.greenBright,
    [DefaultTags.NOTICE]: chalk.blueBright,
    [DefaultTags.VERBOSE]: chalk.gray,
    [DefaultTags.AUDIT]: chalk.magentaBright,
    [DefaultTags.DEBUG]: chalk.cyanBright,
    [DefaultTags.PRINT]: chalk.white,
    [DefaultTags.WARN]: chalk.yellow,
    [DefaultTags.ERROR]: chalk.redBright,
}

export type LogArguments = {
    message: string;
    params: {tags: string[], sep: string};
    time: Date;
    level: LogLevel;
    print: boolean;
}

/**
 * A collection of date formatting functions.
 * 
 * Provides methods to format a `Date` object into different string representations:
 * - `ISO_8601`: Formats the date as an ISO 8601 string.
 * - `LOCAL`: Formats the date as a locale-specific string.
 * - `UTC`: Formats the date as a UTC string.
 * 
 * @example
 * ```typescript
 * const date = new Date();
 * console.log(DefaultDateFormat.ISO_8601(date)); // Outputs: "2023-03-15T12:34:56.789Z"
 * console.log(DefaultDateFormat.LOCAL(date));   // Outputs: "3/15/2023, 12:34:56 PM" (varies by locale)
 * console.log(DefaultDateFormat.UTC(date));     // Outputs: "Wed, 15 Mar 2023 12:34:56 GMT"
 * ```
 */
export const StandardsDateFormatter= {
    /**
     * The [ISO 8601 standard](https://en.wikipedia.org/wiki/ISO_8601) is a standard from the 
     * [International Organization for Standardization](https://en.wikipedia.org/wiki/International_Organization_for_Standardization) 
     * (ISO) that specifies the numerical representation of dates and times, based on the Gregorian calendar and the 24-hour time system.
     *
     * @param {Date} date - The date object to format.
     * @returns {string} The formatted ISO 8601 string.
     * 
     * @example
     * ```typescript
     * const date = new Date();
     * console.log(DefaultDateFormat.ISO_8601(date));
     * ```
     * @output
     * ```date
     * 2023-03-15T12:34:56.789Z
     * ```
     */
    ISO_8601: (date: Date): string => date.toISOString(),

    /**
     * `LOCAL`: Formats the date as a locale-specific string.
     * 
     * @param {Date} date - The date object to format.
     * @returns {string} The formatted local date string.
     * 
     * @example
     * ```typescript
     * const date = new Date();
     * console.log(DefaultDateFormat.LOCAL(date));
     * ```
     * @output
     * ```date
     * 3/15/2023, 12:34:56 PM (varies by locale)
     * ```
     */
    LOCAL: (date: Date): string => date.toLocaleString(),

    /**
     * `UTC`: Formats the date as a UTC string.
     * 
     * @param {Date} date - The date object to format.
     * @returns {string} The formatted UTC date string.
     * 
     * @example
     * ```typescript
     * const date = new Date();
     * console.log(DefaultDateFormat.UTC(date));
     * ```
     * @output
     * ```date
     * Wed, 15 Mar 2023 12:34:56 GMT
     * ```
     */
    UTC: (date: Date): string => date.toUTCString(),
};


/**
 * Retrieves the key of an enum corresponding to a given value.
 *
 * @template T - A generic type extending a record with string keys and any values.
 * @param enumObj - The enum object to search through.
 * @param value - The value to find the corresponding key for.
 * @returns The key of the enum that matches the given value, or `undefined` if no match is found.
 */
export function getEnumKey<T extends Record<string, any>>(enumObj: T, value: T[keyof T]): keyof T | undefined {
    return Object.keys(enumObj).find(key => enumObj[key] === value) as keyof T | undefined;
}

/**
 * Removes ANSI escape codes from a given string.
 * 
 * **This function strips ANSI codes, leaving only the plain text.**
 * 
 * @remarks This function  **does not do the same thing as `chalk.reset()`**. ``reset()` resets the console output, whereas this function cleans up the ANSI code text, making it suitable for comparisons or writing to a file.
 * @remarks This function is useful for removing ANSI codes from strings before writing them to a file.
 * @remarks This function is useful for comparing strings that potentially contain ANSI codes.
 * 
 * @warning **This function is potentially case-sensitive. It may not handle all ANSI code types, or may cause unexpected behavior. If you notice a problem, please report it and propose a fix (:**
 * 
 * @param text - The input string potentially containing ANSI escape codes.
 * @returns A new string with all ANSI escape codes removed.
 */
export function clearAnsiCode(text: string): string {
    return text.replace( /\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])/g , "");
}

/**
 * Applies colorization to a given tag string based on predefined default tag colors.
 *
 * @param text - The input string or a default tag type to be colorized.
 *               If the input matches a default tag, it will be colorized using the corresponding color function.
 *               Otherwise, the input string is returned as-is.
 * @returns The colorized string if the input matches a default tag, or the original string if no match is found.
 */
export function colorizeTagString(text: string | DefaultTagsType):string {
    
    // If the text is a default tag, colorize it
    return text in DefaultTagsColors ? DefaultTagsColors[text as DefaultTagsType](text) : text;
}

/**
 * Generates a random alphanumeric string id of the specified length.
 *
 * @param length - The length of the generated string id. Defaults to 5 if not provided.
 * @returns A randomly generated alphanumeric string id.
 */
export function generateId(length: number = 5): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

/**
 * Enhances a JSON string with syntax highlighting for better readability in the terminal.
 * 
 * The function applies different colors to JSON keys, strings, numbers, booleans, and null values
 * using the `chalk` library.
 * 
 * @param jsonString - The JSON string to be colorized.
 * @returns A colorized version of the input JSON string.
 * 
 * @example
 * ```typescript
 * import chalk from 'chalk';
 * 
 * const json = '{"name": "John", "age": 30, "isAdmin": false, "address": null}';
 * console.log(colorizeJson(json));
 * ```
 */
export function colorizeJson(jsonString: string): string {
    return jsonString.replace(/("(\\\\|\\"|[^"])*"(?=\s*:))|("(\\\\|\\"|[^"])*")|(\b\d+\.?\d*\b)|(true|false)|(null)/g, (match, key, _, str, __, num, bool, nullValue) => {
        if (key) return chalk.yellow(key);
        if (str) return chalk.green(str);
        if (num) return chalk.cyan(num);
        if (bool) return chalk.magenta(bool);
        if (nullValue) return chalk.red(nullValue);
        return match;
    });
}
