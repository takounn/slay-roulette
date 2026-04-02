# Slay Roulette — Guide Utilisateur

Slay Roulette est un bot Discord qui génère des défis de style aléatoires pour les joueurs d'Infinity Nikki. Il combine un mot de chacune des quatre catégories — **Theme**, **Style**, **Color** et **Twist** — pour créer des défis créatifs de dress-up.

## Commandes Joueur

Ces commandes sont accessibles à tous les membres du serveur.

### `/slay`

Génère un défi de style aléatoire.

**Exemple de réponse :**
> Steampunk - Gothique - Pastel - Sneakers only

Chaque tirage est complètement aléatoire et indépendant. Relance simplement la commande pour une nouvelle combinaison !

### `/is-exist <mot>`

Vérifie si un mot existe dans les quatre listes.

| Paramètre | Description |
|---|---|
| `mot` | Le mot ou l'expression à rechercher |

**Exemples :**
- `/is-exist Steampunk` → Trouvé dans : **Theme**
- `/is-exist Dragon` → Pas trouvé dans aucune liste

Utile avant de suggérer un nouveau mot à l'admin — vérifie d'abord s'il existe déjà.

> Note : La réponse n'est visible que par toi (éphémère).

## Commandes Admin

Ces commandes nécessitent le rôle **admin** sur le serveur Discord. Toutes les réponses sont éphémères (visibles uniquement par l'admin).

### Ajouter des entrées

| Commande | Description |
|---|---|
| `/add-theme <nom>` | Ajouter une entrée à la liste Theme |
| `/add-style <nom>` | Ajouter une entrée à la liste Style |
| `/add-color <nom>` | Ajouter une entrée à la liste Color |
| `/add-twist <nom>` | Ajouter une entrée à la liste Twist |

Si le mot existe déjà dans une autre liste, le bot demandera confirmation avec des boutons **Oui / Non**. Tu as 30 secondes pour répondre.

### Supprimer des entrées

| Commande | Description |
|---|---|
| `/del-theme <nom>` | Supprimer une entrée de la liste Theme |
| `/del-style <nom>` | Supprimer une entrée de la liste Style |
| `/del-color <nom>` | Supprimer une entrée de la liste Color |
| `/del-twist <nom>` | Supprimer une entrée de la liste Twist |

Si le mot n'est pas trouvé, le bot te le signale.

### Consulter les listes

| Commande | Description |
|---|---|
| `/show-theme` | Afficher la liste Theme |
| `/show-style` | Afficher la liste Style |
| `/show-color` | Afficher la liste Color |
| `/show-twist` | Afficher la liste Twist |
| `/show-all` | Afficher les quatre listes |

## Astuces

- La réponse de `/slay` est **publique** — tout le monde dans le salon voit le défi. Toutes les autres réponses sont privées.
- Les recherches sont **insensibles à la casse** : `/is-exist steampunk` et `/is-exist Steampunk` donnent le même résultat.
- Les modifications sont sauvegardées immédiatement — pas besoin de redémarrer le bot après un ajout ou une suppression.
- Si une liste est vide, `/slay` affichera une erreur plutôt qu'un défi incomplet.
