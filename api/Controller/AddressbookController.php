<?php
/**
 * Created by PhpStorm.
 * User: benying.zou
 * Date: 21.12.2016
 * Time: 12:27
 */

class AddressbookController extends AppController {

    public $uses = array(
        'AddressbookPerson',
        'AddressbookAddress',
        'AddressbookTelephone',
        'AddressbookEmail'
    );

    public function getPersons () {
        $this->checkLogin();
        $customer_id = (isset($this->request->data['customer_id'])) ? $this->request->data['customer_id'] : $this->customer_id;
            $options['conditions'] = array(
            'AddressbookPerson.customer_id' => $customer_id
        );
        if (isset($this->request->data['searchtext']) && strlen(($this->request->data['searchtext'])) > 0) {
            $options['conditions']['or'] = array(
                'AddressbookPerson.name like ' => '%' . $this->request->data['searchtext'] . '%',
                'AddressbookPerson.name2 like ' => '%' . $this->request->data['searchtext'] . '%',
                'AddressbookPerson.pinyin like ' => '%' . $this->request->data['searchtext'] . '%'
            );
        }

        $result['total'] = $this->AddressbookPerson->find('count', $options);

        if(!empty($this->request->data['limit'])) {
            $limit = $this->request->data['limit'];
        } else {
            $limit = Configure::read("maxProSite");
        }
        if(!empty($this->request->data['page'])) {
            $page = $this->request->data['page'];
        } else {
            $page = 0;
        }
        $options['limit'] = $limit;
        $options['page'] = $page;
        $options['order'] = 'LOWER(AddressbookPerson.pinyin), CONVERT(LOWER(AddressbookPerson.name) USING gbk)';

        $options['fields'] = array(
            'AddressbookPerson.id',
            'AddressbookPerson.name',
            'AddressbookPerson.name2',
            'AddressbookPerson.pinyin'
        );

        $result['data'] = $this->AddressbookPerson->find('all', $options);

        return $result;
    }

    function getPerson () {
        $this->checkLogin();
        $data = $this->AddressbookPerson->find('first', array(
            'conditions' => array(
                'AddressbookPerson.customer_id' => $this->customer_id,
                'AddressbookPerson.id' => $this->request->data['person_id']
            )
        ));

        $withRecords = (isset($this->request->data['withRecords'])) ? $this->request->data['withRecords'] : false;
        if ($data) {
            $data = $data['AddressbookPerson'];
            if ($withRecords) {
                $data['telephone'] = $this->getRecord('telephone');
                $data['email'] = $this->getRecord('email');
                $data['address'] = $this->getRecord('address');
            }
        }
        return $data;
    }

    function getRecord ($type) {
        $this->checkLogin();
        $modelName = 'Addressbook'.GlbF::ucfirst($type);
        $data = $this->{$modelName}->find('all', array(
            'conditions' => array(
                $modelName.'.person_id' => $this->request->data['person_id']
            ),
            'order' => 'LOWER('.$modelName.'.title)'
        ));
        return $data;
    }

    function saveRecord () {
        $this->checkLogin();
        $data = $this->request->data;
        $type = $data['datatype'];
        $model = $this->{'Addressbook'.GlbF::ucfirst($type)};
        if ($data['id'] == 0) {
            unset($data['id']);
            $model->create();
        }
        $model->save($data);
    }

    function deleteRecord ($type) {
        $this->checkLogin();
        $model = $this->{'Addressbook'.GlbF::ucfirst($type)};
        $model->delete($this->request->data['id']);
    }

    function savePerson () {
        $this->checkLogin();
        $data = $this->request->data;
        $person_id = intval($data['person_id']);
        unset($data['person_id']);
        if ($person_id > 0) {
            $data['id'] = $person_id;
        } else {
            $data['customer_id'] = $this->customer_id;
            $data['created_by'] = $this->user_id;
            $this->AddressbookPerson->create();
        }
        $data['modified_by'] = $this->user_id;
        $this->AddressbookPerson->save($data);
        if ($person_id === 0) {
            $data['id'] = $this->AddressbookPerson->getLastInsertID();
        }
        return $data;
    }

    function deletePerson () {
        $this->checkLogin();
        $result['data']['id'] = intval($this->request->data['person_id']);
        $this->AddressbookPerson->delete($result['data']['id']);
    }
}