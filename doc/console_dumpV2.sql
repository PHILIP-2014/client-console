-- MySQL dump 10.13  Distrib 5.6.16, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: console
-- ------------------------------------------------------
-- Server version	5.6.16-1~exp1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `appkey` varchar(30) NOT NULL DEFAULT '' COMMENT '客户端密钥',
  `name` varchar(30) NOT NULL DEFAULT '' COMMENT '用户名',
  `pwd` varchar(40) NOT NULL DEFAULT '' COMMENT '登陆密码',
  `role` tinyint(4) NOT NULL DEFAULT '0' COMMENT '默认0普通用户 1管理员',
  `is_disable` tinyint(1) DEFAULT NULL COMMENT '0正常 1注销',
  `gmt_create` datetime DEFAULT NULL,
  `gmt_modify` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1009 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1001,'lock-seller','philip','0f1291c11af09ea073a7f4a8d6b38ad5',1,0,'2015-11-13 14:38:59','2015-11-19 09:56:47'),(1002,'lock-seller','zhuwx','0f1291c11af09ea073a7f4a8d6b38ad5',1,0,'2015-11-13 14:38:59','2015-11-18 12:00:31'),(1003,'lock-seller','xuww','0f1291c11af09ea073a7f4a8d6b38ad5',1,0,'2015-11-13 14:38:59','2015-11-18 16:30:36'),(1004,'lock-seller','zhuwx01','17e5d4f9d4cfb7d97202002c3e54b3d1',0,0,'2015-11-17 15:30:28','2015-11-17 15:30:28'),(1005,'lock-seller','zhuwx03','17e5d4f9d4cfb7d97202002c3e54b3d1',1,1,'2015-11-17 15:31:48','2015-11-17 17:10:43'),(1006,'lock-seller','dandan1','17e5d4f9d4cfb7d97202002c3e54b3d1',1,1,'2015-11-17 17:03:12','2015-11-17 17:04:12'),(1007,'lock-seller','大大大大大大','17e5d4f9d4cfb7d97202002c3e54b3d1',1,1,'2015-11-17 17:07:34','2015-11-17 17:08:00'),(1008,'lock-seller','zhuwx02','17e5d4f9d4cfb7d97202002c3e54b3d1',0,1,'2015-11-18 16:45:20','2015-11-18 17:36:08');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goods`
--

DROP TABLE IF EXISTS `goods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `goods` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT '' COMMENT '商品名',
  `price` decimal(20,2) DEFAULT NULL COMMENT '价格',
  `mark` varchar(200) DEFAULT '' COMMENT '备注',
  `type` int(4) DEFAULT '1' COMMENT '商品类型（1：指纹锁）',
  `status` int(4) DEFAULT '0' COMMENT '默认0正常\n 1已下架',
  `gmt_create` datetime DEFAULT NULL,
  `gmt_modify` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods`
--

LOCK TABLES `goods` WRITE;
/*!40000 ALTER TABLE `goods` DISABLE KEYS */;
INSERT INTO `goods` VALUES (101,'自行车锁A01',12.00,'锁中之锁',1,0,'2015-11-13 14:38:59','2015-11-13 14:39:03'),(102,'自行车锁A02',15.00,'更新版',1,0,'2015-11-18 17:30:21','2015-12-04 11:06:10'),(103,'门锁D01',20.00,'防盗小能手',1,1,'2015-11-19 10:08:12','2015-11-19 10:43:03'),(104,'门锁D02',23.00,'',1,1,'2015-11-19 10:43:48','2015-11-19 10:43:59'),(105,'门锁A01',59.00,'免安装费',1,0,'2015-12-04 15:28:01','2015-12-04 15:28:01'),(106,'门锁A02',69.00,'哈哈',1,0,'2015-12-04 15:32:08','2015-12-04 15:32:08'),(107,'汽车锁',109.00,'www',9,0,'2015-12-04 15:36:10','2015-12-04 17:33:54'),(108,'汽车锁2',159.00,'豪华版',1,1,'2015-12-04 16:46:50','2015-12-04 16:48:43'),(109,'汽车锁精装',168.00,'',1,1,'2015-12-04 16:49:29','2015-12-04 16:49:54'),(110,'汽车锁2',168.00,'',1,0,'2015-12-04 16:51:30','2015-12-04 16:51:30'),(111,'测试',12.00,'',1,0,'2015-12-04 17:40:46','2015-12-04 17:40:46'),(112,'测试01',13.00,'',1,0,'2015-12-04 17:42:58','2015-12-04 17:42:58'),(113,'测试02',14.00,'',1,0,'2015-12-04 17:44:36','2015-12-04 17:44:36'),(114,'测试03',15.00,'',1,0,'2015-12-04 17:45:12','2015-12-04 17:45:12');
/*!40000 ALTER TABLE `goods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `order_num` varchar(20) DEFAULT '0' COMMENT '订单编号(系统生成)',
  `gid` bigint(20) DEFAULT '0' COMMENT '商品ID',
  `gname` varchar(20) DEFAULT '' COMMENT '商品名称',
  `sid` bigint(20) DEFAULT '0' COMMENT '款式ID',
  `mark` varchar(45) DEFAULT NULL COMMENT '备注',
  `num` int(10) DEFAULT NULL COMMENT '数量',
  `total_fee` decimal(20,2) DEFAULT NULL COMMENT '总价格',
  `status` int(4) DEFAULT '0' COMMENT '状态：0未处理\n  1已完成\n 2.已取消',
  `name_setup` varchar(20) DEFAULT '' COMMENT '需装者姓名',
  `phone_setup` varchar(20) DEFAULT '' COMMENT '需装者电话',
  `addr_setup` varchar(45) DEFAULT '' COMMENT '安装地址',
  `gmt_setup` datetime DEFAULT NULL COMMENT '安装时间',
  `gmt_create` datetime DEFAULT NULL,
  `gmt_modify` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100005 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (100001,'110101001',101,'自行车锁A01',1001,'钥匙加一把',2,24.00,0,'','','','2015-12-13 14:38:59','2015-11-13 14:38:59','2015-11-13 14:39:03'),(100002,'110101002',101,'自行车锁A01',1002,'钥匙加一把',2,24.00,0,'','','','2015-12-13 14:38:59','2015-11-13 14:38:59','2015-11-13 14:39:03'),(100003,'110101003',101,'自行车锁A01',1003,'钥匙加一把',2,24.00,0,'','','','2015-12-13 14:38:59','2015-11-13 14:38:59','2015-11-13 14:39:03'),(100004,'110101003',101,'自行车锁A02',1001,'钥匙不用了',2,24.00,2,'','','','2015-12-13 14:38:59','2015-11-13 14:38:59','2015-11-24 14:11:02');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `picture`
