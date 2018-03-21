<?php
/**
 * Application model for CakePHP.
 *
 * This file is application-wide model file. You can put all
 * application-wide model-related methods here.
 *
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @package       app.Model
 * @since         CakePHP(tm) v 0.2.9
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */

App::uses('Model', 'Model');

/**
 * Application model for Cake.
 *
 * Add your application-wide methods in the class below, your models
 * will inherit them.
 *
 * @package       app.Model
 */
class AppModel extends Model {

    public $tablePrefix = 'wsp_';

    /**
	 * removes all model binding
	 * @param boolean $reset - default = true
	 */
	function unbindModelAll($reset=true) {
	    $unbind = array();
	    foreach ($this->belongsTo as $model=>$info)
	    {
	      $unbind['belongsTo'][] = $model;
	    }
	    foreach ($this->hasOne as $model=>$info)
	    {
	      $unbind['hasOne'][] = $model;
	    }
	    foreach ($this->hasMany as $model=>$info)
	    {
	      $unbind['hasMany'][] = $model;
	    }
	    foreach ($this->hasAndBelongsToMany as $model=>$info)
	    {
	      $unbind['hasAndBelongsToMany'][] = $model;
	    }
	    parent::unbindModel($unbind, $reset);
  	}

  	/**
  	 * returns the last error of the db
  	 *
  	 * @return String with the errormessage. If no error a empty string will returned.
  	 */
  	function getLastDBError(){
  		$result = "";
  		$s = $this->getDataSource();
  		if($s){
  			$result = $s->lastError();
  		}
  		return $result;
  	}

	public function getFullTableName(){
		return $this->tablePrefix . $this->table;
	}

    function getLastQuery()
    {
        $dbo = $this->getDatasource();
        $logs = $dbo->getLog();
        $lastLog = end($logs['log']);
        return $lastLog['query'];
    }

    public function tableize ($tName) {
        return $this->tablePrefix . Inflector::tableize($tName);
    }
}
