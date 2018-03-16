<?php

/**
 * Created by PhpStorm.
 * User: benying.zou
 * Date: 08.12.2016
 * Time: 11:39
 */
class ImagesController extends AppController {

    public function toBlackWhite ($img) {
        $this->layout = null;
        $this->set('img', str_replace('__', '/', $img));
    }

    public function uploadPhoto () {
        $this->checkLogin();
        $photo = $this->request->params['form']['photo'];
        $tmpPath = $_SERVER['DOCUMENT_ROOT'] . Configure::read('system.tmp.path');

        GlbF::mkDir($tmpPath);
        $sufix = GlbF::getFileSuffix($photo['name']);

        do {
            $saveName = GlbF::getRandomStr(20) . '.' . $sufix;
            $saveFile = $tmpPath . '/' . $saveName;
        } while (is_file($saveFile));

        //file upload
        if (!@rename($photo['tmp_name'], $saveFile)) {
            ErrorCode::throwException(sprintf(__('Error by upload [%s].'), $photo['name']) + 'to "' + $saveName + '"', ErrorCode::ErrorCodeServerInternal);
        }

        return ['tmpPhotoName' => $saveName];
    }

    public function clearTempPhoto () {
        $this->checkLogin();
        $tmpPath = $_SERVER['DOCUMENT_ROOT'] . Configure::read('system.tmp.path');
        $tmp = $tmpPath . '/' . $this->request->data['file'];
        if (is_file($tmp)) {
            @ unlink($tmp);
        }
    }
}