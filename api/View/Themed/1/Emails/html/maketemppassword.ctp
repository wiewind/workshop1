<p>亲爱的<?= $user['name'] ?>：</p>
<?php
if (isset($isNewUser) && $isNewUser) {
?>
    <P>亲爱的<?= $user['name'] ?>，欢迎来到Wiewind Workshop！</P>
<?php
}
?>
<p>您的用户名是：<b><?= $user['username'] ?></b></p>
<p>您的新密码是：<b><?= $password ?></b></p>
<p>请点击<a href="<?= Configure::read('system.projUrl') ?>" target="_blank">这里</a>，登录您的账户并立即更改密码！</p>