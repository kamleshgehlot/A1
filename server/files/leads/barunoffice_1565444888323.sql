-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 11, 2017 at 11:59 AM
-- Server version: 10.1.24-MariaDB
-- PHP Version: 7.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `barunoffice`
--

-- --------------------------------------------------------

--
-- Table structure for table `air_ports`
--

CREATE TABLE `air_ports` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` smallint(6) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `air_ports`
--

INSERT INTO `air_ports` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'gfsdggs', 1, '2017-07-12 07:43:06', '2017-07-12 07:43:06');

-- --------------------------------------------------------

--
-- Table structure for table `buyers`
--

CREATE TABLE `buyers` (
  `id` int(10) UNSIGNED NOT NULL,
  `buyer_id` varchar(33) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address1` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address2` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address3` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` int(11) NOT NULL,
  `consignee_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `c_address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `notify_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notify_address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `sea_port` int(11) NOT NULL,
  `dest` int(11) NOT NULL,
  `currency` int(11) NOT NULL,
  `payment` int(11) NOT NULL,
  `contact_person` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile` varchar(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` smallint(6) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `buyers`
--

INSERT INTO `buyers` (`id`, `buyer_id`, `name`, `address1`, `address2`, `address3`, `country`, `consignee_name`, `c_address`, `notify_name`, `notify_address`, `sea_port`, `dest`, `currency`, `payment`, `contact_person`, `mobile`, `email`, `status`, `created_at`, `updated_at`) VALUES
(1, 'BYR-1', 'Akshay Sharma', 'fjhsddufyfdi hdfauydf ahsaid h', 'ihdjkhsfjh hdjfsh yfsyfdg dufusfh dfh', 'uhdfudhgfh dhfsyieyf hfuh', 1, 'Akshay Sharma', 'fjhsddufyfdi hdfauydf ahsaid h ihdjkhsfjh hdjfsh yfsyfdg dufusfh dfh uhdfudhgfh dhfsyieyf hfuh China', 'Akshay Sharma', 'fjhsddufyfdi hdfauydf ahsaid h ihdjkhsfjh hdjfsh yfsyfdg dufusfh dfh uhdfudhgfh dhfsyieyf hfuh China', 1, 1, 2, 2, 'Akshay Sharma', '9876543210', 'akshay@email.com', 1, '2017-07-17 07:20:49', '2017-07-17 07:20:49'),
(2, 'BYR-2', 'Rakshit', 'adhqga ydgfys fgfy uafyu', 'dfhghsdgf ggu', 'hdshfgh g yuy yuy uy', 3, 'Rakshit', 'adhqga ydgfys fgfy uafyu dfhghsdgf ggu hdshfgh g yuy yuy uy Algeria', 'Rakshit', 'adhqga ydgfys fgfy uafyu dfhghsdgf ggu hdshfgh g yuy yuy uy Algeria', 1, 1, 1, 1, 'Rakshit', '9876543210', 'amit@gmail.com', 1, '2017-09-04 06:24:22', '2017-09-04 06:24:22');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` smallint(6) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Animals', 1, '2017-07-12 07:33:53', '2017-07-12 07:33:53'),
(2, 'Wall Decorative', 1, '2017-07-12 07:34:01', '2017-07-12 07:34:01'),
(3, 'Birds', 1, '2017-07-12 07:34:09', '2017-07-12 07:34:09'),
(4, 'fdsffdsfd', 1, '2017-07-17 02:54:05', '2017-07-17 02:54:05'),
(5, 'fdsffdsfd', 1, '2017-07-17 02:54:05', '2017-07-17 02:54:05');

-- --------------------------------------------------------

--
-- Table structure for table `colors`
--

CREATE TABLE `colors` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` smallint(6) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `colors`
--

INSERT INTO `colors` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'red', 1, '2017-07-12 07:26:26', '2017-07-12 07:26:26'),
(2, 'brown', 1, '2017-07-12 07:26:35', '2017-07-12 07:26:35'),
(3, 'black', 1, '2017-07-12 07:26:44', '2017-07-12 07:26:44'),
(4, 'orange', 1, '2017-07-17 01:26:49', '2017-07-17 01:26:49'),
(5, 'orange', 1, '2017-07-17 01:33:54', '2017-07-17 01:33:54'),
(6, 'dfsfdfs', 1, '2017-07-17 02:54:05', '2017-07-17 02:54:05');

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` smallint(6) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'China', 1, '2017-07-12 07:40:04', '2017-07-12 07:40:04'),
(2, 'Russ', 1, '2017-07-12 07:40:16', '2017-07-12 07:40:16'),
(3, 'Algeria', 1, '2017-08-29 02:08:52', '2017-08-29 02:08:52'),
(4, 'India', 1, '2017-08-29 02:34:21', '2017-08-29 02:34:21');

-- --------------------------------------------------------

--
-- Table structure for table `currencies`
--

CREATE TABLE `currencies` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` smallint(6) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `currencies`
--

