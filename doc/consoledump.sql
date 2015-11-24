
DROP TABLE IF EXISTS `admin`;
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

LOCK TABLES `admin` WRITE;
INSERT INTO `admin` VALUES (1001,'lock-seller','philip','0f1291c11af09ea073a7f4a8d6b38ad5',1,0,'2015-11-13 14:38:59','2015-11-19 09:56:47'),(1002,'lock-seller','zhuwx','0f1291c11af09ea073a7f4a8d6b38ad5',1,0,'2015-11-13 14:38:59','2015-11-18 12:00:31'),(1003,'lock-seller','xuww','0f1291c11af09ea073a7f4a8d6b38ad5',1,0,'2015-11-13 14:38:59','2015-11-18 16:30:36'),(1004,'lock-seller','zhuwx01','17e5d4f9d4cfb7d97202002c3e54b3d1',0,0,'2015-11-17 15:30:28','2015-11-17 15:30:28'),(1005,'lock-seller','zhuwx03','17e5d4f9d4cfb7d97202002c3e54b3d1',1,1,'2015-11-17 15:31:48','2015-11-17 17:10:43'),(1006,'lock-seller','dandan1','17e5d4f9d4cfb7d97202002c3e54b3d1',1,1,'2015-11-17 17:03:12','2015-11-17 17:04:12'),(1007,'lock-seller','大大大大大大','17e5d4f9d4cfb7d97202002c3e54b3d1',1,1,'2015-11-17 17:07:34','2015-11-17 17:08:00'),(1008,'lock-seller','zhuwx02','17e5d4f9d4cfb7d97202002c3e54b3d1',0,1,'2015-11-18 16:45:20','2015-11-18 17:36:08');
UNLOCK TABLES;

DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL COMMENT '顾客姓名',
  `mobile` varchar(45) DEFAULT NULL COMMENT '手机号码',
  `address` varchar(200) DEFAULT NULL COMMENT '顾客地址',
  `gmt_create` datetime DEFAULT NULL,
  `gmt_modify` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10002 DEFAULT CHARSET=utf8;

LOCK TABLES `customer` WRITE;
INSERT INTO `customer` VALUES (10001,'luo','18768171234','杭州滨江','2015-11-13 14:38:59','2015-11-13 14:39:03');
UNLOCK TABLES;

DROP TABLE IF EXISTS `goods`;
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
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8;

LOCK TABLES `goods` WRITE;
INSERT INTO `goods` VALUES (101,'自行车锁A01',12.00,'锁中之锁',1,0,'2015-11-13 14:38:59','2015-11-13 14:39:03'),(102,'自行车锁A02',15.00,'更新版',1,0,'2015-11-18 17:30:21','2015-11-18 17:30:21'),(103,'门锁D01',20.00,'防盗小能手',1,1,'2015-11-19 10:08:12','2015-11-19 10:43:03'),(104,'门锁D02',23.00,'',1,1,'2015-11-19 10:43:48','2015-11-19 10:43:59');
UNLOCK TABLES;

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `order_num` varchar(20) DEFAULT '0' COMMENT '订单编号(系统生成)',
  `cid` bigint(20) DEFAULT '0' COMMENT '下单者ID',
  `gid` bigint(20) DEFAULT '0' COMMENT '商品ID',
  `gname` varchar(20) DEFAULT '' COMMENT '商品名称',
  `sid` bigint(20) DEFAULT '0' COMMENT '款式ID',
  `mark` varchar(45) DEFAULT NULL COMMENT '备注',
  `num` int(10) DEFAULT NULL COMMENT '数量',
  `total_fee` decimal(20,2) DEFAULT NULL COMMENT '总价格',
  `status` int(4) DEFAULT '0' COMMENT '状态：0未处理\n  1已完成\n 2.已取消',
  `gmt_setup` datetime DEFAULT NULL COMMENT '安装时间',
  `gmt_create` datetime DEFAULT NULL,
  `gmt_modify` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100004 DEFAULT CHARSET=utf8;

LOCK TABLES `orders` WRITE;
INSERT INTO `orders` VALUES (100001,'110101001',10001,101,'自行车锁A01',1001,'钥匙加一把',2,24.00,0,'2015-12-13 14:38:59','2015-11-13 14:38:59','2015-11-13 14:39:03'),(100002,'110101002',10001,101,'自行车锁A01',1002,'钥匙加一把',2,24.00,0,'2015-12-13 14:38:59','2015-11-13 14:38:59','2015-11-13 14:39:03'),(100003,'110101003',10001,101,'自行车锁A01',1003,'钥匙加一把',2,24.00,0,'2015-12-13 14:38:59','2015-11-13 14:38:59','2015-11-13 14:39:03');
UNLOCK TABLES;

DROP TABLE IF EXISTS `style`;
CREATE TABLE `style` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `gid` bigint(20) DEFAULT NULL COMMENT '商品ID',
  `content` varchar(45) DEFAULT NULL COMMENT '款式名（例：深蓝）',
  `gmt_create` datetime DEFAULT NULL,
  `gmt_modify` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1004 DEFAULT CHARSET=utf8;

LOCK TABLES `style` WRITE;
INSERT INTO `style` VALUES (1001,101,'深蓝','2015-11-13 14:38:59','2015-11-13 14:39:03'),(1002,101,'www.xintuzaojiu.com/pic2','深黑','2015-11-13 14:38:59','2015-11-13 14:39:03'),(1003,101,'www.xintuzaojiu.com/pic3','深红','2015-11-13 14:38:59','2015-11-13 14:39:03');
UNLOCK TABLES;

DROP TABLE IF EXISTS `picture`;
CREATE TABLE `picture` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `gid` bigint(20) DEFAULT NULL COMMENT '商品ID',
  `pic_url` varchar(45) DEFAULT NULL COMMENT '图片地址',
  `gmt_create` datetime DEFAULT NULL,
  `gmt_modify` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10001 DEFAULT CHARSET=utf8;

LOCK TABLES `picture` WRITE;
INSERT INTO `picture` VALUES (10001,101,'www.xintuzaojiu.com/pic1','2015-11-13 14:38:59','2015-11-13 14:39:03'),(10002,101,'www.xintuzaojiu.com/pic2','深黑','2015-11-13 14:38:59','2015-11-13 14:39:03'),(1003,101,'www.xintuzaojiu.com/pic3','2015-11-13 14:38:59','2015-11-13 14:39:03');
UNLOCK TABLES;


