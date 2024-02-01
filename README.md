
# Mini-Projet - Guide de Démarrage

Ce guide fournit des instructions pour lancer le mini-projet localement sur votre machine.


## Conditions API

- Si c’est un marocain, l’âge minimum doit être de 16 ans
- Si c’est un étranger, l’âge min est 18 ans
- A partir de la 11ème inscription, l’âge du nouveau inscrit doit être entre la moyenne des âges + 10% et la moyenne des âges - 10%.
- Si l’inscription est faite entre 12h et 21h, l’état est valide, si non l’état est en attente

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants sur votre système :

- **Node.js:** Téléchargez et installez Node.js à partir du site officiel : https://nodejs.org
- **Docker:** Installez Docker en suivant les instructions fournies sur le site officiel : https://docs.docker.com/get-docker/



## Installation

1. Clonez ce repo sur votre machine en utilisant la commande suivante :

```bash
$ git clone https://github.com/ravdevman/mini-project.git
```
2. Accédez au répertoire du projet :

```bash
$ cd mini-project
```

3. Installez les dépendances du projet en exécutant la commande suivante :

```bash
$ npm install
```
## Lancement de l'Application
**Avec Docker Compose**
1. Assurez-vous que Docker est en cours d'exécution sur votre machine.
2. Dans le répertoire racine du projet, exécutez la commande suivante pour démarrer l'application avec Docker Compose :
```bash
$ docker-compose up
```

3.  Attendez que Docker compose construise les images et lance les conteneurs.

4. Une fois que tout est prêt, ouvrez votre navigateur web et accédez à l'URL suivante : http://localhost pour accéder au client.

## Test

**Client**

Pour faciliter les tests, un fichier JSON contenant des membres est disponible dans le répertoire du projet sous le nom `memberListTest.json` Vous pouvez l'utiliser pour tester l'importation par fichier.

**Api**

Vous pouvez lancer des tests automatisés en utilisant la commande suivante :
```bash
$ npm test
```


## Arrêt de l'Application

Pour arrêter l'application, vous pouvez utiliser la combinaison de touches **Ctrl + C dans le terminal**.


## Auteur

- [@ravdevman](https://github.com/ravdevman)

