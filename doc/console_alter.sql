
/* 2015-11-25 */
alter table orders add column `name_setup` varchar(20) Default '' COMMENT '需装者姓名' after `status`;
alter table orders add column `phone_setup` varchar(20) Default '' COMMENT '需装者电话' after `name_setup`;
alter table orders add column `addr_setup` varchar(45) Default '' COMMENT '安装地址' after `phone_setup`;

alter table orders drop column `cid` ;

drop table customer;
