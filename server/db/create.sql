-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 24, 2019 at 02:11 PM
-- Server version: 5.7.25
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `a1ability_rentronic_prod`
--

-- --------------------------------------------------------

--
-- Table structure for table `accountant`
--

CREATE TABLE `accountant` (
  `id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `contact` varchar(10) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` timestamp NULL DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL,
  `modified_by` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `area`
--

CREATE TABLE `area` (
  `id` int(11) NOT NULL,
  `area_name` varchar(200) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `area`
--

INSERT INTO `area` (`id`, `area_name`, `city_id`, `is_active`) VALUES
(1, 'East', 1, 1),
(2, 'West', 1, 1),
(3, 'North', 1, 1),
(4, 'South', 1, 1),
(5, 'Central', 1, 1),
(6, 'East', 2, 1),
(7, 'West', 2, 1),
(8, 'North', 2, 1),
(9, 'South', 2, 1),
(10, 'Central', 2, 1),
(11, 'East', 3, 1),
(12, 'West', 3, 1),
(13, 'North', 3, 1),
(14, 'South', 3, 1),
(15, 'Central', 3, 1),
(16, 'East', 4, 1),
(17, 'West', 4, 1),
(18, 'North', 4, 1),
(19, 'South', 4, 1),
(20, 'Central', 4, 1),
(21, 'East', 5, 1),
(22, 'West', 5, 1),
(23, 'North', 5, 1),
(24, 'South', 5, 1),
(25, 'Central', 5, 1),
(28, 'East', 7, 1),
(29, 'West', 7, 1),
(30, 'North', 7, 1),
(31, 'South', 7, 1),
(32, 'Central', 7, 1),
(33, 'East', 6, 1),
(34, 'West', 6, 1),
(35, 'North', 6, 1),
(36, 'South', 6, 1),
(37, 'Central', 6, 1),
(43, 'East', 8, 1),
(44, 'West', 8, 1),
(45, 'North', 8, 1),
(46, 'South', 8, 1),
(47, 'Central', 8, 1);

-- --------------------------------------------------------

--
-- Table structure for table `brand`
--

CREATE TABLE `brand` (
  `id` int(3) NOT NULL,
  `brand_name` varchar(25) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `brand`
--

INSERT INTO `brand` (`id`, `brand_name`, `created_by`, `modified_at`, `created_at`) VALUES
(1, 'APPLE', NULL, NULL, NULL),
(2, 'HP', NULL, NULL, NULL),
(3, 'HUAWEI', NULL, NULL, NULL),
(4, 'UE BOOM', NULL, NULL, NULL),
(5, 'VIVIN Imports', NULL, NULL, NULL),
(6, 'KOGAN', NULL, NULL, NULL),
(7, 'LENOVO', NULL, NULL, NULL),
(8, 'LG', NULL, NULL, NULL),
(9, 'MICROSOFT', NULL, NULL, NULL),
(10, 'Midea', NULL, NULL, NULL),
(11, 'Mitsubishi', NULL, NULL, NULL),
(12, 'OPPO Phone', NULL, NULL, NULL),
(13, 'RENTRONICS', NULL, NULL, NULL),
(14, 'SAMSUNG', NULL, NULL, NULL),
(15, 'SONY', NULL, NULL, NULL),
(16, 'TCL', NULL, NULL, NULL),
(17, 'TSB Living', NULL, NULL, NULL),
(18, 'BPL', NULL, NULL, NULL),
(19, 'Toshiba', NULL, '2019-09-11 12:36:18', '2019-09-11 12:36:18'),
(20, 'Philips', NULL, '2019-09-13 12:02:53', '2019-09-13 12:02:53');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `category` varchar(100) NOT NULL,
  `type` tinyint(11) DEFAULT NULL,
  `related_to` int(11) DEFAULT NULL,
  `modified_by` tinyint(4) DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL,
  `created_by` tinyint(4) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `category`, `type`, `related_to`, `modified_by`, `modified_at`, `created_by`, `created_at`) VALUES
(1, 'Electronics', 1, 0, NULL, NULL, 1, NULL),
(2, 'TV', 2, 1, NULL, NULL, 1, NULL),
(3, 'Sony', 3, 2, NULL, NULL, 1, NULL),
(4, 'Washing Machine', 2, 1, NULL, NULL, 1, NULL),
(5, 'LG', 3, 4, NULL, NULL, 1, NULL),
(6, 'Kinetic', 3, 4, NULL, NULL, 1, NULL),
(7, 'Media Players ', 2, 1, NULL, NULL, 1, NULL),
(8, 'Blu Ray ', 3, 7, NULL, NULL, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `color`
--

CREATE TABLE `color` (
  `id` int(25) NOT NULL,
  `color` varchar(244) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL,
  `created_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `color`
--

INSERT INTO `color` (`id`, `color`, `created_at`, `modified_at`, `created_by`) VALUES
(1, 'Black', NULL, NULL, 0),
(2, 'Blue', NULL, NULL, 0),
(3, 'Brown', NULL, NULL, 0),
(4, 'Green', NULL, NULL, 0),
(5, 'Grey', NULL, NULL, 0),
(6, 'White', NULL, NULL, 0),
(7, 'Yellow', NULL, NULL, 0),
(8, 'test', NULL, NULL, 1),
(9, 'Violet', NULL, NULL, 1),
(10, 'Ultravioled', NULL, NULL, 1),
(11, 'Gray', NULL, NULL, 1),
(12, 'Orange', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `nbzn` varchar(20) DEFAULT NULL,
  `location` varchar(150) DEFAULT NULL,
  `director` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `contact` varchar(10) DEFAULT NULL,
  `alt_contact` varchar(10) DEFAULT NULL,
  `website` varchar(40) DEFAULT NULL,
  `accountant_id` int(11) DEFAULT NULL,
  `modified_by` timestamp NULL DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL,
  `created_by` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `director`
--

CREATE TABLE `director` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `franchise_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contact` varchar(20) DEFAULT NULL,
  `alt_contact` varchar(20) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `is_active` int(11) NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `franchise`
--

CREATE TABLE `franchise` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `fdbname` varchar(255) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `city_code` varchar(5) DEFAULT NULL,
  `suburb` varchar(20) DEFAULT NULL,
  `abn` varchar(150) DEFAULT NULL,
  `state` tinyint(4) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` timestamp NULL DEFAULT NULL,
  `modified_by` timestamp NULL DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `franchise_state`
--

CREATE TABLE `franchise_state` (
  `id` tinyint(4) NOT NULL,
  `status` varchar(10) NOT NULL,
  `is_active` tinyint(4) NOT NULL,
  `created_by` tinyint(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modified_by` timestamp NULL DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `franchise_state`
--

INSERT INTO `franchise_state` (`id`, `status`, `is_active`, `created_by`, `created_at`, `modified_by`, `modified_at`) VALUES
(1, 'open', 1, 1, '2019-07-03 06:20:08', NULL, NULL),
(2, 'active', 1, 1, '2019-07-03 06:20:08', NULL, NULL),
(3, 'inactive', 1, 1, '2019-07-03 06:20:08', NULL, NULL),
(4, 'close', 1, 1, '2019-07-03 06:20:08', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `leads`
--

CREATE TABLE `leads` (
  `id` int(10) NOT NULL,
  `lead_id` varchar(255) DEFAULT NULL,
  `is_franchise_exist` tinyint(1) DEFAULT NULL,
  `franchise_id` int(10) NOT NULL,
  `franchise_name` varchar(255) DEFAULT NULL,
  `message` text,
  `document` text,
  `customer_id` int(4) DEFAULT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  `customer_contact` varchar(20) DEFAULT NULL,
  `converted_to` tinyint(1) NOT NULL DEFAULT '0',
  `converted_by` int(10) NOT NULL DEFAULT '0',
  `converted_by_f_id` int(10) NOT NULL DEFAULT '0',
  `is_active` tinyint(4) DEFAULT NULL,
  `f_id` int(10) DEFAULT NULL,
  `created_by` tinyint(4) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `lead_comment`
--

CREATE TABLE `lead_comment` (
  `id` int(10) NOT NULL,
  `l_id` int(10) NOT NULL,
  `comment` text NOT NULL,
  `comment_by` varchar(255) NOT NULL,
  `comment_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `id` smallint(6) NOT NULL,
  `city` varchar(50) NOT NULL,
  `city_code` varchar(5) NOT NULL,
  `modified_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`id`, `city`, `city_code`, `modified_at`, `created_at`) VALUES
(1, 'Auckland', 'AKL', NULL, NULL),
(2, 'Rotorua', 'ROT', NULL, NULL),
(3, 'Hamilton', 'HLZ', NULL, NULL),
(4, 'Wellington', 'WLG', NULL, NULL),
(5, 'Whangarei', 'WRE', NULL, NULL),
(6, 'Christchurch', 'CHC', NULL, NULL),
(7, 'Dunedin', 'DUD', NULL, NULL),
(8, 'Invercargill', 'IVC', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `master_staff`
--

CREATE TABLE `master_staff` (
  `id` int(11) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `user_id` varchar(20) NOT NULL,
  `password` blob,
  `location` varchar(200) NOT NULL,
  `contact` varchar(10) NOT NULL,
  `email` varchar(30) NOT NULL,
  `position` tinyint(4) NOT NULL,
  `created_by` tinyint(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modified_by` timestamp NULL DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `payment_mode`
--

CREATE TABLE `payment_mode` (
  `id` tinyint(4) NOT NULL,
  `payment_mode` varchar(50) NOT NULL,
  `is_active` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(10) NOT NULL,
  `maincat` int(10) DEFAULT NULL,
  `category` int(10) DEFAULT NULL,
  `subcat` int(10) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `color_id` int(2) DEFAULT NULL,
  `brand_id` int(2) DEFAULT NULL,
  `buying_price` varchar(255) DEFAULT NULL,
  `description` text,
  `specification` text,
  `brought` varchar(255) DEFAULT NULL,
  `invoice` varchar(255) DEFAULT NULL,
  `rental` varchar(255) DEFAULT NULL,
  `meta_keywords` varchar(255) DEFAULT NULL,
  `meta_description` text,
  `status` tinyint(3) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` tinyint(4) DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL,
  `modified_by` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `product_status`
--

CREATE TABLE `product_status` (
  `id` int(10) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_status`
--

INSERT INTO `product_status` (`id`, `status`, `created_at`, `modified_at`) VALUES
(1, 'Active', NULL, NULL),
(2, 'OnHold', NULL, NULL),
(3, 'Discontinued', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `name`, `is_active`, `created_by`, `created_at`) VALUES
(1, 'Super Admin', 1, 1, '2019-06-24 06:48:50'),
(2, 'Admin', 1, 1, '2019-06-24 06:48:50'),
(3, 'CSR', 1, 1, '2019-06-24 06:48:50'),
(4, 'Finance', 1, 1, '2019-06-24 06:48:50'),
(5, 'Delivery', 1, 1, '2019-06-24 06:48:50'),
(6, 'HR', 1, 1, '2019-06-24 06:48:50');

-- --------------------------------------------------------

--
-- Table structure for table `staff_position`
--

CREATE TABLE `staff_position` (
  `id` tinyint(4) NOT NULL,
  `position` varchar(60) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `staff_position`
--

INSERT INTO `staff_position` (`id`, `position`, `created_at`) VALUES
(1, 'Territory Manager', '2019-07-04 06:00:02'),
(2, 'Marketing Manager', '2019-07-04 06:00:02'),
(3, 'IT Specialist', '2019-07-04 06:00:02'),
(4, 'BDM', '2019-08-14 11:32:42'),
(5, 'Accountant', '2019-07-04 06:00:02'),
(6, 'Sales Specialist', '2019-07-04 06:00:02');

-- --------------------------------------------------------

--
-- Table structure for table `task_status`
--

CREATE TABLE `task_status` (
  `id` int(6) UNSIGNED NOT NULL,
  `status` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `task_status`
--

INSERT INTO `task_status` (`id`, `status`) VALUES
(1, 'Scheduled'),
(2, 'In-Progress'),
(3, 'Reschedule'),
(4, 'Completed'),
(5, 'Deleted');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `franchise_id` int(11) DEFAULT NULL,
  `director_id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `user_id` varchar(20) DEFAULT NULL,
  `password` blob,
  `token` varchar(100) NOT NULL,
  `account_id` varchar(100) NOT NULL,
  `key` blob NOT NULL,
  `iv` blob NOT NULL,
  `designation` varchar(50) DEFAULT NULL,
  `role_id` varchar(20) DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_by` timestamp NULL DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `franchise_id`, `director_id`, `name`, `user_id`, `password`, `token`, `account_id`, `key`, `iv`, `designation`, `role_id`, `is_active`, `created_by`, `created_at`, `modified_by`, `modified_at`, `status`) VALUES
(1, NULL, 0, 'Master Admin', 'admin', AES_ENCRYPT('******','secret'), '', '', '', '', '1', '1', 1, 0, '2019-08-24 06:22:30', '2019-06-22 21:49:24', NULL, 1);
-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE `user_role` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Indexes for table `accountant`
--
ALTER TABLE `accountant`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `area`
--
ALTER TABLE `area`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `brand`
--
ALTER TABLE `brand`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `color`
--
ALTER TABLE `color`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `director`
--
ALTER TABLE `director`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `franchise`
--
ALTER TABLE `franchise`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `franchise_state`
--
ALTER TABLE `franchise_state`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leads`
--
ALTER TABLE `leads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lead_comment`
--
ALTER TABLE `lead_comment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_staff`
--
ALTER TABLE `master_staff`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment_mode`
--
ALTER TABLE `payment_mode`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `product_status`
--
ALTER TABLE `product_status`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `staff_position`
--
ALTER TABLE `staff_position`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `task_status`
--
ALTER TABLE `task_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accountant`
--
ALTER TABLE `accountant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `area`
--
ALTER TABLE `area`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `brand`
--
ALTER TABLE `brand`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `color`
--
ALTER TABLE `color`
  MODIFY `id` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `director`
--
ALTER TABLE `director`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `franchise`
--
ALTER TABLE `franchise`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `franchise_state`
--
ALTER TABLE `franchise_state`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `leads`
--
ALTER TABLE `leads`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `lead_comment`
--
ALTER TABLE `lead_comment`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `id` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `master_staff`
--
ALTER TABLE `master_staff`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `payment_mode`
--
ALTER TABLE `payment_mode`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `product_status`
--
ALTER TABLE `product_status`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `staff_position`
--
ALTER TABLE `staff_position`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `task_status`
--
ALTER TABLE `task_status`
  MODIFY `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `user_role`
--
ALTER TABLE `user_role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
