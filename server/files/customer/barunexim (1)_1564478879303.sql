-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 18, 2017 at 12:25 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `barunexim`
--

-- --------------------------------------------------------

--
-- Table structure for table `activations`
--

CREATE TABLE `activations` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT '0',
  `completed_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `activations`
--

INSERT INTO `activations` (`id`, `user_id`, `code`, `completed`, `completed_at`, `created_at`, `updated_at`) VALUES
(1, 2, 'u9lxzNB62y5TACXCjSmIqO1Gi4RlltVb', 1, '2017-03-04 01:09:32', '2017-03-03 23:48:34', '2017-03-04 01:09:32'),
(2, 3, 'bDsolU6xVt7Nl1B2g3L0l9pHLgudOFSG', 1, '2017-03-04 01:09:29', '2017-03-03 23:52:49', '2017-03-04 01:09:29'),
(4, 5, '38fwPQuBR1WQxX7ikW1kzf8UnnY1ALLs', 0, NULL, '2017-03-16 01:27:37', '2017-03-16 01:27:37'),
(5, 6, 'SbJJCenFLT6gMujdKxLb7OSEzMeQ3QDg', 0, NULL, '2017-03-16 02:39:05', '2017-03-16 02:39:05'),
(6, 7, 'sSEwUMGFIg8nBsn76BV6Zn5wDQ53oRHO', 0, NULL, '2017-03-16 06:06:35', '2017-03-16 06:06:35'),
(7, 8, 'EumMl6ByqMqiGJlWpgLtSFLAqTWJzdDk', 0, '2017-03-17 05:31:25', '2017-03-17 02:35:12', '2017-03-17 05:31:25');

-- --------------------------------------------------------

--
-- Table structure for table `be_abouts`
--

CREATE TABLE `be_abouts` (
  `id` smallint(6) NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `be_abouts`
--

INSERT INTO `be_abouts` (`id`, `description`, `created_at`, `updated_at`) VALUES
(1, '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consectetur in nisi sit amet imperdiet. Nulla facilisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dignissim diam et orci malesuada tincidunt. Aliquam erat volutpat. Nunc metus nulla, luctus et justo eu, consequat dapibus orci. Suspendisse luctus porttitor rhoncus. Vestibulum tristique tellus et arcu bibendum posuere. Duis eget leo finibus, dapibus mauris quis, scelerisque augue.</p>\r\n<p>Vivamus vehicula dignissim purus, vitae tempor ligula pulvinar eu. In sodales maximus lectus a scelerisque. Sed a mauris ullamcorper, volutpat augue non, molestie ex. Integer turpis leo, pulvinar nec dapibus et, aliquam tempus nisi. Phasellus interdum feugiat dui, a suscipit purus vulputate vel. Nulla gravida risus vel diam luctus lobortis. Fusce malesuada tellus vel augue porttitor condimentum. Sed ut sapien vitae neque placerat venenatis. Donec vitae tristique mi. Aenean cursus diam nulla, sit amet porttitor dolor vestibulum&nbsp;</p>\r\n<p>&nbsp;</p>\r\n<p>Vivamus vehicula dignissim purus, vitae tempor ligula pulvinar eu. In sodales maximus lectus a scelerisque. Sed a mauris ullamcorper, volutpat augue non, molestie ex. Integer turpis leo, pulvinar nec dapibus et, aliquam tempus nisi. Phasellus interdum feugiat dui, a suscipit purus vulputate vel. Nulla gravida risus vel diam luctus lobortis. Fusce malesuada tellus vel augue porttitor condimentum. Sed ut sapien vitae neque placerat venenatis. Donec vitae tristique mi. Aenean cursus diam nulla, sit amet porttitor dolor vestibulum&nbsp;</p>', '2017-03-04 01:07:43', '2017-03-15 05:01:17');

-- --------------------------------------------------------

--
-- Table structure for table `be_categories`
--

CREATE TABLE `be_categories` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `be_categories`
--

INSERT INTO `be_categories` (`id`, `name`, `image`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Accessories', '/catimgs/img1.jpg', 1, '2017-03-03 23:55:03', '2017-03-18 04:34:05'),
(2, 'Decor', '/catimgs/img2.jpg', 1, '2017-03-03 23:55:15', '2017-03-18 04:34:05'),
(3, 'Lamp & Lightings', '/catimgs/img3.jpg', 1, '2017-03-03 23:55:21', '2017-03-18 04:34:06'),
(4, 'Gifts', '/catimgs/img4.jpg', 1, '2017-03-03 23:55:27', '2017-03-18 04:34:06'),
(5, 'About Us', '', 0, '2017-03-03 23:55:32', '2017-03-04 05:11:18'),
(6, 'Contact', '', 0, '2017-03-03 23:55:38', '2017-03-04 05:11:22'),
(7, 'Tablesgfhgdgrfr', '', 0, '2017-03-15 04:31:57', '2017-03-15 04:36:38'),
(8, 'Decor', '', 0, '2017-03-15 04:32:14', '2017-03-15 04:35:30'),
(9, 'Decor', NULL, 0, '2017-03-18 04:33:12', '2017-03-18 04:33:19');

-- --------------------------------------------------------

--
-- Table structure for table `be_contacts`
--

CREATE TABLE `be_contacts` (
  `id` smallint(6) NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `be_contacts`
--

INSERT INTO `be_contacts` (`id`, `address`, `email`, `phone`, `created_at`, `updated_at`) VALUES
(1, '198 West 21th Street,\r\nSuite 721\r\nNew York, 10010', 'youremail@yourdomain.com', '+88 (0) 101 00434433', '2017-03-04 02:09:27', '2017-03-15 05:02:39');

-- --------------------------------------------------------

--
-- Table structure for table `be_images`
--

CREATE TABLE `be_images` (
  `id` int(10) UNSIGNED NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `p_id` int(10) UNSIGNED NOT NULL,
  `status` smallint(6) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `be_images`
--

INSERT INTO `be_images` (`id`, `image`, `p_id`, `status`, `created_at`, `updated_at`) VALUES
(1, '/pImages/img1.jpg', 1, 1, '2017-03-10 04:32:48', '2017-03-10 04:32:48'),
(2, '/pImages/img2.jpg', 1, 1, '2017-03-10 04:32:48', '2017-03-10 04:32:48'),
(3, '/pImages/img3.jpg', 2, 1, '2017-03-10 04:34:23', '2017-03-10 04:34:23'),
(4, '/pImages/img4.jpg', 2, 1, '2017-03-10 04:34:23', '2017-03-10 04:34:23'),
(5, '/pImages/img5.jpg', 2, 1, '2017-03-10 04:34:23', '2017-03-10 04:34:23'),
(6, '/pImages/img6.jpg', 2, 1, '2017-03-10 04:34:23', '2017-03-10 04:34:23'),
(7, '/pImages/img7.jpg', 3, 1, '2017-03-10 04:35:11', '2017-03-10 04:35:11'),
(8, '/pImages/img8.jpg', 3, 1, '2017-03-10 04:35:11', '2017-03-10 04:35:11'),
(9, '/pImages/img9.jpg', 4, 1, '2017-03-10 04:36:58', '2017-03-10 04:36:58'),
(10, '/pImages/img10.jpg', 4, 1, '2017-03-10 04:36:58', '2017-03-10 04:36:58'),
(11, '/pImages/img11.jpg', 4, 1, '2017-03-10 04:36:58', '2017-03-10 04:36:58'),
(12, '/pImages/img12.jpg', 4, 1, '2017-03-10 04:36:58', '2017-03-10 04:36:58'),
(13, '/pImages/img13.jpg', 4, 1, '2017-03-10 04:36:58', '2017-03-10 04:36:58'),
(14, '/pImages/img14.jpg', 4, 1, '2017-03-10 04:36:59', '2017-03-10 04:36:59'),
(15, '/pImages/img15.jpg', 4, 1, '2017-03-10 04:36:59', '2017-03-10 04:36:59'),
(16, '/pImages/img16.jpg', 4, 1, '2017-03-10 04:36:59', '2017-03-10 04:36:59'),
(17, '/pImages/img17.jpg', 5, 1, '2017-03-11 02:36:26', '2017-03-11 02:36:26'),
(18, '/pImages/img18.jpg', 5, 1, '2017-03-11 02:36:27', '2017-03-11 02:36:27'),
(19, '/pImages/img19.jpg', 5, 1, '2017-03-11 02:36:27', '2017-03-11 02:36:27'),
(20, '/pImages/img20.jpg', 5, 1, '2017-03-11 05:52:32', '2017-03-11 05:52:33'),
(21, '/pImages/img21.jpg', 6, 1, '2017-03-11 06:23:52', '2017-03-11 06:23:53'),
(22, '/pImages/img22.jpg', 6, 1, '2017-03-11 06:23:53', '2017-03-11 06:23:53'),
(23, '/pImages/img23.jpg', 6, 1, '2017-03-11 06:23:53', '2017-03-11 06:23:54'),
(24, '/pImages/img24.jpg', 3, 1, '2017-03-15 04:55:29', '2017-03-15 04:55:29'),
(25, '/pImages/img25.jpg', 2, 0, '2017-03-15 04:57:50', '2017-03-15 04:58:01'),
(26, '/pImages/img26.jpg', 7, 0, '2017-03-15 05:00:25', '2017-03-17 23:33:33'),
(27, '/pImages/img27.jpg', 7, 0, '2017-03-15 05:00:25', '2017-03-17 23:33:33'),
(28, '/pImages/img28.jpg', 7, 0, '2017-03-15 05:00:25', '2017-03-17 23:33:33'),
(29, '/pImages/img29.jpg', 7, 0, '2017-03-15 05:00:25', '2017-03-17 23:33:33'),
(30, '/pImages/img30.jpg', 7, 0, '2017-03-15 05:00:25', '2017-03-17 23:33:33');

-- --------------------------------------------------------

--
-- Table structure for table `be_materials`
--

CREATE TABLE `be_materials` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` smallint(6) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `be_materials`
--

