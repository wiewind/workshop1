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
        'SchoolChildrenEmail',
        'SchoolChildrenAddress'
    );

    function getCurrentSemester ($semester_id=0) {
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
            $semester = $this->getCurrentSemester();
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
        $teacher_id = $this->request->data['teacher_id'];
        $this->SchoolPlan->updateAll(
            [
                'SchoolPlan.teacher_id' => 0
            ],
            [
                'SchoolPlan.teacher_id' => $teacher_id
            ]
        );
        $this->SchoolCourse->updateAll(
            [
                'SchoolCourse.default_teacher_id' => 0
            ],
            [
                'SchoolCourse.default_teacher_id' => $teacher_id
            ]
        );
        $this->SchoolTeacher->delete($teacher_id);
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
        $room_id = $this->request->data['room_id'];
        $this->SchoolPlan->updateAll(
            [
                'SchoolPlan.room_id' => 0
            ],
            [
                'SchoolPlan.room_id' => $room_id
            ]
        );
        $this->SchoolCourse->updateAll(
            [
                'SchoolCourse.default_room_id' => 0
            ],
            [
                'SchoolCourse.default_room_id' => $room_id
            ]
        );
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
        $course_id = $this->request->data['course_id'];
        $this->SchoolPlan->deleteAll([
            'SchoolPlan.course_id' => $course_id
        ]);
        $this->SchoolCourse->delete($course_id);
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
        $coursetime_id = $this->request->data['coursetime_id'];
        $this->SchoolPlan->deleteAll([
            'SchoolPlan.coursetime_id' => $coursetime_id
        ]);
        $this->SchoolCoursetime->delete($coursetime_id);
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
        $data['SchoolSemester'] = $this->getCurrentSemester();
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
        $class_id = $this->request->data['class_id'];
        $data = $this->SchoolChild->find('all', [
            'fields' => 'SchoolChild.id',
            'conditions' => [
                'SchoolChild.class_id' => $class_id
            ]
        ]);
        $child_ids = Set::Extract('/SchoolChild/id', $data);

        $this->SchoolChildrenTelephone->deleteAll([
            'SchoolChildrenTelephone.child_id' => $child_ids
        ]);
        $this->SchoolChildrenEmail->deleteAll([
            'SchoolChildrenEmail.child_id' => $child_ids
        ]);
        $this->SchoolChildrenAddress->deleteAll([
            'SchoolChildrenAddress.child_id' => $child_ids
        ]);
        $this->SchoolChild->deleteAll([
            'SchoolChild.id' => $child_ids
        ]);
        $this->SchoolClass->delete($class_id);
    }

    function getChildren () {
        $this->checkLogin();
        $class_id = $this->request->data['class_id'];
        $conditions = [
            'SchoolChild.class_id' => $class_id,
            'SchoolChild.deleted' => 0
        ];

//        $this->SchoolChild->unbindModelAll(false);

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
                'table' => Inflector::tableize('WspSchoolChildrenEmail'),
                'alias' => 'SchoolChildrenEmail',
                'conditions' => array(
                    'SchoolChild.id = SchoolChildrenEmail.child_id'
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
                'SchoolChildrenTelephone.number like "%' . $this->request->data['searchText'] . '%"',
                'SchoolChildrenEmail.email like "%' . $this->request->data['searchText'] . '%"',
                'SchoolChildrenAddress.address like "%' . $this->request->data['searchText'] . '%"'
            ];
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

        $result['data'] = [];
        foreach ($data as $d) {
            $d['SchoolChild']['telephones'] = $d['telephones'];
            unset($d['telephones']);
            $d['SchoolChild']['emails'] = $d['emails'];
            unset($d['emails']);
            $d['SchoolChild']['addresses'] = $d['addresses'];
            unset($d['addresses']);

            $result['data'][] = $d;
        }
        return $result;
    }

    function loadChild () {
        $this->checkLogin();
        $child_id = $this->request->data['child_id'];
        $data = $this->SchoolChild->findById($child_id);

        if ($data) {
            $data['SchoolChild']['telephones'] = $data['telephones'];
            $data['SchoolChild']['emails'] = $data['emails'];
            $data['SchoolChild']['addresses'] = $data['addresses'];
            $data = $data['SchoolChild'];
        }
        return $data;
    }

    function saveChild () {
        $this->checkLogin();
        $data = $this->request->data;
        $saveData = [];
        if ($data) {
            $saveData = $data;
            unset($saveData['new_photo']);
            if ($data['id'] == 0) {
                unset($saveData['id']);
                $saveData['created_by'] = $this->user_id;
                $this->SchoolChild->create();
            }
            $saveData['modified_by'] = $this->user_id;

            foreach ($saveData as $k => $v) {
                if ($v == '') {
                    $saveData[$k] = null;
                }
            }
            $this->SchoolChild->save($saveData);

            $newId = ($data['id'] > 0) ? $data['id'] : $this->SchoolChild->getLastInsertID();

            //photo
            if ($data['new_photo']) {
                $tmpPath = $_SERVER['DOCUMENT_ROOT'] . Configure::read('system.tmp.path');
                $tempFile = $tmpPath . '/' . $data['new_photo'];
                if (is_file($tempFile)) {
                    $savePath = $_SERVER['DOCUMENT_ROOT'] . Configure::read('system.school.root') . '/' . $saveData['class_id'] . '/' . $saveData['id'];
                    GlbF::moveDir($savePath);
                    GlbF::mkDir($savePath);
                    do {
                        $sufix = GlbF::getFileSuffix($data['new_photo']);
                        $saveName = GlbF::getRandomStr(20) . '.' . $sufix;
                        $saveFile = $savePath . '/' . $saveName;
                    } while (is_file($saveFile));

                    if (!@rename($tempFile, $saveFile)) {
                        ErrorCode::throwException(sprintf(__('Error by upload [%s].'), $data['new_photo']), ErrorCode::ErrorCodeServerInternal);
                    }
                    $this->SchoolChild->save([
                        'id' => $newId,
                        'photo' => $saveName
                    ]);
                }
            }

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

            // save email
            $this->SchoolChildrenEmail->deleteAll([
                'child_id' => $newId
            ]);
            for ($i=0; $i<count($data['email_content']); $i++) {
                if ($data['email_content'][$i]) {
                    $addData = [
                        'child_id' => $newId,
                        'email' => $data['email_content'][$i]
                    ];
                    if ($data['email_type'][$i]) {
                        $addData['type'] = $data['email_type'][$i];
                    }
                    $this->SchoolChildrenEmail->create();
                    $this->SchoolChildrenEmail->save($addData);
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
        $childId = $this->request->data['child_id'];
        $childData = $this->SchoolChild->findById($childId);
        if ($childData) {
            $this->SchoolChildrenTelephone->deleteAll([
                'child_id' => $childId
            ]);
            $this->SchoolChildrenEmail->deleteAll([
                'child_id' => $childId
            ]);
            $this->SchoolChildrenAddress->deleteAll([
                'child_id' => $childId
            ]);
            $this->SchoolChild->delete($childId);

            $path = $_SERVER['DOCUMENT_ROOT'] . Configure::read('system.school.root') . '/' . $childData['SchoolChild']['class_id'] . '/' . $childId;
            GlbF::moveDir($path);
        }
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

    function loadSemester () {
        $this->checkLogin();
        $semester_id = $this->request->data['semester_id'];
        $data = $this->SchoolSemester->findById($semester_id);
        if ($data) {
            $data = $data['SchoolSemester'];
        }
        return $data;
    }

    function saveSemester () {
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
                $this->SchoolClass->create();
            }
            $saveData['modified_by'] = $this->user_id;
            foreach ($saveData as $k => $v) {
                if ($v == '') {
                    $saveData[$k] = null;
                }
            }
            $this->SchoolSemester->save($saveData);

            $newId = ($data['id'] > 0) ? $data['id'] : $this->SchoolSemester->getLastInsertID();

            $saveData['class_id'] = $newId;
        }
        return $saveData;
    }

    function deleteSemester() {
        $this->checkLogin();
        $semester_id = $this->request->data['semester_id'];

        $data = $this->SchoolCoursetime->find('all', [
            'fields' => 'SchoolCoursetime.id',
            'conditions' => [
                'SchoolCoursetime.semester_id' => $semester_id
            ]
        ]);
        $coursetime_ids = Set::Extract('/SchoolCoursetime/id', $data);

        $this->SchoolPlan->deleteAll([
            'SchoolPlan.coursetime_id' => $coursetime_ids
        ]);
        $this->SchoolSemester->delete($semester_id);
    }

    function showPhoto ($child_id, $w=0, $h=0) {
        $this->checkLogin();

        $this->layout = null;

        $photo = '';
        $data = $this->SchoolChild->find('first', [
            'conditions' => [
                'id' => $child_id
            ]
        ]);
        if ($data) {
            $photo = $_SERVER['DOCUMENT_ROOT'] . Configure::read('system.school.root') . '/' . $data['SchoolChild']['class_id'] . '/' . $data['SchoolChild']['id'] . '/' . $data['SchoolChild']['photo'];
        }

        $this->set('photo', $photo);
        $this->set('newW', intval($w));
        $this->set('newH', intval($h));
        $this->set('noPic', 'nophoto.png');
        $this->render('/Images/show_picture');
    }

    function showTmpPhoto ($tmpname, $w=0, $h=0) {
        $this->checkLogin();

        $this->layout = null;

        $this->set('tmpphoto', $tmpname);
        $this->set('newW', intval($w));
        $this->set('newH', intval($h));
        $this->set('noPic', 'nophoto.png');
        $this->render('/Images/show_picture');
    }
}