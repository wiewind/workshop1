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
        $this->autoRender = false;
        $result = array(
            'data' => [],
            'success' => true,
            'message' => '',
        );
        try {
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
                $result['data']['courseTimes'] = $coursetimes;
                $plans = $this->SchoolPlan->find('all', [
                    'conditions' => [
                        'SchoolPlan.coursetime_id' => $cursetime_ids
                    ]
                ]);
                if ($plans) {
                    foreach ($plans as $p) {
                        $result['data']['courses'][$p['SchoolPlan']['weekday']][$p['SchoolPlan']['coursetime_id']] = $p;
                    }
                } else {
                    $result['data']['courses'] = [];
                }
            }
        } catch (Exception $e) {
            $result['message'] = $e->getMessage();
            $result['success'] = false;
            $result['data'] = [];
        }
        return json_encode($result);
    }

    function loadPlan () {
        $this->autoRender = false;
        $result = array(
            'data' => [],
            'success' => true,
            'message' => '',
        );
        try {
            $weekday = $this->request->data['weekday'];
            $coursetime_id = $this->request->data['coursetime_id'];

            $data = $this->SchoolPlan->find('first', [
                'conditions' => [
                    'SchoolPlan.weekday' => $weekday,
                    'SchoolPlan.coursetime_id' => $coursetime_id
                ]
            ]);
            if ($data) {
                $result['data'] = $data;
            }
        } catch (Exception $e) {
            $result['message'] = $e->getMessage();
            $result['success'] = false;
            $result['data'] = [];
        }
        return json_encode($result);
    }

    function savePlan () {
        $this->autoRender = false;
        $result = array(
            'success' => true,
            'message' => '',
            'plan_id' => 0
        );
        try {
            $data = $this->request->data;
            $result['formvalues'] = $data;
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

                $result['plan_id'] = $newId;
            }
        } catch (Exception $e) {
            $result['message'] = $e->getMessage();
            $result['success'] = false;
        }
        return json_encode($result);
    }

    function deletePlan () {
        $this->autoRender = false;
        $result = array(
            'success' => true,
            'message' => ''
        );
        try {
            $data = $this->request->data;
            $this->SchoolPlan->unbindModelAll();
            $this->SchoolPlan->deleteAll([
                'weekday' => $data['weekday'],
                'coursetime_id' => $data['coursetime_id']
            ]);
        } catch (Exception $e) {
            $result['message'] = $e->getMessage();
            $result['success'] = false;
        }
        return json_encode($result);
    }

    function getTeachers () {
        $this->autoRender = false;
        $result = array(
            'data' => [],
            'total' => 0,
            'success' => true,
            'message' => ''
        );
        try {
            $user_id = isset($this->request->data['user_id']) ? $this->request->data['user_id'] : (isset($this->request->query['user_id']) ? $this->request->query['user_id'] : $this->user_id);
            $conditions = [
                'user_id' => $user_id
            ];

            if (isset($this->request->query['searchText'])) {
                $conditions['or'] = [
                    'SchoolTeacher.lastname like "%' . $this->request->query['searchText'] . '%"',
                    'SchoolTeacher.firstname like "%' . $this->request->query['searchText'] . '%"',
                    'SchoolTeacher.telephone like "%' . $this->request->query['searchText'] . '%"',
                    'SchoolTeacher.email like "%' . $this->request->query['searchText'] . '%"',
                    'SchoolTeacher.fax like "%' . $this->request->query['searchText'] . '%"',
                    'SchoolTeacher.address like "%' . $this->request->query['searchText'] . '%"',
                    'SchoolTeacher.description like "%' . $this->request->query['searchText'] . '%"'
                ];
            }

            $result['total'] = $this->SchoolTeacher->find('count', [
                'conditions' => $conditions
            ]);

            if ($result['total'] > 0) {
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
                    'limit' => $this->request->query['limit'],
                    'page' => $this->request->query['page']
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
            }
        } catch (Exception $e) {
            $result['message'] = $e->getMessage();
            $result['success'] = false;
            $result['data'] = [];
        }
        return json_encode($result);
    }

    function saveTeacher () {
        $this->autoRender = false;
        $result = array(
            'success' => true,
            'message' => '',
            'teacher_id' => 0
        );
        try {
            $user_id = isset($this->request->data['user_id']) ? $this->request->data['user_id'] : (isset($this->request->query['user_id']) ? $this->request->query['user_id'] : $this->user_id);
            $data = $this->request->data;
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

                $result['teacher_id'] = $newId;
            }
        } catch (Exception $e) {
            $result['message'] = $e->getMessage();
            $result['success'] = false;
        }
        return json_encode($result);
    }

    function loadTeacher ($teacher_id) {
        $this->autoRender = false;
        $result = array(
            'data' => [],
            'success' => true,
            'message' => '',
        );
        try {
            $user_id = isset($this->request->data['user_id']) ? $this->request->data['user_id'] : (isset($this->request->query['user_id']) ? $this->request->query['user_id'] : $this->user_id);
            $result['data'] = $this->SchoolTeacher->find('first', [
                'conditions' => [
                    'user_id' => $user_id,
                    'id' => $teacher_id
                ]
            ]);
        } catch (Exception $e) {
            $result['message'] = $e->getMessage();
            $result['success'] = false;
            $result['data'] = [];
        }
        return json_encode($result);
    }

    function deleteTeacher () {
        $this->autoRender = false;
        $result = array(
            'success' => true,
            'message' => '',
        );
        try {
            $this->SchoolTeacher->delete($this->request->data['teacher_id']);
        } catch (Exception $e) {
            $result['message'] = $e->getMessage();
            $result['success'] = false;
        }
        return json_encode($result);
    }

    function getRooms () {
        $this->autoRender = false;
        $result = array(
            'data' => [],
            'total' => 0,
            'success' => true,
            'message' => '',
        );
        try {
            $user_id = isset($this->request->data['user_id']) ? $this->request->data['user_id'] : (isset($this->request->query['user_id']) ? $this->request->query['user_id'] : $this->user_id);
            $conditions = [
                'user_id' => $user_id
            ];

            if (isset($this->request->query['searchText'])) {
                $conditions['or'] = [
                    'SchoolRoom.name like "%' . $this->request->query['searchText'] . '%"',
                    'SchoolRoom.telephone like "%' . $this->request->query['searchText'] . '%"',
                    'SchoolRoom.description like "%' . $this->request->query['searchText'] . '%"'
                ];
            }
            $result['total'] = $this->SchoolRoom->find('count', [
                'conditions' => $conditions
            ]);
            if ($result['total'] > 0) {
                $result['data'] = $this->SchoolRoom->find('all', [
                    'conditions' => $conditions,
                    'order' => [
                        'SchoolRoom.name'
                    ],
                    'limit' => $this->request->query['limit'],
                    'page' => $this->request->query['page']
                ]);
            }
        } catch (Exception $e) {
            $result['message'] = $e->getMessage();
            $result['success'] = false;
            $result['data'] = [];
            $result['total'] = 0;
        }
        return json_encode($result);
    }

    function saveRoom () {
        $this->autoRender = false;
        $result = array(
            'success' => true,
            'message' => '',
            'room_id' => 0
        );
        try {
            $user_id = isset($this->request->data['user_id']) ? $this->request->data['user_id'] : (isset($this->request->query['user_id']) ? $this->request->query['user_id'] : $this->user_id);
            $data = $this->request->data;
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

                $result['room_id'] = $newId;
            }
        } catch (Exception $e) {
            $result['message'] = $e->getMessage();
            $result['success'] = false;
        }
        return json_encode($result);
    }

    function loadRoom ($room_id) {
        $this->autoRender = false;
        $result = array(
            'data' => [],
            'success' => true,
            'message' => '',
        );
        try {
            $user_id = isset($this->request->data['user_id']) ? $this->request->data['user_id'] : (isset($this->request->query['user_id']) ? $this->request->query['user_id'] : $this->user_id);
            $result['data'] = $this->SchoolRoom->find('first', [
                'conditions' => [
                    'user_id' => $user_id,
                    'id' => $room_id
                ]
            ]);
        } catch (Exception $e) {
            $result['message'] = $e->getMessage();
            $result['success'] = false;
            $result['data'] = [];
        }
        return json_encode($result);
    }

    function deleteRoom () {
        $this->autoRender = false;
        $result = array(
            'success' => true,
            'message' => '',
        );
        try {
            $this->SchoolRoom->delete($this->request->data['room_id']);
        } catch (Exception $e) {
            $result['message'] = $e->getMessage();
            $result['success'] = false;
        }
        return json_encode($result);
    }

    function getCourses () {
        $this->autoRender = false;
        $result = array(
            'data' => [],
            'total' => 0,
            'success' => true,
            'message' => '',
        );
        try {
            $user_id = isset($this->request->data['user_id']) ? $this->request->data['user_id'] : (isset($this->request->query['user_id']) ? $this->request->query['user_id'] : $this->user_id);
            $conditions = [
                'SchoolCourse.user_id' => $user_id
            ];

            if (isset($this->request->query['searchText'])) {
                $conditions['or'] = [
                    'SchoolCourse.name like "%' . $this->request->query['searchText'] . '%"',
                    'DefaultTeacher.lastname like "%' . $this->request->query['searchText'] . '%"',
                    'DefaultTeacher.firstname like "%' . $this->request->query['searchText'] . '%"',
                    'DefaultRoom.name like "%' . $this->request->query['searchText'] . '%"',
                    'SchoolCourse.description like "%' . $this->request->query['searchText'] . '%"'
                ];
            }

            $result['total'] = $this->SchoolCourse->find('count', [
                'conditions' => $conditions
            ]);

            if ($result['total'] > 0) {
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
                    'limit' => $this->request->query['limit'],
                    'page' => $this->request->query['page']
                ]);

                if ($data) {
                    foreach ($data as $k=>$d) {
                        if ($d['SchoolPlan']) {
                            $count = 0;
                            foreach ($d['SchoolPlan'] as $p) {
                                if ($p['period'] === 'tow-weeks') {
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
            }
        } catch (Exception $e) {
            $result['message'] = $e->getMessage();
            $result['success'] = false;
            $result['data'] = [];
            $result['total'] = 0;
        }
        return json_encode($result);
    }

    function saveCourse () {
        $this->autoRender = false;
        $result = array(
            'success' => true,
            'message' => '',
            'course_id' => 0
        );
        try {
            $user_id = isset($this->request->data['user_id']) ? $this->request->data['user_id'] : (isset($this->request->query['user_id']) ? $this->request->query['user_id'] : $this->user_id);
            $data = $this->request->data;
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

                $result['course_id'] = $newId;
            }
        } catch (Exception $e) {
            $result['message'] = $e->getMessage();
            $result['success'] = false;
        }
        return json_encode($result);
    }

    function loadCourse ($course_id) {
        $this->autoRender = false;
        $result = array(
            'data' => [],
            'success' => true,
            'message' => '',
        );
        try {
            $user_id = isset($this->request->data['user_id']) ? $this->request->data['user_id'] : (isset($this->request->query['user_id']) ? $this->request->query['user_id'] : $this->user_id);
            $result['data'] = $this->SchoolCourse->find('first', [
                'conditions' => [
                    'SchoolCourse.user_id' => $user_id,
                    'SchoolCourse.id' => $course_id
                ]
            ]);
        } catch (Exception $e) {
            $result['message'] = $e->getMessage();
            $result['success'] = false;
            $result['data'] = [];
        }
        return json_encode($result);
    }

    function deleteCourse () {
        $this->autoRender = false;
        $result = array(
            'success' => true,
            'message' => '',
        );
        try {
            $this->SchoolCourse->delete($this->request->data['course_id']);
        } catch (Exception $e) {
            $result['message'] = $e->getMessage();
            $result['success'] = false;
        }
        return json_encode($result);
    }

    function getCoursetimes () {
        $this->autoRender = false;
        $result = array(
            'data' => [],
            'success' => true,
            'message' => '',
        );
        try {
            $result['data'] = $this->SchoolCoursetime->find('all', [
                'conditions' => [
                    'class_id' => $this->request->query['class_id'],
                    'semester_id' => $this->request->query['semester_id']
                ],
                'order' => [
                    'SchoolCoursetime.start',
                    'SchoolCoursetime.end'
                ]
            ]);
        } catch (Exception $e) {
            $result['message'] = $e->getMessage();
            $result['success'] = false;
            $result['data'] = [];
        }
        return json_encode($result);
    }

    function saveCoursetime () {
        $this->autoRender = false;
        $result = array(
            'success' => true,
            'message' => '',
            'coursetime_id' => 0
        );
        try {
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
        } catch (Exception $e) {
            $result['message'] = $e->getMessage();
            $result['success'] = false;
        }
        return json_encode($result);
    }

    function loadCoursetime ($coursetime_id) {
        $this->autoRender = false;
        $result = array(
            'data' => [],
            'success' => true,
            'message' => '',
        );
        try {
            $result['data'] = $this->SchoolCoursetime->find('first', [
                'conditions' => [
                    'class_id' => $this->request->data['class_id'],
                    'semester_id' => $this->request->data['semester_id'],
                    'id' => $coursetime_id
                ]
            ]);
        } catch (Exception $e) {
            $result['message'] = $e->getMessage();
            $result['success'] = false;
            $result['data'] = [];
        }
        return json_encode($result);
    }

    function deleteCoursetime () {
        $this->autoRender = false;
        $result = array(
            'success' => true,
            'message' => '',
        );
        try {
            $this->SchoolCoursetime->delete($this->request->data['coursetime_id']);
        } catch (Exception $e) {
            $result['message'] = $e->getMessage();
            $result['success'] = false;
        }
        return json_encode($result);
    }

    function getClasses () {
        $this->autoRender = false;
        $result = array(
            'data' => [],
            'total' => 0,
            'success' => true,
            'message' => '',
        );
        try {
            $user_id = isset($this->request->data['user_id']) ? $this->request->data['user_id'] : (isset($this->request->query['user_id']) ? $this->request->query['user_id'] : $this->user_id);
            $conditions = [
                'SchoolClass.user_id' => $user_id
            ];
            if (isset($this->request->query['searchText'])) {
                $conditions['or'] = [
                    'SchoolClass.name like "%' . $this->request->query['searchText'] . '%"',
                    'SchoolClass.description like "%' . $this->request->query['searchText'] . '%"'
                ];
            }
            $result['total'] = $this->SchoolClass->find('count', [
                'conditions' => $conditions
            ]);
            if ($result['total'] > 0) {
                $result['data'] = $this->SchoolClass->find('all', [
                    'conditions' => $conditions,
                    'order' => [
                        'SchoolClass.name'
                    ]
                ]);
            }
        } catch (Exception $e) {
            $result['message'] = $e->getMessage();
            $result['success'] = false;
            $result['data'] = [];
            $result['total'] = 0;
        }
        return json_encode($result);
    }

    function getDefaultData () {
        $this->autoRender = false;
        $result = array(
            'data' => [],
            'success' => true,
            'message' => '',
        );
        try {
            $result['data']['SchoolClass'] = $this->__getDefaultClass();
            $result['data']['SchoolSemester'] = $this->__getCurrentSemester();
        } catch (Exception $e) {
            $result['message'] = $e->getMessage();
            $result['success'] = false;
            $result['data'] = [];
        }
        return json_encode($result);
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
        $this->autoRender = false;
        $result = array(
            'success' => true,
            'message' => '',
        );
        try {
            $user_id = isset($this->request->data['user_id']) ? $this->request->data['user_id'] : (isset($this->request->query['user_id']) ? $this->request->query['user_id'] : $this->user_id);
            $class_id = $this->request->data['class_id'];
            $this->SchoolClass->save([
                'id' => $class_id,
                'is_default' => 1
            ]);
            $this->SchoolClass->updateAll([
                'is_default' => 0
            ], [
                'user_id' => $user_id,
                'id != ' => $class_id
            ]);
        } catch (Exception $e) {
            $result['message'] = $e->getMessage();
            $result['success'] = false;
        }
        return json_encode($result);
    }

    function loadClass ($class_id) {
        $this->autoRender = false;
        $result = array(
            'data' => [],
            'success' => true,
            'message' => '',
        );
        try {
            $result['data'] = $this->SchoolClass->findById($class_id);
        } catch (Exception $e) {
            $result['message'] = $e->getMessage();
            $result['success'] = false;
            $result['data'] = [];
        }
        return json_encode($result);
    }

    function saveClass () {
        $this->autoRender = false;
        $result = array(
            'success' => true,
            'message' => ''
        );
        try {
            $user_id = isset($this->request->data['user_id']) ? $this->request->data['user_id'] : (isset($this->request->query['user_id']) ? $this->request->query['user_id'] : $this->user_id);
            $data = $this->request->data;
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

                $result['class_id'] = $newId;
            }
        } catch (Exception $e) {
            $result['message'] = $e->getMessage();
            $result['success'] = false;
        }
        return json_encode($result);
    }

    function deleteClass() {
        $this->autoRender = false;
        $result = array(
            'success' => true,
            'message' => '',
        );
        try {
            $this->SchoolClass->delete($this->request->data['class_id']);
        } catch (Exception $e) {
            $result['message'] = $e->getMessage();
            $result['success'] = false;
        }
        return json_encode($result);
    }

    function getChildren () {
        $this->autoRender = false;
        $result = array(
            'data' => [],
            'total' => 0,
            'success' => true,
            'message' => '',
        );
        try {
            $class_id = $this->request->query['class_id'];
            $conditions = [
                'SchoolChild.class_id' => $class_id,
                'SchoolChild.deleted' => 0
            ];

            $result['total'] = $this->SchoolChild->find('count', [
                'conditions' => $conditions
            ]);
            if ($result['total'] > 0) {
                $data = $this->SchoolChild->find('all', [
                    'conditions' => $conditions,
                    'order' => [
                        'SchoolChild.lastname',
                        'SchoolChild.firstname'
                    ],
                    'limit' => $this->request->query['limit'],
                    'page' => $this->request->query['page']
                ]);

                foreach ($data as $d) {
                    $d['SchoolChild']['telephones'] = $d['telephones'];
                    unset($d['telephones']);
                    $d['SchoolChild']['mobilephones'] = $d['mobilephones'];
                    unset($d['mobilephones']);
                    $d['SchoolChild']['addresses'] = $d['addresses'];
                    unset($d['addresses']);

                    $result['data'][] = $d;
                }
            }
        } catch (Exception $e) {
            $result['message'] = $e->getMessage();
            $result['success'] = false;
            $result['data'] = [];
            $result['total'] = 0;
        }
        return json_encode($result);
    }

    function loadChild ($child_id) {
        $this->autoRender = false;
        $result = array(
            'success' => true,
            'message' => ''
        );
        try {
            $result['data'] = $this->SchoolChild->findById($child_id);
        } catch (Exception $e) {
            $result['message'] = $e->getMessage();
            $result['success'] = false;
        }
        return json_encode($result);
    }

    function saveChild () {
        $this->autoRender = false;
        $result = array(
            'success' => true,
            'message' => ''
        );
        try {
            $data = $this->request->data;
            if ($data) {
                $result['data'] = $data;

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

                $result['child_id'] = $newId;
            }
        } catch (Exception $e) {
            $result['message'] = $e->getMessage();
            $result['success'] = false;
        }
        return json_encode($result);
    }

    function deleteChild () {
        $this->autoRender = false;
        $result = array(
            'success' => true,
            'message' => '',
        );
        try {
            $this->SchoolChild->delete($this->request->data['child_id']);
        } catch (Exception $e) {
            $result['message'] = $e->getMessage();
            $result['success'] = false;
        }
        return json_encode($result);
    }

    function getSemesters () {
        $this->autoRender = false;
        $result = array(
            'data' => [],
            'total' => 0,
            'success' => true,
            'message' => '',
        );
        try {
            $result['data'] = $this->SchoolSemester->find('all', [
                'order' => [
                    'start'
                ]
            ]);
        } catch (Exception $e) {
            $result['message'] = $e->getMessage();
            $result['success'] = false;
        }
        return json_encode($result);
    }
}