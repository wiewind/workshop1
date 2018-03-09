<?php
/**
 * Created by PhpStorm.
 * User: benying.zou
 * Date: 20.09.2017
 * Time: 14:26
 */

class SchoolController extends AppController {
    public $uses = array(
        'SchoolSemester',
        'SchoolClass',

        'SchoolCourse',
        'SchoolCoursetime',
        'SchoolPlan',
        'SchoolRoom',
        'SchoolTeacher',

        'SchoolChild',
        'SchoolChildrenTelephone',
        'SchoolChildrenMobilephone',
        'SchoolChildrenAddress'
    );

    private function __getCurrentSemester ($semester_id=0) {
        if ($semester_id) {
            $semester = $this->SchoolSemester->findById($semester_id);
        } else {
            $today = date('Y-m-d');
            $semester = $this->SchoolSemester->find('first', [
                'conditions' => [
                    'start <= ' => $today
                ],
                'order' => [
                    'start DESC'
                ]
            ]);
        }
        return ($semester) ? $semester['SchoolSemester'] : [];
    }

    private function __getNextSemester ($currentSemester) {
        $semester = $this->SchoolSemester->find('first', [
            'conditions' => [
                'start > ' => $currentSemester['end']
            ],
            'order' => [
                'start ASC'
            ]
        ]);
        return ($semester) ? $semester['SchoolSemester'] : [];
    }

    private function __getLastSemester ($currentSemester) {
        $semester = $this->SchoolSemester->find('first', [
            'conditions' => [
                'end < ' => $currentSemester['start']
            ],
            'order' => [
                'start DESC'
            ],
        ]);
        return ($semester) ? $semester['SchoolSemester'] : [];
    }

    private function __getCourseTimes ($class_id, $semester_id) {
        $courseTimes = $this->SchoolCoursetime->find('all', [
            'conditions' => [
                'class_id' => $class_id,
                'semester_id' => $semester_id
            ],
            'order' => [
                'SchoolCoursetime.start',
                'SchoolCoursetime.end'
            ]
        ]);
        return $courseTimes;
    }

    function getPlans () {
        $this->checkLogin();

        $data = [];

        $class_id = 0;
        if (isset($this->request->data['class_id'])) {
            $class_id = $this->request->data['class_id'];
        } else {
            $class = $this->__getDefaultClass();
            if ($class) {
                $class_id = $class['id'];
            }
        }

        $semester_id = 0;
        if (isset($this->request->data['semester_id'])) {
            $semester_id = $this->request->data['semester_id'];
        } else {
            $semester = $this->__getCurrentSemester();
            if ($semester) {
                $semester_id = $semester['id'];
            }
        }

        $coursetimes = $this->__getCourseTimes($class_id, $semester_id);
        $cursetime_ids = Set::extract('/SchoolCoursetime/id', $coursetimes);

        if ($coursetimes) {
            $data['courseTimes'] = $coursetimes;
            $plans = $this->SchoolPlan->find('all', [
                'conditions' => [
                    'SchoolPlan.coursetime_id' => $cursetime_ids
                ]
            ]);
            if ($plans) {
                foreach ($plans as $p) {
                    $data['courses'][$p['SchoolPlan']['weekday']][$p['SchoolPlan']['coursetime_id']] = $p;
                }
            } else {
                $data['courses'] = [];
            }
        }
        return $data;
    }

    function loadPlan () {
        $this->checkLogin();
        $weekday = $this->request->data['weekday'];
        $coursetime_id = $this->request->data['coursetime_id'];

        $data = $this->SchoolPlan->find('first', [
            'conditions' => [
                'SchoolPlan.weekday' => $weekday,
                'SchoolPlan.coursetime_id' => $coursetime_id
            ]
        ]);
        return $data;
    }

    function savePlan () {
        $this->checkLogin();
        $data = $this->request->data;
        if ($data && $data['course_id'] > 0) {
            $saveData = $data;
            $plan = $this->SchoolPlan->find('first', [
                'conditions' => [
                    'SchoolPlan.weekday' => $data['weekday'],
                    'SchoolPlan.coursetime_id' => $data['coursetime_id']
                ]
            ]);
            if ($plan) {
                $saveData['id'] = $plan['SchoolPlan']['id'];
            } else {
                $saveData['created_by'] = $this->user_id;
            }
            $saveData['modified_by'] = $this->user_id;

            foreach ($saveData as $k => $v) {
                if ($v == '') {
                    $saveData[$k] = null;
                }
            }
            $this->SchoolPlan->save($saveData);

            $newId = (isset($saveData['id'])) ? $saveData['id'] : $this->SchoolPlan->getLastInsertID();

            $data['plan_id'] = $newId;
        }
        return $data;
    }

