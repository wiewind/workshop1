<div>
    <div style="font-size: 14px; color: #444444; border: 1px solid #2c6877; -webkit-border-radius: 10px; -moz-border-radius: 10px; border-radius: 10px;">
        <div style="margin: 10px;"><img src="<?= Configure::read('system.url') . Configure::read('system.image.path') ?>/logo_mit_schriftung.png" /></div>
        <div style="border-top: 1px solid #2c6877; border-bottom: 1px solid #2c6877; background-color: #cbddf3; min-height: 20px;">
            <div style="margin: 10px;">
                <?= $this->fetch('content') ?>
            </div>
        </div>
        <div style="margin: 5px 10px; font-size: 11px; color: #2c6877; text-align: right;"><?= GlbF::getWebName() ?> |&nbsp;<b>Version <?= $this->Session->read('wsp.sys.version.number') ?></b></div>
    </div>
    <div style="margin: 5px 10px; font-size: 11px; color: #2c6877; text-align: right;">&copy; Wiewind Studio <?= date('Y', strtotime($this->Session->read('wsp.sys.version.date'))) ?></div>
</div>