<p>Liebe <?= $user['name'] ?>:</p>
<?php
if (isset($isNewUser) && $isNewUser) {
    ?>
    <P>Herzlich willkommen <?= $user['name'] ?>, hier ist Wiewind Workshop!</P>
    <?php
}
?>
<p>Ihr Benutzername lautet: <b><?= $user['username'] ?></b></p>
<p>Ihr neues Kennwort lautet: <b><?= $password ?></b></p>
<p>Bitte klicken <a href="<?= Configure::read('system.projUrl') ?>" target="_blank">hier</a>, um sich anzumelden und sorfort Ihr privates Passwort zu ändern.</p>