INSERT INTO `be_materials` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Wood', 0, '2017-03-04 03:10:08', '2017-03-04 03:11:05'),
(2, 'Iron', 1, '2017-03-04 03:10:23', '2017-03-04 03:11:00'),
(3, 'Saagwan', 1, '2017-03-07 05:13:24', '2017-03-07 05:13:24'),
(4, 'plastic', 1, '2017-03-07 05:14:00', '2017-03-07 05:14:00'),
(5, 'wood', 1, '2017-03-07 05:14:09', '2017-03-07 05:14:09');

-- --------------------------------------------------------

--
-- Table structure for table `be_products`
--

CREATE TABLE `be_products` (
  `id` int(10) UNSIGNED NOT NULL,
  `product_id` varchar(13) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `length` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `width` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `height` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `weight` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mat_id` int(10) UNSIGNED NOT NULL,
  `finish` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `care` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `caution` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subcategory` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `public` smallint(6) NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` smallint(6) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `be_products`
--

INSERT INTO `be_products` (`id`, `product_id`, `name`, `length`, `width`, `height`, `weight`, `mat_id`, `finish`, `description`, `care`, `caution`, `image`, `category`, `subcategory`, `public`, `slug`, `status`, `created_at`, `updated_at`) VALUES
(1, '378273', 'key chain', '34', '1.4', '23', '1', 5, 'rwr', '<p>rtet5 rwa4erw fdgdfgs rrtrt dfrw</p>', 'rewer', 'ewrew', '/cimages/img1.jpg', '1,', NULL, 1, '14891401681 5E', 1, '2017-03-10 04:32:48', '2017-03-16 04:43:19'),
(2, 'as567hj', 'sofa', '34', '4', '4', '1.4', 4, 'erwe', '<p>dsgt eerswe qweqw&nbsp;</p>', 'ewrerf', 'ght', '/cimages/img2.jpg', '1,3,', NULL, 1, '148914026321A4O', 1, '2017-03-10 04:34:23', '2017-03-16 04:45:48'),
(3, '378273', 'Sofaaaa', '33', '33', '7', '2', 3, 'rwegwrgtw', '<p>tyryty ty tywyerta etrt4 &nbsp;4w36 ww 46w5erfdrs ts dsfsf</p>', 'fjsrhfshfh', NULL, '/cimages/img3.jpg', '2,4,3,', NULL, 0, '148914031031A3O', 1, '2017-03-10 04:35:10', '2017-03-15 04:55:28'),
(4, '378273jh', 'table', '34', '2', '3', '12', 5, 'ipsum dolor sit a', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac ex nec lacus feugiat fermentum nec ut mi. Aliquam ante quam, mattis eu consectetur vel, fermentum eget dolor. Etiam pellentesque metus massa, sit amet ullamcorper massa varius eu. Nam in sem quis augue luctus dapibus. Integer egestas nibh auctor semper placerat. Fusce congue, lacus nec aliquet suscipit, velit ex semper turpis, eget ullamcorper nisi turpis sed lorem. Suspendisse a neque</p>', NULL, NULL, '/cimages/img4.jpg', '2,', NULL, 0, '148914041841L5A', 1, '2017-03-10 04:36:58', '2017-03-10 04:36:58'),
(5, '67868hhj', 'pen', '12', '2', '12', '1', 5, 'erererer', '<p>eargtawt erwr erw</p>', NULL, NULL, '/cimages/img5.jpg', '1,4,', NULL, 0, '1489219586515E', 1, '2017-03-11 02:36:26', '2017-03-11 02:36:26'),
(6, 'hut66767', 'Table', '4333', '22', '234', '3', 3, 'drfsrerf', '<p>dvfsawf hduahd hkehwhjh ehjeshrhg hefjhsehr</p>', 'rwerwrer', 'fsrrt', '/cimages/img6.jpg', '2,', NULL, 1, '148923322961L3A', 1, '2017-03-11 06:23:49', '2017-03-11 06:23:52'),
(7, 'bd7iijs', 'table', '442', '33', '33', '23', 4, 'raer', '<p>ger wer rertw</p>', NULL, NULL, '/cimages/img7.jpg', '2,', NULL, 0, '148957382371L4A', 0, '2017-03-15 05:00:23', '2017-03-17 23:33:30'),
(8, '378273', 'table', '4', '4', '4', '4', 2, 'rwegwrgtw', '<p>szerr</p>', NULL, NULL, NULL, '1,', NULL, 1, '148966005281L2A', 0, '2017-03-16 04:57:32', '2017-03-16 04:57:39');

-- --------------------------------------------------------

--
-- Table structure for table `be_slider_images`
--

CREATE TABLE `be_slider_images` (
  `id` smallint(6) NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `be_slider_images`
--

INSERT INTO `be_slider_images` (`id`, `image`, `created_at`, `updated_at`) VALUES
(1, '/slider/img1.jpg', '2017-03-14 02:35:25', '2017-03-14 02:35:25'),
(2, '/slider/img2.jpg', '2017-03-14 02:35:25', '2017-03-14 02:35:25'),
(3, '/slider/img3.jpg', '2017-03-14 02:35:25', '2017-03-14 02:35:25'),
(4, '/slider/img4.jpg', '2017-03-14 02:35:25', '2017-03-14 02:35:25');

-- --------------------------------------------------------

--
-- Table structure for table `be_sub_categories`
--

CREATE TABLE `be_sub_categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cat_id` smallint(5) UNSIGNED NOT NULL,
  `status` smallint(6) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `be_sub_categories`
--

INSERT INTO `be_sub_categories` (`id`, `name`, `cat_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 'lamp', 2, 1, '2017-03-04 00:22:44', '2017-03-04 00:41:41'),
(2, 'table', 2, 0, '2017-03-04 00:23:01', '2017-03-04 00:40:24'),
(3, 'key chain', 1, 0, '2017-03-04 00:34:19', '2017-03-04 00:41:14'),
(4, 'keychain', 1, 1, '2017-03-04 05:25:42', '2017-03-04 05:25:42'),
(5, 'clock', 4, 1, '2017-03-04 05:25:58', '2017-03-04 05:25:58'),
(6, 'light', 3, 1, '2017-03-04 05:26:07', '2017-03-04 05:26:07'),
(7, 'wall-hanging', 2, 1, '2017-03-04 05:30:41', '2017-03-04 05:30:41');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(14, '2014_07_02_230147_migration_cartalyst_sentinel', 1),
(16, '2017_03_03_080554_create_categories_table', 2),
(17, '2017_03_04_045842_create_sub_categories_table', 2),
(18, '2017_03_04_063252_about', 3),
(19, '2017_03_04_064052_create_contacts_table', 4),
(21, '2017_03_04_080655_create_materials_table', 5),
(29, '2017_03_07_061717_create_products_table', 6),
(30, '2017_03_07_070234_create_images_table', 6),
(33, '2017_03_11_095421_create_slider_images_table', 7),
(35, '2017_03_18_083739_addcimg', 8);

