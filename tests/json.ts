import chalk from 'chalk';

function colorizeJson(jsonString: string): string {
    return jsonString.replace(/("(\\\\|\\"|[^"])*"(?=\s*:))|("(\\\\|\\"|[^"])*")|(\b\d+\.?\d*\b)|(true|false)|(null)/g, (match, key, _, str, __, num, bool, nullValue) => {
        if (key) return chalk.yellow(key);
        if (str) return chalk.green(str);
        if (num) return chalk.cyan(num);
        if (bool) return chalk.magenta(bool);
        if (nullValue) return chalk.red(nullValue);
        return match;
    });
}

// Exemple d'utilisation
const json = JSON.stringify({ name: "Alice", age: 25, active: true, hobbies: null, friends:["franck", "patrick"], edge:{general:0.2, strict:"Chemin des bille", su:true} });
console.log(colorizeJson(json));