    function deletePlan () {
        $this->checkLogin();
        $data = $this->request->data;
        $this->SchoolPlan->unbindModelAll();
        $this->SchoolPlan->deleteAll([
            'weekday' => $data['weekday'],
            'coursetime_id' => $data['coursetime_id']
        ]);
    }

    function getTeachers () {
        $this->checkLogin();

        $user_id = isset($this->request->data['user_id']) ? $this->request->data['user_id'] : (isset($this->request->query['user_id']) ? $this->request->query['user_id'] : $this->user_id);
        $conditions = [
            'user_id' => $user_id
        ];

        if (isset($this->request->data['searchText'])) {
            $conditions['or'] = [
                'SchoolTeacher.lastname like "%' . $this->request->data['searchText'] . '%"',
                'SchoolTeacher.firstname like "%' . $this->request->data['searchText'] . '%"',
                'SchoolTeacher.telephone like "%' . $this->request->data['searchText'] . '%"',
                'SchoolTeacher.email like "%' . $this->request->data['searchText'] . '%"',
                'SchoolTeacher.fax like "%' . $this->request->data['searchText'] . '%"',
                'SchoolTeacher.address like "%' . $this->request->data['searchText'] . '%"',
                'SchoolTeacher.description like "%' . $this->request->data['searchText'] . '%"'
            ];
        }

        $result['total'] = $this->SchoolTeacher->find('count', [
            'conditions' => $conditions
        ]);

        $this->SchoolTeacher->bindModel([
            'hasMany' => [
                'SchoolPlan' => array(
                    'className' => 'SchoolPlan',
                    'foreignKey' => 'teacher_id'
                )
            ]
        ]);
        $data = $this->SchoolTeacher->find('all', [
            'conditions' => $conditions,
            'order' => [
                'SchoolTeacher.lastname',
                'SchoolTeacher.firstname'
            ],
            'limit' => $this->request->data['limit'],
            'page' => $this->request->data['page']
        ]);
        if ($data) {
            foreach ($data as $key => $d) {
                $courses = [];
                if ($d['SchoolPlan']) {
                    foreach ($d['SchoolPlan'] as $p) {
                        if (!in_array($p['course_id'], $courses)) {
                            $courses[] = $p['course_id'];
                        }
                    }
                }
                $data[$key]['SchoolTeacher']['count_courses'] = count($courses);
            }

            $result['data'] = $data;
        }
        return $result;
    }

    function saveTeacher () {
        $this->checkLogin();
        $user_id = isset($this->request->data['user_id']) ? $this->request->data['user_id'] : (isset($this->request->query['user_id']) ? $this->request->query['user_id'] : $this->user_id);
        $data = $this->request->data;
        $saveData = [];
        if ($data) {
            $saveData = $data;
            if ($data['id'] == 0) {
                unset($saveData['id']);
            }
            if (!isset($saveData['id'])) {
                $saveData['user_id'] = $user_id;
                $saveData['created_by'] = $this->user_id;
            }
            $saveData['modified_by'] = $this->user_id;
            foreach ($saveData as $k => $v) {
                if ($v == '') {
                    $saveData[$k] = null;
                }
            }
            $this->SchoolTeacher->save($saveData);

            $newId = ($data['id'] > 0) ? $data['id'] : $this->SchoolTeacher->getLastInsertID();

            $saveData['teacher_id'] = $newId;
        }
        return $saveData;
    }

    function loadTeacher ($teacher_id) {
        $this->checkLogin();
        $user_id = isset($this->request->data['user_id']) ? $this->request->data['user_id'] : $this->user_id;
        $data = $this->SchoolTeacher->find('first', [
            'conditions' => [
                'user_id' => $user_id,
                'id' => $teacher_id
            ]
        ]);
        return $data;
    }

