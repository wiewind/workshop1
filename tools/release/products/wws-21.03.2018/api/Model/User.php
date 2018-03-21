<?php
/**
 * Created by PhpStorm.
 * User: benying.zou
 * Date: 23.11.2016
 * Time: 15:32
 */

class User extends AppModel {
    public function deleteAllUsersOfCustomer ($customer_id) {
        $users = $this->find('all', array(
            'conditions' => array(
                'customer_id' => $customer_id
            )
        ));
        if ($users) {
            $uids = Hash::extract($users, '{n}.User.id');
            $this.$this->deleteUsers($uids);
        }
    }

    /*
     * delete User
     * @param $ids can be a integer (id) or array of ids
     */
    public function deleteUsers ($ids) {
        $this->__deleteUsersOfClass($ids, 'ModulesUser');
        $this->deleteAll(array(
            'id' => $ids
        ));
    }

    private function __deleteUsersOfClass ($ids, $className) {
        $model = ClassRegistry::init($className);
        $model->deleteAll(array(
            'user_id' => $ids
        ));
    }
}