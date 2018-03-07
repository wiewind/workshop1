<?php
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class FiletypesController extends AppController {

    public function icon() {
        $this->layout = null;
        if ($this->request->params['pass']) {
            $suffix = $this->request->params['pass'][0];
            $data = $this->Filetype->find('first', array(
                'fields' => array('FiletypeGroup.name'),
                'conditions' => array(
                    'Filetype.name' => $suffix
                )
            ));
            if ($data) {
                $icon = $data['FiletypeGroup']['name'];
            } else {
                $icon = $suffix;
            }
        } else {
            $icon = 'nox';
        }
        $this->set('icon', $icon);
    }
}

