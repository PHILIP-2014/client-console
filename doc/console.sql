-- MySQL dump 10.13  Distrib 5.6.16, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: console
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
  `type` tinyint(4) NOT NULL DEFAULT 0  COMMENT '默认0普通用户 1管理员'  
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
INSERT INTO `admin` VALUES (1001,'zhuwx_order','philip','0f1291c11af09ea073a7f4a8d6b38ad5',0,'2015-11-13 14:38:59','2015-11-13 14:39:03');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-11-13 17:19:34

DROP TABLE IF EXISTS `goods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `goods` (
  `id` bigint(20) NOT NULL,
  `name` varchar(45) DEFAULT NULL COMMENT '商品名',
  `price` double DEFAULT '1' COMMENT '价格',
  `description` varchar(200) DEFAULT NULL COMMENT '描述',
  `gmt_created` datetime DEFAULT NULL,
  `gmt_modified` datetime DEFAULT NULL,
  `type` tinyint(4) DEFAULT '1' COMMENT '商品类型（1：指纹锁）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods`
--

LOCK TABLES `goods` WRITE;
/*!40000 ALTER TABLE `goods` DISABLE KEYS */;
/*!40000 ALTER TABLE `goods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goods_style`
--

DROP TABLE IF EXISTS `goods_style`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `goods_style` (
  `id` int(11) NOT NULL,
  `gid` varchar(45) DEFAULT NULL COMMENT '商品名',
  `pic_url` varchar(45) DEFAULT NULL COMMENT '图片地址',
  `style` varchar(45) DEFAULT NULL COMMENT '款式名  （例：深蓝）',
  `gmt_created` datetime DEFAULT NULL,
  `gmt_modified` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods_style`
--

LOCK TABLES `goods_style` WRITE;
/*!40000 ALTER TABLE `goods_style` DISABLE KEYS */;
/*!40000 ALTER TABLE `goods_style` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_user`
--

DROP TABLE IF EXISTS `order_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_user` (
  `id` bigint(20) NOT NULL,
  `oid` bigint(20) DEFAULT NULL COMMENT '订单号',
  `name` varchar(45) DEFAULT NULL COMMENT '顾客姓名',
  `mobile` varchar(45) DEFAULT NULL COMMENT '手机号码',
  `address` varchar(200) DEFAULT NULL COMMENT '顾客地址',
  `gmt_created` datetime DEFAULT NULL,
  `gmt_modified` datetime DEFAULT NULL,
  `gmt_setup` datetime DEFAULT NULL COMMENT '安装时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_user`
--

LOCK TABLES `order_user` WRITE;
/*!40000 ALTER TABLE `order_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order` (
  `id` bigint(20) NOT NULL,
  `style` varchar(45) DEFAULT NULL COMMENT '款式',
  `mark` varchar(45) DEFAULT NULL COMMENT '备注',
  `status` tinyint(4) DEFAULT '0' COMMENT '状态：0未处理  1已完成\n2.已删除',
  `gmt_created` datetime DEFAULT NULL,
  `gmt_modified` datetime DEFAULT NULL,
  `gid` bigint(20) DEFAULT NULL,
  `num` bigint(20) DEFAULT NULL COMMENT '数量',
  `name` varchar(45) DEFAULT NULL COMMENT '商品名',
  `price` double DEFAULT NULL COMMENT '总价格',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-11-16 15:24:08