--

DROP TABLE IF EXISTS `picture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `picture` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `gid` bigint(20) DEFAULT NULL COMMENT '商品ID',
  `pic_url` varchar(45) DEFAULT NULL COMMENT '图片地址',
  `gmt_create` datetime DEFAULT NULL,
  `gmt_modify` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10004 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `picture`
--

LOCK TABLES `picture` WRITE;
/*!40000 ALTER TABLE `picture` DISABLE KEYS */;
INSERT INTO `picture` VALUES (10001,101,'www.xintuzaojiu.com/pic1','2015-11-13 14:38:59','2015-11-13 14:39:03'),(10002,101,'www.xintuzaojiu.com/pic2','2015-11-13 14:38:59','2015-11-13 14:39:03'),(10003,101,'www.xintuzaojiu.com/pic3','2015-11-13 14:38:59','2015-11-13 14:39:03');
/*!40000 ALTER TABLE `picture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `style`
--

DROP TABLE IF EXISTS `style`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `style` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `gid` bigint(20) DEFAULT NULL COMMENT '商品ID',
  `content` varchar(45) DEFAULT NULL COMMENT '款式名（例：深蓝）',
  `gmt_create` datetime DEFAULT NULL,
  `gmt_modify` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1018 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `style`
--

LOCK TABLES `style` WRITE;
/*!40000 ALTER TABLE `style` DISABLE KEYS */;
INSERT INTO `style` VALUES (1001,101,'深蓝','2015-11-13 14:38:59','2015-11-13 14:39:03'),(1002,101,'深黑','2015-11-13 14:38:59','2015-11-13 14:39:03'),(1003,101,'深红','2015-11-13 14:38:59','2015-11-13 14:39:03'),(1004,108,'深蓝',NULL,NULL),(1005,108,'土豪金',NULL,NULL),(1006,108,'玫瑰红',NULL,NULL),(1007,109,'土豪金',NULL,NULL),(1008,109,'玫瑰金',NULL,NULL),(1009,109,'深空灰',NULL,NULL),(1010,109,'银色',NULL,NULL),(1011,110,'深空灰','2015-12-04 16:51:30','2015-12-04 16:51:30'),(1012,110,'土豪金','2015-12-04 16:51:30','2015-12-04 16:51:30'),(1013,110,'玫瑰金','2015-12-04 16:51:30','2015-12-04 16:51:30'),(1014,113,'哈哈','2015-12-04 17:44:36','2015-12-04 17:44:36'),(1015,113,'嘿嘿','2015-12-04 17:44:36','2015-12-04 17:44:36'),(1016,114,'哈哈','2015-12-04 17:45:12','2015-12-04 17:45:12'),(1017,114,'哈哈哈','2015-12-04 17:45:12','2015-12-04 17:45:12');
/*!40000 ALTER TABLE `style` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-12-08 15:01:43
ALTER TABLE `study`.`orders` 
CHANGE COLUMN `order_num` `order_num` VARCHAR(200) NULL DEFAULT '0' COMMENT '订单编号(系统生成)' ;