    function deleteTeacher () {
        $this->checkLogin();
        $this->SchoolTeacher->delete($this->request->data['teacher_id']);
    }

    function getRooms () {
        $this->checkLogin();
        $user_id = isset($this->request->data['user_id']) ? $this->request->data['user_id'] : (isset($this->request->query['user_id']) ? $this->request->query['user_id'] : $this->user_id);
        $conditions = [
            'user_id' => $user_id
        ];

        if (isset($this->request->data['searchText'])) {
            $conditions['or'] = [
                'SchoolRoom.name like "%' . $this->request->data['searchText'] . '%"',
                'SchoolRoom.telephone like "%' . $this->request->data['searchText'] . '%"',
                'SchoolRoom.description like "%' . $this->request->data['searchText'] . '%"'
            ];
        }
        $result['total'] = $this->SchoolRoom->find('count', [
            'conditions' => $conditions
        ]);
        $result['data'] = $this->SchoolRoom->find('all', [
            'conditions' => $conditions,
            'order' => [
                'SchoolRoom.name'
            ],
            'limit' => $this->request->data['limit'],
            'page' => $this->request->data['page']
        ]);
        return $result;
    }

    function saveRoom () {
        $this->checkLogin();
        $user_id = isset($this->request->data['user_id']) ? $this->request->data['user_id'] : (isset($this->request->query['user_id']) ? $this->request->query['user_id'] : $this->user_id);
        $data = $this->request->data;
        $saveData = [];
        if ($data) {
            $saveData = $data;
            if ($data['id'] == 0) {
                unset($saveData['id']);
            }
            if (!isset($saveData['id'])) {
                $saveData['user_id'] = $user_id;
                $saveData['created_by'] = $this->user_id;
            }
            $saveData['modified_by'] = $this->user_id;
            foreach ($saveData as $k => $v) {
                if ($v == '') {
                    $saveData[$k] = null;
                }
            }
            $this->SchoolRoom->save($saveData);

            $newId = ($data['id'] > 0) ? $data['id'] : $this->SchoolRoom->getLastInsertID();

            $saveData['room_id'] = $newId;
        }
        return $saveData;
    }

    function loadRoom ($room_id) {
        $this->checkLogin();
        $user_id = isset($this->request->data['user_id']) ? $this->request->data['user_id'] : (isset($this->request->query['user_id']) ? $this->request->query['user_id'] : $this->user_id);
        $data = $this->SchoolRoom->find('first', [
            'conditions' => [
                'user_id' => $user_id,
                'id' => $room_id
            ]
        ]);
        return $data;
    }

    function deleteRoom () {
        $this->checkLogin();
        $this->SchoolRoom->delete($this->request->data['room_id']);
    }

    function getCourses () {
        $this->checkLogin();
        $user_id = isset($this->request->data['user_id']) ? $this->request->data['user_id'] : (isset($this->request->query['user_id']) ? $this->request->query['user_id'] : $this->user_id);
        $conditions = [
            'SchoolCourse.user_id' => $user_id
        ];

        if (isset($this->request->data['searchText'])) {
            $conditions['or'] = [
                'SchoolCourse.name like "%' . $this->request->data['searchText'] . '%"',
                'DefaultTeacher.lastname like "%' . $this->request->data['searchText'] . '%"',
                'DefaultTeacher.firstname like "%' . $this->request->data['searchText'] . '%"',
                'DefaultRoom.name like "%' . $this->request->data['searchText'] . '%"',
                'SchoolCourse.description like "%' . $this->request->data['searchText'] . '%"'
            ];
        }

        $result['total'] = $this->SchoolCourse->find('count', [
            'conditions' => $conditions
        ]);

        $this->SchoolCourse->bindModel([
            'hasMany' => [
                'SchoolPlan' => array(
                    'className' => 'SchoolPlan',
                    'foreignKey' => 'course_id'
                )
            ]
        ]);
        $data = $this->SchoolCourse->find('all', [
            'conditions' => $conditions,
            'order' => [
                'SchoolCourse.name'
            ],
            'limit' => $this->request->data['limit'],
            'page' => $this->request->data['page']
        ]);

        if ($data) {
            foreach ($data as $k=>$d) {
                if ($d['SchoolPlan']) {
                    $count = 0;
                    foreach ($d['SchoolPlan'] as $p) {
                        if ($p['period'] === 'two-weeks') {
                            $count += 0.5;
                        } else {
                            $count++;
                        }
                    }
                    $data[$k]['SchoolCourse']['count_every_week'] = $count;
                }
            }

            $result['data'] = $data;
        }

        return $result;
    }

