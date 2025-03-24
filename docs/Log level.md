# 📝 Niveaux de logs : TRACE, DEBUG, INFO, WARN, ERROR, FATAL

## **📌 Liste détaillée des niveaux de logs**
| Niveau     | Utilisation principale | Doit être affiché par défaut ? | Exemple |
|------------|------------------------|-------------------------------|---------|
| **TRACE** 🔍 | Détails ultra précis pour le débogage en profondeur | ❌ Non, trop verbeux | "Entrée dans la fonction `processUserData()` avec params: `{id: 42}`" |
| **DEBUG** 🛠 | Informations utiles aux développeurs, mais pas critiques pour l'utilisateur | ❌ Non, sauf en mode debug | "Requête SQL exécutée: `SELECT * FROM users`" |
| **LOG** 🎯 | Messages normaux sans importance particulière, mais utiles | ✅ Oui (si activé par défaut) | "Action utilisateur : ouverture du menu paramètres" |
| **INFO** 📢 | Informations importantes sur l'état du programme | ✅ Oui | "Serveur démarré sur le port 3000" |
| **WARN** ⚠️ | Problèmes non critiques, à surveiller | ✅ Oui | "Espace disque faible : 2GB restants" |
| **ERROR** ❌ | Erreurs sérieuses pouvant perturber le programme | ✅ Oui | "Connexion à la base de données échouée : timeout" |
| **FATAL** ☠️ | Erreur critique empêchant l'exécution | ✅ Oui | "Impossible de charger le noyau du programme, arrêt immédiat" |

---

## **📌 Détail de chaque niveau de log**

### **1️⃣ TRACE** (*Niveau le plus détaillé*)  
- **Objectif** : Afficher **chaque étape interne du programme**, utile pour déboguer des bugs difficiles à trouver.  
- **Affiché par défaut ?** ❌ Non, trop détaillé pour un usage normal.  
- **Où l'utiliser ?**  
  - Lors du suivi **d'un bug spécifique**  
  - Dans une **sandbox / environnement de dev uniquement**  
- **Exemples :**  
  ```sh
  [TRACE] Entrée dans la fonction `calculateDiscount(price=100, userId=42)`
  [TRACE] Calcul de réduction terminé : -10%
  ```

---

### **2️⃣ DEBUG** (*Infos utiles pour devs, mais moins détaillées que TRACE*)  
- **Objectif** : Montrer les informations nécessaires aux développeurs sans trop surcharger.  
- **Affiché par défaut ?** ❌ Non, sauf en mode debug.  
- **Où l'utiliser ?**  
  - Pour suivre **les requêtes SQL, API, mémoire**  
  - Pendant **le développement** pour comprendre ce qui se passe  
- **Exemples :**  
  ```sh
  [DEBUG] Requête SQL exécutée: SELECT * FROM users WHERE id=42
  [DEBUG] Fichier de configuration chargé : config.json
  ```

---

### **3️⃣ LOG** (*Niveau générique, ni trop technique ni trop important*)  
- **Objectif** : Un message normal, utilisé quand un `INFO` n'est pas nécessaire mais que `DEBUG` est trop bas niveau.  
- **Affiché par défaut ?** ✅ Oui, mais peut être désactivé.  
- **Où l'utiliser ?**  
  - Pour des **messages courants** qui ne sont pas critiques  
  - Suivi des **actions utilisateurs non essentielles**  
- **Exemples :**  
  ```sh
  [LOG] L'utilisateur a ouvert l'onglet "Paramètres"
  [LOG] Le mode nuit a été activé
  ```

---

### **4️⃣ INFO** (*Événements normaux mais importants*)  
- **Objectif** : Informer sur l'état du programme, **sans être technique**.  
- **Affiché par défaut ?** ✅ Oui.  
- **Où l'utiliser ?**  
  - Pour signaler **des événements majeurs** dans l'application  
  - Pour afficher des **choses utiles** sans être des erreurs  
- **Exemples :**  
  ```sh
  [INFO] Serveur démarré sur le port 8080
  [INFO] L'utilisateur "Alice" s'est connecté
  ```

---

### **5️⃣ WARN** (*Problèmes non critiques, mais à surveiller*)  
- **Objectif** : Prévenir d'un **risque potentiel**, mais qui ne casse pas l'application.  
- **Affiché par défaut ?** ✅ Oui.  
- **Où l'utiliser ?**  
  - Quand une **ressource approche de la limite**  
  - Quand un **comportement étrange** est détecté  
- **Exemples :**  
  ```sh
  [WARN] Mémoire faible : seulement 200MB restants
  [WARN] Tentative de connexion avec un token expiré
  ```

---

### **6️⃣ ERROR** (*Problèmes sérieux nécessitant une intervention*)  
- **Objectif** : Signaler **une erreur grave**, mais qui **ne fait pas planter** le programme immédiatement.  
- **Affiché par défaut ?** ✅ Oui.  
- **Où l'utiliser ?**  
  - Quand **une action échoue et doit être corrigée**  
  - Si une **connexion échoue** mais peut être réessayée  
- **Exemples :**  
  ```sh
  [ERROR] Impossible de charger le fichier "config.json"
  [ERROR] Échec de la connexion au serveur MySQL
  ```

---

### **7️⃣ FATAL** (*Erreur critique qui force l'arrêt du programme*)  
- **Objectif** : **Signaler une erreur fatale**, où **le programme ne peut pas continuer**.  
- **Affiché par défaut ?** ✅ Oui.  
- **Où l'utiliser ?**  
  - Lorsqu'une **dépendance essentielle est manquante**  
  - Si une **opération vitale** échoue (exemple : noyau corrompu)  
- **Exemples :**  
  ```sh
  [FATAL] Kernel panic: Impossible de charger la mémoire système
  [FATAL] Échec du démarrage du serveur, arrêt immédiat
  ```

---

## **📌 Comment choisir le bon niveau de log ?**
Utilise ce **tableau de décision** pour choisir ton niveau :  

| Situation | Niveau recommandé |
|-----------|------------------|
| Je veux **suivre l'exécution ligne par ligne** pour comprendre un bug | **TRACE** |
| Je veux **voir ce qui se passe en développement** | **DEBUG** |
| Je veux **afficher un message standard** | **LOG** |
| Je veux **informer de l’état du programme** | **INFO** |
| Il y a **un risque potentiel**, mais ça marche encore | **WARN** |
| Il y a **une erreur sérieuse**, mais l'appli tourne encore | **ERROR** |
| Il y a **une erreur critique**, le programme doit s’arrêter | **FATAL** |