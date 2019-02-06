# Atomoids v2

This game is a second version of the game Atomoids, Term Paper of Federal Institute of Pernambuco's students Adônis França Belo and Daniel Carneiro Rosa, with some changes that I personally wanted. This fork was created for creative reasons, so it probably won't have an end. It was inspired by the classic arcade game Asteroids.

### Run:

To run this game you'll need:
* Donwload & Install NodeJS
* Download & Install Git Bash
* Download & Install CouchDB v. 2.3.0

Next, you'll need to acess CouchDB panel: [http://localhost:5984/_utils/](http://localhost:5984/_utils/).

There, you'll need to:
1. Click on "Create Database" and name it: **atomoids_ranking**
2. Go to All Documents and create a New Doc.
  * Copy and paste this PILOT code:
  ```
    {
      "_id": "853e7ac08f6e6a2053beadc8b9000711",
      "points": "100",
      "playerName": "PILOT"
    }
  ```
  * Save the Document.
3. Go to All Documents and create a New View.
  * In "_design/" box, put: **all_scores**
  * In "Index name" box, put: **all**
  * In "Map Function", copy and paste this function:
  ```
    function (doc) {
      emit(doc._id, {playerName: doc.playerName, points: doc.points, rev: doc._rev});
    }
  ```
  * Create the New View.

After cloning the repository, open Git Bash inside project's folder and execute the following code to install nodemon:
```
npm install -g nodemon
```

**Note: The steps above are only useful for the first time you try to play the game, once you've done it, you'll only need to follow the next step.**

To run the game, execute the following code, on Git Bash, inside project's folder:
```
npm start
```

And FINALLY, to play the game, access your localhost on door 3000: [http://localhost:3000/](http://localhost:3000/).

ENJOY!!! :D

### Tools:

HTML, JavaScript, Node Js, Express, SAT (Collision Framework), Jasmine, CouchDB, Nodemon.

### Interface Language:

Portuguese (Probably it will be changed in the future)

### Originally developed by:

Adônis França Belo (@AdonisBelo)
Daniel Carneiro Rosa (@Danielgol)

### Continued by:

Daniel Carneiro Rosa (@Danielgol)