    function saveCourse () {
        $this->checkLogin();
        $user_id = isset($this->request->data['user_id']) ? $this->request->data['user_id'] : (isset($this->request->query['user_id']) ? $this->request->query['user_id'] : $this->user_id);
        $data = $this->request->data;
        $saveData = [];
        if ($data) {
            $saveData = $data;
            if ($data['id'] == 0) {
                unset($saveData['id']);
            }
            if (!isset($saveData['id'])) {
                $saveData['user_id'] = $user_id;
                $saveData['created_by'] = $this->user_id;
            }
            $saveData['modified_by'] = $this->user_id;
            foreach ($saveData as $k => $v) {
                if ($v == '') {
                    $saveData[$k] = null;
                }
            }
            $this->SchoolCourse->save($saveData);

            $newId = ($data['id'] > 0) ? $data['id'] : $this->SchoolCourse->getLastInsertID();

            $saveData['course_id'] = $newId;
        }
        return $saveData;
    }

    function loadCourse ($course_id) {
        $this->checkLogin();
        $user_id = isset($this->request->data['user_id']) ? $this->request->data['user_id'] : (isset($this->request->query['user_id']) ? $this->request->query['user_id'] : $this->user_id);
        $data = $this->SchoolCourse->find('first', [
            'conditions' => [
                'SchoolCourse.user_id' => $user_id,
                'SchoolCourse.id' => $course_id
            ]
        ]);
        return $data;
    }

    function deleteCourse () {
        $this->checkLogin();
        $this->SchoolCourse->delete($this->request->data['course_id']);
    }

    function getCoursetimes () {
        $this->checkLogin();
        $data = $this->SchoolCoursetime->find('all', [
            'conditions' => [
                'class_id' => $this->request->data['class_id'],
                'semester_id' => $this->request->data['semester_id']
            ],
            'order' => [
                'SchoolCoursetime.start',
                'SchoolCoursetime.end'
            ]
        ]);
        return $data;
    }

    function saveCoursetime () {
        $this->checkLogin();
        $data = $this->request->data;
        if ($data) {
            $saveData = [];
            if ($data['id'] > 0) {
                $saveData['id'] = $data['id'];
            }

            $saveData['class_id'] = $data['class_id'];
            $saveData['semester_id'] = $data['semester_id'];

            $saveData['start'] = $data['start_hour'].':'.$data['start_minute'].':00';
            $saveData['end'] = $data['end_hour'].':'.$data['end_minute'].':00';
            $result['data'] = $saveData;
            $this->SchoolCoursetime->save($saveData);

            $newId = ($data['id'] > 0) ? $data['id'] : $this->SchoolCoursetime->getLastInsertID();

            $result['coursetime_id'] = $newId;
        }
    }

    function loadCoursetime ($coursetime_id) {
        $this->checkLogin();
        $data = $this->SchoolCoursetime->find('first', [
            'conditions' => [
                'class_id' => $this->request->data['class_id'],
                'semester_id' => $this->request->data['semester_id'],
                'id' => $coursetime_id
            ]
        ]);
        return $data;
    }

    function deleteCoursetime () {
        $this->checkLogin();
        $this->SchoolCoursetime->delete($this->request->data['coursetime_id']);
    }

    function getClasses () {
        $this->checkLogin();
        $user_id = isset($this->request->data['user_id']) ? $this->request->data['user_id'] : (isset($this->request->query['user_id']) ? $this->request->query['user_id'] : $this->user_id);
        $conditions = [
            'SchoolClass.user_id' => $user_id
        ];
        if (isset($this->request->data['searchText'])) {
            $conditions['or'] = [
                'SchoolClass.name like "%' . $this->request->data['searchText'] . '%"',
                'SchoolClass.description like "%' . $this->request->data['searchText'] . '%"'
            ];
        }
        $result['total'] = $this->SchoolClass->find('count', [
            'conditions' => $conditions
        ]);
        $result['data'] = $this->SchoolClass->find('all', [
            'conditions' => $conditions,
            'order' => [
                'SchoolClass.name'
            ]
        ]);
        return $result;
    }

