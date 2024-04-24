# Seminaires LIRICA

- - - - - Projet Web L3 Informatique, Semestre 6, Luminy
- - - - - Auteur : Nadjim BOUZIDI 

* Outils utilisés : L'application est un site web, contenant un dossier Backend, et un dossier FrontEnd. 
- * La partie BackEnd est gérée par un serveur nodejs, elle gère une base de données nommée "liricadb", pour permettre les interractions avec l'utilisateur.

Installation : "https://nodejs.org/en/download/" -> installer express, dotenv, cors, et mysql "npm install --save express mysql dotenv cors" -> installer nodemon (facultatif, important pour le developpement) "npm install --save-dev nodemon".

Utilisation : "cd BackEnd" -> "npm start" pour lancer le serveur (en localhost:8080).

- * La partie FrontEnd est gérée par la CLI Angular, elle représente l'architecture globale du site web, ainsi que les fonctionnalités que le site contient (en interagissant potentiellement avec la bdd).

Installation : "npm install -g angular/cli" pour installer AngularCLI, "npm install" pour les packages nécessaires à l'application, "npm i ngx-ui-loader" pour les spinners que j'utilise notamment au Login, Signup, Add-seminar, et les options de recherche.

Utilisation : "cd FrontEnd" -> "ng serve" ou "ng s" pour lancer le projet Angular (en localhost:4200).

* Fonctionnalités :

- * Le site web est une application SPA (Single Page Application), qui utilise donc des routes pour définir l'affichage sur la page. Les routes utilisées sont "/home", "/" (les deux représentent la page d'accueil), "/login", "/signup", "/search", et "/add-seminar".
- * Avant de se connecter :  toutes les pages possèdent le même header, le seul détail qui diffère entre avant et après la connexion est le slider qui se trouve tout à gauche (avant de se login : "Login/Signup", après : "New seminar/Disconnect"). La page principale affiche toujours la liste des séminaires de l'année courante, avec une option pour afficher les séminaires des années précédentes.
- * Une barre de recherche se trouve au header, elle permet de retrouver un séminaire grace à une partie de son titre, et on a également un bouton recherche avancée, qui permets de rechercher un/des séminaire(s) particulier(s), en mentionnant l'un des champs "titre, orateur, date, langue...etc", la base de données s'occupe de sélectionner les séminaires suivant ce que l'utilisateur décide de spécifier.
- * Après la connexion : La seule différence est qu'un utilisateur connecté peux ajouter un nouveau séminaire à la base de données, plusieurs autres fonctionnalités étaient prévu, mais par manque de temps je me suis contenté de ce qui se trouve sur la page web (je devais gérer l'inscription des utilisateurs en demandant l'accord d'un administrateur, et un utilisateur validé devait pouvoir ajouter/modifier un séminaire). Pour l'instant l'utilisateur est inscrit dès qu'il renseigne ses identifiants (avec certaines contraintes définies dans la partie frontend: password.length>=8, verifyEmail()...), et peut également ajouter un séminaire avec plus ou moins les mêmes contraintes.
- * Pour finir : les séminaires affichés sont représentés sous forme de carte, avec le titre, l'orateur/oratrice, la date, le lieux, et une partie du résumé. ces cartes sont cliquable pour permettre à l'utilisateur de voir les détails de chaque séminaire dans son integralité.

* Tests : 

- * Pour tester les différentes fonctionnalités, un compte générique à été crée sur la bdd : {email: "jean.dupont@domaine.com", password: "12345678"}, vous pouvez également en créer un nouveau sur le bouton signup.

- * Le code source de la page web se trouve également sur mon compte etulab en publique, mais malheureusement je n'ai pas encore pu héberger le site directement sur github.
- * Lien etulab : https://etulab.univ-amu.fr/b19025326/seminaires-lirica


*Mise à jour :
- vu que le rendu a été repoussé au 24 (aujourd'hui), j'ai ajouté quelques fonctionnalité :

** role : maintenant l'utilisateur peu avoir 3 roles : admin, maintainer, ou user. chacun a des autorisations précises :
    user : peut uniquement consulter les séminaires existants.
    mainainer: les même autorisations que user, mais peut également ajouter des séminaires.
    admin : memes autorisations que maintainer, et peut aussi modifier les infos des utilisateurs existant, et modifier/supprimer des   séminaires.
** admin : un admin a accès à l'icone de la roue, qui ouvre les paramètres : là il pourra accepter/supprimer les nouveaux utilisateurs et leur acorder un role. il peut acceder à la liste des utilisateurs et modifier leurs infos (appart les autres admins), et il peut acceder à la page permettant de créer un séminaire (/add-seminar), et celle permettant de les modifier (/manage-seminars).

la page /manage-seminars est similaire a celle affichant les séminaires. sauf qu'au lieu d'afficher les détails d'un séminaire en cliquant dessus, le serveur récupère les infos de ce dernier, et l'admin peut les voir et les modifier, ou également supprimer ce séminaire de la bdd.

L'utilisateur est maintenant obligé de se connecter (en tant que user ou autre, les utilisateurs dont le role n'a pas été attribué ont leur compte non confirmé) pour pouvoir visualiser les séminaires.

le principe est le même pour la liste des utilisateur lors des modifications/suppressions de ces derniers.

utilisateurs déjà inscrits dans la bdd pour faciliter les tests :
--admin: {email:"a@a.aa", password:"aaaaaaaa"}
--maintainer: {email:"m@m.mm, password:"mmmmmmmm"}
--user: {email: "u@u.uu", password: "uuuuuuuu"}


ps: la page "help" n'a pas été terminée par manque de temps après l'ajout des nouvelles fonctionnalités.
