<?php

/**
 * Created by PhpStorm.
 * User: benying.zou
 * Date: 03.05.2018
 * Time: 13:54
 */
class Curreny extends AppModel
{
    public function getCurrenyFromCode ($code) {
        $data = $this->find('first', [
            'conditions' => [
                'code' => $code
            ]
        ]);
        if ($data) {
            $data = $data['Currency'];
        }
        return $data;
    }
}