INSERT INTO `currencies` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'usd', 1, '2017-07-12 07:28:06', '2017-07-12 07:28:06'),
(2, 'pounds', 1, '2017-07-12 07:28:17', '2017-07-12 07:28:17');

-- --------------------------------------------------------

--
-- Table structure for table `c_o_gs`
--

CREATE TABLE `c_o_gs` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` smallint(6) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `c_o_gs`
--

INSERT INTO `c_o_gs` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'sfddffddf', 1, '2017-07-12 07:42:53', '2017-07-12 07:42:53');

-- --------------------------------------------------------

--
-- Table structure for table `dests`
--

CREATE TABLE `dests` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` smallint(6) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `dests`
--

INSERT INTO `dests` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'dfsjhskjfhddh', 1, '2017-07-12 07:38:39', '2017-07-12 07:38:39'),
(2, 'bjsvhjshud', 1, '2017-07-12 07:38:44', '2017-07-12 07:38:44');

-- --------------------------------------------------------

--
-- Table structure for table `fairs`
--

CREATE TABLE `fairs` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `fairs`
--

INSERT INTO `fairs` (`id`, `name`, `address1`, `address2`, `date`, `country`, `state`, `city`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Singapore', 'agsgdha dgysdgagud ghsgdh', 'sdhgasd dhauydsyd', '2017-08-16 00:00:00', '3', 'NULL', 'addsdaf', 1, '2017-08-29 01:31:31', '2017-08-29 01:31:31'),
(2, 'Hong Kong', 'ajshfdja fgfaydsg uady', 'gduaufd duadyys dysuady', '2018-02-16 00:00:00', '3', 'cacc', 'czcxzc', 1, '2017-08-29 01:49:11', '2017-08-29 01:49:11'),
(3, 'China', 'afsdhy fgusayf yfuayf', 'ghsdf sfhsd GU edfsudyf', '2017-10-27 00:00:00', '4', 'safaj', 'fhdfi', 1, '2017-08-29 02:11:19', '2017-08-29 02:34:21'),
(4, 'Reqwr', 'rwerwr', 'rewrewrr', '2017-08-17 00:00:00', '2', 'erwr', 'rewre', 0, '2017-08-29 02:36:23', '2017-08-29 02:39:55');

-- --------------------------------------------------------

--
-- Table structure for table `finishes`
--

CREATE TABLE `finishes` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` smallint(6) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `finishes`
--

INSERT INTO `finishes` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'gsfduyuf', 1, '2017-07-12 06:04:42', '2017-07-12 06:04:42'),
(2, 'Painted', 1, '2017-07-12 06:36:23', '2017-07-12 06:36:23'),
(3, 'rust', 1, '2017-07-17 01:26:49', '2017-07-17 01:26:49'),
(4, 'rust', 1, '2017-07-17 01:33:55', '2017-07-17 01:33:55'),
(5, 'sdfdsfdf', 1, '2017-07-17 02:54:05', '2017-07-17 02:54:05'),
(6, 'sddfsdf', 1, '2017-07-18 05:23:34', '2017-07-18 05:23:34'),
(7, 'xzfzfdsdf', 1, '2017-07-18 05:23:58', '2017-07-18 05:23:58'),
(8, 'xzfzfdsdf', 1, '2017-07-18 05:38:28', '2017-07-18 05:38:28');

-- --------------------------------------------------------

--
-- Table structure for table `f_o_bs`
--

CREATE TABLE `f_o_bs` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` smallint(6) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `f_o_bs`
--

INSERT INTO `f_o_bs` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'sdfsfdf', 1, '2017-07-12 07:40:48', '2017-07-12 07:40:48');

-- --------------------------------------------------------

--
-- Table structure for table `materials`
--

