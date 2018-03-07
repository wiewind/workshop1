<?php
// FilePath: <Project>/resources/tools/po2js.php


/**
 * String object
 */
class PoeditString {
	public $key;
	public $value;
	function __construct($key, $value = '') {
		$this->key = $key;
		$this->value = $value;
	}
}

/**
 * Parser object
 */
class PoeditParser {

	protected $file;
	protected $strings = array();

	public function __construct($file) {
		$this->file = $file;
	}

	public function parse() {
		$contents = file_get_contents($this->file);

		$parts = preg_split('#(\r\n|\n){2}#', $contents, -1, PREG_SPLIT_NO_EMPTY);
//		array_shift($parts);

		foreach ($parts as $part) {
			$msgid = $msgstr = '';
			$lines = explode("\n" , $part);
			$transMsg = false;
			foreach ($lines as $line){
				if(substr($line, 0,2) === '#:'){
					continue;
				}
				else if(substr($line, 0,5) === 'msgid'){
					$transMsg = false;
					$searchString = array('/(msgid ")/' , '/(")/');
					$msgid = preg_replace($searchString, "", $line);
				}
				else if(substr($line, 0,1) === '"'){
					if($transMsg == false){
						$msgid .= preg_replace('/(")/', "", $line);
					}else{
						$msgstr .= preg_replace('/(")/', "", $line);
					}
				}
				else if(substr($line, 0,6) === 'msgstr'){
					$transMsg = true;
					$searchString = array('/(msgstr ")/' , '/(")/');
					$msgstr = preg_replace($searchString, "", $line);
					if(empty($msgstr)){
						//$msgstr = $msgid;
					}
				}
			}
			$msgstr = stripslashes(trim($msgstr));
			$msgid = stripslashes(trim($msgid));
			$msgid = htmlspecialchars_decode ($msgid);

			$this->strings[$msgid] = new PoeditString($msgid, $msgstr);
		}
	}

	public function getJSON() {
		$str = array();
		foreach ($this->strings as $s) {
			if ($s->value ){
				$str[$s->key] = $s->value;
			} else {
				$str[$s->key] = $s->key;
			}
		}
		return json_encode($str , JSON_UNESCAPED_UNICODE);
	}

	public function toJSON($targertPath , $lang) {
        $targertFile = $targertPath.".js";
        if (!is_file($targertFile)) {
            $fo = fopen($targertFile, 'w');
            fclose($fo);
        }

		$str = "LL['".$lang."'] = " . $this->getJSON().';';
		return file_put_contents($targertFile, $str) !== false;
	}

}


/**
 * Script entry point
 *
 * Usage :
 * =======
 * php po2js fra
 *
 */

$args = $argv;

if (count($args) > 1) {
    for ($i=1; $i<count($args); $i++) {
        $lang = $argv[$i];
        $poFileName = 'default.po';
        $sourcePath = '../../api/Locale/'.$lang.'/LC_MESSAGES/';

        $targetPath = '../../ext6/app/locales/'.$lang;

        $poeditParser = new PoeditParser($sourcePath.$poFileName);
        $poeditParser->parse();

        if ($poeditParser->toJSON($targetPath , $lang)) {
            echo "Successfully exported to file '{$lang}'.js.\n";
        } else {
            echo "Cannot write to file {$lang}.js.\n";
        }

        /* variables po */
        $poVariablesName = 'modules.po';
        $targetPathVariables = $targetPath.'_modules';
        $lang = $lang . '_modules';
        $poeditParser = new PoeditParser($sourcePath.$poVariablesName);
        $poeditParser->parse();
        if ($poeditParser->toJSON($targetPathVariables , $lang)) {
            echo "Successfully exported to file '{$lang}'.js.\n";
        } else {
            echo "Cannot write to file '{$lang}'.js.\n";
        }
    }
}
