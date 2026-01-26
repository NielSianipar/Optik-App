-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 26, 2026 at 04:17 PM
-- Server version: 8.4.3
-- PHP Version: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `optik_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text,
  `author` varchar(100) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `title`, `content`, `author`, `image_url`, `created_at`) VALUES
(1, 'Cara Merawat Kacamata Agar Tidak Mudah Tergores', 'Gunakan kain microfiber dan cairan pembersih khusus. Jangan gunakan baju untuk mengelap lensa...', 'Dr. Daniel S.', 'https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2022/07/01034242/Ketahui-Berbagai-Cara-Menyembuhkan-Mata-Minus-secara-Alami.jpg', '2026-01-05 15:27:38'),
(2, 'Mengenal Perbedaan Minus dan Silinder', 'Mata minus kesulitan melihat jauh, sedangkan silinder membuat bayangan berbayang. Keduanya butuh penanganan berbeda...', 'Optometrist Rina', 'https://cdn-image.hipwee.com/wp-content/uploads/2018/11/hipwee-Lasik-corrects-myopia-side-640x326.jpg', '2026-01-05 15:27:38');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `total_price` decimal(15,2) NOT NULL,
  `items_summary` text,
  `status` varchar(50) DEFAULT 'Pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `address` varchar(255) DEFAULT '',
  `phone` varchar(20) DEFAULT '',
  `payment_method` varchar(50) DEFAULT '',
  `items` text,
  `payment_status` varchar(50) DEFAULT 'Belum Lunas'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customer_name`, `total_price`, `items_summary`, `status`, `created_at`, `address`, `phone`, `payment_method`, `items`, `payment_status`) VALUES
