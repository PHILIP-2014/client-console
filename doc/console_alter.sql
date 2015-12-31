
/* 2015-11-25 */
alter table orders add column `name_setup` varchar(20) Default '' COMMENT '需装者姓名' after `status`;
alter table orders add column `phone_setup` varchar(20) Default '' COMMENT '需装者电话' after `name_setup`;
alter table orders add column `addr_setup` varchar(45) Default '' COMMENT '安装地址' after `phone_setup`;

alter table orders drop column `cid` ;

drop table customer;

alter table orders change column `order_num` `order_num` VARCHAR(200) NOT NULL DEFAULT '0' COMMENT '订单编号(系统生成)' ;
ALTER TABLE `goods` 
ADD COLUMN `cover` VARCHAR(200) NULL AFTER `status`;
