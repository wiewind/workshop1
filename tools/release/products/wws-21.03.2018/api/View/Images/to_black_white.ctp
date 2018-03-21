<?php

$this->response->header("Cache-Control: private, max-age=1");
$this->response->type('image/png');

$img = imagecreatefrompng($img);
imagesavealpha($img,true);
imageTrueColorToPalette($img,true,256);
$numColors = imageColorsTotal($img);
for ($x = 0; $x < $numColors; $x++)
{
    list($r,$g,$b) = array_values(imageColorsForIndex($img,$x));
    $avg = intval($r*0.299 + $g*0.587 + $b*0.114);
    imageColorSet($img,$x,$avg,$avg,$avg);
}
imagepng($img);
imagedestroy($img);