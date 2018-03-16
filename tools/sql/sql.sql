
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


DROP TABLE `wiewind_com`.`wsp_school_plans`;

CREATE TABLE `wsp_school_plans` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `semester_id` int(10) unsigned NOT NULL,
  `class_id` int(10) unsigned NOT NULL,
  `course_id` int(10) unsigned NOT NULL,
  `teacher_id` int(10) unsigned NOT NULL DEFAULT '0',
  `room_id` int(10) unsigned NOT NULL DEFAULT '0',
  `weekday` int(1) NOT NULL,
  `start` time NOT NULL,
  `end` time NOT NULL,
  `period` enum('singly','daily','weekly','two-weeks') NOT NULL,
  `first_date` date DEFAULT NULL,
  `description` varchar(1023) DEFAULT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(10) unsigned NOT NULL,
  `modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modified_by` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE `wiewind_com`.`wsp_school_coursetimes`;

-- CREATE TABLE `wsp_school_coursetimes` (
--   `id` int(2) unsigned NOT NULL AUTO_INCREMENT,
--   `class_id` int(10) unsigned NOT NULL,
--   `semester_id` int(20) unsigned NOT NULL,
--   `start` time NOT NULL,
--   `end` time NOT NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
