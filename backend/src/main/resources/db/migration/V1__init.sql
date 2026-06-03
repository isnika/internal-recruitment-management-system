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
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applications` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `job_id` bigint DEFAULT NULL,
  `cv_id` bigint DEFAULT NULL,
  `status` enum('APPLIED','PENDING','REVIEWING','SHORTLISTED','REJECTED','WITHDRAWN','HIRED') DEFAULT NULL,
  `applied_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `job_id` (`job_id`),
  KEY `cv_id` (`cv_id`),
  CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `applications_ibfk_2` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE,
  CONSTRAINT `applications_ibfk_3` FOREIGN KEY (`cv_id`) REFERENCES `cvs` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
INSERT INTO `applications` VALUES (3,5,49,5,'PENDING','2026-05-24 08:14:32');
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidate_profiles`
--

DROP TABLE IF EXISTS `candidate_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidate_profiles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `tax_code` varchar(255) DEFAULT NULL,
  `citizen_id` varchar(255) DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `social_link` varchar(255) DEFAULT NULL,
  `bank_account_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `candidate_profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate_profiles`
--

LOCK TABLES `candidate_profiles` WRITE;
/*!40000 ALTER TABLE `candidate_profiles` DISABLE KEYS */;
INSERT INTO `candidate_profiles` VALUES (1,3,'Male','2000-01-01','0123456789','HCM',NULL,NULL,NULL,NULL,'Nguyen Van A'),(2,5,'male','2005-12-07','012345678','VietNam','123123','123123','2016-12-07','adcxaws','NGUYEN NHAT KHANG'),(3,8,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `candidate_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'IT'),(2,'Marketing'),(3,'Human Resources'),(4,'Finance'),(5,'Accounting'),(6,'Sales'),(7,'Customer Support'),(8,'Design'),(9,'Business Analysis'),(10,'Project Management'),(11,'Data Science'),(12,'Frontend Development'),(13,'Backend Development'),(14,'Mobile Development'),(15,'DevOps'),(16,'Cyber Security'),(17,'AI / Machine Learning'),(18,'QA / Testing'),(19,'UI/UX Design'),(20,'Data Engineering'),(21,'Cloud Computing');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `logo_storage_public_id` varchar(255) DEFAULT NULL,
  `logo_storage_resource_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (1,'FPT Software','IT Company','Hanoi','https://fpt.com','https://res.cloudinary.com/dri1spe3b/image/upload/v1776610264/recruitment/company-logos/fpt_logo_edkuu6.png','ACTIVE','2026-03-26 13:49:36','2026-04-19 14:51:06','recruitment/company-logos/fpt_logo_edkuu6','image');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cvs`
--

DROP TABLE IF EXISTS `cvs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cvs` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `file_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `storage_public_id` varchar(255) DEFAULT NULL,
  `storage_resource_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `cvs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cvs`
--

