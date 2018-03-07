<p>
    <?php
    if (!$salutation) {
        $salutation = '女士/先生';
    }
    echo '亲爱的' . $salutation . '：'
    ?>
</p>
<p>您的朋友<?= $user['name'] ?>为您分享了下列文件:</p>
<ul>
    <?php
    foreach ($files as $f) {?>
        <li style="padding-bottom: 20px">
            <a href="<?= $f['link'] ?>"><?= $f['name'] ?></a> -- <?= $f['size'] ?><br />
            <a href="<?= $f['link'] ?>" style="font-size: x-small; color: #666666"><?= $f['link'] ?></a>
        </li>
        <?php
    }
    ?>
</ul>
<?php if ($timelimit > 0) {
    if ($timelimit == 365) {
        $timelimit = '1年';
    } else {
        $timelimit .= '天';
    }
    ?>
    <p>您可以在<?= $timelimit ?>内查阅。</p>
<?php } ?>
<br />
<br />
<p>祝您愉快！</p>
<p>wiewind.com<br /><?= date('Y年m月d日') ?></p>
