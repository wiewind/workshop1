<?php

function addFileToZip($path, $zip, $indexStart)
{
    $writePath = substr($path, $indexStart);
    if (is_dir($path)) {
        $handler = opendir($path);
        $empty = true;
        while (($filename = readdir($handler)) !== false) {
            if ($filename !== "." && $filename !== "..") {
                addFileToZip($path . "/" . $filename, $zip, $indexStart);
                $empty = false;
            }
        }
        @closedir($path);
        if ($empty) {
            $zip->addEmptyDir($writePath);
        }
    } else {
        $zip->addFile($path, $writePath);
    }
}


$path = $argv[1];
$zipname = $argv[2];
if (strtolower(substr($zipname, -4)) !== '.zip') {
    $zipname .= '.zip';
}

$indexStart = strlen($path);
if (in_array(substr($path, -1, 1), ["/", "\\"])) {
    $path .= substr($path, 0, $indexStart-1);
} else {
    $indexStart++;
}

$testZip = "test.zip";

$zip = new ZipArchive();
$flag = $zip->open($testZip, ZipArchive::CREATE);
if($flag!==true){
    echo "open error code: {$flag}\n";
    exit();
}
//新建一个文件用来验证zip文件
$validateFileName = "wiewind_com_update_zip_file";
if (file_exists($validateFileName)) {
    unlink($validateFileName);
}
$f = fopen($validateFileName, 'w');
fwrite($f, 'to check the validity of the zip file');
fclose($f);
$zip->addFile($validateFileName, $validateFileName);

addFileToZip($path, $zip, $indexStart);
$zip->close();

if (file_exists($zipname)) {
    unlink($zipname);
}
@ rename($testZip, $zipname);
@ unlink($validateFileName);