LOCK TABLES `cvs` WRITE;
/*!40000 ALTER TABLE `cvs` DISABLE KEYS */;
INSERT INTO `cvs` VALUES (1,3,'cv.pdf','2026-03-26 13:49:36',NULL,NULL),(2,5,'/uploads/e6e73edd-da98-43f4-bc35-c7af5cef25a2.pdf','2026-04-05 15:04:00',NULL,NULL),(5,7,'https://res.cloudinary.com/dri1spe3b/image/upload/v1776606338/recruitment/cvs/Nguyen-Chanh-Khue-TopCV.vn-050426.215558_h0xfkt.pdf','2026-04-19 13:45:40','recruitment/cvs/Nguyen-Chanh-Khue-TopCV.vn-050426.215558_h0xfkt','image');
/*!40000 ALTER TABLE `cvs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experience_levels`
--

DROP TABLE IF EXISTS `experience_levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experience_levels` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experience_levels`
--

LOCK TABLES `experience_levels` WRITE;
/*!40000 ALTER TABLE `experience_levels` DISABLE KEYS */;
INSERT INTO `experience_levels` VALUES (1,'Junior'),(2,'Fresher'),(3,'Intern'),(4,'Senior'),(5,'Leader'),(7,'Mid-Level'),(8,'Test');
/*!40000 ALTER TABLE `experience_levels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interviews`
--

DROP TABLE IF EXISTS `interviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interviews` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `application_id` bigint DEFAULT NULL,
  `schedule_time` datetime DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `status` enum('PENDING','ACCEPTED','REJECTED','SCHEDULED') DEFAULT NULL,
  `result` varchar(255) DEFAULT NULL,
  `note` text,
  PRIMARY KEY (`id`),
  KEY `application_id` (`application_id`),
  CONSTRAINT `interviews_ibfk_1` FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interviews`
--

LOCK TABLES `interviews` WRITE;
/*!40000 ALTER TABLE `interviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `interviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_skills`
--

DROP TABLE IF EXISTS `job_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_skills` (
  `job_id` bigint NOT NULL,
  `skill_id` bigint NOT NULL,
  PRIMARY KEY (`job_id`,`skill_id`),
  KEY `skill_id` (`skill_id`),
  CONSTRAINT `job_skills_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE,
  CONSTRAINT `job_skills_ibfk_2` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_skills`
--

LOCK TABLES `job_skills` WRITE;
/*!40000 ALTER TABLE `job_skills` DISABLE KEYS */;
INSERT INTO `job_skills` VALUES (49,4),(53,4),(60,4),(66,4),(71,4),(77,4),(81,4),(49,5),(54,5),(60,5),(67,5),(71,5),(77,5),(82,5),(49,6),(54,6),(61,6),(67,6),(72,6),(78,6),(82,6),(50,7),(55,7),(61,7),(68,7),(73,7),(78,7),(83,7),(50,8),(56,8),(62,8),(68,8),(73,8),(78,8),(83,8),(50,9),(57,9),(63,9),(69,9),(74,9),(79,9),(51,10),(57,10),(64,10),(69,10),(74,10),(79,10),(51,11),(58,11),(64,11),(70,11),(75,11),(79,11),(52,22),(58,22),(65,22),(71,22),(75,22),(80,22),(52,23),(59,23),(65,23),(76,23),(80,23),(53,24),(59,24),(66,24),(76,24),(81,24);
/*!40000 ALTER TABLE `job_skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `requirements` text,
  `benefits` text,
  `salary_min` double DEFAULT NULL,
  `salary_max` double DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `status` enum('DRAFT','ACTIVE','PAUSED','CLOSED') DEFAULT NULL,
  `deadline` date DEFAULT NULL,
  `company_id` bigint DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  `experience_level_id` bigint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`),
  KEY `category_id` (`category_id`),
  KEY `experience_level_id` (`experience_level_id`),
  CONSTRAINT `jobs_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`),
  CONSTRAINT `jobs_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `jobs_ibfk_3` FOREIGN KEY (`experience_level_id`) REFERENCES `experience_levels` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES (49,'Java Backend Developer','Develop and maintain scalable backend systems using Spring Boot and MySQL.','Java, Spring Boot, MySQL','Bonus, Remote support',1200,2000,'HCM','FULL TIME','ACTIVE','2026-12-31',1,1,3,NULL,NULL),(50,'Frontend React Developer','Build responsive and modern user interfaces using ReactJS and Tailwind CSS.','ReactJS, JavaScript, CSS','Laptop provided, Bonus',1000,1800,'HN','FULL TIME','ACTIVE','2026-12-31',1,1,2,NULL,NULL),(51,'Python AI Engineer','Work on machine learning and AI related projects using Python frameworks.','Python, TensorFlow, MySQL','Performance bonus',1500,2500,'HCM','FULL TIME','ACTIVE','2026-12-31',1,1,5,NULL,NULL),(52,'NodeJS Backend Developer','Design RESTful APIs and microservices using NodeJS.','NodeJS, MongoDB, REST API','Flexible working time',900,1700,'HN','FULL TIME','ACTIVE','2026-12-31',1,1,4,NULL,NULL),(53,'Mobile Flutter Developer','Develop cross-platform mobile applications using Flutter.','Flutter, Firebase','13th month salary',1000,1900,'HCM','FULL TIME','ACTIVE','2026-12-31',1,1,2,NULL,NULL),(54,'DevOps Engineer','Manage CI/CD pipelines and cloud infrastructure.','Docker, Kubernetes, AWS','Remote work',1800,3000,'HN','FULL TIME','ACTIVE','2026-12-31',1,1,3,NULL,NULL),(55,'UI UX Designer','Create modern and user-friendly UI/UX designs for web and mobile apps.','Figma, UI/UX','Creative environment',800,1500,'HCM','FULL TIME','ACTIVE','2026-12-31',1,7,1,NULL,NULL),(56,'QA Tester','Perform manual and automation testing for software products.','Testing, Selenium','Health insurance',700,1400,'HN','FULL TIME','ACTIVE','2026-12-31',1,1,2,NULL,NULL),(57,'Data Engineer','Build and optimize large scale data pipelines.','Python, SQL, ETL','Annual bonus',1700,2800,'HCM','FULL TIME','ACTIVE','2026-12-31',1,1,5,NULL,NULL),(58,'Cyber Security Engineer','Monitor and improve system security infrastructure.','Security, Linux, Networking','Security allowance',1600,2700,'HN','FULL TIME','ACTIVE','2026-12-31',1,1,7,NULL,NULL),(59,'Java Intern','Support backend team in developing enterprise applications.','Java, MySQL','Internship allowance',300,600,'HCM','PART TIME','ACTIVE','2026-12-31',1,1,1,NULL,NULL),(60,'Business Analyst','Analyze business requirements and work with development teams.','Communication, Analysis','Professional environment',1000,1800,'HN','FULL TIME','ACTIVE','2026-12-31',1,9,3,NULL,NULL),(61,'Project Manager','Lead software projects and coordinate cross-functional teams.','Management, Agile','Leadership bonus',2000,3500,'HCM','FULL TIME','ACTIVE','2026-12-31',1,9,7,NULL,NULL),(62,'React Native Developer','Develop mobile applications using React Native.','React Native, JavaScript','Hybrid working',1200,2100,'HN','FULL TIME','ACTIVE','2026-12-31',1,1,3,NULL,NULL),(63,'Database Administrator','Maintain and optimize database systems.','MySQL, Backup, SQL','System allowance',1400,2400,'HCM','FULL TIME','ACTIVE','2026-12-31',1,3,5,NULL,NULL),(64,'Cloud Engineer','Deploy and maintain cloud infrastructure services.','AWS, Docker, Linux','Cloud certification support',1800,3200,'HN','FULL TIME','ACTIVE','2026-12-31',1,1,2,NULL,NULL),(65,'PHP Laravel Developer','Develop web applications using Laravel framework.','PHP, Laravel, MySQL','Friendly environment',900,1600,'HCM','FULL TIME','ACTIVE','2026-12-31',1,1,3,NULL,NULL),(66,'Technical Support Engineer','Provide technical support and troubleshoot system issues.','Linux, Networking','Support bonus',700,1300,'HN','FULL TIME','ACTIVE','2026-12-31',1,6,2,NULL,NULL),(67,'AI Research Intern','Assist AI team in researching and testing machine learning models.','Python, AI','Research environment',400,800,'HCM','PART TIME','ACTIVE','2026-12-31',1,1,1,NULL,NULL),(68,'Fullstack Developer','Work on both frontend and backend systems for enterprise applications.','ReactJS, Spring Boot, MySQL','Annual trip',1500,2600,'HN','FULL TIME','ACTIVE','2026-12-31',1,1,4,NULL,NULL),(69,'Backend Java Engineer','Develop enterprise backend services and maintain scalable APIs using Spring Boot.','Java, Spring Boot, MySQL','Performance bonus, Laptop',1300,2200,'HCM','FULL_TIME','ACTIVE','2026-12-31',1,1,4,NULL,NULL),(70,'Frontend VueJS Developer','Build responsive frontend applications and optimize user experience.','VueJS, JavaScript, CSS','Flexible time',1000,1700,'HN','FULL_TIME','ACTIVE','2026-12-31',1,1,1,NULL,NULL),(71,'AI Engineer','Research and implement AI models for automation and recommendation systems.','Python, Machine Learning','Research allowance',1800,3000,'HCM','FULL_TIME','ACTIVE','2026-12-31',1,1,5,NULL,NULL),(72,'Data Analyst','Analyze business data and create dashboards for decision making.','SQL, Excel, Power BI','Annual bonus',900,1600,'HN','FULL_TIME','ACTIVE','2026-12-31',1,9,2,NULL,NULL),(73,'Android Developer','Develop Android mobile applications with modern architecture.','Java, Android','Mobile allowance',1200,2000,'HCM','FULL_TIME','ACTIVE','2026-12-31',1,1,3,NULL,NULL),(74,'iOS Developer','Build and maintain iOS applications with high performance.','Swift, iOS','Macbook provided',1400,2400,'HN','FULL_TIME','ACTIVE','2026-12-31',1,1,4,NULL,NULL),(75,'System Administrator','Maintain servers and monitor company infrastructure.','Linux, Networking','System allowance',1000,1800,'HCM','FULL_TIME','ACTIVE','2026-12-31',1,6,5,NULL,NULL),(76,'Technical Writer','Write technical documentation and API guides for developers.','Documentation, English','Remote support',700,1200,'HN','PART_TIME','ACTIVE','2026-12-31',1,6,2,NULL,NULL),(77,'Game Developer','Develop gameplay systems and optimize game performance.','Unity, C#','Gaming environment',1300,2300,'HCM','FULL_TIME','ACTIVE','2026-12-31',1,1,3,NULL,NULL),(78,'Cloud DevOps Engineer','Manage deployment pipelines and cloud infrastructure.','Docker, AWS, CI/CD','Cloud certification support',2000,3400,'HN','FULL_TIME','ACTIVE','2026-12-31',1,1,5,NULL,NULL),(79,'Security Analyst','Analyze vulnerabilities and improve application security.','Cyber Security, Linux','Security bonus',1700,2800,'HCM','FULL_TIME','ACTIVE','2026-12-31',1,1,4,NULL,NULL),(80,'Product Owner','Define product roadmap and coordinate with development teams.','Agile, Scrum','Leadership environment',1800,3000,'HN','FULL_TIME','ACTIVE','2026-12-31',1,9,5,NULL,NULL),(81,'PHP Developer','Develop backend systems and APIs using PHP Laravel.','PHP, Laravel, MySQL','Friendly team',900,1500,'HCM','FULL_TIME','ACTIVE','2026-12-31',1,1,1,NULL,NULL),(82,'Software Tester Intern','Support QA team with manual testing and bug reporting.','Testing, Attention to detail','Intern allowance',300,600,'HN','PART_TIME','ACTIVE','2026-12-31',1,1,3,NULL,NULL),(83,'Fullstack Engineer','Develop both frontend and backend modules for enterprise systems.','ReactJS, NodeJS, MongoDB','13th month salary',1600,2800,'HCM','FULL_TIME','ACTIVE','2026-12-31',1,1,7,NULL,NULL);
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `content` text,
  `is_read` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `redirect_url` varchar(255) DEFAULT NULL,
  `type` enum('INTERVIEW','SYSTEM','ACCOUNT') DEFAULT NULL,
  `sender_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `FK13vcnq3ukas06ho1yrbc5lrb5` (`sender_id`),
  CONSTRAINT `FK13vcnq3ukas06ho1yrbc5lrb5` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,3,'Applied successfully',0,'2026-03-26 13:49:36',NULL,NULL,NULL,NULL),(2,8,'Bạn có lịch phỏng vấn mới',0,'2026-04-25 03:33:44',_binary '\0','/api/interviews/2','INTERVIEW',9);
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `saved_jobs`
--

DROP TABLE IF EXISTS `saved_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `saved_jobs` (
  `user_id` bigint NOT NULL,
  `job_id` bigint NOT NULL,
  `saved_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`,`job_id`),
  KEY `job_id` (`job_id`),
  CONSTRAINT `saved_jobs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `saved_jobs_ibfk_2` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saved_jobs`
--

LOCK TABLES `saved_jobs` WRITE;
/*!40000 ALTER TABLE `saved_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `saved_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skills` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` VALUES (1,'Java'),(2,'Python'),(3,'ReactJS'),(4,'C/C++'),(5,'NodeJS'),(6,'MySQL'),(7,'MongoDB'),(8,'Spring Boot'),(9,'HTML'),(10,'CSS'),(11,'Git'),(12,'REST API'),(13,'Microservices'),(14,'JWT'),(15,'Linux'),(16,'Firebase'),(17,'Tailwind CSS'),(18,'NextJS'),(19,'CI/CD'),(20,'Unit Testing'),(21,'TypeScript'),(22,'Docker'),(23,'Kubernetes'),(24,'AWS'),(25,'Redis'),(26,'GraphQL'),(27,'Laravel'),(28,'Django'),(29,'Flutter'),(30,'React Native');
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `avatar_url` varchar(255) DEFAULT NULL,
  `role` enum('ADMIN','RECRUITER','CANDIDATE') DEFAULT NULL,
  `status` enum('ACTIVE','BLOCKED') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `company_id` bigint DEFAULT NULL,
  `avatar_storage_public_id` varchar(255) DEFAULT NULL,
  `avatar_storage_resource_type` varchar(255) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `FK_users_company` (`company_id`),
  CONSTRAINT `FK_users_company` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin@gmail.com','123456','Admin','System',NULL,'ADMIN','ACTIVE','2026-03-26 13:49:36','2026-03-26 13:49:36',NULL,NULL,NULL,NULL,NULL,NULL),(2,'hr@company.com','123456','HR','Manager',NULL,'RECRUITER','ACTIVE','2026-03-26 13:49:36','2026-03-26 13:49:36',NULL,NULL,NULL,NULL,NULL,NULL),(3,'candidate@gmail.com','123456','Nguyen','An',NULL,'CANDIDATE','ACTIVE','2026-03-26 13:49:36','2026-03-26 13:49:36',NULL,NULL,NULL,NULL,NULL,NULL),(4,'khue@gmail.com','$2a$10$as.OjC5lXAaVxD.CCfBfN.EgaBXwB4L0IhcfnPwiwpgYzEh8SZ822','Khue','Chanh',NULL,'ADMIN','ACTIVE','2026-04-04 16:26:59','2026-04-04 16:26:59',NULL,NULL,NULL,NULL,NULL,NULL),(5,'khang@gmail.com','$2a$10$TUROeneEBBIKKmQg9Gmzfu34LRLUaeZjVgReKgkcLOYYYQUchtCVm','Khang','Nhat','https://res.cloudinary.com/dri1spe3b/image/upload/v1776611905/recruitment/candidate-avatars/food_feueni.jpg','CANDIDATE','ACTIVE','2026-04-04 17:28:35','2026-04-04 17:28:35',NULL,'recruitment/candidate-avatars/food_feueni','image',NULL,NULL,NULL),(6,'recruiter@gmail.com','$2a$10$lPW.VCknQUg98iJPEFaeC.zYoND4.0Td4d7lT/diTuVgJwqdYhb4G','The','Recruiter',NULL,'RECRUITER','ACTIVE','2026-04-05 05:58:41','2026-04-05 05:58:41',NULL,NULL,NULL,NULL,NULL,NULL),(7,'candidate1@gmail.com','$2a$10$9/h3UhNs3HV.yMpjJg2l1eR3BzIvWkBPKk9gQCDLUhsvCh.22/BY2','The','Candidate1',NULL,'CANDIDATE','ACTIVE','2026-04-19 13:34:08','2026-04-19 13:34:08',NULL,NULL,NULL,NULL,NULL,NULL),(8,'chanhkhue7122005@gmail.com','$2a$10$IwpVgWPqF8QUeX.UhKpcV.18HhJWMwqiIZx645fXnP70RZhME0oj2','Khue','Chanh','https://res.cloudinary.com/dri1spe3b/image/upload/v1777042642/recruitment/candidate-avatars/tv2_u33kul.jpg','CANDIDATE','ACTIVE','2026-04-24 14:54:57','2026-04-24 14:54:57',NULL,'recruitment/candidate-avatars/tv2_u33kul','image',NULL,NULL,NULL),(9,'recuruiter2@gmail.com','$2a$10$g4x9k36rXUBD289wIFsyT.RUNkGcY1YeiDMiC9rUrFMSiFmqGjfoC','RECRUITER','THE',NULL,'RECRUITER',NULL,NULL,'2026-04-25 03:31:08',1,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verification_codes`
--

DROP TABLE IF EXISTS `verification_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verification_codes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `attempts` int NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `expire_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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

-- Dump completed on 2026-06-01 13:37:27
