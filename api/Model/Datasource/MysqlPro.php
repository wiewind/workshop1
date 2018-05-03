<?php
App::uses('Mysql', 'Model/Datasource/Database');

/**
 * Customized Version of the the Mysql Database Driver
 */
class MysqlPro extends Mysql {
	
    public $description = 'MySQL DBO Driver Pro';
	
	/**
	* In the current cake release (2.4.7) DataSource->_sources is protected
	* This function resets the sources (tables) contained in the DataSource
	* 
	* Used in: SpcModel
	*/
	public function resetCachedSources() {
		$key = ConnectionManager::getSourceName($this) . '_' . $this->config['database'] . '_list';
		$key = preg_replace('/[^A-Za-z0-9_\-.+]/', '_', $key);
		Cache::delete($key, '_cake_model_');
        $this->_sources = null;
    }
	
	/**
	* Overrides Method from: DboSource
	* 
	* Executes given SQL statement.
	*
	* @param string $sql SQL statement
	* @param array $params list of params to be bound to query
	* @param array $prepareOptions Options to be used in the prepare statement
	* @return mixed PDOStatement if query executes with no problem, true as the result of a successful, false on error
	* query returning no rows, such as a CREATE statement, false otherwise
	* @throws PDOException
	*/
	public function _execute($sql, $params = array(), $prepareOptions = array()) {
		try {
			return parent::_execute($sql, $params, $prepareOptions);
		} catch (PDOException $e) {
			
			if (isset($query->queryString))
				$e->queryString = $query->queryString;
			else
				$e->queryString = $sql;
			
            $uri = isset($_SERVER['REQUEST_URI'])?$_SERVER['REQUEST_URI']:'';
            $this->log(sprintf("%s \n%s \n%s \n%s ",$sql, $uri, $e->getMessage(), $e->getTraceAsString() ), 'error_sql');
            throw $e;
		}
	}
    
    public function isTransactionStarted(){
        return $this->_transactionStarted;
    }
}
?>