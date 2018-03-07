<?php
/**
 * App Exception Renderer
 *
 * @package		app.Lib.Error
 *
 * @author		Heiko Teschke <heiko.teschke@docugroup.info>
 * @copyright	Copyright (C) DOCUgroup
 */

App::uses('ExceptionRenderer', 'Error');

/**
 * App Exception Renderer
 *
 * @package		app.Lib.Error
 *
 * @author		Heiko Teschke <heiko.teschke@docugroup.info>
 * @copyright	Copyright (C) DOCUgroup
 */
final class AppExceptionRenderer extends ExceptionRenderer {

	public function render() {
		if ($this->method) {
			call_user_func_array(array($this, $this->method), array($this->error));
		}
	}

/**
 * Convenience method to display a 400 series page.
 *
 * Additionally return "success" and "errors" to response => handled by ExtJS
 *
 * @param Exception $error
 * @return void
 */
	public function error400($error) {
		$message = $error->getMessage();
		if (!Configure::read('debug') && $error instanceof CakeException) {
			$message = __d('cake', 'Not Found');
		}
		$url = $this->controller->request->here();
		$this->controller->response->statusCode($error->getCode());
		$this->controller->set(array(
			'name' => h($message),
			'url' => h($url),
			'error' => $error,
            'success' => false,
            'errors' => array('errorNumber' => $error->getCode(), 'errorMessage' => h($message)),
			'_serialize' => array('name', 'url', 'success', 'errors')
		));
		$this->_outputMessage('error400');
	}

/**
 * Convenience method to display a 500 page.
 *
 * Additionally return "success" and "errors" to response => handled by ExtJS
 *
 * @param Exception $error
 * @return void
 */
	public function error500($error) {
		$message = $error->getMessage();
		if (!Configure::read('debug')) {
			$message = __d('cake', 'An Internal Error Has Occurred.');
		}
		$url = $this->controller->request->here();
		$code = ($error->getCode() > 500 && $error->getCode() < 506) ? $error->getCode() : 500;
		$this->controller->response->statusCode($code);
		$this->controller->set(array(
			'name' => h($message),
			'message' => h($url),
			'error' => $error,
            'success' => false,
            'errors' => array('errorNumber' => $error->getCode(), 'errorMessage' => h($message)),
			'_serialize' => array('name', 'url', 'success', 'errors')
		));
		$this->_outputMessage('error500');
	}

}
