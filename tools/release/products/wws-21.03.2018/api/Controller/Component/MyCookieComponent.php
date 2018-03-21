<?php
/**
 * Created by PhpStorm.
 * User: benying.zou
 * Date: 05.02.2018
 * Time: 09:12
 */

class MyCookieComponent extends Component
{
    var $components = ['Cookie'];

    public function read($path = '')
    {
        return $this->Cookie->read(GlbF::getAppName() . $path);
    }

    public function check($path = '')
    {
        return $this->Cookie->check(GlbF::getAppName() . $path);
    }

    public function write($path, $value)
    {
        $path = GlbF::getAppName() . $path;
        $this->Cookie->write($path, $value, false, '3 Months');
    }

    public function delete($path = '')
    {
        $this->Cookie->delete(GlbF::getAppName() . $path);
    }

    public function destory () {
        $this->delete('keepLogged');
        $this->delete('username');
    }
}