-- --------------------------------------------------------

--
-- Table structure for table `persistences`
--

CREATE TABLE `persistences` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `persistences`
--

INSERT INTO `persistences` (`id`, `user_id`, `code`, `created_at`, `updated_at`) VALUES
(3, 3, '8pHI2tcq3oaa1kWfS9cwhrn44wt1e2p4', '2017-03-11 02:43:00', '2017-03-11 02:43:00'),
(9, 3, 'tULF8wMPlqGBdOJvINyOLMir81g7lvle', '2017-03-14 01:33:27', '2017-03-14 01:33:27'),
(10, 3, '8kaWOSijPQZyzEYbDiAeRTkTd1n5f8vr', '2017-03-14 01:42:01', '2017-03-14 01:42:01'),
(11, 3, '1Jz4LYR2doOZwIEgIcN8OciNQw4ssvor', '2017-03-14 02:34:54', '2017-03-14 02:34:54'),
(14, 2, 'qSiPw7dRvzimDVRstPSGCXf4oqRct3wd', '2017-03-15 05:27:04', '2017-03-15 05:27:04'),
(16, 2, 'EKdWDwNEAGkMQxz0t1Qd8xyjEktc1rZp', '2017-03-15 06:11:25', '2017-03-15 06:11:25'),
(18, 3, 'XU5sudnnJJBa6i0CkuywOtucAFDJiNcz', '2017-03-15 06:42:20', '2017-03-15 06:42:20'),
(20, 3, 'MBdMvQ4Cc07Ap14NDongGyFB0onq1hZb', '2017-03-15 07:25:13', '2017-03-15 07:25:13'),
(26, 2, 'FNfzeQs3vYAmHtBudoozKD2aMLcuUA0b', '2017-03-16 00:23:16', '2017-03-16 00:23:16'),
(34, 3, 'UzFlTJr0p7Tvj8HalIIxPXNvh0Mjue9m', '2017-03-16 02:42:16', '2017-03-16 02:42:16'),
(36, 3, 'c5Ee5aiPRWrF4iAH18lt4xt2UVfNrKYh', '2017-03-16 04:37:54', '2017-03-16 04:37:54'),
(37, 2, 'HhwRiBwPJoACy8H5pXmzPlDTvhYUhhlA', '2017-03-16 06:57:51', '2017-03-16 06:57:51'),
(39, 3, 'UxSTcgjAo0vwuAhQZcknKSBIN1EF7DG3', '2017-03-18 02:23:48', '2017-03-18 02:23:48');

