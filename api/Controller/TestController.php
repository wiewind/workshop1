<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class TestController extends AppController {


    function index () {
        $this->autoRender = false;

        GlbF::printArray($this->request);
    }
}