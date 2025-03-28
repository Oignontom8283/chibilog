import chalk from "chalk";

function addLineNumbers(text: string): string {

    const lines = text.split("\n").length;

    const body = text.split("\n").map((line, index) => chalk.bgGreenBright.gray(`${(index + 1).toString().padStart(lines.toString().length, '0')}`)+chalk.bgGreenBright.greenBright(`|`)+` ${line}`).join("\n");

    const header = `# ${lines} lignes, ${text.length} charactères #\n`;

    return header + body;
}


// Exemple d'utilisation
const exampleText = `
Premiére ligne
Deuxéme linge
Troisième ligne
Quatrième ligne
Cinquième ligne
Sixième ligne
Septième ligne
Huitième ligne
Neuvième ligne
Dixième ligne
Onzième ligne
Douzième ligne
Treizième ligne
Quatorzième ligne
Quinzième ligne
`.trim();
console.log(addLineNumbers(exampleText));
