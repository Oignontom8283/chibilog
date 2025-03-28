function colorizeJavaScript(jsString: string): string {
    const colors = {
        keyword: "\x1b[35m", // Magenta
        string: "\x1b[32m", // Vert
        number: "\x1b[36m", // Cyan
        boolean: "\x1b[33m", // Jaune
        null: "\x1b[31m", // Rouge
        function: "\x1b[34m", // Bleu
        reset: "\x1b[0m", // Reset
    };

    return jsString.replace(/\b(function|return|if|else|for|while|switch|case|break|continue|const|let|var|new|this|class|extends|super|import|export|default|async|await|try|catch|finally|throw)\b|("(?:\\"|[^"])*"|'(?:\\'|[^'])*'|`(?:\\`|[^`])*`)|(\b\d+\.?\d*\b)|(true|false)|(null)|(\b[A-Za-z_][A-Za-z0-9_]*\b)(?=\s*\()/g, (match, keyword, str, num, bool, nullValue, funcName) => {
        if (keyword) return colors.keyword + keyword + colors.reset;
        if (str) return colors.string + str + colors.reset;
        if (num) return colors.number + num + colors.reset;
        if (bool) return colors.boolean + bool + colors.reset;
        if (nullValue) return colors.null + nullValue + colors.reset;
        if (funcName) return colors.function + funcName + colors.reset;
        return match;
    });
}

// Exemple d'utilisation
const jsCode = `
// Déclaration des variables
var message = "Bienvenue dans le monde du JavaScript!";
var nombre = 10;
var tableau = [1, 2, 3, 4, 5];
var objet = { nom: "Code", type: "Exemple" };

// Affichage dun message
console.log(message);

// Fonction avec une condition et une boucle
function compterJusqua(n) {
    if (n <= 0) {
        console.log("Veuillez entrer un nombre positif.");
        return;
    }
    
    for (var i = 1; i <= n; i++) {
        console.log("Nombre: " + i);
    }
}

// Appel de la fonction
compterJusqua(nombre);

// Boucle while
var compteur = 0;
while (compteur < 5) {
    console.log("Compteur: " + compteur);
    compteur++;
}

// Boucle do...while
var tentative = 0;
do {
    console.log("Tentative numéro: " + tentative);
    tentative++;
} while (tentative < 3);

// Utilisation de switch
var jour = "mardi";
switch (jour) {
    case "lundi":
        console.log("Début de la semaine.");
        break;
    case "mardi":
        console.log("Deuxième jour.");
        break;
    default:
        console.log("Jour inconnu.");
}

// Manipulation des tableaux
console.log("Premier élément du tableau: " + tableau[0]);
tableau.push(6);
console.log("Tableau après ajout: " + tableau);

// Manipulation des objets
console.log("Nom de l'objet: " + objet.nom);
objet.categorie = "Programmation";
console.log("Objet mis à jour: " + objet);

`;
console.log(colorizeJavaScript(jsCode));
