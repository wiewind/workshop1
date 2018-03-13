
update wsp_school_children_telephones set type="座机" where type is null or type = '';

update wsp_school_children_mobilephones set type="手机" where type is null or type = '';

insert into wsp_school_children_telephones (child_id, number, type) select child_id, number, type from wsp_school_children_mobilephones;

DROP TABLE wsp_school_children_mobilephones;

CREATE TABLE `wsp_school_children_email` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `child_id` int(10) unsigned NOT NULL,
  `email` varchar(100) NOT NULL,
  `type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


ALTER TABLE `wiewind_com`.`wsp_school_children`
ADD COLUMN `photo` VARCHAR(125) NULL AFTER `birthday`,
ADD COLUMN `notice` TEXT NULL AFTER `photo`;