-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : jeu. 14 mars 2024 à 16:36
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `bdd_gestion_ecolage`
--

-- --------------------------------------------------------

--
-- Structure de la table `annee`
--

CREATE TABLE `annee` (
  `anneeScolaire` varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `annee`
--

INSERT INTO `annee` (`anneeScolaire`) VALUES
('2023-2024');

-- --------------------------------------------------------

--
-- Structure de la table `classe`
--

CREATE TABLE `classe` (
  `nomClasse` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `classe`
--

INSERT INTO `classe` (`nomClasse`) VALUES
('10ème'),
('11ème'),
('12ème'),
('1èreU'),
('2nde'),
('3èmeA'),
('3èmeB'),
('4ème'),
('5èmeA'),
('5èmeB'),
('6ème'),
('7ème'),
('8ème'),
('9ème'),
('JE'),
('TL'),
('TS');

-- --------------------------------------------------------

--
-- Structure de la table `ecolage`
--

CREATE TABLE `ecolage` (
  `libelle` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `ecolage`
--

INSERT INTO `ecolage` (`libelle`) VALUES
('ASSURANCE'),
('AVRIL'),
('DECEMBRE'),
('DIDEC'),
('DROIT'),
('FEVRIER'),
('Frais G + SPORT'),
('JANVIER'),
('JUIN'),
('MAI'),
('MARS'),
('NOVEMBRE'),
('OCTOBRE'),
('SEPTEMBRE'),
('VRM');

-- --------------------------------------------------------

--
-- Structure de la table `eleve`
--

CREATE TABLE `eleve` (
  `matricule` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenoms` varchar(255) NOT NULL,
  `sexe` varchar(10) NOT NULL,
  `nomClasse` varchar(6) NOT NULL,
  `nomGroupe` varchar(30) NOT NULL,
  `dateInscription` date NOT NULL DEFAULT current_timestamp(),
  `anneeScolaire` varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `eleve`
--

INSERT INTO `eleve` (`matricule`, `nom`, `prenoms`, `sexe`, `nomClasse`, `nomGroupe`, `dateInscription`, `anneeScolaire`) VALUES
(4, 'AZERTY', 'Qwerty', 'Masculin', 'TS', 'ELEVE', '2024-03-14', '2023-2024'),
(5, 'Bryant', 'Algo', 'Masculin', 'TS', 'ELEVE', '2024-03-14', '2023-2024');

-- --------------------------------------------------------

--
-- Structure de la table `groupe`
--

CREATE TABLE `groupe` (
  `nomGroupe` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `groupe`
--

INSERT INTO `groupe` (`nomGroupe`) VALUES
('EDS(Enfant de soleil)'),
('ELEVE'),
('FDP(Fils de personnel)');

-- --------------------------------------------------------

--
-- Structure de la table `payer`
--

CREATE TABLE `payer` (
  `num_paiement` int(11) NOT NULL,
  `matricule` int(11) NOT NULL,
  `libelle` varchar(30) NOT NULL,
  `sommeRecue` int(11) NOT NULL,
  `sommeRestante` int(11) NOT NULL,
  `datePaiement` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `payer`
--

INSERT INTO `payer` (`num_paiement`, `matricule`, `libelle`, `sommeRecue`, `sommeRestante`, `datePaiement`) VALUES
(46, 4, 'ASSURANCE', 0, 0, '2024-03-14'),
(47, 4, 'AVRIL', 0, 0, '2024-03-14'),
(48, 4, 'DECEMBRE', 0, 0, '2024-03-14'),
(49, 4, 'DIDEC', 0, 0, '2024-03-14'),
(50, 4, 'DROIT', 0, 0, '2024-03-14'),
(51, 4, 'FEVRIER', 0, 0, '2024-03-14'),
(52, 4, 'Frais G + SPORT', 0, 0, '2024-03-14'),
(53, 4, 'JANVIER', 0, 0, '2024-03-14'),
(54, 4, 'JUIN', 0, 0, '2024-03-14'),
(55, 4, 'MAI', 0, 0, '2024-03-14'),
(56, 4, 'MARS', 0, 0, '2024-03-14'),
(57, 4, 'NOVEMBRE', 0, 0, '2024-03-14'),
(58, 4, 'OCTOBRE', 0, 0, '2024-03-14'),
(59, 4, 'SEPTEMBRE', 0, 0, '2024-03-14'),
(60, 4, 'VRM', 0, 0, '2024-03-14'),
(61, 5, 'ASSURANCE', 0, 0, '2024-03-14'),
(62, 5, 'AVRIL', 0, 0, '2024-03-14'),
(63, 5, 'DECEMBRE', 0, 0, '2024-03-14'),
(64, 5, 'DIDEC', 0, 0, '2024-03-14'),
(65, 5, 'DROIT', 0, 0, '2024-03-14'),
(66, 5, 'FEVRIER', 0, 0, '2024-03-14'),
(67, 5, 'Frais G + SPORT', 0, 0, '2024-03-14'),
(68, 5, 'JANVIER', 0, 0, '2024-03-14'),
(69, 5, 'JUIN', 0, 0, '2024-03-14'),
(70, 5, 'MAI', 0, 0, '2024-03-14'),
(71, 5, 'MARS', 0, 0, '2024-03-14'),
(72, 5, 'NOVEMBRE', 0, 0, '2024-03-14'),
(73, 5, 'OCTOBRE', 0, 0, '2024-03-14'),
(74, 5, 'SEPTEMBRE', 0, 0, '2024-03-14'),
(75, 5, 'VRM', 0, 0, '2024-03-14');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `annee`
--
ALTER TABLE `annee`
  ADD PRIMARY KEY (`anneeScolaire`);

--
-- Index pour la table `classe`
--
ALTER TABLE `classe`
  ADD PRIMARY KEY (`nomClasse`);

--
-- Index pour la table `ecolage`
--
ALTER TABLE `ecolage`
  ADD PRIMARY KEY (`libelle`);

--
-- Index pour la table `eleve`
--
ALTER TABLE `eleve`
  ADD PRIMARY KEY (`matricule`),
  ADD KEY `nomClasse` (`nomClasse`),
  ADD KEY `nomGroupe` (`nomGroupe`),
  ADD KEY `anneeScolaire` (`anneeScolaire`);

--
-- Index pour la table `groupe`
--
ALTER TABLE `groupe`
  ADD PRIMARY KEY (`nomGroupe`);

--
-- Index pour la table `payer`
--
ALTER TABLE `payer`
  ADD PRIMARY KEY (`num_paiement`),
  ADD KEY `matricule` (`matricule`),
  ADD KEY `libelle` (`libelle`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `eleve`
--
ALTER TABLE `eleve`
  MODIFY `matricule` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `payer`
--
ALTER TABLE `payer`
  MODIFY `num_paiement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
