<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class JobapplicationsAttachment extends AppModel {

    function getFilePath ($data) {
        if (is_int($data)) {
            $data = $this->findById($data);
        }
        if ($data) {
            return $data['JobapplicationsAttachment']['user_id'].'/'.$data['JobapplicationsAttachment']['file'];
        }
        return false;
    }
}