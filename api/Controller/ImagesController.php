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
}