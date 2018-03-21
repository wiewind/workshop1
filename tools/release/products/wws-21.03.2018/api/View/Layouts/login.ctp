<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="X-UA-Compatible" content="chrome=1"/>
    <meta name="google" content="notranslate" />
    <?php
    echo $this->Html->charset();
    echo $this->Html->meta('icon', Configure::read('system.url') . Configure::read('system.image.logo'));
    ?>

    <script type="text/javascript" src="<?= Configure::read('system.url').'/apps/lib/jquery/'.Configure::read('system.jquery.file') ?>"></script>
    <script type="text/javascript" src="<?= Configure::read('system.url') . Configure::read('system.js.path') . '/wiewindtools.js' ?>"></script>
    <script type="text/javascript" src="<?= Configure::read('system.url') . Configure::read('system.js.path') . '/ga.js' ?>"></script>
    <title>
        <?= GlbF::getWebName() ?>
    </title>
    <link rel="stylesheet" type="text/css" href="<?= Configure::read('system.url') . Configure::read('system.api.path') ?>/css/styles.css?ref=<?= md5(time()) ?>" />
</head>
<body>
<div class="login-container">
    <div class="login-box">
        <?= $this->fetch('content') ?>
    </div>
    <div class="login-foot"><?= GlbF::getWebName() ?> &star;&nbsp;<b>Version <?= $version['number'] ?></b></div>
</div>
<div class="login-cr">&copy; <?= GlbF::getAuthor() ?> <?= date('Y', strtotime($version['date'])) ?></div>
</body>
</html>