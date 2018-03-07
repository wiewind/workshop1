<?php
class ErrorCode {
	const Success = 200;
	const ErrorCodeBadRequest = 400;
	const ErrorCodeAccessDenied = 401;
	const ErrorCodeNoFound = 404;
	const ErrorCodeUserDenied = 410;
	const ErrorValidationError = 420;
	const ErrorCodeServerInternal = 500;
	const ErrorCodeSessionTimeout = 600;
	const ErrorCodeOtherSessionOn = 610;
    const ErrorCodeFileDuplicate = 811;
    const ErrorCodeFolderDuplicate = 812;

	static function getExceptionMessage ($code) {
        switch ($code) {
            case self::Success:
                return __('Success');
            case self::ErrorCodeBadRequest:
                return __('The request was invalid or cannot be otherwise served.');
            case self::ErrorCodeAccessDenied:
                return __('The server was denied this request.');
            case self::ErrorCodeNoFound:
                return __('The request is invalid or the resource does not exists.');
            case self::ErrorCodeUserDenied:
                return __('Authentication credentials were missing or incorrect.');
            case self::ErrorCodeServerInternal:
                return __('The server is currently busy. Please try again later.');
            case self::ErrorCodeSessionTimeout:
                return __('Your session has expired. Please login again.');
            case self::ErrorCodeOtherSessionOn:
                return __('Another session is already running.');
            case self::ErrorValidationError:
                return __('Your input is not valid.');
            case self::ErrorCodeFileDuplicate:
                return __('This file name is already in use.');
            case self::ErrorCodeFolderDuplicate:
                return __('This folder name is already in use.');
        }
        return __('An unknown error has occurred.');
    }

    static function throwException ($msg='', $code=0) {
	    if (!$msg) {
            $msg = self::getExceptionMessage($code);
        }
        if ($code === 0) {
            $code = self::ErrorCodeBadRequest;
        }
	    throw new Exception($msg, $code);
    }

    static function throwExceptionCode ($code) {
        self::throwException('', $code);
    }
}
?>