<?php
/**
 * This file is loaded automatically by the app/webroot/index.php file after core.php
 *
 * This file should load/create any application wide configuration settings, such as
 * Caching, Logging, loading additional configuration files.
 *
 * You should also use this file to include any files that provide global functions/constants
 * that your application uses.
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
 * @package       app.Config
 * @since         CakePHP(tm) v 0.10.8.2117
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */

// Setup a 'default' cache configuration for use in the application.
Cache::config('default', array('engine' => 'File'));


// define application-wide constants
require_once 'config_default.php';
Configure::write($config);
unset($config);

// load classes from core library
App::uses('IniReader', 'Configure');

// load Email Class
App::uses('CakeEmail', 'Network/Email');

// load classes from application library
//App::uses('AppStatusCode', 'Lib/Runtime');
// load FirePHP debugging wrapper
App::uses('FireDebug', 'Lib');
// load Error Code
App::uses('ErrorCode', 'Lib');
// load WWS-Global functions
App::uses('GlbF', 'Lib');


/**
 * The settings below can be used to set additional paths to models, views and controllers.
 *
 * App::build(array(
 *     'Model'                     => array('/path/to/models/', '/next/path/to/models/'),
 *     'Model/Behavior'            => array('/path/to/behaviors/', '/next/path/to/behaviors/'),
 *     'Model/Datasource'          => array('/path/to/datasources/', '/next/path/to/datasources/'),
 *     'Model/Datasource/Database' => array('/path/to/databases/', '/next/path/to/database/'),
 *     'Model/Datasource/Session'  => array('/path/to/sessions/', '/next/path/to/sessions/'),
 *     'Controller'                => array('/path/to/controllers/', '/next/path/to/controllers/'),
 *     'Controller/Component'      => array('/path/to/components/', '/next/path/to/components/'),
 *     'Controller/Component/Auth' => array('/path/to/auths/', '/next/path/to/auths/'),
 *     'Controller/Component/Acl'  => array('/path/to/acls/', '/next/path/to/acls/'),
 *     'View'                      => array('/path/to/views/', '/next/path/to/views/'),
 *     'View/Helper'               => array('/path/to/helpers/', '/next/path/to/helpers/'),
 *     'Console'                   => array('/path/to/consoles/', '/next/path/to/consoles/'),
 *     'Console/Command'           => array('/path/to/commands/', '/next/path/to/commands/'),
 *     'Console/Command/Task'      => array('/path/to/tasks/', '/next/path/to/tasks/'),
 *     'Lib'                       => array('/path/to/libs/', '/next/path/to/libs/'),
 *     'Locale'                    => array('/path/to/locales/', '/next/path/to/locales/'),
 *     'Vendor'                    => array('/path/to/vendors/', '/next/path/to/vendors/'),
 *     'Plugin'                    => array('/path/to/plugins/', '/next/path/to/plugins/'),
 * ));
 *
 */
App::build(array(
    'Vendor'                    => array(ROOT . DS . 'lib' . DS . 'cake' . DS . 'vendors'.DS),
    'Plugin'                    => array(ROOT . DS . 'lib' . DS . 'cake' . DS . 'plugins'.DS),
));

App::import('Vendor', 'WiewindCurrencySDK', array('file' => 'Currency'.DS.'WiewindCurrencySDK.php'));

/**
 * Custom Inflector rules can be set to correctly pluralize or singularize table, model, controller names or whatever other
 * string is passed to the inflection functions
 *
 * Inflector::rules('singular', array('rules' => array(), 'irregular' => array(), 'uninflected' => array()));
 * Inflector::rules('plural', array('rules' => array(), 'irregular' => array(), 'uninflected' => array()));
 *
 */
Inflector::rules('singular', array(
    'uninflected' => array('sys_user'),
    'irregular' => array('sys_user' => 'sys_user')
));
Inflector::rules('plural', array(
    'irregular' => array(
        'ebooks_gbcolor'        => 'ebooks_gbcolor',
        'ebooks_lesezeichen'    => 'ebooks_lesezeichen',
        'not_job'               => 'not_job',
        'not_menu'              => 'not_menu',
        'not_recorder'          => 'not_recorder',
        'search_seite'          => 'search_seite',
        'sys_hotlink'           => 'sys_hotlink',
        'sys_log_anmelden'      => 'sys_log_anmelden',
        'sys_mitteilung'        => 'sys_mitteilung',
        'sys_munue'             => 'sys_munue',
        'sys_user'              => 'sys_user',
        'sys_user_share_tele'   => 'sys_user_share_tele',
        'telebuch_adr'          => 'telebuch_adr',
        'telebuch_email'        => 'telebuch_email',
        'telebuch_menu'         => 'telebuch_menu',
        'telebuch_person'       => 'telebuch_person',
        'telebuch_tel'          => 'telebuch_tel',

        'data'                  => 'datas',
)));

/**
 * Plugins need to be loaded manually, you can either load them one by one or all of them in a single call
 * Uncomment one of the lines below, as you need. Make sure you read the documentation on CakePlugin to use more
 * advanced ways of loading plugins
 *
 * CakePlugin::loadAll(); // Loads all plugins at once
 * CakePlugin::load('DebugKit'); //Loads a single plugin named DebugKit
 *
 */

/**
 * You can attach event listeners to the request lifecycle as Dispatcher Filter. By default CakePHP bundles two filters:
 *
 * - AssetDispatcher filter will serve your asset files (css, images, js, etc) from your themes and plugins
 * - CacheDispatcher filter will read the Cache.check configure variable and try to serve cached content generated from controllers
 *
 * Feel free to remove or add filters as you see fit for your application. A few examples:
 *
 * Configure::write('Dispatcher.filters', array(
 *		'MyCacheFilter', //  will use MyCacheFilter class from the Routing/Filter package in your app.
 *		'MyPlugin.MyFilter', // will use MyFilter class from the Routing/Filter package in MyPlugin plugin.
 * 		array('callable' => $aFunction, 'on' => 'before', 'priority' => 9), // A valid PHP callback type to be called on beforeDispatch
 *		array('callable' => $anotherMethod, 'on' => 'after'), // A valid PHP callback type to be called on afterDispatch
 *
 * ));
 */
Configure::write('Dispatcher.filters', array(
	'AssetDispatcher',
	'CacheDispatcher'
));

/**
 * Configures default file logging options
 */

App::uses('CakeLog', 'Log');

//CakeLog::config('default', array(
//    'engine' => 'File'
//));

CakeLog::config('debug', array(
	'engine' => 'File',
	'types' => array('notice', 'info', 'debug'),
	'file' => 'debug',
));
CakeLog::config('error', array(
	'engine' => 'File',
	'types' => array('warning', 'error', 'critical', 'alert', 'emergency'),
	'file' => 'error',
));
CakeLog::config('backup', array(
    'engine' => 'File',
    'types' => array('notice', 'info'),
    'file' => 'backup'
));

try {

	// check if request is coming from shell level
	if (php_sapi_name() === 'cli') {
		$isShell = true;
	}
	else {
		$isShell = false;
	}

	// path correction for include of application specific configuration files
    if ($isShell === false) {
        $configPathPrefix = '../';
    }
	else {
		$configPathPrefix = '';
	}

	// set configuration for default INI reader
	Configure::config('default', new IniReader($configPathPrefix . 'Config/'));

	// load default application configuration
	Configure::load('app_default');
}
catch (Exception $e) {
	// implement catch for exception here
}