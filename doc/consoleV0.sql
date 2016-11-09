-- MySQL dump 10.13  Distrib 5.6.16, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: console
-- ------------------------------------------------------
-- Server version	5.6.16-1~exp1

--
-- Table structure for table `admin`
--

CREATE DATABASE `console`;
USE `console`;

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `appkey` varchar(30) NOT NULL DEFAULT '' COMMENT '客户端密钥',
  `name` varchar(30) NOT NULL DEFAULT '' COMMENT '用户名',
  `pwd` varchar(40) NOT NULL DEFAULT '' COMMENT '登陆密码',
  `role` tinyint(4) NOT NULL DEFAULT 0 COMMENT '默认0:普通 1管理员',
  `is_disable` tinyint(1) DEFAULT NULL COMMENT '0正常 1注销',
  `gmt_create` datetime DEFAULT NULL,
  `gmt_modify` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1002 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1001,'lock-seller','philip','0f1291c11af09ea073a7f4a8d6b38ad5',1,0,'2015-11-13 14:38:59','2015-11-13 14:39:03');
INSERT INTO `admin` VALUES (1002,'lock-seller','zhuwx','0f1291c11af09ea073a7f4a8d6b38ad5',1,0,'2015-11-13 14:38:59','2015-11-13 14:39:03');
INSERT INTO `admin` VALUES (1003,'lock-seller','xuww','0f1291c11af09ea073a7f4a8d6b38ad5',1,0,'2015-11-13 14:38:59','2015-11-13 14:39:03');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;


-- Dump completed on 2015-11-16 15:24:08
