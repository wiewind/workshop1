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
        $this->autoRender = false;
        $result = array(
            'data' => [],
            'total' => 0,
            'success' => true,
            'message' => ''
        );
        try {
            $result['total'] = $this->Customer->find('count');

            $data = $this->Customer->find('all', array(
                'order' => 'LOWER(name)',
                'limit' => $this->request->query['limit'],
                'page' => $this->request->query['page']
            ));
            if ($data) {
                $result['data'] = $data;
            }
        } catch (Exception $e) {
            $result['success'] = false;
            $result['message'] = $e->getMessage();
        }

        return json_encode($result);
    }

    public function save () {
        $this->autoRender = false;
        $result = array(
            'data' => [],
            'success' => true,
            'message' => ''
        );
        try {
            $data = $this->request->data;
            if ($this->request->data['id'] === '0') {
                unset($data['id']);
                $this->Customer->create();
            }
            $this->Customer->save($data);
            $data['id'] = $this->Customer->id;
            $result['data'] = $data;
        } catch (Exception $e) {
            $result['success'] = false;
            $result['message'] = $e->getMessage();
        }

        return json_encode($result);
    }

    public function deleteCustomer () {
        $this->autoRender = false;
        $result = array(
            'success' => true,
            'message' => ''
        );
        try {
            $this->User->deleteAllUsersOfCustomer($this->request->data['id']);
            $this->Customer->delete($this->request->data['id']);
        } catch (Exception $e) {
            $result['success'] = false;
            $result['message'] = $e->getMessage();
        }

        return json_encode($result);
    }
}