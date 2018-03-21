<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="X-UA-Compatible" content="chrome=1"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=10, user-scalable=yes">
    <meta name="google" content="notranslate" />
    <?php
        echo $this->Html->charset();
//        $imgInfos = GlbF::getImg();
//        echo $this->Html->meta('icon', $imgInfos['icon']);

        echo $this->Html->script(array(
            'ga',
            'wiewindtools'
        ));
    ?>
	<title>
		<?= GlbF::getWebName() ?>
	</title>
</head>
<body>
    <?php
        echo $this->fetch('content');
    ?>
</body>
</html>