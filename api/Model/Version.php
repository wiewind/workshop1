<?php
/**
 * Created by PhpStorm.
 * User: benying.zou
 * Date: 17.05.2018
 * Time: 13:23
 */

class Version extends AppModel {
    public function getVersion () {
        $data = $this->find('first', [
            'order' => 'id desc'
        ]);

        if (!$data) {
            $data = [
                'major' => 1,
                'minor' => 0,
                'patch' => 1
            ];
            $this->save($data);
        } else {
            $data = $data['Version'];
        }


        $data['year'] = substr($data['created'], 0, 4);
        $data['date'] = $data['created'];
        $data['number'] = $this->getNumber($data);
        $data['build'] = $data['id'];
        unset($data['id']);
        unset($data['created']);

        return $data;
    }

    public function getVersionNumber () {
        return $this->getNumber($this->getVersion());
    }

    public function getDataByNumber ($no) {
        $data = explode('.', $no);
        if (count($data) !== 4) {
            ErrorCode::throwException(__('The version number is invalid.'));
        }
        $data = $this->find('first', [
            'conditions' => [
                'major' => intval($data[0]),
                'minor' => intval($data[1]),
                'patch' => intval($data[2]),
                'id' => intval($data[3])
            ]
        ]);
        if (!$data) {
            ErrorCode::throwException(__('The version number is invalid.'));
        }

        return $data;
    }

    public function getNumber ($data) {
        $no = $data['major'] . '.' . $data['minor'] . '.' . $data['patch'] . '.';
        if (isset($data['build'])) {
            $no .= $data['build'];
        } else {
            $no .= $data['id'];
        }
        if (isset($data['beta']) && $data['beta']) {
            $no .= ' (Beta)';
        }
        return $no;
    }
}