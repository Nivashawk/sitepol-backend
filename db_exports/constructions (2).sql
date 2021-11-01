-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 30, 2021 at 09:59 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `constructions`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customer_ID` int(10) UNSIGNED NOT NULL,
  `category_ID` int(10) NOT NULL DEFAULT 1,
  `customer_name` varchar(50) DEFAULT NULL,
  `site_location` varchar(100) DEFAULT NULL,
  `site_name` varchar(200) DEFAULT NULL,
  `file_no` int(20) DEFAULT NULL,
  `booking_date` date DEFAULT NULL,
  `value_of_work` int(10) DEFAULT NULL,
  `cpvalue` int(10) NOT NULL DEFAULT 0,
  `intvalue` int(10) NOT NULL DEFAULT 0,
  `booked_by` int(10) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `wedding_anniversary` date DEFAULT NULL,
  `mobile_no` bigint(10) DEFAULT NULL,
  `user_ID` int(10) DEFAULT NULL,
  `priority` int(10) DEFAULT 1,
  `start_date` date DEFAULT NULL,
  `targetted_days` int(10) DEFAULT NULL,
  `file_signed` tinyint(1) DEFAULT 1,
  `design_approval` tinyint(1) NOT NULL DEFAULT 1,
  `design_approval_date` date DEFAULT NULL,
  `pre_inspection` tinyint(1) DEFAULT 1,
  `stickers_sent` tinyint(1) DEFAULT 1,
  `cs_count` int(10) NOT NULL DEFAULT 0,
  `carcass_delivered` tinyint(1) DEFAULT 1,
  `carcass_delivered_date` date DEFAULT NULL,
  `completion_date` date DEFAULT NULL,
  `false_ceiling` tinyint(1) DEFAULT 1,
  `fc_work` tinyint(1) NOT NULL DEFAULT 1,
  `painting_work` tinyint(1) NOT NULL DEFAULT 1,
  `lights_delivered` tinyint(1) NOT NULL DEFAULT 1,
  `lights_fixed` tinyint(1) NOT NULL DEFAULT 1,
  `structures_completed` tinyint(1) DEFAULT 1,
  `pf_measurement` tinyint(1) DEFAULT 1,
  `pf_sticker` tinyint(1) NOT NULL DEFAULT 1,
  `pfs_count` int(10) NOT NULL DEFAULT 0,
  `pf_shutters` tinyint(1) DEFAULT 1,
  `shutters_fixed` tinyint(1) DEFAULT 1,
  `otd_sticker` tinyint(1) NOT NULL DEFAULT 1,
  `otds_count1` int(10) NOT NULL DEFAULT 0,
  `otds_count2` int(10) NOT NULL DEFAULT 0,
  `laminate_status` tinyint(1) NOT NULL DEFAULT 1,
  `otd_delivered` tinyint(1) NOT NULL DEFAULT 1,
  `installation_started` tinyint(1) NOT NULL DEFAULT 1,
  `installation_completed` tinyint(1) NOT NULL DEFAULT 1,
  `final_bill_sent` tinyint(1) DEFAULT 1,
  `quote_upload` tinyint(1) DEFAULT 1,
  `design_upload` tinyint(1) DEFAULT 1,
  `design_upload_date` date DEFAULT NULL,
  `final_bill_upload` tinyint(1) DEFAULT 1,
  `final_bill_date` date DEFAULT NULL,
  `quote_download` tinyint(1) DEFAULT 1,
  `final_bill_download` tinyint(1) DEFAULT 1,
  `mobile_no2` bigint(10) DEFAULT NULL,
  `mobile_no3` bigint(10) DEFAULT NULL,
  `mobile_no4` bigint(10) DEFAULT NULL,
  `email1` varchar(50) DEFAULT NULL,
  `email2` varchar(50) DEFAULT NULL,
  `email3` varchar(50) DEFAULT NULL,
  `nri_number` bigint(14) DEFAULT NULL,
  `bajaj_fin` tinyint(1) NOT NULL DEFAULT 1,
  `status` tinyint(1) DEFAULT 1,
  `nstatus` tinyint(1) NOT NULL DEFAULT 1,
  `pm` int(10) NOT NULL DEFAULT 1,
  `se` int(10) NOT NULL DEFAULT 1,
  `sco` int(10) NOT NULL DEFAULT 1,
  `zone` int(10) DEFAULT NULL,
  `cc` tinyint(1) NOT NULL DEFAULT 1,
  `fc` tinyint(1) NOT NULL DEFAULT 1,
  `ec` tinyint(1) NOT NULL DEFAULT 1,
  `pc` tinyint(1) NOT NULL DEFAULT 1,
  `project_ID` int(10) DEFAULT NULL,
  `project_name` varchar(100) DEFAULT NULL,
  `city` int(10) NOT NULL DEFAULT 1,
  `pq_order` int(10) NOT NULL,
  `cleaning` tinyint(1) NOT NULL DEFAULT 1,
  `final_measurement` tinyint(1) NOT NULL DEFAULT 1,
  `quality_check` tinyint(1) NOT NULL DEFAULT 1,
  `quality_issues` tinyint(1) NOT NULL DEFAULT 1,
  `issues_attended` tinyint(1) NOT NULL DEFAULT 1,
  `site_handover` tinyint(1) NOT NULL DEFAULT 1,
  `type_of_shutters` tinyint(1) NOT NULL DEFAULT 1,
  `type_of_delivery` tinyint(1) NOT NULL DEFAULT 1,
  `carcass_measurement` tinyint(1) NOT NULL DEFAULT 1,
  `structures_started` tinyint(1) NOT NULL DEFAULT 1,
  `project` int(10) DEFAULT NULL,
  `site_pictures` tinyint(1) NOT NULL DEFAULT 1,
  `code_sheet` tinyint(1) NOT NULL DEFAULT 1,
  `gift` tinyint(1) NOT NULL DEFAULT 1,
  `cp` tinyint(1) NOT NULL DEFAULT 1,
  `dp` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customer_ID`, `category_ID`, `customer_name`, `site_location`, `site_name`, `file_no`, `booking_date`, `value_of_work`, `cpvalue`, `intvalue`, `booked_by`, `dob`, `wedding_anniversary`, `mobile_no`, `user_ID`, `priority`, `start_date`, `targetted_days`, `file_signed`, `design_approval`, `design_approval_date`, `pre_inspection`, `stickers_sent`, `cs_count`, `carcass_delivered`, `carcass_delivered_date`, `completion_date`, `false_ceiling`, `fc_work`, `painting_work`, `lights_delivered`, `lights_fixed`, `structures_completed`, `pf_measurement`, `pf_sticker`, `pfs_count`, `pf_shutters`, `shutters_fixed`, `otd_sticker`, `otds_count1`, `otds_count2`, `laminate_status`, `otd_delivered`, `installation_started`, `installation_completed`, `final_bill_sent`, `quote_upload`, `design_upload`, `design_upload_date`, `final_bill_upload`, `final_bill_date`, `quote_download`, `final_bill_download`, `mobile_no2`, `mobile_no3`, `mobile_no4`, `email1`, `email2`, `email3`, `nri_number`, `bajaj_fin`, `status`, `nstatus`, `pm`, `se`, `sco`, `zone`, `cc`, `fc`, `ec`, `pc`, `project_ID`, `project_name`, `city`, `pq_order`, `cleaning`, `final_measurement`, `quality_check`, `quality_issues`, `issues_attended`, `site_handover`, `type_of_shutters`, `type_of_delivery`, `carcass_measurement`, `structures_started`, `project`, `site_pictures`, `code_sheet`, `gift`, `cp`, `dp`) VALUES
