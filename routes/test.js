SELECT `id`,`menu`,`menu_img`,`Introduction` FROM menu ORDER BY `id` DESC LIMIT 5"

SELECT count(*) as TotalCount FROM `menu` WHERE `upload_time_sid`='12' or `upload_time_sid`='11'