-- --------------------------------------------------------

--
-- Table structure for table `reminders`
--

CREATE TABLE `reminders` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT '0',
  `completed_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reminders`
--

INSERT INTO `reminders` (`id`, `user_id`, `code`, `completed`, `completed_at`, `created_at`, `updated_at`) VALUES
(1, 3, 'kbMbvtshKUu8vEjKmNwxBG3R6lfy2SOn', 1, '2017-03-16 00:20:22', '2017-03-16 00:20:22', '2017-03-16 00:20:22'),
(2, 3, '4kHEO9AlEAXLPq25XPYgUmOgK2pkZO83', 1, '2017-03-16 00:21:12', '2017-03-16 00:21:11', '2017-03-16 00:21:12'),
(3, 2, 'N1h2XXbiT2afzlkuMz7jZfCb1qlKStFP', 1, '2017-03-16 00:32:11', '2017-03-16 00:32:11', '2017-03-16 00:32:11'),
(4, 2, '6PZihmopqDXARN73UIR7BHrGOlRLQ0fB', 1, '2017-03-16 00:32:46', '2017-03-16 00:32:46', '2017-03-16 00:32:46'),
(5, 8, 'yIKWT4ynzIYV1iUK8iNeZcc735ZZJPMQ', 1, '2017-03-17 05:11:52', '2017-03-17 04:59:36', '2017-03-17 05:11:52');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(10) UNSIGNED NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `permissions` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `slug`, `name`, `permissions`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'admin', NULL, NULL, NULL),
(2, 'customer', 'customer', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `role_users`
--

CREATE TABLE `role_users` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_users`
--

INSERT INTO `role_users` (`user_id`, `role_id`, `created_at`, `updated_at`) VALUES
(2, 2, '2017-03-03 23:48:34', '2017-03-03 23:48:34'),
(3, 1, '2017-03-03 23:52:49', '2017-03-03 23:52:49'),
(4, 2, '2017-03-15 01:06:21', '2017-03-15 01:06:21'),
(5, 2, '2017-03-16 01:27:37', '2017-03-16 01:27:37'),
(6, 2, '2017-03-16 02:39:06', '2017-03-16 02:39:06'),
(7, 2, '2017-03-16 06:06:35', '2017-03-16 06:06:35'),
(8, 2, '2017-03-17 02:35:12', '2017-03-17 02:35:12');

-- --------------------------------------------------------

--
-- Table structure for table `throttle`
--

CREATE TABLE `throttle` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ip` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `throttle`
--

INSERT INTO `throttle` (`id`, `user_id`, `type`, `ip`, `created_at`, `updated_at`) VALUES
(1, NULL, 'global', NULL, '2017-03-14 00:24:21', '2017-03-14 00:24:21'),
(2, NULL, 'ip', '127.0.0.1', '2017-03-14 00:24:21', '2017-03-14 00:24:21'),
(3, 2, 'user', NULL, '2017-03-14 00:24:21', '2017-03-14 00:24:21'),
(4, NULL, 'global', NULL, '2017-03-15 05:26:44', '2017-03-15 05:26:44'),
(5, NULL, 'ip', '127.0.0.1', '2017-03-15 05:26:44', '2017-03-15 05:26:44'),
(6, 2, 'user', NULL, '2017-03-15 05:26:44', '2017-03-15 05:26:44'),
(7, NULL, 'global', NULL, '2017-03-15 05:48:40', '2017-03-15 05:48:40'),
(8, NULL, 'ip', '127.0.0.1', '2017-03-15 05:48:40', '2017-03-15 05:48:40'),
(9, 2, 'user', NULL, '2017-03-15 05:48:40', '2017-03-15 05:48:40'),
(10, NULL, 'global', NULL, '2017-03-15 07:24:50', '2017-03-15 07:24:50'),
(11, NULL, 'ip', '127.0.0.1', '2017-03-15 07:24:50', '2017-03-15 07:24:50'),
(12, 3, 'user', NULL, '2017-03-15 07:24:50', '2017-03-15 07:24:50'),
(13, NULL, 'global', NULL, '2017-03-15 07:24:56', '2017-03-15 07:24:56'),
(14, NULL, 'ip', '127.0.0.1', '2017-03-15 07:24:56', '2017-03-15 07:24:56'),
(15, 3, 'user', NULL, '2017-03-15 07:24:56', '2017-03-15 07:24:56'),
(16, NULL, 'global', NULL, '2017-03-15 23:30:41', '2017-03-15 23:30:41'),
(17, NULL, 'ip', '127.0.0.1', '2017-03-15 23:30:41', '2017-03-15 23:30:41'),
(18, 3, 'user', NULL, '2017-03-15 23:30:41', '2017-03-15 23:30:41'),
(19, NULL, 'global', NULL, '2017-03-15 23:32:23', '2017-03-15 23:32:23'),
(20, NULL, 'ip', '127.0.0.1', '2017-03-15 23:32:23', '2017-03-15 23:32:23'),
(21, 3, 'user', NULL, '2017-03-15 23:32:23', '2017-03-15 23:32:23'),
(22, NULL, 'global', NULL, '2017-03-15 23:50:10', '2017-03-15 23:50:10'),
(23, NULL, 'ip', '127.0.0.1', '2017-03-15 23:50:10', '2017-03-15 23:50:10'),
(24, 3, 'user', NULL, '2017-03-15 23:50:10', '2017-03-15 23:50:10'),
(25, NULL, 'global', NULL, '2017-03-15 23:50:19', '2017-03-15 23:50:19'),
(26, NULL, 'ip', '127.0.0.1', '2017-03-15 23:50:19', '2017-03-15 23:50:19'),
(27, 3, 'user', NULL, '2017-03-15 23:50:19', '2017-03-15 23:50:19'),
(28, NULL, 'global', NULL, '2017-03-15 23:51:12', '2017-03-15 23:51:12'),
(29, NULL, 'ip', '127.0.0.1', '2017-03-15 23:51:12', '2017-03-15 23:51:12'),
(30, 3, 'user', NULL, '2017-03-15 23:51:12', '2017-03-15 23:51:12'),
(31, NULL, 'global', NULL, '2017-03-16 02:02:54', '2017-03-16 02:02:54'),
(32, NULL, 'ip', '127.0.0.1', '2017-03-16 02:02:54', '2017-03-16 02:02:54'),
(33, 2, 'user', NULL, '2017-03-16 02:02:54', '2017-03-16 02:02:54'),
(34, NULL, 'global', NULL, '2017-03-17 05:12:17', '2017-03-17 05:12:17'),
(35, NULL, 'ip', '127.0.0.1', '2017-03-17 05:12:17', '2017-03-17 05:12:17'),
(36, 8, 'user', NULL, '2017-03-17 05:12:17', '2017-03-17 05:12:17'),
(37, NULL, 'global', NULL, '2017-03-17 05:29:25', '2017-03-17 05:29:25'),
(38, NULL, 'ip', '127.0.0.1', '2017-03-17 05:29:25', '2017-03-17 05:29:25'),
(39, 3, 'user', NULL, '2017-03-17 05:29:25', '2017-03-17 05:29:25');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `permissions` text COLLATE utf8mb4_unicode_ci,
  `last_login` timestamp NULL DEFAULT NULL,
  `first_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` char(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(12) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address1` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address2` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postal_code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `permissions`, `last_login`, `first_name`, `last_name`, `gender`, `phone`, `address1`, `address2`, `country`, `city`, `state`, `postal_code`, `status`, `created_at`, `updated_at`) VALUES
(2, 'akshay@gmail.com', '$2y$10$w/1oFcOusPL71zTBwmNd6u440PwcOuFEBP2qDkZEXYwHqAmgsiO4O', NULL, '2017-03-16 06:57:51', 'Akshay', 'Kumar', 'm', '546363645', 'ghrdhf', 'fdsgsrfaw', 'India', 'Jodhpur', 'Raj', '3423123', 1, '2017-03-03 23:48:34', '2017-03-16 06:57:51'),
(3, 'admin@be.com', '$2y$10$AQLd8GCUXP6cM9O7XHKFL.p5AiSaaXEY5jXlaFStWP2ZtfJ2BgGie', NULL, '2017-03-18 02:23:48', 'Admin', NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-03-03 23:52:49', '2017-03-18 02:23:48'),
(4, 'rahul@gmail.com', '$2y$10$m.ohWMmiE5EgWmtvnYoSl.Y6T496937kKhe/4h6IJ/cXh9O.fSESm', NULL, NULL, 'Rahul', 'Sharma', 'm', '7878788888', 'fvjfje  hjeuaeiu euwueuweu', 'gdawuuwheuh', 'Australia', 'dfwe', 'Queensland', '67788', 0, '2017-03-15 01:06:21', '2017-03-15 05:08:57'),
(5, 'alex@gmail.com', '$2y$10$9707Tgz9m.womCHvYWPbbekxP8LF61ngdpZmUSrjM0BvoBfJS2aXO', NULL, NULL, 'Alex', 'Cruise', 'm', '9876543211', 'fgsrgwrt', 'sfraw', 'Australia', 'dfwe', 'South Australia', '34323', 1, '2017-03-16 01:27:37', '2017-03-16 01:27:37'),
(6, 'brandon@gmail.com', '$2y$10$hr12tzAfFFxy43u71hJZyeW1NLA9TSJadWMxMtmENnM8YS8BTA3z2', NULL, NULL, 'Brandon', 'Sadon', 'f', '43434243333', 'fsadfs', 'asdsa', 'Bahamas', 'faawse', 'Mayaguana', '321212', 1, '2017-03-16 02:39:05', '2017-03-16 02:39:05'),
(7, 'alex1@gmail.com', '$2y$10$mCfEHwiocnHzL9Zb9gLHGuZhxauoM8LPMnaApJEMmqKoj5B/OtFUi', NULL, NULL, 'Alex', 'Sadon', 'f', '23123213123', 'erwr ewearer rerre', 'ASerar rfettr erttrt', 'Argentina', 'faawse', 'Misiones', '34243', 1, '2017-03-16 06:06:35', '2017-03-16 06:06:35'),
(8, 'xifevoguhu@evyush.com', '$2y$10$Nde6k2zh/0oxqSHekA0n4OKD.ruu3tA8GuHnWV8TIZWOXa8.tscWy', NULL, '2017-03-17 05:12:26', 'sample', 'user', 'm', '7879378783', 'rfwersr', 'rsredsre', 'Ashmore and Cartier Island', 'faawse', 'Ashmore and Cartier Island', '32323', 0, '2017-03-17 02:35:12', '2017-03-17 06:05:31');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activations`
--
ALTER TABLE `activations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `be_categories`
--
ALTER TABLE `be_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `be_images`
--
ALTER TABLE `be_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `be_images_p_id_foreign` (`p_id`);

--
-- Indexes for table `be_materials`
--
ALTER TABLE `be_materials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `be_products`
--
ALTER TABLE `be_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `be_products_mat_id_foreign` (`mat_id`);

--
-- Indexes for table `be_sub_categories`
--
ALTER TABLE `be_sub_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `be_sub_categories_cat_id_foreign` (`cat_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `persistences`
--
ALTER TABLE `persistences`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `persistences_code_unique` (`code`);

--
-- Indexes for table `reminders`
--
ALTER TABLE `reminders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_slug_unique` (`slug`);

--
-- Indexes for table `role_users`
--
ALTER TABLE `role_users`
  ADD PRIMARY KEY (`user_id`,`role_id`);

--
-- Indexes for table `throttle`
--
ALTER TABLE `throttle`
  ADD PRIMARY KEY (`id`),
  ADD KEY `throttle_user_id_index` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activations`
--
ALTER TABLE `activations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `be_categories`
--
ALTER TABLE `be_categories`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `be_images`
--
ALTER TABLE `be_images`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT for table `be_materials`
--
ALTER TABLE `be_materials`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `be_products`
--
ALTER TABLE `be_products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `be_sub_categories`
--
ALTER TABLE `be_sub_categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
--
-- AUTO_INCREMENT for table `persistences`
--
ALTER TABLE `persistences`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
--
-- AUTO_INCREMENT for table `reminders`
--
ALTER TABLE `reminders`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `throttle`
--
ALTER TABLE `throttle`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `be_images`
--
ALTER TABLE `be_images`
  ADD CONSTRAINT `be_images_p_id_foreign` FOREIGN KEY (`p_id`) REFERENCES `be_products` (`id`);

--
-- Constraints for table `be_products`
--
ALTER TABLE `be_products`
  ADD CONSTRAINT `be_products_mat_id_foreign` FOREIGN KEY (`mat_id`) REFERENCES `be_materials` (`id`);

--
-- Constraints for table `be_sub_categories`
--
ALTER TABLE `be_sub_categories`
  ADD CONSTRAINT `be_sub_categories_cat_id_foreign` FOREIGN KEY (`cat_id`) REFERENCES `be_categories` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
