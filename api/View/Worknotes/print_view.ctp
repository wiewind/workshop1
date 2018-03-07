<div class="print_body" id="print_body">
    <div class="title"><?= $worknote['Worknote']['title'] ?></div>
    <div class="print_info">
        <div class="print_proj">
            <?php
                echo __('Project').': ';
                echo ($worknote['WorknoteProject']['name']) ? $worknote['WorknoteProject']['name'] : __('Unknown');
            ?>
        </div>
        <div class="print_date">
            <?php
                echo __('Date').': ';
                echo GlbF::get_print_date($worknote['Worknote']['date']);
            ?>
        </div>
        <br />
    </div>
    <div class="print_text"><?php
        echo $worknote['Worknote']['text'];
    ?></div>
    <?php if ($worknote['WorknoteRelease']) { ?>
    <div class="print_release">
        <div class="title"><?= __('Release') ?></div>
        <?php
            echo '<table>';
            foreach ($worknote['WorknoteRelease'] as $release) {
                $str_finished = ($release['finished']) ? '&radic;' : '&nbsp;';
                echo '<tr><td>'.$str_finished.'</td>';
                echo '<td>'.$release['file'].'</td></tr>';

            }
            echo '</table>';
        ?>
    <?php } ?>
</div>