<?php

/**
 * Created by PhpStorm.
 * User: benying.zou
 * Date: 17.05.2018
 * Time: 14:33
 */
class VersionsController extends AppController
{
    public function addVersion () {
        $data = $this->request->data;
        $version = [];
        if (isset($data['major']) && $data['major']) {
            $version['major'] = $data['major'];
        }
        if (isset($data['minor']) && $data['minor']) {
            $version['minor'] = $data['minor'];
        }
        if (isset($data['patch']) && $data['patch']) {
            $version['patch'] = $data['patch'];
        }
        if (isset($data['description']) && $data['description']) {
            $version['description'] = $data['description'];
        }
        if (isset($data['beta']) && $data['beta']) {
            $version['beta'] = $data['beta'];
        }


        $lastVersion = $this->Version->getVersion();
        $newVersion = [
            'major' => $lastVersion['major'],
            'minor' => $lastVersion['minor'],
            'patch' => $lastVersion['patch'] + 1,
            'beta' => 0,
        ];
        $newVersion = array_merge($newVersion, $version);

        $this->Version->save($newVersion);

        return [
            'newVersion' => $this->Version->getVersionNumber()
        ];
    }
}