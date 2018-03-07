<?php

$this->response->header("Cache-Control: private, max-age=1");
$this->response->type('image/png');

$im = imagecreatefrompng($img);
if ($im && imagefilter($im, IMG_FILTER_GRAYSCALE)) {
    imagepng($im);
}

imagedestroy($im);