CREATE TABLE `materials` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` smallint(6) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `materials`
--

INSERT INTO `materials` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Iron', 1, '2017-07-12 07:26:59', '2017-07-12 07:26:59'),
(2, 'Wood', 1, '2017-07-12 07:27:05', '2017-07-12 07:27:05'),
(3, 'mdf', 0, '2017-07-18 05:23:34', '2017-07-18 05:51:24'),
(4, 'dsdfsf', 0, '2017-07-18 05:23:58', '2017-07-18 05:51:15'),
(5, 'dsdfsf', 0, '2017-07-18 05:38:28', '2017-07-18 05:51:19'),
(6, 'mango', 1, '2017-07-18 05:47:13', '2017-07-18 05:51:34'),
(7, 'mdf', 1, '2017-07-18 05:55:54', '2017-07-18 05:55:54'),
(8, 'mango', 1, '2017-07-18 05:55:54', '2017-07-18 05:55:54'),
(9, 'sangwan', 1, '2017-07-18 06:12:49', '2017-07-18 06:12:49'),
(10, 'sangwan', 1, '2017-07-18 06:14:36', '2017-07-18 06:14:36'),
(11, 'dsfdf', 1, '2017-07-18 06:26:13', '2017-07-18 06:26:13');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2017_06_19_095221_create_finishes_table', 1),
(2, '2017_06_19_103839_create_statuses_table', 1),
(3, '2017_06_21_095227_create_weights_table', 1),
(4, '2017_06_21_103650_create_colors_table', 1),
(5, '2017_06_21_104446_create_materials_table', 1),
(6, '2017_06_21_110703_create_fairs_table', 1),
(7, '2017_06_22_115355_create_specialities_table', 1),
(8, '2017_06_22_120703_create_utilities_table', 1),
(9, '2017_06_22_121516_create_currencies_table', 1),
(10, '2017_06_23_074237_create_categories_table', 1),
(11, '2017_06_23_080917_create_sub_categories_table', 1),
(12, '2017_06_23_124435_create_product_names_table', 1),
(13, '2017_06_27_081920_create_seas_table', 1),
(14, '2017_06_27_101940_create_dests_table', 1),
(15, '2017_06_27_105509_create_sizes_table', 1),
(16, '2017_06_27_122258_create_countries_table', 1),
(17, '2017_06_28_060152_create_payments_table', 1),
(18, '2017_06_28_065324_create_f_o_bs_table', 1),
(19, '2017_06_28_071324_create_p_o_ls_table', 1),
(20, '2017_06_28_073636_create_air_ports_table', 1),
(21, '2017_06_28_100326_create_c_o_gs_table', 1),
(22, '2017_06_28_101255_create_p_o_ds_table', 1),
(23, '2017_06_28_121725_create_buyers_table', 1),
(24, '2017_07_03_112241_create_products_table', 1),
(25, '2017_07_17_130419_create_prodmats_table', 2),
(26, '2017_07_19_111334_create_p_o_fairs_table', 3),
(27, '2017_07_19_113216_create_p_o_fair_trans_table', 3),
(28, '2017_09_04_091920_create_p_o_buyers_table', 4),
(29, '2017_09_04_092116_create_p_o_buyer_trans_table', 4);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` smallint(6) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, '1 week', 1, '2017-07-12 07:40:31', '2017-07-12 07:40:31'),
(2, '1 month', 1, '2017-07-12 07:40:38', '2017-07-12 07:40:38'),
(3, '1 year', 1, '2017-08-25 06:13:56', '2017-08-25 06:13:56'),
(4, '1 year', 1, '2017-08-25 06:20:05', '2017-08-25 06:20:05');

-- --------------------------------------------------------

--
-- Table structure for table `prodmats`
--

CREATE TABLE `prodmats` (
  `id` int(10) UNSIGNED NOT NULL,
  `pid` int(11) NOT NULL,
  `mid` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `prodmats`
--

INSERT INTO `prodmats` (`id`, `pid`, `mid`, `created_at`, `updated_at`) VALUES
(1, 7, 2, '2017-07-18 05:16:19', '2017-07-18 05:16:19'),
(2, 12, 3, '2017-07-18 05:45:06', '2017-07-18 05:45:06'),
(3, 13, 6, '2017-07-18 05:47:13', '2017-07-18 05:47:13'),
(4, 14, 2, '2017-07-18 05:55:54', '2017-07-18 05:55:54'),
(5, 15, 2, '2017-07-18 06:12:49', '2017-07-18 06:12:50'),
(6, 16, 2, '2017-07-18 06:14:36', '2017-07-18 06:14:36'),
(7, 17, 2, '2017-07-18 06:17:09', '2017-07-18 06:17:09'),
(8, 18, 2, '2017-07-18 06:23:46', '2017-07-18 06:23:46'),
(9, 19, 1, '2017-07-18 06:26:13', '2017-07-18 06:26:13'),
(10, 19, 11, '2017-07-18 06:26:13', '2017-07-18 06:26:13'),
(11, 19, 6, '2017-07-18 06:26:13', '2017-07-18 06:26:13'),
(12, 21, 9, '2017-08-30 04:40:05', '2017-08-30 04:40:05'),
(13, 22, 6, '2017-08-30 05:32:25', '2017-08-30 05:32:25'),
(14, 23, 11, '2017-08-30 05:35:09', '2017-08-30 05:35:09'),
(15, 24, 2, '2017-08-30 06:29:32', '2017-08-30 06:29:32'),
(16, 25, 6, '2017-09-04 02:23:30', '2017-09-04 02:23:30'),
(17, 25, 9, '2017-09-04 02:23:30', '2017-09-04 02:23:30'),
(18, 2, 2, '2017-09-04 02:24:39', '2017-09-04 02:24:39'),
(19, 2, 2, '2017-09-04 02:25:11', '2017-09-04 02:25:11'),
(20, 2, 9, '2017-09-04 02:25:11', '2017-09-04 02:25:11'),
(21, 2, 9, '2017-09-04 02:25:47', '2017-09-04 02:25:47'),
(22, 26, 6, '2017-09-04 07:55:19', '2017-09-04 07:55:19'),
(23, 27, 6, '2017-09-05 07:35:36', '2017-09-05 07:35:36');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `image` text COLLATE utf8mb4_unicode_ci,
  `product_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `main_cat` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sub_cat` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `speciality` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `utility` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `finish` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `length` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `width` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `height` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size_unit` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `weight` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `weight_unit` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `currency` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_id`, `image`, `product_name`, `main_cat`, `sub_cat`, `status_name`, `speciality`, `utility`, `color`, `finish`, `description`, `length`, `width`, `height`, `size_unit`, `weight`, `weight_unit`, `price`, `currency`, `status`, `created_at`, `updated_at`) VALUES