    function getDefaultData () {
        $this->checkLogin();
        $data['SchoolClass'] = $this->__getDefaultClass();
        $data['SchoolSemester'] = $this->__getCurrentSemester();
        return $data;
    }

    private function __getDefaultClass () {
        $user_id = isset($this->request->data['user_id']) ? $this->request->data['user_id'] : (isset($this->request->query['user_id']) ? $this->request->query['user_id'] : $this->user_id);
        $data = $this->SchoolClass->find('first', [
            'conditions' => [
                'SchoolClass.user_id' => $user_id
            ],
            'order' => [
                'SchoolClass.is_default DESC',  // if there is a class with is_default = 1, than return this; else return the first class with is_default = 0
                'SchoolClass.name'
            ]
        ]);

        return ($data) ? $data['SchoolClass'] : [];
    }

    function setDefaultClass () {
        $this->checkLogin();
        $user_id = isset($this->request->data['user_id']) ? $this->request->data['user_id'] : (isset($this->request->query['user_id']) ? $this->request->query['user_id'] : $this->user_id);
        $class_id = $this->request->data['class_id'];
        $this->SchoolClass->save([
            'id' => $class_id,
            'is_default' => 1
        ]);
        $this->SchoolClass->updateAll(
            [
                'is_default' => 0
            ],
            [
                'user_id' => $user_id,
                'id != ' => $class_id
            ]
        );
    }

    function loadClass () {
        $this->checkLogin();
        $class_id = $this->request->data['class_id'];
        $data = $this->SchoolClass->findById($class_id);
        if ($data) {
            $data = $data['SchoolClass'];
        }
        return $data;
    }

    function saveClass () {
        $this->checkLogin();
        $user_id = isset($this->request->data['user_id']) ? $this->request->data['user_id'] : (isset($this->request->query['user_id']) ? $this->request->query['user_id'] : $this->user_id);
        $data = $this->request->data;
        $saveData = [];
        if ($data) {
            $saveData = $data;
            if ($data['id'] == 0) {
                unset($saveData['id']);
            }
            if (!isset($saveData['id'])) {
                $saveData['user_id'] = $user_id;
                $saveData['created_by'] = $this->user_id;
            }
            $saveData['modified_by'] = $this->user_id;
            foreach ($saveData as $k => $v) {
                if ($v == '') {
                    $saveData[$k] = null;
                }
            }
            $this->SchoolClass->save($saveData);

            $newId = ($data['id'] > 0) ? $data['id'] : $this->SchoolClass->getLastInsertID();

            $saveData['class_id'] = $newId;
        }
        return $saveData;
    }

    function deleteClass() {
        $this->checkLogin();
        $this->SchoolClass->delete($this->request->data['class_id']);
    }

    function getChildren () {
        $this->checkLogin();
        $class_id = $this->request->data['class_id'];
        $conditions = [
            'SchoolChild.class_id' => $class_id,
            'SchoolChild.deleted' => 0
        ];

        $joins = [
            [
                'table' => Inflector::tableize('WspSchoolChildrenTelephone'),
                'alias' => 'SchoolChildrenTelephone',
                'conditions' => array(
                    'SchoolChild.id = SchoolChildrenTelephone.child_id'
                ),
                'type' => 'left'
            ],
            [
                'table' => Inflector::tableize('WspSchoolChildrenMobilephone'),
                'alias' => 'SchoolChildrenMobilephone',
                'conditions' => array(
                    'SchoolChild.id = SchoolChildrenMobilephone.child_id'
                ),
                'type' => 'left'
            ],
            [
                'table' => Inflector::tableize('WspSchoolChildrenAddress'),
                'alias' => 'SchoolChildrenAddress',
                'conditions' => array(
                    'SchoolChild.id = SchoolChildrenAddress.child_id'
                ),
                'type' => 'left'
            ]
        ];

        $group = 'SchoolChild.id';

        if (isset($this->request->data['searchText'])) {
            $conditions['or'] = [
                'SchoolChild.lastname like "%' . $this->request->data['searchText'] . '%"',
                'SchoolChild.firstname like "%' . $this->request->data['searchText'] . '%"',
//                'GROUP_CONCAT(telephones.number) like "%' . $this->request->data['searchText'] . '%"',
//                'GROUP_CONCAT(mobilephones.number) like "%' . $this->request->data['searchText'] . '%"',
//                'GROUP_CONCAT(addresses.address) like "%' . $this->request->data['searchText'] . '%"'
            ];

//            $group .= ' having GROUP_CONCAT(SchoolChildrenAddress.address) like "%' . $this->request->data['searchText'] . '%"';
        }

        $result['total'] = $this->SchoolChild->find('count', [
            'conditions' => $conditions,
            'joins' => $joins,
            'group' => $group
        ]);
        $data = $this->SchoolChild->find('all', [
            'conditions' => $conditions,
            'order' => [
                'SchoolChild.lastname',
                'SchoolChild.firstname'
            ],
            'joins' => $joins,
            'group' => $group,
            'limit' => $this->request->data['limit'],
            'page' => $this->request->data['page']
        ]);

        return $data;

        foreach ($data as $d) {
            $d['SchoolChild']['telephones'] = $d['telephones'];
            unset($d['telephones']);
            $d['SchoolChild']['mobilephones'] = $d['mobilephones'];
            unset($d['mobilephones']);
            $d['SchoolChild']['addresses'] = $d['addresses'];
            unset($d['addresses']);

            $result['data'][] = $d;
        }
        return $result;
    }

