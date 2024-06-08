const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const server = express();
server.use(bodyParser.json());
const cors = require("cors");
server.use(cors());

//Establish the database connection

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bdd_gestion_ecolage",
});

db.connect(function (error) {
  if (error) {
    console.log("Non-connecté");
  } else {
    console.log("Connecté");
  }
});

//Establish the Port CREATION API REST AVEC Express

server.listen(8085, function (error) {
  if (error) {
    console.log("Port pas ok");
  } else {
    console.log("Port ok");
  }
});

//Create the Records

server.post("/api/student/add", (req, res) => {
  let details = {
    nom: req.body.nom,
    prenoms: req.body.prenoms,
    sexe: req.body.sexe,
    nomClasse: req.body.nomClasse,
    nomGroupe: req.body.nomGroupe,
    anneeScolaire: req.body.anneeScolaire,
  };

  let sql = "INSERT INTO eleve SET ?";
  db.query(sql, details, (error) => {
    if (error) {
      console.log(error.message);
      res.send({ status: false, message: "Ereur d'Ajout" });
    } else {
      res.send({ status: true, message: "Ajout réussi" });
    }
  });
});

//view the Records

server.get("/api/student", (req, res) => {
  var sql = "SELECT * FROM eleve";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Erreur de recuperation liste");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

//INFORMATION DE L'ELEVE SI MATRICULE VERIFIER
server.get("/api/student/information/:id", (req, res) => {
  var sql = "SELECT * FROM eleve WHERE matricule = " + req.params.id + "";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Erreur de recuperation liste");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Recuperer CLASSE
server.get("/api/student/classe", (req, res) => {
  var sql = "SELECT * FROM classe";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Erreur recuperation classe");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Recuperer GROUPE
server.get("/api/student/groupe", (req, res) => {
  var sql = "SELECT * FROM groupe";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Erreur recuperation groupe");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Recuperer ANNEE SCOLAIRE
server.get("/api/student/annee", (req, res) => {
  var sql = "SELECT * FROM annee";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Erreur recuperation annee");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

//Search the Records

//Update the Records

server.put("/api/student/update/:matricule", (req, res) => {
  let sql =
    "UPDATE eleve SET nom='" +
    req.body.nom +
    "', prenoms='" +
    req.body.prenoms +
    "',sexe='" +
    req.body.sexe +
    "', nomClasse='" +
    req.body.classe +
    "', nomGroupe='" +
    req.body.groupe +
    "'  WHERE matricule=" +
    req.params.matricule;

  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "update failed" });
    } else {
      res.send({ status: true, message: "update reussi" });
    }
  });
});

//Delete the Records

server.delete("/api/student/delete/:matricule", (req, res) => {
  let id = req.params.matricule;
  let sql = "DELETE FROM eleve WHERE matricule=" + req.params.matricule + "";
  let query = db.query(sql, (error) => {
    if (error) {
      console.log(error.message);
      res.send({ status: false, message: "Student Deleted Failed" });
    } else {
      res.send({ status: true, message: "Student Deleted successfully" });
    }
  });
});

server.delete("/api/student/deletePaiement/:matricule", (req, res) => {
  let sql = "DELETE FROM payer WHERE matricule=" + req.params.matricule + "";
  let query = db.query(sql, (error) => {
    if (error) {
      console.log(error.message);
      res.send({ status: false, message: "paiement Deleted Failed" });
    } else {
      res.send({ status: true, message: "paiement Deleted successfully" });
    }
  });
});

// Vérification matricule

server.get("/api/student/verification/:matricule", (req, res) => {
  var studentid = req.params.matricule;
  var sql =
    "SELECT COUNT(matricule) AS nb FROM eleve WHERE matricule=" + studentid;
  db.query(sql, function (error, result) {
    if (error) {
      console.log(error.sqlMessage);

      console.log("VERIFICATION ID ERREUR");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// INITIALISER DROIT

server.get("/api/student/lastId", (req, res) => {
  let sql = "SELECT matricule FROM eleve ORDER BY matricule DESC LIMIT 1";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Last ID Erreur");
    } else {
      res.send({ status: true, data: result });
      console.log(result[0]);
      let lastId = result[0].matricule;

      //RECUPERER DERINIER ID
      let sql1 = "SELECT nomClasse FROM eleve WHERE matricule = " + lastId + "";
      db.query(sql1, function (error1, result1) {
        if (error1) {
          console.log(error1.message);
        } else {
          let classeEleve = result1[0].nomClasse;

          //TARIFS EN FONCTION DE CLASSE ET GROUPE D'ELEVE
          //MAIS POUR CE PROJET SEULEMENT SUR CLASSE

          let sommeApayer = 0;
          let droitInscription = 20000;
          let fraisG = 26000;
          let vrm = 10000;
          let didec = 2000;
          let assurance = 2000;

          if (classeEleve === "TS" || classeEleve === "TL") {
            sommeApayer = 24000;
            console.log("verser : " + sommeApayer);
          } else if (classeEleve === "1èreU") {
            sommeApayer = 23000;
            console.log("verser : " + sommeApayer);
          } else if (classeEleve === "2nde") {
            sommeApayer = 22000;
            console.log("verser : " + sommeApayer);
          } else if (classeEleve === "3èmeA" || classeEleve === "3èmeB") {
            sommeApayer = 21000;
            console.log("verser : " + sommeApayer);
          } else if (classeEleve === "4ème") {
            sommeApayer = 20000;
            console.log("verser : " + sommeApayer);
          } else if (classeEleve === "5èmeA" || classeEleve === "5èmeB") {
            sommeApayer = 20000;
            console.log("verser : " + sommeApayer);
          } else if (classeEleve === "6ème") {
            sommeApayer = 20000;
            console.log("verser : " + sommeApayer);
          } else if (classeEleve === "7ème") {
            sommeApayer = 19000;
            console.log("verser : " + sommeApayer);
          } else if (classeEleve === "8ème") {
            sommeApayer = 18000;
            console.log("verser : " + sommeApayer);
          } else if (classeEleve === "9ème") {
            sommeApayer = 17000;
            console.log("verser : " + sommeApayer);
          } else if (classeEleve === "JE") {
            sommeApayer = 26000;
            console.log("verser : " + sommeApayer);
          } else {
            //EN CAS D' ERREUR
            sommeApayer = 22000;
          }
        }

        const tableauEcolage = [
          "ASSURANCE",
          "AVRIL",
          "DECEMBRE",
          "DIDEC",
          "DROIT",
          "FEVRIER",
          "Frais G + SPORT",
          "JANVIER",
          "JUIN",
          "MAI",
          "MARS",
          "NOVEMBRE",
          "OCTOBRE",
          "SEPTEMBRE",
          "VRM",
        ];

        for (let i = 0; i < tableauEcolage.length; i++) {
          let sql2 =
            "INSERT INTO payer(matricule, libelle, sommeRecue, sommeRestante) VALUES ('" +
            lastId +
            "', '" +
            tableauEcolage[i] +
            "', '" +
            0 +
            "', '" +
            0 +
            "')";
          db.query(sql2, function (error2, result2) {
            if (error2) {
              console.log(error2.message);
            } else {
              console.log("on initialise paiement");
            }
          });
        }
        /*let sql2 =
          "INSERT INTO payer('matricule', 'libelle', 'sommeRecue', 'sommeRestante') VALUES ('" + lastId + "', '" +  + "')";*/
      });
    }
  });
});
// STATUS DE REGLEMENT DE DROIT

// PARTIE PAIEMENT

server.get("/api/student/carteEcolage/:id", (req, res) => {
  let sql = "SELECT * FROM payer WHERE matricule = '" + req.params.id + "'";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("CARTE ECOLAGE Erreur");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

//LISTE DE PAIEMENT
/*
server.get("/api/student/listePaiement", async (req, res) => {
  let sql = "SELECT DISTINCT(matricule) FROM payer";
  let j = [];

  try {
    const result1 = await new Promise((resolve, reject) => {
      db.query(sql, function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });

    const promises = result1.map((matricule) => {
      let sql =
        "SELECT libelle, sommeRecue FROM payer WHERE matricule = " +
        matricule.matricule;
      return new Promise((resolve, reject) => {
        db.query(sql, function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    });

    const results = await Promise.all(promises);
    j = results;

    res.send({ status: true, data: j });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      status: false,
      message: "Une erreur est survenue lors de la récupération des données.",
    });
  }
});*/

//LISTE PAIE FINAL
server.get("/api/student/listePaiement", async (req, res) => {
  let sql =
    "SELECT DISTINCT(eleve.matricule) AS matricule, eleve.nom AS nom, eleve.nomClasse AS classe, eleve.prenoms AS prenoms FROM eleve INNER JOIN payer ON eleve.matricule = payer.matricule";
  let tableau = [];
  const matricules = [];
  const nomPrenoms = [];
  const classe = [];
  let i = 0;
  let j = 0;
  try {
    const result1 = await new Promise((resolve, reject) => {
      db.query(sql, function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
          while (i < result.length) {
            matricules[i] = result[i]["matricule"];
            nomPrenoms[i] = result[i]["nom"] + " " + result[i]["prenoms"];
            classe[i] = result[i]["classe"];
            i++;
          }
        }
      });
    });

    const promises = result1.map((matricule) => {
      let sql =
        "SELECT libelle, sommeRecue FROM payer WHERE matricule = " +
        matricule.matricule;
      return new Promise((resolve, reject) => {
        db.query(sql, function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    });

    const results = await Promise.all(promises);
    tableau = results;
    const tableau1 = new Array(tableau.length).fill().map(() => []);

    // Move the loop that populates tableau1 here, before sending the response
    i = 0; // Reset i to 0 before the loop
    while (i < tableau.length) {
      j = 0; // Reset j to 0 before the loop
      while (j < tableau[i].length) {
        tableau1[i][j] = tableau[i][j].sommeRecue;
        j++;
      }
      i++;
    }

    // Création du nouveau tableau
    const nouveauTableau = matricules.map((matricule, index) => {
      return [matricule, nomPrenoms[index], classe[index], ...tableau1[index]];
    });

    console.log(nouveauTableau);

    res.send({ status: true, data: nouveauTableau }); // Send tableau1 instead of tableau
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      status: false,
      message: "Une erreur est survenue lors de la récupération des données.",
    });
  }
});

/*
server.get("/api/student/listePaiement", async (req, res) => {
  let sql =
    "SELECT DISTINCT(eleve.matricule) AS matricule, eleve.nom AS nom, eleve.prenoms AS prenoms FROM eleve INNER JOIN payer ON eleve.matricule = payer.matricule";
  let tableau = [];
  const tableau1 = new Array(15).fill().map(() => []);
  const matricules = [];
  const nomPrenoms = [];
  let i = 0;
  let j = 0;
  try {
    const result1 = await new Promise((resolve, reject) => {
      db.query(sql, function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
          while (i < result.length) {
            matricules[i] = result[i]["matricule"];
            nomPrenoms[i] = result[i]["nom"] + " " + result[i]["prenoms"];
            i++;
          }
        }
      });
    });

    const promises = result1.map((matricule) => {
      let sql =
        "SELECT libelle, sommeRecue FROM payer WHERE matricule = " +
        matricule.matricule;
      return new Promise((resolve, reject) => {
        db.query(sql, function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    });

    const results = await Promise.all(promises);
    tableau = results;

    res.send({ status: true, data: tableau });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      status: false,
      message: "Une erreur est survenue lors de la récupération des données.",
    });
  }

  while (i < tableau.length) {
    j = 0; // Declare and initialize j
    while (j < tableau[i].length) {
      // Corrected loop condition
      // Assuming tableau[i] is an array of objects with a property 'libelle'
      // This example copies the 'libelle' property of each object in tableau[i] to tableau1[i][j]
      // Adjust the logic as needed based on your actual data structure
      tableau1[i][j] = tableau[i][j].libelle;
      j++;
    }
    i++;
  }
  console.log(matricules);
  console.log(nomPrenoms);
  console.log(tableau);
  console.log(tableau1);
});*/

/*
server.get("/api/student/listePaiement", (req, res) => {
  const matricules = [];
  const nomPrenoms = [];
  let i = 0;
  sql =
    "SELECT DISTINCT(eleve.matricule) AS matricule, eleve.nom AS nom, eleve.prenoms AS prenoms FROM eleve INNER JOIN payer ON eleve.matricule = payer.matricule";

  var resultat = db.query(sql, function (err, result) {
    if (err) {
      console.log(err.message);
    } else {
      while (i < result.length) {
        matricules[i] = result[i]["matricule"];
        nomPrenoms[i] = result[i]["nom"] + " " + result[i]["prenoms"];
        i++;
      }
    }

    for (let i = 0; i < matricules.length; i++) {
      sql1 =
        "SELECT libelle, sommeRecue FROM payer WHERE matricule = " +
        matricules[i];
      db.query(sql1, function (err, resullt1) {
        if (err) {
          console.log(err.message);
        } else {
          console.log(resullt1);
        }
      });
    }
    console.log(resullt1);
  });
});*/
// RECUPERER LIBELLE

/* server.get("/api/student/listePaiement", async (req, res) => {
  const matricules = [];
  const nomPrenoms = [];
  let i = 0;
  let paiements = []; // Ajout d'un tableau pour stocker les résultats
  sql =
    "SELECT DISTINCT(eleve.matricule) AS matricule, eleve.nom AS nom, eleve.prenoms AS prenoms FROM eleve INNER JOIN payer ON eleve.matricule = payer.matricule";

  try {
    const resultat = await db.query(sql); // Utilisation de await pour attendre la résolution de la promesse
    while (i < resultat.length) {
      matricules[i] = resultat[i]["matricule"];
      nomPrenoms[i] = resultat[i]["nom"] + " " + resultat[i]["prenoms"];
      i++;
    }

    // Utilisation de Promise.all pour attendre que toutes les requêtes soient terminées
    const paiementsPromises = matricules.map((matricule) => {
      return db.query(
        "SELECT libelle, sommeRecue FROM payer WHERE matricule = ?",
        [matricule]
      );
    });

    const paiementsResults = await Promise.all(paiementsPromises);
    paiementsResults.forEach((result) => {
      paiements.push(result);
    });

    console.log(paiements); // Accès à paiements ici
  } catch (err) {
    console.log(err.message);
  }
}); */

// REGLER ECOLAGE
server.put("/api/student/reglerPaiement", (req, res) => {
  let sql =
    "UPDATE payer SET sommeRecue='" +
    req.body.sm_recue +
    "', sommeRestante='" +
    req.body.sm_restante +
    "' WHERE matricule = '" +
    req.body.id +
    "' AND libelle = '" +
    req.body.libelle +
    "'";

  let a = db.query(sql, (error, result) => {
    if (error) {
      console.log(error.message);
      res.send({ status: false, message: "update  paiement failed" });
    } else {
      console.log("PAIEMENT OK");
      res.send({ status: true, message: "update paiement reussi" });
    }
  });
});

// INITIALISER DROIT LORS DE LA REINSCRIPTION

server.delete("/api/reinitialiserPaieReinscription/:matricule", (req, res) => {
  let sql = "DELETE FROM payer WHERE matricule = " + req.params.matricule + "";
  db.query(sql, function (error, result) {
    if (error) {
      console.log(error.message);
      console.log("erreur paie reinscription");
    } else {
      const tableauEcolage = [
        "ASSURANCE",
        "AVRIL",
        "DECEMBRE",
        "DIDEC",
        "DROIT",
        "FEVRIER",
        "Frais G + SPORT",
        "JANVIER",
        "JUIN",
        "MAI",
        "MARS",
        "NOVEMBRE",
        "OCTOBRE",
        "SEPTEMBRE",
        "VRM",
      ];

      for (let i = 0; i < tableauEcolage.length; i++) {
        let sql2 =
          "INSERT INTO payer(matricule, libelle, sommeRecue, sommeRestante) VALUES ('" +
          req.params.matricule +
          "', '" +
          tableauEcolage[i] +
          "', '" +
          0 +
          "', '" +
          0 +
          "')";
        db.query(sql2, function (error2, result2) {
          if (error2) {
            console.log(error2.message);
          } else {
            console.log("INITIALISATION DE PAIEMENT REINSCRIPTION");
          }
        });
      }
    }
  });
});
/*
const matricules=[ 4, 5 ]
 const nomPrenoms = [ 'AZERTY Qwerty', 'Bryant Algo' ]
const tableau1 = [
  [
    'ASSURANCE',       'AVRIL',
    'DECEMBRE',        'DIDEC',
    'DROIT',           'FEVRIER',
    'Frais G + SPORT', 'JANVIER',
    'JUIN',            'MAI',
    'MARS',            'NOVEMBRE',
    'OCTOBRE',         'SEPTEMBRE',
    'VRM'
  ],
  [
    'ASSURANCE',       'AVRIL',
    'DECEMBRE',        'DIDEC',
    'DROIT',           'FEVRIER',
    'Frais G + SPORT', 'JANVIER',
    'JUIN',            'MAI',
    'MARS',            'NOVEMBRE',
    'OCTOBRE',         'SEPTEMBRE',
    'VRM'
  ]
]  je veux créer un autre tableau qui ressemble à ceci : [[1, 'AZERTY Qwerty','ASSURANCE',       'AVRIL',
    'DECEMBRE',        'DIDEC',
    'DROIT',           'FEVRIER',
    'Frais G + SPORT', 'JANVIER',
    'JUIN',            'MAI',
    'MARS',            'NOVEMBRE',
    'OCTOBRE',         'SEPTEMBRE',
    'VRM'], [2, 'Bryant Algo','ASSURANCE',       'AVRIL',
    'DECEMBRE',        'DIDEC',
    'DROIT',           'FEVRIER',
    'Frais G + SPORT', 'JANVIER',
    'JUIN',            'MAI',
    'MARS',            'NOVEMBRE',
    'OCTOBRE',         'SEPTEMBRE',
    'VRM']]
 */
