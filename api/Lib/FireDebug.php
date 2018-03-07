<?php
App::uses('AppErrorHandler', 'Lib/Error');

/**
 * FireDebug - debugging with FirePHP and Firebug console
 *
 * @package     app.Lib
 * @author      Ralf Heitmann <r.heitmann@ibau.de>
 * @copyright   ibau GmbH (c) 2012
 */

App::import('Vendor', 'FirePHP', array('file' => 'FirePHPCore' . DS . 'FirePHP.class.php'));

/**
 * FireDebug
 *
 * firePHP wrapper
 */
class FireDebug {

    /**
     * call user function
     *
     * @param string $method
     * @param mixed[] $params
     * @return mixed
     */
    public static function __callStatic($method, $params = array())
    {
        $debug = Configure::read('debug');
        if ($debug) {
            try {
                ob_start();
                $firephp = FirePHP::getInstance(true);
                return call_user_func_array(array($firephp, $method), $params);
            }
            catch (Exception $e) {
                AppErrorHandler::handleException($e);
            }
        }
    }
}
