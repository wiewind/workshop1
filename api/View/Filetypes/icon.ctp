<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$this->response->header("Cache-Control: private, max-age=1");
$this->response->type('image/png');

$iconPath = $_SERVER['DOCUMENT_ROOT'] . Configure::read('system.image.path').'/fileIcon/';
$iconImg = realpath($iconPath.'icons/'.$icon.'.png');

if (is_file($iconImg)) {
    $im = imagecreatefrompng($iconImg);
    imagealphablending($im, false);
    imagesavealpha($im, true);
} else {
    $font = $iconPath.'fonts/FuturaLight.ttf';
    $angle = 0;
    $size  = 8;
    $x  = 2;
    $y = 13;

    $im = imagecreatefrompng($iconPath.'file.png');
    imagealphablending($im, false);
    imagesavealpha($im, true);
    $text_color = imagecolorallocate ($im, 220, 20, 60);
    imagettftext ($im, $size, $angle, $x, $y, $text_color, $font, $icon);
}
imagepng($im);
ImageDestroy($im);