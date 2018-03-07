<?php

/*
 * Global Functions for PHP
 */

class GlbF {

    public static function getWebName () {
        return Configure::read('system.name');
    }

    public static function getAppName () {
        return Configure::read('system.appName');
    }

    public static function getAuthor () {
        return Configure::read('system.author');
    }


    public static function getLanguage() {
        if (Configure::check('Glb.language.id')) {
            return Configure::read('Glb.languages.'.Configure::read('Glb.language.id').'.cake_code');
        }
        return self::getDefaultLanguage();
    }

	/**
	 * get language
	 * @return string
	 */
    public static function getDefaultLanguage() {
        if (Configure::check('system.language.default')) return Configure::read('system.language.default');
        return 'zho';
    }

	/**
	 * get dataformat
	 * @return array
	 */
    public static function getFormatting() {
        $lang = self::getLanguage();
		return Configure::read('Glb.formatting.'.$lang);
	}

	/**
	 * get dataformat
	 * @return String
	 */
    public static function getDateFormat() {
        $formatting = self::getFormatting();
        return $formatting['date_format'];
	}

	/**
	 * get Date with loacal format
	 * @return String Date with loacal format
	 */
    public static function get_print_date ($str_date) {
        $format = self::getDateFormat();
        return date($format,strtotime($str_date));
    }

    public static function getImgPath () {
        return Configure::read('setting.image.path');
    }

    public static function getVersion () {
        return Configure::read('system.version');
    }

    public static function getRandomStr ($degree, $onlyZiffer = true) {
        $str = '';
        for ($i=0; $i<$degree; $i++) {
            $str .= rand(0, 9);
        }
        return $str;
    }

