-- MySQL dump 10.13  Distrib 5.6.16, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: console
-- ------------------------------------------------------
-- Server version	5.6.16-1~exp1

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

-- Dump completed on 2015-11-13 17:19:34

DROP TABLE IF EXISTS `goods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `goods` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT '' COMMENT '商品名',
  `price` decimal(20,2) DEFAULT NULL COMMENT '价格',
  `mark` varchar(200) DEFAULT NULL COMMENT '描述',
  `type` int(4) DEFAULT 1 COMMENT '商品类型（1：指纹锁）',
  `gmt_create` datetime DEFAULT NULL,
  `gmt_modify` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods`
--

LOCK TABLES `goods` WRITE;
/*!40000 ALTER TABLE `goods` DISABLE KEYS */;
INSERT INTO `goods` VALUES (101,'自行车锁A01','12.00','锁中之锁',1,'2015-11-13 14:38:59','2015-11-13 14:39:03');
/*!40000 ALTER TABLE `goods` DISABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goods_style`
--

DROP TABLE IF EXISTS `style`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `style` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `gid` bigint(20) DEFAULT NULL COMMENT '商品ID',
  `pic_url` varchar(45) DEFAULT NULL COMMENT '图片地址',
  `content` varchar(45) DEFAULT NULL COMMENT '款式名（例：深蓝）',
  `gmt_create` datetime DEFAULT NULL,
  `gmt_modify` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1001 CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods_style`
--

LOCK TABLES `style` WRITE;
/*!40000 ALTER TABLE `goods_style` DISABLE KEYS */;
INSERT INTO `style` VALUES (1001, 101, 'www.xintuzaojiu.com/pic1','深蓝','2015-11-13 14:38:59','2015-11-13 14:39:03');
INSERT INTO `style` VALUES (1002, 101, 'www.xintuzaojiu.com/pic2','深黑','2015-11-13 14:38:59','2015-11-13 14:39:03');
INSERT INTO `style` VALUES (1003, 101, 'www.xintuzaojiu.com/pic3','深红','2015-11-13 14:38:59','2015-11-13 14:39:03');
/*!40000 ALTER TABLE `goods_style` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_user`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL COMMENT '顾客姓名',
  `mobile` varchar(45) DEFAULT NULL COMMENT '手机号码',
  `address` varchar(200) DEFAULT NULL COMMENT '顾客地址',
  `gmt_create` datetime DEFAULT NULL,
  `gmt_modify` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10001 CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_user`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `order_user` DISABLE KEYS */;
INSERT INTO `customer` VALUES (10001, 'luo', '18768171234','杭州滨江','2015-11-13 14:38:59','2015-11-13 14:39:03');
/*!40000 ALTER TABLE `order_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `order_num` varchar(20) DEFAULT '0' COMMENT '订单编号(系统生成)',
  `cid` bigint(20) DEFAULT 0 COMMENT '下单者ID',
  `gid` bigint(20) DEFAULT 0 COMMENT '商品ID',
  `sid` bigint(20) DEFAULT 0 COMMENT '款式ID',
  `mark` varchar(45) DEFAULT NULL COMMENT '备注',
  `num` int(10) DEFAULT NULL COMMENT '数量',
  `total_fee` decimal(20,2) DEFAULT NULL COMMENT '总价格',
  `status` int(4) DEFAULT 0 COMMENT '状态：0未处理\n  1已完成\n 2.已取消',
  `gmt_setup` datetime DEFAULT NULL COMMENT '安装时间',
  `gmt_create` datetime DEFAULT NULL,
  `gmt_modify` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100001 CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `orders` VALUES (100001, '110101001', 10001, 101, 1001, '钥匙加一把',2,'24.00',0,'2015-12-13 14:38:59','2015-11-13 14:38:59','2015-11-13 14:39:03');
INSERT INTO `orders` VALUES (100002, '110101002', 10001, 101, 1002, '钥匙加一把',2,'24.00',0,'2015-12-13 14:38:59','2015-11-13 14:38:59','2015-11-13 14:39:03');
INSERT INTO `orders` VALUES (100003, '110101003', 10001, 101, 1003, '钥匙加一把',2,'24.00',0,'2015-12-13 14:38:59','2015-11-13 14:38:59','2015-11-13 14:39:03');
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
