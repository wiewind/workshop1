<?php
/**
 * Created by PhpStorm.
 * User: benying.zou
 * Date: 06.12.2016
 * Time: 11:29
 */

class CustomersController extends AppController
{
    public $uses = array(
        'User',
        'Customer'
    );

    public function getAllCustomers () {
        $this->checkLogin();

        $result['total'] = $this->Customer->find('count');

        $data = $this->Customer->find('all', array(
            'order' => 'LOWER(name)',
            'limit' => $this->request->data['limit'],
            'page' => $this->request->data['page']
        ));
        $result['data'] = $data;
        return $result;
    }

    public function load () {
        $this->checkLogin();

        $data = $this->Customer->find('first', [
            'conditions' => [
                'id' => $this->request->data['id']
            ]
        ]);
        if ($data) {
            $data = $data['Customer'];
        }
        return $data;
    }

    public function save () {
        $this->checkLogin();
        $data = $this->request->data;
        if ($this->request->data['id'] === '0') {
            unset($data['id']);
            $this->Customer->create();
            $data['created_by'] = $this->user_id;
        }
        $data['modified_by'] = $this->user_id;
        $this->Customer->save($data);

        if ($this->request->data['id'] === '0') {
            $data['id'] = $this->Customer->getLastInsertID();
        }
        return $data;
    }

    public function deleteCustomer () {
        $this->checkLogin();

        $this->User->deleteAllUsersOfCustomer($this->request->data['id']);
        $this->Customer->delete($this->request->data['id']);
    }
}