    public static function getWeekdayname ($weekday, $willshotname=false, $lang='cn') {
        if ($weekday > 6) $weekday = $weekday % 7;
        if ($lang == 'cn') {
            if ($willshotname) {
                $wds = array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
            } else {
                $wds = array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
            }
        } else if ($lang == 'de') {
            if ($willshotname) {
                $wds = array('So. ', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.');
            } else {
                $wds = array('Sonntag ', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag');
            }
        } else {
            if ($willshotname) {
                $wds = array('Su.', 'Mo.', 'Tu.', 'We.', 'Th.', 'Fr.', 'Sa.');
            } else {
                $wds = array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
            }
        }
        return $wds[$weekday];
    }

    public static function mkDir ($dir) {
        $tempPaths = explode('/', $dir);
        $checkPath = '';
        foreach($tempPaths as $temp) {
            if (strlen($temp) === 0) continue;
            if ($checkPath) $checkPath .= '/';
            $checkPath .= $temp;
            if ($temp === '..' || $temp === '.') continue;
            if (!file_exists($checkPath)) {
                if(!mkdir($checkPath, 0777)) {
                    throw new Exception(sprintf(__('Error by set Folder [%s].'), $checkPath));
                }
            }
        }
    }

    public static function moveDir ($dir) {
        if (is_dir($dir)) {
            $d = dir($dir);
            while (false !== ($entry = $d->read())) {
                if (!in_array($entry, array('.', '..'))) self::moveDir($dir.'/'.$entry);
            }
            $d->close();
            if (!rmdir($dir)) {
                throw new Exception(sprintf(__('Error by delete Folder [%s].'), $dir));
            }
        } else if (is_file($dir) && !unlink($dir)) {
            throw new Exception(sprintf(__('Error by delete File [%s].'), $dir));
        }
    }

    public static function getFileSuffix ($filename) {
        $pos = strrpos($filename, '.');
        if ($pos === false) return '';
        return strtolower(substr($filename, $pos+1));
    }

    public static function getFileNameAndSuffix ($filename) {
        $pos = strrpos($filename, '.');
        if ($pos === false) return '';
        return array(substr($filename, 0, $pos), strtolower(substr($filename, $pos+1)));
    }

    public static function getRandString ($length = 10) {
        $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+-_*()[]#~|@?.:,;";
        $str = '';
        for ( $i = 0; $i < $length; $i++ ) {
            $str .= $chars[mt_rand(0, strlen($chars) - 1)];
        }
        return $str;
    }

    public static function getJobStatus ($status_id) {
        switch ($status_id) {
            case 2:
                return __('email applied');
            case 3:
                return __('tele applied');
            case 4:
                return __('post applied');
            case 5:
                return __('tele interview');
            case 6:
                return __('interview');
            case 7:
                return __('offered');
            case 8:
                return __('reject');
            case 9:
                return __('indifferent');
            default:
                return __('new job');
        }
    }

    /**
     * Formatting a number with leading zeros
     * @param int $int the number, which to format
     * @param int $digits max. 12, default 4
     * @return bool|string
     */
    public static function intToStringWithLeadingZeros ($int, $digits=4) {
        $digits = (int) $digits;
        // max 12 digits
        if ($digits > 12) {
            return false;
        }
        $int = (int) $int;
        $strDigit = sprintf("%02d", $digits);
        return sprintf("%0".$strDigit."d", $int);
    }

    public static function checkPassword ($password) {
//        $uppercase = preg_match('@[A-Z]@', $password);
//        $lowercase = preg_match('@[a-z]@', $password);
//        $number    = preg_match('@[0-9]@', $password);

        if (strlen($password) < 6) {
            return false;
        }
        return true;
    }


    public static function ucfirst ($str) {
        $fc = mb_strtoupper(mb_substr($str, 0, 1));
        return $fc.mb_substr($str, 1);
    }

    public static function human_filesize($bytes, $decimals = 2) {
        $factor = floor((strlen($bytes) - 1) / 3);
        if ($factor > 0) $sz = 'KMGT';
        return sprintf("%.{$decimals}f", $bytes / pow(1024, $factor)) . @$sz[$factor - 1] . 'B';
    }





    public static function is_mobile() {
        $user_agent = strtolower( $_SERVER['HTTP_USER_AGENT'] );
        $mobile_agents = Array(
            "ipad","wap","android","iphone","sec","sam","ericsson","240x320","acer","acoon","acs-","abacho","ahong",
            "airness","alcatel","amoi","anywhereyougo.com","applewebkit/525","applewebkit/532","asus","audio","au-mic",
            "avantogo","becker","benq","bilbo","bird","blackberry","blazer","bleu","cdm-","compal","coolpad","danger",
            "dbtel","dopod","elaine","eric","etouch","fly ","fly_","fly-","go.web","goodaccess","gradiente","grundig",
            "haier","hedy","hitachi","htc","huawei","hutchison","inno","ipaq","ipod","jbrowser","kddi","kgt","kwc",
            "lenovo","lg","lg2","lg3","lg4","lg5","lg7","lg8","lg9","lg-","lge-","lge9","longcos","maemo","mercator",
            "meridian","micromax","midp","mini","mitsu","mmm","mmp","mobi","mot-","moto","nec-","netfront","newgen",
            "nexian","nf-browser","nintendo","nitro","nokia","nook","novarra","obigo","palm","panasonic","pantech",
            "philips","phone","pg-","playstation","pocket","pt-","qc-","qtek","rover","sagem","sama","samu","sanyo",
            "samsung","sch-","scooter","sec-","sendo","sgh-","sharp","siemens","sie-","softbank","sony","spice",
            "sprint","spv","symbian","tcl-","teleca","telit","tianyu","tim-","toshiba","tsm","up.browser","utec",
            "utstar","verykool","virgin","vk-","voda","voxtel","vx","wellco","wig browser","wii","windows ce",
            "wireless","xda","xde","zte","ben","hai","phili"
        );
        $is_mobile = false;
        foreach ($mobile_agents as $device) {
            if (stristr($user_agent, $device)) {
                if( 'ipad' == $device ) {
                    return $is_mobile;
                }
                $is_mobile = true;
                break;
            }
        }
        return $is_mobile;
    }




    // zum test
    public static function printArray ($arr) {
        echo '<pre>';
        print_r($arr);
        echo '</pre>';
    }

    public static function getDbLog ($model) {
        $log = $model->getDataSource()->getLog(false, false);
        return $log;
    }
}