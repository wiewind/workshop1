<div>
    <div class="login-container">
        <div class="login-box"><?= $this->fetch('content') ?></div>
        <div class="login-foot"><?= GlbF::getWebName() ?> &star;&nbsp;<b>Version <?= $this->Session->read('wsp.sys.version.number') ?></b></div>
    </div>
    <div class="login-cr">&copy; Wiewind Studio <?= date('Y', strtotime($this->Session->read('wsp.sys.version.date'))) ?></div>
</div>