(1, 1, 'Gnanavel', 'Chromepet', 'Gnanavel - Chromepet', 10001, '2021-10-18', 100000000, 0, 0, NULL, NULL, NULL, 9750079446, 1, 1, NULL, NULL, 1, 1, NULL, 1, 1, 0, 1, NULL, NULL, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, NULL, 1, NULL, 1, 1, NULL, NULL, NULL, 'gnanavel@deejos.com', NULL, NULL, NULL, 1, 1, 1, 7001, 7001, 1, NULL, 1, 1, 1, 1, NULL, NULL, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, NULL, 1, 1, 1, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `customer_locations`
--

CREATE TABLE `customer_locations` (
  `location_ID` int(10) UNSIGNED NOT NULL,
  `customer_ID` int(10) NOT NULL,
  `site_name` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `latitude` varchar(20) NOT NULL,
  `longitude` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer_locations`
--

INSERT INTO `customer_locations` (`location_ID`, `customer_ID`, `site_name`, `address`, `latitude`, `longitude`) VALUES
(1, 1, 'Gnanavel - Chromepet', 'No.1, 1st Floor, CLC Works Rd, Opposite to, Chromepet, Chennai, Tamil Nadu 600044', '12.9528534', '80.1410692');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` bigint(10) NOT NULL,
  `employee_ID` bigint(10) DEFAULT NULL,
  `user_ID` bigint(10) DEFAULT NULL,
  `employee_name` varchar(50) DEFAULT NULL,
  `designation` varchar(50) DEFAULT NULL,
  `department` bigint(10) DEFAULT NULL,
  `work_location` bigint(10) DEFAULT NULL,
  `doj` datetime DEFAULT NULL,
  `dor` datetime DEFAULT NULL,
  `dob` datetime DEFAULT NULL,
  `mobile` bigint(10) DEFAULT NULL,
  `alternate` bigint(10) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `father_name` varchar(50) DEFAULT NULL,
  `father_mobile` bigint(10) DEFAULT NULL,
  `mother_name` varchar(50) DEFAULT NULL,
  `mother_mobile` bigint(10) DEFAULT NULL,
  `present_address` varchar(50) DEFAULT NULL,
  `permanent_address` varchar(50) DEFAULT NULL,
  `blood_group` varchar(50) DEFAULT NULL,
  `photo` varchar(50) DEFAULT NULL,
  `bank_name` varchar(50) DEFAULT NULL,
  `account_no` varchar(50) DEFAULT NULL,
  `pf` bigint(1) DEFAULT NULL,
  `pf_no` varchar(50) DEFAULT NULL,
  `esi` bigint(1) DEFAULT NULL,
  `esi_no` varchar(50) DEFAULT NULL,
  `certificate1` varchar(100) DEFAULT NULL,
  `certificate2` varchar(100) DEFAULT NULL,
  `id_card` bigint(1) DEFAULT NULL,
  `access_card` bigint(1) DEFAULT NULL,
  `grade` bigint(10) DEFAULT NULL,
  `company_email` bigint(1) DEFAULT NULL,
  `offer_letter` bigint(1) DEFAULT NULL,
  `city` bigint(10) DEFAULT NULL,
  `status` bigint(1) DEFAULT NULL,
  `sgstatus` bigint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `employee_ID`, `user_ID`, `employee_name`, `designation`, `department`, `work_location`, `doj`, `dor`, `dob`, `mobile`, `alternate`, `email`, `father_name`, `father_mobile`, `mother_name`, `mother_mobile`, `present_address`, `permanent_address`, `blood_group`, `photo`, `bank_name`, `account_no`, `pf`, `pf_no`, `esi`, `esi_no`, `certificate1`, `certificate2`, `id_card`, `access_card`, `grade`, `company_email`, `offer_letter`, `city`, `status`, `sgstatus`, `createdAt`, `updatedAt`) VALUES
(1, 123, 123, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `moving_out_SEs`
--

CREATE TABLE `moving_out_SEs` (
  `reason_ID` bigint(10) NOT NULL,
  `Customer_ID` bigint(10) DEFAULT NULL,
  `place_name` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `latitude` varchar(50) DEFAULT NULL,
  `longitude` varchar(50) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `moving_out_SEs`
--

INSERT INTO `moving_out_SEs` (`reason_ID`, `Customer_ID`, `place_name`, `address`, `latitude`, `longitude`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'name_one', 'No.1, 1st Floor, CLC Works Rd, Opposite to, Chrome', '12.9528534', '80.1410692', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 1, 'name_two', 'No.1, 1st Floor, CLC Works Rd, Opposite to, Chrome', '12.9528534', '80.1410692', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 1, 'name_three', 'No.1, 1st Floor, CLC Works Rd, Opposite to, Chrome', '12.9528534', '80.1410692', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 1, 'shop name from postman', 'posted from postman', '88.25464712', '96.77090262', '0000-00-00 00:00:00', '2021-10-28 11:31:22'),
(5, 1, 'name_five', 'No.1, 1st Floor, CLC Works Rd, Opposite to, Chrome', '12.9528534', '80.1410692', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 1, 'name_six', 'No.1, 1st Floor, CLC Works Rd, Opposite to, Chrome', '12.9528534', '80.1410692', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 1, 'name_seven', 'No.1, 1st Floor, CLC Works Rd, Opposite to, Chrome', '12.9528534', '80.1410692', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, 1, 'name_eight', 'No.1, 1st Floor, CLC Works Rd, Opposite to, Chrome', '12.9528534', '80.1410692', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(9, 1, 'name_nine', 'No.1, 1st Floor, CLC Works Rd, Opposite to, Chrome', '12.9528534', '80.1410692', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `reason_SEs`
--

CREATE TABLE `reason_SEs` (
  `reason_ID` int(10) UNSIGNED NOT NULL,
  `main_reason` varchar(100) NOT NULL,
  `sub_reason` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reason_SEs`
--

INSERT INTO `reason_SEs` (`reason_ID`, `main_reason`, `sub_reason`) VALUES
(1, 'Local Hardware Shop', NULL),
(2, 'Rent Material Shop', NULL),
(3, 'Chromepet Office', NULL),
(4, 'ECR Office', NULL),
(5, 'Our Other Site', NULL),
(6, 'Labour Search', NULL),
(7, 'Other Necessary Work Travel', 'Misc. Material Purch'),
(8, 'Other Necessary Work Travel', 'Labour Pickup'),
(9, 'Other Necessary Work Travel', 'Transport Search');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `current_site` int(10) UNSIGNED NOT NULL,
  `user_group_id` tinyint(2) NOT NULL,
  `user_email` varchar(50) DEFAULT NULL,
  `user_name` varchar(50) DEFAULT NULL,
  `user_password` varchar(64) NOT NULL,
  `user_ip_address` varchar(50) NOT NULL,
  `user_activation_token` varchar(100) NOT NULL,
  `user_forgotten_password_token` varchar(100) DEFAULT NULL,
  `user_forgotten_password_expire` datetime DEFAULT NULL,
  `user_update_email_token` varchar(100) DEFAULT NULL,
  `user_active` tinyint(1) DEFAULT 0,
  `user_fail_login_attempts` smallint(5) DEFAULT 0,
  `user_fail_login_ip` varchar(50) DEFAULT NULL,
  `user_first_login` datetime DEFAULT NULL,
  `user_total_logins` int(10) DEFAULT 0,
  `user_last_login` datetime DEFAULT NULL,
  `user_creation_date` datetime NOT NULL,
  `current_moving_out_status` int(10) DEFAULT NULL,
  `duty_status` int(10) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_id`, `current_site`, `user_group_id`, `user_email`, `user_name`, `user_password`, `user_ip_address`, `user_activation_token`, `user_forgotten_password_token`, `user_forgotten_password_expire`, `user_update_email_token`, `user_active`, `user_fail_login_attempts`, `user_fail_login_ip`, `user_first_login`, `user_total_logins`, `user_last_login`, `user_creation_date`, `current_moving_out_status`, `duty_status`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 1, '9750079446', '8825464712', '$2a/VK.mK0eMA', '127.0.0.1', 'HQ5OvNob', NULL, NULL, NULL, 1, 0, NULL, '2019-04-16 19:12:44', 114, '2021-09-20 16:14:56', '2019-04-08 11:50:30', 4, 0, '2019-04-08 11:50:30', '2021-10-29 06:25:39'),
(2, 2, 2, 2, 'nivasnivi67@gmail.com', '8825464712', 'testing@123', '127.0.0.1', 'HQ5OvNob', NULL, NULL, NULL, 1, 0, NULL, '2019-04-16 19:12:44', 114, '2021-09-20 16:14:56', '2019-04-08 11:50:30', 1, 0, '2019-04-08 11:50:30', '2019-04-08 11:50:30'),
(3, 3, 3, 3, 'sharukh@gmail.com', 'SharukhTesting', 'testing@123', '127.0.0.1', 'HQ5OvNob', NULL, NULL, NULL, 1, 0, NULL, '2019-04-16 19:12:44', 114, '2021-09-20 16:14:56', '2019-04-08 11:50:30', 1, 1, '2019-04-08 11:50:30', '2019-04-08 11:50:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_ID`),
  ADD UNIQUE KEY `file_no` (`file_no`),
  ADD UNIQUE KEY `site_name` (`site_name`);

--
-- Indexes for table `customer_locations`
--
ALTER TABLE `customer_locations`
  ADD PRIMARY KEY (`location_ID`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `moving_out_SEs`
--
ALTER TABLE `moving_out_SEs`
  ADD PRIMARY KEY (`reason_ID`);

--
-- Indexes for table `reason_SEs`
--
ALTER TABLE `reason_SEs`
  ADD PRIMARY KEY (`reason_ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `customer_locations`
--
ALTER TABLE `customer_locations`
  MODIFY `location_ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
