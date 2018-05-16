<?php
/**
 * Created by PhpStorm.
 * User: benying.zou
 * Date: 15.02.2017
 * Time: 09:44
 */

class MySessionComponent extends Component {
    var $components = ['Session'];

    public function id () {
        $args = func_get_args();
        if (count($args) > 0) {
            return $this->Session->id($args[0]);
        }
        return $this->Session->id();
    }

    public function read ($path = '', $group='data') {
        $path = $path ? '.'.$group.'.' . $path : '.'.$group;
        return $this->Session->read(GlbF::getAppName() . $path);
    }

    public function check ($path = '', $group='data') {
        $path = $path ? '.'.$group.'.' . $path : '.'.$group;
        return $this->Session->check(GlbF::getAppName() . $path);
    }

    public function write ($path, $value, $group='data') {
        $path = $path ? '.'.$group.'.' . $path : '.'.$group;
        $path = GlbF::getAppName() . $path;
        $this->Session->delete($path);
        if ($value !== null) {
            $this->Session->write($path, $value);
        }
    }

    public function delete ($path = '', $group='data') {
        $path = $path ? '.'.$group.'.' . $path : '.'.$group;
        $this->Session->delete(GlbF::getAppName() . $path);
    }

    // ------ Config -------------------

    public function checkConfig ($path = '') {
        return $this->check($path,  'config');
    }

    public function readConfig ($path = '') {
        return $this->read($path, 'config');
    }

    public function writeConfig ($path = '', $value = '') {
        return $this->write($path, $value, 'config');
    }

    public function deleteConfig ($path = '') {
        return $this->delete($path, '.config');
    }

    // ------ end Config -------------------




    public function destory () {
        $this->Session->delete(GlbF::getAppName());
    }

    public function checkAll () {
        return $this->Session->check(GlbF::getAppName());
    }

    public function readAll () {
        return $this->Session->read(GlbF::getAppName());
    }

    public function flash () {
        $this->Session->flash();
    }


    public function deleteUserSession () {
        $this->delete('user');
        $this->delete('customer');
        $this->delete('userModules');
        $this->delete('userMobileModules');
        $this->delete('appLanguage');
        $this->delete('loginFromCookie');
        $this->delete('formatting');
    }
}