(5, 'Daniel Sianipar', 1500000.00, NULL, 'Selesai', '2026-01-21 07:44:02', 'sasasa', '2121', 'cod', 'Aviator Maverick Classic', 'Lunas'),
(6, 'Daniel Sianipar', 1500000.00, NULL, 'Selesai', '2026-01-21 07:47:36', 'dsadsa', '321321', 'dana', 'Aviator Maverick Classic', 'Lunas'),
(7, 'daniel', 950000.00, NULL, 'Selesai', '2026-01-21 13:02:47', 'joshaPDA', '23812389', 'cod', 'Urban Wayfarer Black', 'Lunas'),
(8, 'daniel', 2450000.00, NULL, 'Selesai', '2026-01-23 11:09:58', 'JL Taduan', '0821211221', 'qris', 'Aviator Maverick Classic, Urban Wayfarer Black', 'Lunas'),
(9, 'daniel', 600000.00, NULL, 'Selesai', '2026-01-25 10:47:08', 'hdasogdasogda', '923791239712', 'qris', 'Softlens Color Hazel, Acuvue Oasys 2-Week', 'Lunas');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(15,2) NOT NULL,
  `description` text,
  `image_url` varchar(255) DEFAULT NULL,
  `category` varchar(50) DEFAULT 'frame'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`, `image_url`, `category`) VALUES
(1, 'Kacamata Retro Modern', 750000.00, 'Kacamata dengan desain vintage namun tetap elegan.', 'https://down-id.img.susercontent.com/file/id-11134207-7rask-m3oq6ysie7ps5e', 'best_seller'),
(2, 'Aviator Maverick Classic', 1500000.00, 'Desain ikonik ala pilot yang tak lekang oleh waktu. Bingkai metal ringan.', 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop', 'frame'),
(3, 'Urban Wayfarer Black', 950000.00, 'Bingkai tebal yang bold dan modern. Cocok untuk aktivitas sehari-hari.', 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=600&auto=format&fit=crop', 'frame'),
(4, 'Minimalist Round Gold', 1250000.00, 'Kacamata bulat dengan sentuhan vintage gold. Memberikan kesan intelektual.', 'https://res.cloudinary.com/ruparupa-com/image/upload/h_1000,w_1000,f_auto/f_auto,q_auto:eco/v1690578496/Products/10495639_1.jpg', 'frame'),
(5, 'Cat Eye Vogue Lady', 1800000.00, 'Desain sudut lancip yang elegan, sangat pas untuk wajah oval dan hati.', 'https://tse4.mm.bing.net/th/id/OIP.SNcKkhAzP_qaH2eVUnYirgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3', 'frame'),
(6, 'Sport Active Blue', 2100000.00, 'Lensa polarized anti-silau, dirancang khusus untuk olahraga luar ruangan.', 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=600&auto=format&fit=crop', 'frame'),
(7, 'Softlens Clear Daily', 350000.00, 'Softlens harian bening, nyaman dipakai seharian penuh.', 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&auto=format&fit=crop', 'softlens'),
(8, 'Softlens Color Hazel', 150000.00, 'Softlens warna hazel natural, membuat mata terlihat hidup.', 'https://th.bing.com/th/id/OIP.MyExf1LCwC1GJ-W2aLGKlQHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3', 'softlens'),
(9, 'Lensa Bluechromic Premium', 850000.00, 'Lensa gabungan anti-radiasi dan photochromic (berubah gelap).', 'https://down-id.img.susercontent.com/file/id-11134207-7r98p-ln6opn54uc6f61', 'lensa'),
(10, 'Lensa Progressive Digital', 1200000.00, 'Lensa multifokus tanpa batas untuk penglihatan jauh dan dekat.', 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&auto=format&fit=crop', 'lensa'),
(11, 'Lensa Anti-Radiasi Blue Ray', 250000.00, 'Melindungi mata dari bahaya sinar biru gadget (HP/Laptop). Mengurangi kelelahan mata.', 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop', 'lensa'),
(12, 'Lensa Photochromic Grey', 450000.00, 'Lensa pintar yang berubah gelap saat terkena matahari dan kembali bening di dalam ruangan.', 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=600&auto=format&fit=crop', 'lensa'),
(13, 'Lensa Hi-Index 1.67 (Tipis)', 950000.00, 'Solusi untuk minus tinggi. Lensa 40% lebih tipis dan ringan dibanding lensa standar.', 'https://down-id.img.susercontent.com/file/id-11134207-7rbka-m8b6k491vgfhe5', 'lensa'),
(14, 'Lensa Essilor Crizal Sapphire', 1850000.00, 'Lensa premium dengan lapisan anti-pantul terbaik. Penglihatan jernih dari segala sudut.', 'https://heykama.dlps.my.id/wp-content/uploads/2025/02/ginee_20250217123812933_4873719879.jpeg', 'lensa'),
(15, 'Lensa Bifokal Kryptok', 150000.00, 'Lensa ganda klasik untuk melihat jauh dan baca (dekat). Terdapat batas terlihat.', 'https://down-id.img.susercontent.com/file/id-11134207-7r98u-luhv6vr9kixca8', 'lensa'),
(16, 'Acuvue Oasys 2-Week', 450000.00, 'Softlens bening premium untuk pemakaian 2 minggu. Sangat nyaman dan melembabkan.', 'https://tse4.mm.bing.net/th/id/OIP.NOeKcB_ML8gObzGbeGV_VQHaHa?w=650&h=650&rs=1&pid=ImgDetMain&o=7&rm=3', 'softlens'),
(17, 'X2 Diary Brown (Normal)', 95000.00, 'Softlens warna coklat natural untuk penggunaan sehari-hari. Diameter 14.5mm.', 'https://down-ph.img.susercontent.com/file/cn-11134207-7qukw-lf9gcpsfbbxl72', 'softlens'),
(18, 'Freshlook Colorblends Grey', 270000.00, 'Teknologi warna 3-in-1 memberikan tampilan mata abu-abu yang menawan namun tetap alami.', 'https://down-ph.img.susercontent.com/file/ph-11134207-7r98r-luoep4r9j1hn83', 'softlens'),
(19, 'Softlens Toric (Silinder)', 350000.00, 'Didesain khusus untuk penderita mata silinder (astigmatisme). Stabil di mata.', 'https://img.lazcdn.com/g/p/a644f4e9f79cbecf2a740eeafa3ca5be.jpg_720x720q80.jpg', 'softlens'),
(20, 'EOS Ice Blue Big Eyes', 120000.00, 'Memberikan efek mata boneka (doll eye) dengan warna biru cerah yang eksotis.', 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&auto=format&fit=crop', 'softlens'),
(21, 'Kaca Mata STB', 400000.00, 'KACAMATA INDAH', 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/103/MTA-61181887/no-brand_no-brand_full01.jpg', 'frame'),
(22, 'Kacamata Edouia', 200000.00, 'Kacamata minimalist indah terbaru 2025', 'https://img.ebdcdn.com/product/frame/white/lupl01070_2.jpg?im=Resize', 'frame');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `role` varchar(20) DEFAULT 'customer'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`, `created_at`, `role`) VALUES
(1, 'daniel@gmail.com', '$2a$10$r7Pt47kKVS.sEIVEYJ3c7uRv5JwIHEfNSTjRq4hluHWZsDsd62izy', 'Daniel Sianipar', '2026-01-05 15:47:51', 'admin'),
(2, 'daniel@example.com', '$2a$10$gtLbYVqAiyfR59uQg0pu5eYoCdMnFteLn/Plo.uqO5faBgQCmYB8i', 'daniel', '2026-01-13 07:48:11', 'customer'),
(3, 'muti@example.com', '$2a$10$OqnwFpPKFeCKmwr4zpTiFezwpj1.w66VeLch.hBHfaxTzq2xeVHHC', 'muti', '2026-01-21 06:49:44', 'customer');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