(1, 10306, '/pimages/13296.jpg', '1', '2', '2', '1', '1', '1', '3', '2', 'dfgdsgf     Rabbit    available  Photo Frame   Garden Accessories    black    Painted', '3', '33', '3', '2', '33222', '1', '333222', '1', 0, '2017-07-17 04:54:18', '2017-07-18 23:45:02'),
(2, 13296, '/pimages/Default.jpg', '1', '1', '2', '1', '1', '1', '3', '2', 'Wood       Rabbit    available  Photo Frame   Garden Accessories    black    Painted', '3', '33', '3', '2', '33', '2', '333', '2', 1, '2017-07-17 06:50:54', '2017-09-04 02:25:47'),
(3, 10306, '/pimages/10306.jpg', '2', '2', '1', '1', '1', '1', '2', '2', 'Iron       clock    available  Photo Frame   Garden Accessories    brown    Painted', '22', '22', '22', '2', '22', '1', '22', '1', 0, '2017-07-17 23:31:49', '2017-07-18 23:44:54'),
(4, 10306, '/pimages/10306.jpg', '2', '2', '1', '1', '1', '1', '2', '2', 'Iron       clock    available  Photo Frame   Garden Accessories    brown    Painted', '22', '22', '22', '2', '22', '1', '22', '1', 1, '2017-07-17 23:35:14', '2017-07-17 23:35:14'),
(5, 10297, '/pimages/10297.jpg', '1', '1', '1', '1', '1', '1', '3', '3', 'Iron       Rabbit    available  Photo Frame   Garden Accessories    black    rust', '33', '33', '33', '2', '33', '1', '33', '1', 0, '2017-07-18 02:42:45', '2017-07-18 23:44:42'),
(6, 10297, '/pimages/10297.jpg', '1', '1', '1', '1', '1', '1', '3', '3', 'Iron       Rabbit    available  Photo Frame   Garden Accessories    black    rust', '33', '33', '33', '2', '33', '1', '33', '1', 0, '2017-07-18 02:44:21', '2017-07-18 23:44:42'),
(7, 12501, '/pimages/Default.jpg', '2', '2', '2', '1', '2', '1', '2', '2', 'Iron    Wood    clock    available  dgfgfgfg   Garden Accessories    brown    Painted', '22', '22', '22', '1', '33', '1', '44', '1', 0, '2017-07-18 05:16:19', '2017-07-18 23:45:23'),
(8, 12501, '/pimages/Default.jpg', '2', '2', '2', '1', '2', '1', '2', '2', 'Iron    Wood    clock    available  dgfgfgfg   Garden Accessories    brown    Painted', '22', '22', '22', '1', '33', '1', '44', '1', 0, '2017-07-18 05:21:14', '2017-07-18 23:44:20'),
(9, 10376, '/pimages/10376.jpg', '1', '1', '1', '1', '1', '1', '3', '6', 'Rabbit    available  Photo Frame   Garden Accessories    black', '34', '44', '44', '2', '55', '2', '33', '2', 0, '2017-07-18 05:23:34', '2017-07-18 23:44:17'),
(10, 10376, '/pimages/10376.jpg', '1', '1', '1', '1', '1', '1', '3', '7', 'Rabbit    available  Photo Frame   Garden Accessories    black       xzfzfdsdf', '34', '44', '44', '2', '55', '2', '33', '2', 0, '2017-07-18 05:23:58', '2017-07-18 23:44:12'),
(11, 10376, '/pimages/10376.jpg', '1', '1', '1', '1', '1', '1', '3', '8', 'Rabbit    available  Photo Frame   Garden Accessories    black       xzfzfdsdf', '34', '44', '44', '2', '55', '2', '33', '2', 1, '2017-07-18 05:38:28', '2017-07-18 05:38:28'),
(12, 12501, '/pimages/Default.jpg', '2', '2', '1', '1', '1', '1', '4', '5', 'mdf       clock    available  Photo Frame   Garden Accessories    orange    sdfdsfdf', '45', '453', '454', '1', '554', '2', '54', '2', 0, '2017-07-18 05:45:06', '2017-07-18 23:44:08'),
(13, 12501, '/pimages/Default.jpg', '2', '2', '1', '1', '1', '1', '2', '2', 'Wood    mdf    mango  clock    available  Photo Frame   Garden Accessories    brown    Painted', '222', '22', '22', '1', '22', '2', '44', '2', 0, '2017-07-18 05:47:13', '2017-07-19 04:40:29'),
(14, 10297, '/pimages/10297.jpg', '1', '1', '2', '1', '1', '1', '2', '2', 'Iron       mdf  mango Wood  Rabbit    available  Photo Frame   Garden Accessories    brown    Painted', '333', '4', '55', '1', '23', '1', '443', '2', 0, '2017-07-18 05:55:54', '2017-07-19 04:38:04'),
(15, 10297, '/pimages/10297.jpg', '2', '2', '2', '2', '1', '1', '3', '3', 'Iron       sangwan Wood  clock    pending  Photo Frame   Garden Accessories    black    rust', '34', '34', '43', '2', '54', '2', '554', '2', 0, '2017-07-18 06:12:49', '2017-07-18 23:43:55'),
(16, 10297, '/pimages/10297.jpg', '2', '2', '2', '2', '1', '1', '3', '3', 'Iron       sangwan Wood  clock    pending  Photo Frame   Garden Accessories    black    rust', '34', '34', '43', '2', '54', '2', '554', '2', 0, '2017-07-18 06:14:36', '2017-07-18 23:43:55'),
(17, 10297, '/pimages/10297.jpg', '1', '1', '1', '1', '1', '1', '3', '2', 'Wood       Rabbit    available  Photo Frame   Garden Accessories    black    Painted', '55', '65', '566', '1', '65', '2', '44', '2', 0, '2017-07-18 06:17:09', '2017-07-18 23:43:48'),
(18, 10297, '/pimages/10297.jpg', '1', '1', '1', '1', '1', '1', '3', '2', 'Wood       jstgfhte  Rabbit    available  Photo Frame   Garden Accessories    black    Painted', '55', '65', '566', '1', '65', '2', '44', '2', 0, '2017-07-18 06:23:46', '2017-07-18 23:44:01'),
(19, 19196, '/pimages/Default.jpg', '1', '1', '2', '2', '1', '1', '2', '2', 'Iron       dsfdf mango  Rabbit    pending  Photo Frame   Garden Accessories    brown    Painted', '223', '323', '2', '2', '3232', '2', '33', '2', 1, '2017-07-18 06:26:13', '2017-07-18 06:26:13'),
(20, 13299, '/pimages/Default.jpg', '1', '1', '2', '1', '1', '1', '3', '2', 'mango       Rabbit    available  Photo Frame   Garden Accessories    black    Painted', '3', '33', '3', '2', '33', '2', '333', '2', 1, '2017-08-30 04:39:18', '2017-08-30 04:39:18'),
(21, 13255, '/pimages/Default.jpg', '1', '1', '2', '1', '1', '1', '3', '2', 'sangwan       Rabbit    available  Photo Frame   Garden Accessories    black    Painted', '3', '33', '3', '2', '33', '2', '333', '2', 1, '2017-08-30 04:40:04', '2017-08-30 04:40:04'),
(22, 17376, '/pimages/Default.jpg', '1', '1', '1', '1', '1', '1', '3', '6', 'mango       Rabbit    available  Photo Frame   Garden Accessories    black    sddfsdf', '34', '44', '44', '2', '55', '2', '33', '2', 1, '2017-08-30 05:32:25', '2017-08-30 05:32:25'),
(23, 37011, '/pimages/37011.jpg', '1', '1', '1', '1', '1', '1', '3', '6', 'dsfdf       Rabbit    available  Photo Frame   Garden Accessories    black    sddfsdf', '34', '44', '44', '2', '55', '2', '33', '2', 1, '2017-08-30 05:35:09', '2017-08-30 05:35:09'),
(24, 39011, '/pimages/Default.jpg', '1', '1', '1', '1', '1', '1', '3', '6', 'Wood       Rabbit    available  Photo Frame   Garden Accessories    black    sddfsdf', '34', '44', '44', '2', '55', '2', '33', '2', 1, '2017-08-30 06:29:32', '2017-08-30 06:29:32'),
(25, 13298, '/pimages/Default.jpg', '1', '1', '2', '1', '1', '1', '3', '2', 'mango         Rabbit    available  Photo Frame   Garden Accessories    black    Painted', '3', '33', '3', '2', '33', '2', '333', '2', 1, '2017-09-04 02:23:30', '2017-09-04 02:23:30'),
(26, 13998, '/pimages/Default.jpg', '1', '1', '2', '1', '1', '1', '3', '2', 'mango       Rabbit    available  Photo Frame   Garden Accessories    black    Painted', '3', '33', '3', '2', '33', '2', '333', '2', 1, '2017-09-04 07:55:19', '2017-09-04 07:55:19'),
(27, 19376, '/pimages/Default.jpg', '1', '1', '1', '1', '1', '1', '3', '6', 'mango       Rabbit    available  Photo Frame   Garden Accessories    black    sddfsdf', '34', '44', '44', '2', '55', '2', '33', '2', 1, '2017-09-05 07:35:36', '2017-09-05 07:35:36');

