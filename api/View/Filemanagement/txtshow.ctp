<textarea style="width: 100%; height: 100%; border: 0; white-space: pre;" aria-readonly="true" readonly><?php
    $str = file_get_contents($frameurl);
    $encode = mb_detect_encoding($str, array("ASCII",'UTF-8','GB2312',"GBK",'BIG5'));
    if($encode=="UTF-8"){
        echo $str;
    }else{
        echo utf8_encode($str);
    }
    ?>
</textarea>