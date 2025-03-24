# Norme ISO 8601

La [norme ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) est une norme de l'[Organisation internationale de normalisation](https://en.wikipedia.org/wiki/International_Organization_for_Standardization) (ISO) qui spécifie la représentation numérique de la date et de l'heure, respectivement basées sur le calendrier grégorien et le système horaire sur 24 heures.

## Représentation de la date et de l'heure
La représentation de la date et de l'heure est effectuée comme suit, si l'on souhaite être le plus précis possible :
```
AAAA-MM-JJTHH:MM:SS,ss-/+FF:ff
```

## Exemple (NodeJS date ISO)
```
2025-03-21T22:44:53.042Z
```

## Décomposition des composants
- « AAAA » représente l'année sur quatre chiffres (par exemple : 1959) ;
- « MM » représente le mois sur deux chiffres (par exemple : 12 pour décembre) ;
- « JJ » représente le jour du mois sur deux chiffres (par exemple : 25 pour le 25e jour du mois) ;
- « T » pour time permet de séparer les indications de date (à gauche) et d'heure (à droite) ;
- « HH » représente l'heure en système 24 heures (par exemple : 15) ;
- « MM » représente les minutes (par exemple : 20) ;
- « SS » représente les secondes (par exemple : 49) ;
- « ss » représente les fractions de seconde sur autant d'unités que nécessaire (par exemple : 3342) ;
- « -/+» représente le fuseau horaire, où « + » permet d'indiquer un fuseau en avance sur UTC et « - » permet d'indiquer un fuseau en retard sur UTC ;
- « FF » représente le nombre d'heures d'avance ou de retard sur le fuseau horaire UTC ;
- « ff » représente le nombre de minutes d'avance ou de retard sur le fuseau horaire UTC.