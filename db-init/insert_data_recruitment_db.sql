-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: recruitment_db1
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
INSERT INTO `applications` VALUES (1,3,1,1,'PENDING','2026-03-26 13:49:36'),(2,8,5,1,'PENDING','2026-04-25 03:33:31');
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `candidate_profiles`
--

LOCK TABLES `candidate_profiles` WRITE;
/*!40000 ALTER TABLE `candidate_profiles` DISABLE KEYS */;
INSERT INTO `candidate_profiles` VALUES (1,3,'Male','2000-01-01','0123456789','HCM',NULL,NULL,NULL,NULL,'Nguyen Van A'),(2,5,'male','2005-12-07','012345678','VietNam','123123','123123','2016-12-07','adcxaws','NGUYEN NHAT KHANG'),(3,8,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `candidate_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'IT');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (1,'FPT Software','IT Company','Hanoi','https://fpt.com','https://res.cloudinary.com/dri1spe3b/image/upload/v1776610264/recruitment/company-logos/fpt_logo_edkuu6.png','ACTIVE','2026-03-26 13:49:36','2026-04-19 14:51:06','recruitment/company-logos/fpt_logo_edkuu6','image');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `cvs`
--

LOCK TABLES `cvs` WRITE;
/*!40000 ALTER TABLE `cvs` DISABLE KEYS */;
INSERT INTO `cvs` VALUES (1,3,'cv.pdf','2026-03-26 13:49:36',NULL,NULL),(2,5,'/uploads/e6e73edd-da98-43f4-bc35-c7af5cef25a2.pdf','2026-04-05 15:04:00',NULL,NULL),(5,7,'https://res.cloudinary.com/dri1spe3b/image/upload/v1776606338/recruitment/cvs/Nguyen-Chanh-Khue-TopCV.vn-050426.215558_h0xfkt.pdf','2026-04-19 13:45:40','recruitment/cvs/Nguyen-Chanh-Khue-TopCV.vn-050426.215558_h0xfkt','image');
/*!40000 ALTER TABLE `cvs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `experience_levels`
--

LOCK TABLES `experience_levels` WRITE;
/*!40000 ALTER TABLE `experience_levels` DISABLE KEYS */;
INSERT INTO `experience_levels` VALUES (1,'Junior'),(2,'Fresher'),(3,'Intern'),(4,'Senior'),(5,'Leader'),(7,'Mid-Level'),(8,'Test');
/*!40000 ALTER TABLE `experience_levels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `interviews`
--

LOCK TABLES `interviews` WRITE;
/*!40000 ALTER TABLE `interviews` DISABLE KEYS */;
INSERT INTO `interviews` VALUES (1,1,'2026-04-01 10:00:00','Office','SCHEDULED',NULL,NULL),(2,2,'2026-05-01 10:00:00','HCM Office','PENDING','WAITING','Mang CV + CCCD');
/*!40000 ALTER TABLE `interviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `job_skills`
--

LOCK TABLES `job_skills` WRITE;
/*!40000 ALTER TABLE `job_skills` DISABLE KEYS */;
INSERT INTO `job_skills` VALUES (1,1),(7,2),(7,6),(5,9),(5,10);
/*!40000 ALTER TABLE `job_skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES (1,'Java Developer','Backend dev','Java, Spring','Bonus',500,1000,'HCM','FULLTIME','OPEN','2026-12-31',1,1,1,'2026-03-26 13:49:36','2026-03-26 13:49:36'),(5,'HTML/CSS','FrontEnd Dev','Bootstrap , TailWind','Bonus',700,1300,'HCM','PART TIME','ACTIVE','2026-05-30',1,1,4,'2026-04-11 15:56:49','2026-04-11 16:05:20'),(7,'Python','Python','Python , MySQL','Bonus',700,1300,'HCM','PART TIME','ACTIVE','2026-05-05',1,1,4,'2026-05-04 16:33:07','2026-05-04 16:33:07');
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,3,'Applied successfully',0,'2026-03-26 13:49:36',NULL,NULL,NULL,NULL),(2,8,'Bạn có lịch phỏng vấn mới',0,'2026-04-25 03:33:44',_binary '\0','/api/interviews/2','INTERVIEW',9);
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `saved_jobs`
--

LOCK TABLES `saved_jobs` WRITE;
/*!40000 ALTER TABLE `saved_jobs` DISABLE KEYS */;
INSERT INTO `saved_jobs` VALUES (3,1,'2026-03-26 13:49:36'),(8,5,'2026-05-04 16:13:27');
/*!40000 ALTER TABLE `saved_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` VALUES (1,'Java'),(2,'Python'),(3,'ReactJS'),(4,'C/C++'),(5,'NodeJS'),(6,'MySQL'),(7,'MongoDB'),(8,'Spring Boot'),(9,'HTML'),(10,'CSS');
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin@gmail.com','123456','Admin','System',NULL,'ADMIN','ACTIVE','2026-03-26 13:49:36','2026-03-26 13:49:36',NULL,NULL,NULL),(2,'hr@company.com','123456','HR','Manager',NULL,'RECRUITER','ACTIVE','2026-03-26 13:49:36','2026-03-26 13:49:36',NULL,NULL,NULL),(3,'candidate@gmail.com','123456','Nguyen','An',NULL,'CANDIDATE','ACTIVE','2026-03-26 13:49:36','2026-03-26 13:49:36',NULL,NULL,NULL),(4,'khue@gmail.com','$2a$10$as.OjC5lXAaVxD.CCfBfN.EgaBXwB4L0IhcfnPwiwpgYzEh8SZ822','Khue','Chanh',NULL,'ADMIN','ACTIVE','2026-04-04 16:26:59','2026-04-04 16:26:59',NULL,NULL,NULL),(5,'khang@gmail.com','$2a$10$TUROeneEBBIKKmQg9Gmzfu34LRLUaeZjVgReKgkcLOYYYQUchtCVm','Khang','Nhat','https://res.cloudinary.com/dri1spe3b/image/upload/v1776611905/recruitment/candidate-avatars/food_feueni.jpg','CANDIDATE','ACTIVE','2026-04-04 17:28:35','2026-04-04 17:28:35',NULL,'recruitment/candidate-avatars/food_feueni','image'),(6,'recruiter@gmail.com','$2a$10$lPW.VCknQUg98iJPEFaeC.zYoND4.0Td4d7lT/diTuVgJwqdYhb4G','The','Recruiter',NULL,'RECRUITER','ACTIVE','2026-04-05 05:58:41','2026-04-05 05:58:41',NULL,NULL,NULL),(7,'candidate1@gmail.com','$2a$10$9/h3UhNs3HV.yMpjJg2l1eR3BzIvWkBPKk9gQCDLUhsvCh.22/BY2','The','Candidate1',NULL,'CANDIDATE','ACTIVE','2026-04-19 13:34:08','2026-04-19 13:34:08',NULL,NULL,NULL),(8,'chanhkhue7122005@gmail.com','$2a$10$IwpVgWPqF8QUeX.UhKpcV.18HhJWMwqiIZx645fXnP70RZhME0oj2','Khue','Chanh','https://res.cloudinary.com/dri1spe3b/image/upload/v1777042642/recruitment/candidate-avatars/tv2_u33kul.jpg','CANDIDATE','ACTIVE','2026-04-24 14:54:57','2026-04-24 14:54:57',NULL,'recruitment/candidate-avatars/tv2_u33kul','image'),(9,'recuruiter2@gmail.com','$2a$10$g4x9k36rXUBD289wIFsyT.RUNkGcY1YeiDMiC9rUrFMSiFmqGjfoC','RECRUITER','THE',NULL,'RECRUITER',NULL,NULL,'2026-04-25 03:31:08',1,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `verification_codes`
--

LOCK TABLES `verification_codes` WRITE;
/*!40000 ALTER TABLE `verification_codes` DISABLE KEYS */;
/*!40000 ALTER TABLE `verification_codes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-13 11:32:41