    function loadChild ($child_id) {
        $this->checkLogin();
        $data = $this->SchoolChild->findById($child_id);
        return $data;
    }

    function saveChild () {
        $this->checkLogin();
        $data = $this->request->data;
        $saveData = [];
        if ($data) {
            $saveData = $data;
            if ($data['id'] == 0) {
                unset($saveData['id']);
            }
            if (!isset($saveData['id'])) {
                $saveData['created_by'] = $this->user_id;
            }
            $saveData['modified_by'] = $this->user_id;
            foreach ($saveData as $k => $v) {
                if ($v == '') {
                    $saveData[$k] = null;
                }
            }
            $this->SchoolChild->save($saveData);

            $newId = ($data['id'] > 0) ? $data['id'] : $this->SchoolChild->getLastInsertID();


            // save telephone
            $this->SchoolChildrenTelephone->deleteAll([
                'child_id' => $newId
            ]);
            for ($i=0; $i<count($data['telephone_content']); $i++) {
                if ($data['telephone_content'][$i]) {
                    $addData = [
                        'child_id' => $newId,
                        'number' => $data['telephone_content'][$i]
                    ];
                    if ($data['telephone_type'][$i]) {
                        $addData['type'] = $data['telephone_type'][$i];
                    }
                    $this->SchoolChildrenTelephone->create();
                    $this->SchoolChildrenTelephone->save($addData);
                }
            }

            // save mobile
            $this->SchoolChildrenMobilephone->deleteAll([
                'child_id' => $newId
            ]);
            for ($i=0; $i<count($data['mobile_content']); $i++) {
                if ($data['mobile_content'][$i]) {
                    $addData = [
                        'child_id' => $newId,
                        'number' => $data['mobile_content'][$i]
                    ];
                    if ($data['mobile_type'][$i]) {
                        $addData['type'] = $data['mobile_type'][$i];
                    }
                    $this->SchoolChildrenMobilephone->create();
                    $this->SchoolChildrenMobilephone->save($addData);
                }
            }
            // save address
            $this->SchoolChildrenAddress->deleteAll([
                'child_id' => $newId
            ]);
            for ($i=0; $i<count($data['address_content']); $i++) {
                if ($data['address_content'][$i]) {
                    $addData = [
                        'child_id' => $newId,
                        'address' => $data['address_content'][$i]
                    ];
                    if ($data['address_type'][$i]) {
                        $addData['type'] = $data['address_type'][$i];
                    }
                    $this->SchoolChildrenAddress->create();
                    $this->SchoolChildrenAddress->save($addData);
                }
            }

            $saveData['child_id'] = $newId;
        }
        return $saveData;
    }

    function deleteChild () {
        $this->checkLogin();
        $this->SchoolChild->delete($this->request->data['child_id']);
    }

    function getSemesters () {
        $this->checkLogin();
        $data = $this->SchoolSemester->find('all', [
            'order' => [
                'start'
            ]
        ]);
        return $data;
    }
}