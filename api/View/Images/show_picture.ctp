<?php



if (isset($tmpphoto)) {
    $photo = $_SERVER['DOCUMENT_ROOT'] . Configure::read('system.tmp.path') . '/' . $tmpphoto;
}

if (!is_file($photo)) {
    if (!isset($noPic)) $noPic = 'nopic.png';
    $photo = $_SERVER['DOCUMENT_ROOT'] . Configure::read('system.image.path') . '/' . $noPic;
}


$suffix = GlbF::getFileSuffix($photo);

list($imgW, $imgH) = getimagesize($photo);
$drawW = 0;
$drawH = 0;

if ($newH === 0 && $newW === 0) {
    $newH = $imgH;
    $newW = $imgW;
    $drawW = $imgW;
    $drawH = $imgH;
} else if ($newW === 0) {
    if ($imgH < $newH) {
        $newW = $imgW;
        $drawW = $imgW;
        $drawH = $imgH;
    } else {
        $rate = $imgH / $newH;
        $newW = $imgW / $rate;
        $drawH = $newH;
        $drawW = $newW;
    }
} else if ($newH === 0) {
    if ($imgW < $newW) {
        $newH = $imgH;
        $drawW = $imgW;
        $drawH = $imgH;
    } else {
        $rate = $imgW / $newW;
        $newH = $imgH / $rate;
        $drawH = $newH;
        $drawW = $newW;
    }
} else if ($newW > $imgW && $newH > $imgH) {
    $drawW = $imgW;
    $drawH = $imgH;
} else {
    $rateW = $imgW / $newW;
    $rateH = $imgH / $newH;
    $rate = ($rateH > $rateW) ? $rateH : $rateW;
    $drawH = intval($imgH / $rate);
    $drawW = intval($imgW / $rate);
}

$this->response->header("Cache-Control: private, max-age=1");
$this->response->type('image/png');

switch ($suffix) {
    case 'jpg':
    case 'jpeg':
        $img = @imagecreatefromjpeg($photo);
        break;
    case 'gif':
        $img = @imagecreatefromgif($photo);
        break;
    case 'bmp':
        $img = @imagecreatefrombmp($photo);
        break;
    case 'png':
    default:
        $img = @imagecreatefrompng($photo);
        break;

}

$im = imagecreatetruecolor($newW, $newH);
imagealphablending($im, true);
imagesavealpha($im, true);
$trans_colour = imagecolorallocatealpha($im, 0, 0, 0, 127);
imagefill($im, 0, 0, $trans_colour);
imagecopyresampled($im, $img, intval(($newW - $drawW)/2), intval(($newH-$drawH)/2), 0, 0, $drawW, $drawH, $imgW, $imgH);

imagepng($im);
ImageDestroy($im);