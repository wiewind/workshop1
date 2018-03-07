<?php
/**
 * App Error Handler
 *
 * Handle of php errors and application exceptions regarding to the debug
 * mode.
 *
 * @package		app.Lib.Error
 *
 * @author		Heiko Teschke <heiko.teschke@docugroup.info>
 * @copyright	Copyright (C) DOCUgroup
 */

App::uses('ErrorHandler', 'Error');

/**
 * App Error Handler
 *
 * ### Behavior of AppErrorHandler
 *
 * Writes php errors and app exceptions via CakeLog to the log files or print them
 * out directly via the Debugger class and error-templates. This depends on the
 * debug mode.
 *
 * This behavior will be changed in future, so that errors will be
 * written into the database with more "user-based" information by default.
 * There will be also some new application exception classes to use in there specified
 * controller.
 *
 * @package		app.Lib.Error
 *
 * @author		Heiko Teschke <heiko.teschke@docugroup.info>
 * @copyright	Copyright (C) DOCUgroup
 */
final class AppErrorHandler extends ErrorHandler {

    /**
     * Handles the PHP Errors in a major way, depending on the debug mode.
     *
     * @param integer $code Code of error
     * @param string $description Error description
     * @param string $file File on which error occurred
     * @param integer $line Line that triggered the error
     * @param array $context Context
     *
     * @return boolean true if error was handled
     */
    public static function handleError($code, $description, $file = null, $line = null, $context = null) {
		if (error_reporting() === 0) {
			return false;
		}

		$errorConfig = Configure::read('Error');
		list($error, $log) = self::mapErrorCode($code);

		$debug = Configure::read('debug');
		if ($debug) {
			$data = array(
				'level' => $log,
				'code' => $code,
				'error' => $error,
				'description' => $description,
				'file' => $file,
				'line' => $line,
				'context' => $context,
				'start' => 2,
				'path' => Debugger::trimPath($file)
			);
			return Debugger::getInstance()->outputError($data);
		}
		else {
			$message = $error . ' (' . $code . '): ' . $description . ' in [' . $file . ', line ' . $line . ']';
			if (!empty($errorConfig['trace'])) {
				$trace = Debugger::trace(array('start' => 1, 'format' => 'log'));
				$message .= "\nTrace:\n" . $trace . "\n";
			}
			return CakeLog::write($log, $message);
		}

	}

    /**
     * Handles the Application Exceptions in a major way.
     *
     * @param Exception $exception Exception Object
     *
     * @return void
     */
	public static function handleException(Exception $exception) {
		$config = Configure::read('Exception');
		if (!empty($config['log'])) {
			$message = sprintf("[%s] %s\n%s",
				get_class($exception),
				$exception->getMessage(),
				$exception->getTraceAsString()
			);
			CakeLog::write(LOG_ERR, $message);
		}

		$renderer = $config['renderer'];

		if ($renderer !== 'ExceptionRenderer') {
			list($plugin, $renderer) = pluginSplit($renderer, true);
			App::uses($renderer, $plugin . 'Error');
		}

		try {
			$error = new $renderer($exception);
			$error->render();
		}
		catch (Exception $e) {
            // Should be using configured ErrorHandler
			set_error_handler(Configure::read('Error.handler'));

            // trace is useless here since it's internal
			Configure::write('Error.trace', false);

            // Keeping same message format
			$message = sprintf("[%s] %s\n%s",
				get_class($e),
				$e->getMessage(),
				$e->getTraceAsString()
			);
			trigger_error($message, E_USER_ERROR);
		}
	}

}
?>