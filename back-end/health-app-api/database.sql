-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 03, 2019 at 07:11 PM
-- Server version: 5.6.41
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jacksonn_hiit`
--

-- --------------------------------------------------------

--
-- Table structure for table `hiit`
--

CREATE TABLE `hiit` (
  `time` float NOT NULL,
  `rep` int(11) NOT NULL,
  `work` int(11) NOT NULL,
  `rest` int(11) NOT NULL,
  `exercise` varchar(50) NOT NULL,
  `serial` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `hiit`
--

INSERT INTO `hiit` (`time`, `rep`, `work`, `rest`, `exercise`, `serial`) VALUES
(60, 10, 2, 1, 'Standing Mountain Climbers', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `hiit`
--
ALTER TABLE `hiit`
  ADD PRIMARY KEY (`serial`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `hiit`
--
ALTER TABLE `hiit`
  MODIFY `serial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
