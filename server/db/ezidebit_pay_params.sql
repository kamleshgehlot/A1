-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 28, 2019 at 02:09 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.1.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rentronicsnew`
--

-- --------------------------------------------------------

--
-- Table structure for table `ezidebit_pay_params`
--

CREATE TABLE `ezidebit_pay_params` (
  `id` int(11) NOT NULL,
  `payment_type_id` int(11) DEFAULT NULL,
  `payment_type` varchar(20) DEFAULT NULL,
  `payment_type_is_active` tinyint(1) DEFAULT NULL,
  `payment_method_id` int(11) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `payment_method_is_active` tinyint(1) DEFAULT NULL,
  `payment_source_id` int(11) DEFAULT NULL,
  `payment_source` varchar(20) DEFAULT NULL,
  `payment_source_is_active` tinyint(1) DEFAULT NULL,
  `date_field_id` int(11) DEFAULT NULL,
  `date_field` varchar(20) DEFAULT NULL,
  `date_field_is_active` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ezidebit_pay_params`
--

INSERT INTO `ezidebit_pay_params` (`id`, `payment_type_id`, `payment_type`, `payment_type_is_active`, `payment_method_id`, `payment_method`, `payment_method_is_active`, `payment_source_id`, `payment_source`, `payment_source_is_active`, `date_field_id`, `date_field`, `date_field_is_active`) VALUES
(1, 1, 'ALL', 1, 1, 'ALL', 1, 1, 'ALL', 1, 1, 'PAYMENT', 1),
(2, 2, 'PENDING', 1, 2, 'CR', 1, 2, 'SCHEDULED', 1, 2, 'SETTLEMENT', 1),
(3, 3, 'FAILED', 1, 3, 'DR', 1, 3, 'WEB', 1, NULL, NULL, NULL),
(4, 4, 'SUCCESSFUL', 1, NULL, NULL, NULL, 4, 'PHONE', 1, NULL, NULL, NULL),
(5, NULL, NULL, NULL, NULL, NULL, NULL, 5, 'BPAY', 1, NULL, NULL, NULL),
(6, NULL, NULL, NULL, NULL, NULL, NULL, 6, 'ADJ', 1, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ezidebit_pay_params`
--
ALTER TABLE `ezidebit_pay_params`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ezidebit_pay_params`
--
ALTER TABLE `ezidebit_pay_params`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