-- --------------------------------------------------------

--
-- Table structure for table `product_names`
--

CREATE TABLE `product_names` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cat_id` int(11) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_names`
--

INSERT INTO `product_names` (`id`, `name`, `cat_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Rabbit', 1, 1, '2017-07-12 07:37:40', '2017-07-12 07:37:40'),
(2, 'clock', 2, 1, '2017-07-12 07:37:51', '2017-07-12 07:37:51'),
(7, 'fgdgfg', 4, 1, '2017-07-17 02:54:05', '2017-07-17 02:54:05');

-- --------------------------------------------------------

--
-- Table structure for table `p_o_buyers`
--

CREATE TABLE `p_o_buyers` (
  `id` int(10) UNSIGNED NOT NULL,
  `po_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `buyer_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pay_terms` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `selection_names` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expiry_date` date DEFAULT NULL,
  `size` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `p_o_buyers`
--

INSERT INTO `p_o_buyers` (`id`, `po_id`, `buyer_id`, `pay_terms`, `selection_names`, `expiry_date`, `size`, `status`, `created_at`, `updated_at`) VALUES
(3, 'PO-3', '2', '2', 'hghu uyi', '2017-08-28', 'm', '1', '2017-09-04 06:45:46', '2017-09-05 07:07:02');

-- --------------------------------------------------------

--
-- Table structure for table `p_o_buyer_trans`
--

CREATE TABLE `p_o_buyer_trans` (
  `id` int(10) UNSIGNED NOT NULL,
  `pof_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `po_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `item_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `buyer_code` int(11) DEFAULT NULL,
  `offer_price` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remarks` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `p_o_buyer_trans`
--

INSERT INTO `p_o_buyer_trans` (`id`, `pof_id`, `po_id`, `item_code`, `buyer_code`, `offer_price`, `remarks`, `status`, `created_at`, `updated_at`) VALUES
(1, '3', 'PO-3', '19376', 456, '333', 'fdgdf', '1', '2017-09-04 06:45:46', '2017-09-05 07:35:36'),
(2, '3', 'PO-3', '10306', 567, '333777', 'gdfg', '1', '2017-09-04 06:45:46', '2017-09-05 07:05:50'),
(3, '3', 'PO-3', '19196', 6666, '333', 'gdfg', '1', '2017-09-05 06:59:01', '2017-09-05 07:05:50'),
(4, '3', 'PO-3', '13299', 777, '66', 'fdg', '1', '2017-09-05 06:59:01', '2017-09-05 07:05:50'),
(5, '3', 'PO-3', '13255', 55, '333', 'dfgdfg', '1', '2017-09-05 07:06:17', '2017-09-05 07:07:02'),
(6, '3', 'PO-3', '13998', 66, '333', 'ghfhf', '1', '2017-09-05 07:07:02', '2017-09-05 07:07:02');

-- --------------------------------------------------------

--
-- Table structure for table `p_o_ds`
--

CREATE TABLE `p_o_ds` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` smallint(6) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `p_o_ds`
--

INSERT INTO `p_o_ds` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'dgsgd', 1, '2017-07-12 07:42:41', '2017-07-12 07:42:41');

