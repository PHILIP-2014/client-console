
/* 2015-11-25 */
alter table orders add column `name_setup` varchar(20) Default '' COMMENT '需装者姓名' after `status`;
alter table orders add column `phone_setup` varchar(20) Default '' COMMENT '需装者电话' after `name_setup`;
alter table orders add column `addr_setup` varchar(45) Default '' COMMENT '安装地址' after `phone_setup`;

alter table orders drop column `cid` ;

drop table customer;

alter table orders change column `order_num` `order_num` VARCHAR(200) NOT NULL DEFAULT '0' COMMENT '订单编号(系统生成)' ;
ALTER TABLE `goods` 
ADD COLUMN `cover` VARCHAR(200) NULL AFTER `status`;

ALTER TABLE `console`.`goods` 
ADD COLUMN `detail` VARCHAR(20000) NULL AFTER `gmt_modify`,
ADD COLUMN `payType` INT NULL COMMENT '0:货到付款  1:在线支付' AFTER `detail`;

UPDATE `console`.`goods` SET `detail`='<p><img src=\"images/product/1.jpg\" /></p><p><img src=\"images/product/2.jpg\" /></p><p><img src=\"images/product/3.jpg\" /></p>', `payType`='0' WHERE `id`='101';
UPDATE `console`.`goods` SET `detail`='<p><img src=\"images/product/1.jpg\" /></p><p><img src=\"images/product/2.jpg\" /></p><p><img src=\"images/product/3.jpg\" /></p>', `payType`='0' WHERE `id`='102';
UPDATE `console`.`goods` SET `detail`='<p><img src=\"images/product/1.jpg\" /></p><p><img src=\"images/product/2.jpg\" /></p><p><img src=\"images/product/3.jpg\" /></p>', `payType`='0' WHERE `id`='103';
UPDATE `console`.`goods` SET `detail`='<p><img src=\"images/product/1.jpg\" /></p><p><img src=\"images/product/2.jpg\" /></p><p><img src=\"images/product/3.jpg\" /></p>', `payType`='0' WHERE `id`='104';
UPDATE `console`.`goods` SET `detail`='<p><img src=\"images/product/1.jpg\" /></p><p><img src=\"images/product/2.jpg\" /></p><p><img src=\"images/product/3.jpg\" /></p>', `payType`='0' WHERE `id`='105';
UPDATE `console`.`goods` SET `detail`='<p><img src=\"images/product/1.jpg\" /></p><p><img src=\"images/product/2.jpg\" /></p><p><img src=\"images/product/3.jpg\" /></p>', `payType`='0' WHERE `id`='106';
UPDATE `console`.`goods` SET `detail`='<p><img src=\"images/product/1.jpg\" /></p><p><img src=\"images/product/2.jpg\" /></p><p><img src=\"images/product/3.jpg\" /></p>', `payType`='1' WHERE `id`='107';
UPDATE `console`.`goods` SET `detail`='<p><img src=\"images/product/1.jpg\" /></p><p><img src=\"images/product/2.jpg\" /></p><p><img src=\"images/product/3.jpg\" /></p>', `payType`='0' WHERE `id`='108';

ALTER TABLE `console`.`goods` CHANGE COLUMN `payType` `pay_type` INT(11) NULL DEFAULT NULL COMMENT '0:货到付款  1:在线支付' ;

UPDATE `console`.`picture` SET `pic_url`='/images/product/goods1.jpg' WHERE `id`='10001';
UPDATE `console`.`picture` SET `pic_url`='/images/product/goods2.jpg' WHERE `id`='10002';
UPDATE `console`.`picture` SET `pic_url`='/images/product/goods3.jpg' WHERE `id`='10003';



