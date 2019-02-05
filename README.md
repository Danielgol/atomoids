# Atomoids v2

This game is a second version of the game Atomoids, Final Paper of Federal Institute of Pernambuco's students Adônis França Belo and Daniel Carneiro Rosa, with some changes that I wanted. It was inspired by the classic arcade game Asteroids.

### Run

To run this game you'll need:
* Donwload & Install NodeJS
* Download & Install CouchDB
* Download & Install Git Bash

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
3. Go to All Documents and create a New View
  * In "_design/" box, put: **all_scores**
  * In "Index name" box, put: **all**
  * In "Map Function" put:
  ```
    function (doc) {
      emit(doc._id, {playerName: doc.playerName, points: doc.points, rev: doc._rev});
    }
  ```
  * Create the new view.

After cloning the repository, open git bash inside project's folder and execute the following code to install nodemon:
```
npm install -g nodemon
```

To run the game, run the code:
```
npm start
```

And FINALLY, to play the game, access your localhost on door 3000: [http://localhost:3000/](http://localhost:3000/)

ENJOY!!! :D

### Tools:

HTML, JavaScript, Node Js, Express, SAT (Collision Framework), Jasmine.

### Originally Developed by:

Adônis França (@AdonisBelo)
Daniel Carneiro (@Danielgol)