-- --------------------------------------------------------

--
-- Table structure for table `p_o_fairs`
--

CREATE TABLE `p_o_fairs` (
  `id` int(10) UNSIGNED NOT NULL,
  `po_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fair_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pay_terms` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `selection_names` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiry_date` datetime NOT NULL,
  `size` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` smallint(2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `p_o_fairs`
--

INSERT INTO `p_o_fairs` (`id`, `po_id`, `fair_id`, `pay_terms`, `selection_names`, `expiry_date`, `size`, `status`, `created_at`, `updated_at`) VALUES
(5, 'PO-5', '3', '4', 'Santa', '2017-08-15 00:00:00', '4', 0, '2017-08-25 06:20:06', '2017-08-29 04:46:32'),
(6, 'PO-6', '3', '4', 'gjhghy', '2017-08-01 00:00:00', 'mm', 1, '2017-08-25 06:20:39', '2017-09-04 03:43:32'),
(7, 'PO-7', '3', '2', 'hghu uyi', '2017-08-01 00:00:00', 'mm', 0, '2017-08-25 06:24:57', '2017-09-05 04:11:05'),
(8, 'PO-8', '3', '2', 'hghu uyi', '2017-08-01 00:00:00', 'mm', 1, '2017-08-25 06:53:19', '2017-08-25 06:53:19');

-- --------------------------------------------------------

--
-- Table structure for table `p_o_fair_trans`
--

CREATE TABLE `p_o_fair_trans` (
  `id` int(10) UNSIGNED NOT NULL,
  `pof_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `po_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `item_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `offer_price` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remarks` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` smallint(2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `p_o_fair_trans`
--

INSERT INTO `p_o_fair_trans` (`id`, `pof_id`, `po_id`, `item_code`, `offer_price`, `remarks`, `status`, `created_at`, `updated_at`) VALUES
(10, '5', 'PO-5', '13296', '3377', 'sjfdhjdfh', 0, '2017-08-25 06:20:06', '2017-08-29 04:48:08'),
(11, '5', 'PO-5', '10306', '333222', 'ysdgajg sdh', 0, '2017-08-25 06:20:06', '2017-08-29 04:48:08'),
(12, '6', 'PO-6', '10376', '33444', 'rw', 0, '2017-08-25 06:20:39', '2017-08-29 06:43:11'),
(13, '6', 'PO-6', '19196', '777', 'fhdggf', 1, '2017-08-25 06:20:39', '2017-09-05 07:29:31'),
(14, '7', 'PO-7', '39011', '33444', 'rw', 0, '2017-08-25 06:24:57', '2017-09-05 04:11:05'),
(15, '7', 'PO-7', '13296', '333777', 'twet', 0, '2017-08-25 06:24:57', '2017-09-05 04:11:05'),
(16, '8', 'PO-8', '10376', '33444', 'rw', 1, '2017-08-25 06:53:19', '2017-08-25 06:53:19'),
(17, '8', 'PO-8', '13296', '333777', 'twet', 1, '2017-08-25 06:53:19', '2017-08-25 06:53:19'),
(21, '6', 'PO-6', '37011', '33', 'ggfg', 1, '2017-09-05 07:26:35', '2017-09-05 07:29:31'),
(22, '6', 'PO-6', '13998', '333', 'retret', 1, '2017-09-05 07:28:51', '2017-09-05 07:29:31'),
(23, '6', 'PO-6', '17376', '33', 'bgfhgf', 1, '2017-09-05 07:28:51', '2017-09-05 07:29:31');

-- --------------------------------------------------------

--
-- Table structure for table `p_o_ls`
--

CREATE TABLE `p_o_ls` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` smallint(6) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `p_o_ls`
--

INSERT INTO `p_o_ls` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'sdfddfdf', 1, '2017-07-12 07:43:18', '2017-07-12 07:43:18');

-- --------------------------------------------------------

--
-- Table structure for table `seas`
--

CREATE TABLE `seas` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` smallint(6) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `seas`
--

INSERT INTO `seas` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'dadfafdfaf', 1, '2017-07-12 07:38:04', '2017-07-12 07:38:04'),
(2, 'dsfdfdfdf', 1, '2017-07-12 07:38:11', '2017-07-12 07:38:11');

-- --------------------------------------------------------

--
-- Table structure for table `sizes`
--

CREATE TABLE `sizes` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` smallint(6) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sizes`
--

INSERT INTO `sizes` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'cm', 1, '2017-07-12 07:38:55', '2017-07-12 07:38:55'),
(2, 'm', 1, '2017-07-12 07:39:00', '2017-07-12 07:39:00'),
(3, 'mm', 1, '2017-08-25 06:13:56', '2017-08-25 06:13:56');

-- --------------------------------------------------------

--
-- Table structure for table `specialities`
--

CREATE TABLE `specialities` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` smallint(6) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `specialities`
--

INSERT INTO `specialities` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Photo Frame', 1, '2017-07-12 07:27:32', '2017-07-12 07:27:32'),
(2, 'dgfgfgfg', 1, '2017-07-12 07:27:37', '2017-07-12 07:27:37'),
(4, 'spec', 1, '2017-07-17 01:25:22', '2017-07-17 01:25:22');

-- --------------------------------------------------------

--
-- Table structure for table `statuses`
--

CREATE TABLE `statuses` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` smallint(6) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `statuses`
--

INSERT INTO `statuses` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'available', 1, '2017-07-12 07:25:09', '2017-07-12 07:25:43'),
(2, 'pending', 1, '2017-07-12 07:25:35', '2017-07-12 07:25:35'),
(3, 'jhji', 0, '2017-07-17 01:24:38', '2017-07-17 04:12:26'),
(4, 'jhji', 0, '2017-07-17 01:25:22', '2017-07-17 04:12:25'),
(5, 'jhji', 0, '2017-07-17 01:26:49', '2017-07-17 04:12:23'),
(6, 'jhji', 0, '2017-07-17 01:33:54', '2017-07-17 04:12:23'),
(7, 'dsfdsffd', 1, '2017-07-17 02:54:05', '2017-07-17 02:54:05');

-- --------------------------------------------------------

--
-- Table structure for table `sub_categories`
--

CREATE TABLE `sub_categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cat_id` int(11) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sub_categories`
--

INSERT INTO `sub_categories` (`id`, `name`, `cat_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 'afdfafdfd', NULL, 1, '2017-07-12 07:35:19', '2017-07-12 07:35:19'),
(2, 'rgrrew', NULL, 1, '2017-07-12 07:35:26', '2017-07-12 07:35:26'),
(3, 'dfsffd', NULL, 1, '2017-07-17 02:54:05', '2017-07-17 02:54:05');

-- --------------------------------------------------------

--
-- Table structure for table `utilities`
--

CREATE TABLE `utilities` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` smallint(6) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `utilities`
--

INSERT INTO `utilities` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Garden Accessories', 1, '2017-07-12 07:27:52', '2017-07-12 07:27:52');

-- --------------------------------------------------------

--
-- Table structure for table `weights`
--

CREATE TABLE `weights` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` smallint(6) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `weights`
--

INSERT INTO `weights` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Kg', 1, '2017-07-12 07:26:08', '2017-07-12 07:26:08'),
(2, 'g', 1, '2017-07-12 07:26:14', '2017-07-12 07:26:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `air_ports`
--
ALTER TABLE `air_ports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `buyers`
--
ALTER TABLE `buyers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `currencies`
--
ALTER TABLE `currencies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `c_o_gs`
--
ALTER TABLE `c_o_gs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dests`
--
ALTER TABLE `dests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fairs`
--
ALTER TABLE `fairs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `finishes`
--
ALTER TABLE `finishes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `f_o_bs`
--
ALTER TABLE `f_o_bs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `materials`
--
ALTER TABLE `materials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `prodmats`
--
ALTER TABLE `prodmats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_names`
--
ALTER TABLE `product_names`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `p_o_buyers`
--
ALTER TABLE `p_o_buyers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `p_o_buyer_trans`
--
ALTER TABLE `p_o_buyer_trans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `p_o_ds`
--
ALTER TABLE `p_o_ds`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `p_o_fairs`
--
ALTER TABLE `p_o_fairs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `p_o_fair_trans`
--
ALTER TABLE `p_o_fair_trans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `p_o_ls`
--
ALTER TABLE `p_o_ls`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `seas`
--
ALTER TABLE `seas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sizes`
--
ALTER TABLE `sizes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `specialities`
--
ALTER TABLE `specialities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `statuses`
--
ALTER TABLE `statuses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `utilities`
--
ALTER TABLE `utilities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `weights`
--
ALTER TABLE `weights`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `air_ports`
--
ALTER TABLE `air_ports`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `buyers`
--
ALTER TABLE `buyers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `colors`
--
ALTER TABLE `colors`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `currencies`
--
ALTER TABLE `currencies`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `c_o_gs`
--
ALTER TABLE `c_o_gs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `dests`
--
ALTER TABLE `dests`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `fairs`
--
ALTER TABLE `fairs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `finishes`
--
ALTER TABLE `finishes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `f_o_bs`
--
ALTER TABLE `f_o_bs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `materials`
--
ALTER TABLE `materials`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `prodmats`
--
ALTER TABLE `prodmats`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
--
-- AUTO_INCREMENT for table `product_names`
--
ALTER TABLE `product_names`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `p_o_buyers`
--
ALTER TABLE `p_o_buyers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `p_o_buyer_trans`
--
ALTER TABLE `p_o_buyer_trans`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `p_o_ds`
--
ALTER TABLE `p_o_ds`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `p_o_fairs`
--
ALTER TABLE `p_o_fairs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `p_o_fair_trans`
--
ALTER TABLE `p_o_fair_trans`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `p_o_ls`
--
ALTER TABLE `p_o_ls`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `seas`
--
ALTER TABLE `seas`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `sizes`
--
ALTER TABLE `sizes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `specialities`
--
ALTER TABLE `specialities`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `statuses`
--
ALTER TABLE `statuses`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `sub_categories`
--
ALTER TABLE `sub_categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `utilities`
--
ALTER TABLE `utilities`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `weights`
--
ALTER TABLE `weights`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
