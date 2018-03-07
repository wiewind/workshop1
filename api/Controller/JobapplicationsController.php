<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class JobapplicationsController extends AppController {
    public $uses = array(
        'JobapplicationsJob',
        'JobapplicationsAttachment',
        'JobapplicationsJobsAttachment',
        'JobapplicationsTrack',
        'JobapplicationsStatustype',
        'JobapplicationsMailsetting'
    );

    function getJobList () {
        $message = '';
        $success = true;
        $data = array();
        $total = 0;
        try {
            $total = $this->JobapplicationsJob->find('count', array(
                'conditions' => array(
                    'JobapplicationsJob.user_id' => $this->user_id
                )
            ));

            $data = $this->JobapplicationsJob->find('all', array(
                'conditions' => array(
                    'JobapplicationsJob.user_id' => $this->user_id
                ),
                'limit' => $this->request->query['limit'],
                'page' => $this->request->query['page'],
                'order' => 'JobapplicationsJob.created desc'
            ));

            if ($data) {
                for ($i=0; $i<count($data); $i++) {
                    $states = $this->JobapplicationsTrack->find('first', array(
                        'conditions' => array(
                            'JobapplicationsTrack.job_id' => $data[$i]['JobapplicationsJob']['id']
                        ),
                        'order' => array('JobapplicationsTrack.date desc')
                    ));
                    if ($states) {
                        $data[$i]['JobapplicationsJob']['statustype_id'] = $states['JobapplicationsTrack']['statustype_id'];
                        $data[$i]['JobapplicationsJob']['status'] = GlbF::getJobStatus($states['JobapplicationsTrack']['statustype_id']);
                    }
                    $mailState = $this->JobapplicationsTrack->find('first', array(
                        'conditions' => array(
                            'JobapplicationsTrack.job_id' => $data[$i]['JobapplicationsJob']['id'],
                            'JobapplicationsTrack.statustype_id' => 2
                        )
                    ));
                    if ($mailState) {
                        $data[$i]['JobapplicationsJob']['email_applied'] = 1;
                    } else {
                        $data[$i]['JobapplicationsJob']['email_applied'] = 0;
                    }
                }
            }
        } catch (Exception $e) {
            $message = $e->getMessage();
            $success = false;
            $data = array();
            $total = 0;
        }

        $result = array(
            'total' => $total,
            'data' => $data,
            'success' => $success,
            'message' => $message,
        );
        $this->autoRender = false;
        return json_encode($result);
    }

    function getAttachments () {
        $message = '';
        $success = true;
        $data = array();
        $total = 0;
        try {
            $total = $this->JobapplicationsAttachment->find('count', array(
                'conditions' => array(
                    'user_id' => $this->user_id,
                    'deleted' => 0
                )
            ));

            $data = $this->JobapplicationsAttachment->find('all', array(
                'conditions' => array(
                    'user_id' => $this->user_id,
                    'deleted' => 0
                ),
                'limit' => $this->request->query['limit'],
                'page' => $this->request->query['page'],
                'order' => 'name'
            ));

            if ($total === 0) {
                throw new Exception(__('Nothing found'));
            }

        } catch (Exception $e) {
            $message = $e->getMessage();
            $success = false;
            $data = array();
            $total = 0;
        }

        $result = array(
            'total' => $total,
            'data' => $data,
            'success' => $success,
            'message' => $message,
        );
        $this->autoRender = false;
        return json_encode($result);
    }

    function saveAttachment () {
        $message = '';
        $success = true;
        $data = array();
        try {
            $data = $this->request->data;

            $attachment = array(
                'user_id' => $this->user_id,
                'name' => $data['name'],
                'modified_by' => $this->user_id,
                'default_send' => (isset($data['default_send']) && $data['default_send']) ? 1 : 0
            );

            if (strlen($_FILES['file']['name']) > 0) {
                $file = $_FILES['file'];
                $dir = Configure::read('jobattachment.root').'/'.$this->user_id;
                GlbF::mkDir($dir);

                if ($data['id'] > 0) {
                    $fdata = $this->JobapplicationsAttachment->findById($data['id']);
                    $oldfilename = $fdata['JobapplicationsAttachment']['file'];
                    unlink($dir.'/'.$oldfilename);
                }

                $tempname = $file['tmp_name'];

                // check duplicate
                $i = 1;
                $newfilename = $file['name'];
                while (is_file($dir.'/'.$newfilename)) {
                    $newfilename .= '_'.$i;
                    $i++;
                }

                $result['newfilename'] = $dir.'/'.$newfilename;

                //file upload
                if (!move_uploaded_file($tempname, $dir.'/'.$newfilename)) {
                    throw new Exception(sprintf(__('Error by upload [%s].'), $file['name']));
                }

                $attachment['file'] = $newfilename;
            }

            //save in DB
            if ($data['id'] == 0) {
                $this->JobapplicationsAttachment->create();
                $attachment['created_by'] = $this->user_id;
            } else {
                $attachment['id'] = $data['id'];
            }
            $this->JobapplicationsAttachment->save($attachment);

        } catch (Exception $e) {
            $message = $e->getMessage();
            $success = false;
            $data = array();
        }

        $result = array(
            'data' => $data,
            'success' => $success,
            'message' => $message,
        );

        $result['file'] = $_FILES['file'];

        $this->autoRender = false;
        return json_encode($result);
    }

    function deleteAttachment () {
        $message = '';
        $success = true;
        try {
            $data = $this->request->data;
            $file = Configure::read('jobattachment.root').'/'.$data['user_id'].'/'.$data['file'];
            unlink($file);
            $this->JobapplicationsAttachment->save(array(
                'id' => $data['id'],
                'file' => '',
                'deleted' => 1
            ));
        } catch (Exception $e) {
            $message = $e->getMessage();
            $success = false;
        }

        $result = array(
            'success' => $success,
            'message' => $message
        );
        $this->autoRender = false;
        return json_encode($result);
    }

    function getJobAttachments ($job_id) {
        $message = '';
        $success = true;
        $data = array();
        $total = 0;
        try {
            $this->JobapplicationsJobsAttachment->bindModel(array(
                'belongsTo' => array(
                    'JobapplicationsAttachment' => array(
                        'className' => 'JobapplicationsAttachment',
                        'foreignKey' => 'attachment_id'
                    )
                )
            ));

            $data = $this->JobapplicationsJobsAttachment->find('all', array(
                'conditions' => array(
                    'job_id' => $job_id
                ),
                'order' => 'JobapplicationsAttachment.name'
            ));

            $total = count($data);

            if ($total === 0) {
                throw new Exception(__('Nothing found'));
            }

        } catch (Exception $e) {
            $message = $e->getMessage();
            $success = false;
            $data = array();
            $total = 0;
        }

        $result = array(
            'total' => $total,
            'data' => $data,
            'success' => $success,
            'message' => $message,
        );
        $this->autoRender = false;
        return json_encode($result);
    }

    function getJobStatus ($job_id) {
        $message = '';
        $success = true;
        $data = array();
        $total = 0;
        try {
            $total = $this->JobapplicationsTrack->find('count', array(
                'conditions' => array(
                    'job_id' => $job_id
                )
            ));

            if ($total === 0) {
                throw new Exception(__('Nothing found'));
            }

            $data = $this->JobapplicationsTrack->find('all', array(
                'conditions' => array(
                    'job_id' => $job_id
                ),
                'order' => array('JobapplicationsTrack.date desc', 'JobapplicationsTrack.statustype_id desc')
            ));

            if ($data) {
                for ($i=0; $i<count($data); $i++) {
                    $data[$i]['JobapplicationsTrack']['status_name'] = GlbF::getJobStatus($data[$i]['JobapplicationsTrack']['statustype_id']);
                }
            }

        } catch (Exception $e) {
            $message = $e->getMessage();
            $success = false;
            $data = array();
            $total = 0;
        }

        $result = array(
            'total' => $total,
            'data' => $data,
            'success' => $success,
            'message' => $message,
        );
        $this->autoRender = false;
        return json_encode($result);
    }

    function deleteJobStatus ($track_id) {
        $message = '';
        $success = true;
        try {
            $this->JobapplicationsTrack->delete($track_id);
        } catch (Exception $e) {
            $message = $e->getMessage();
            $success = false;
        }

        $result = array(
            'success' => $success,
            'message' => $message,
        );
        $this->autoRender = false;
        return json_encode($result);
    }

    function  saveJobStatus () {
        $message = '';
        $success = true;
        try {
            if ($this->request->is('post')) {
                $data = $this->request->data;

                if (isset($data['id'])) {
                    if ($data['id'] == 0) unset($data['id']);
                }

                $data['date'] = date('Y-m-d H:i:s');

                $this->JobapplicationsTrack->save($data);
            }
        } catch (Exception $e) {
            $message = $e->getMessage();
            $success = false;
        }

        $result = array(
            'success' => $success,
            'message' => $message
        );
        $this->autoRender = false;
        return json_encode($result);
    }

    function getStatustypes () {
        $message = '';
        $success = true;
        $data = array();
        $total = 0;
        try {
            $data = $this->JobapplicationsStatustype->find('all', array(
                'conditions' => array(
                    'id > ' => 1
                ),
                'order' => 'JobapplicationsStatustype.sortorder'
            ));

            if ($data) {
                $total = count($data);
                for ($i=0; $i<$total; $i++) {
                    $data[$i]['JobapplicationsStatustype']['name'] = GlbF::getJobStatus($data[$i]['JobapplicationsStatustype']['id']);
                }
            }

        } catch (Exception $e) {
            $message = $e->getMessage();
            $success = false;
            $data = array();
            $total = 0;
        }

        $result = array(
            'total' => $total,
            'data' => $data,
            'success' => $success,
            'message' => $message,
        );
        $this->autoRender = false;
        return json_encode($result);
    }

    function saveJob () {
        $message = '';
        $success = true;
        $data = array();
        $mailsend = true;
        try {
            // Job Info

            $data = $this->request->data;
            $data['job']['user_id'] = $this->user_id;

            $date = date('Y-m-d H:i:s');

            $data['job']['created_by'] = $this->user_id;
            $data['job']['modified_by'] = $this->user_id;

            $isNew = false;
            if ($data['job']['id'] == 0) {
                $this->JobapplicationsJob->create();
                $isNew = true;
            }
            $this->JobapplicationsJob->save($data['job']);
            if ($isNew) {
                $data['job']['id'] = $this->JobapplicationsJob->getLastInsertID();

                // Status
                $this->JobapplicationsTrack->create();
                $this->JobapplicationsTrack->save(array(
                    'job_id' => $data['job']['id'],
                    'statustype_id' => 1,
                    'date' => $date
                ));
            }

            // Attachments
            if ($isNew && $data['attc']) {
                foreach ($data['attc'] as $att) {
                    $this->JobapplicationsJobsAttachment->create();
                    $this->JobapplicationsJobsAttachment->save(array(
                        'job_id' => $data['job']['id'],
                        'attachment_id' => $att
                    ));
                }
            }

            // send email
            if ($isNew && $data['job']['email']) {
                list($mailsend, $message) = $this->_sendmail($data['job']);
            }
        } catch (Exception $e) {
            $message = $e->getMessage();
            $success = false;
            $mailsend = false;
            $data = array();
        }

        $result = array(
            'data' => $data,
            'success' => $success,
            'mailsend' => $mailsend,
            'message' => $message
        );
        $this->autoRender = false;
        return json_encode($result);
    }

    protected function _sendmail ($jobinfo) {
        $mailsetting = $this->JobapplicationsMailsetting->find('first', array(
            'conditions' => array(
                'user_id' => $this->user_id
            )
        ));

        if ($mailsetting) {
            $this->JobapplicationsJobsAttachment->bindModel(
                array(
                    'belongsTo' => array(
                        'JobapplicationsAttachment' => array(
                            'className' => 'JobapplicationsAttachment',
                            'foreignKey' => 'attachment_id'
                        )
                    )
                )
            );
            $jobAttachments = $this->JobapplicationsJobsAttachment->find('all', array(
                'conditions' => array(
                    'job_id' => $jobinfo['id']
                ),
                'order' => 'JobapplicationsAttachment.name'
            ));

            $Email = new CakeEmail();
            $Email->from($mailsetting['JobapplicationsMailsetting']['email']);
            $Email->to($jobinfo['email']);
            $Email->subject('Bewerbung: ' . $jobinfo['jobname']);
            $Email->emailFormat('html');

            if ($jobAttachments) {
                $attcs = array();
                foreach ($jobAttachments as $key => $attc) {
                    $file = $this->JobapplicationsAttachment->getFilePath($attc);
                    $attcs[$attc['JobapplicationsAttachment']['file']] = array(
                        'file' => $file,
                        'mimetype' => mime_content_type($file),
                        'contentId' => $key+1
                    );
                }
                $Email->attachments($attcs);
            }

            $Email->send($mailsetting['JobapplicationsMailsetting']['message']);

            $this->JobapplicationsTrack->create();
            $this->JobapplicationsTrack->save(array(
                'job_id' => $jobinfo['id'],
                'statustype_id' => 2,
                'date' => date('Y-m-d H:i:s')
            ));

            $Email->reset();
            $Email->from(Configure::read('email.admin'));
            $Email->to(array($mailsetting['JobapplicationsMailsetting']['email']));
            $Email->subject('Du hast eine Bewerbung ausgeschickt: ' . $jobinfo['jobname']);
            $Email->emailFormat('html');
            $message =  __('Job').': <b>'.$jobinfo['jobname'].'</b><br />'.
                __('Company').': <b>'.$jobinfo['company'].'</b><br />'.
                __('Email').': <b>'.$jobinfo['email'].'</b><br />'.
                __('Date').': <b>'.date(GlbF::getDateFormat().' H:i').'</b><br />'.
                __('ID').': <b>'.$jobinfo['id'].'</b><br /><br />';
            if ($jobAttachments) {
                $attcs = array();
                foreach ($jobAttachments as $key => $attc) {
                    $attcs[] = $attc['JobapplicationsAttachment']['name'];
                }
                $message .= __('Attachment').': '.implode(', ', $attcs);
            }
            $Email->send($message);
        }
    }

    function sendMail ($job_id) {

        $message = '';
        $success = true;
        $data = array();
        try {
            // Job Info

            $data = $this->JobapplicationsJob->findById($job_id);

            // send email
            if ($data['JobapplicationsJob']['email']) {
                $this->_sendmail($data['JobapplicationsJob']);
            }
        } catch (Exception $e) {
            $message = $e->getMessage();
            $success = false;
            $data = array();
        }

        $result = array(
            'data' => $data,
            'success' => $success,
            'message' => $message
        );
        $this->autoRender = false;
        return json_encode($result);
    }

    function deleteJob ($job_id) {
        $message = '';
        $success = true;
        try {
            $this->JobapplicationsTrack->deleteAll(array('job_id' => $job_id));
            $this->JobapplicationsJobsAttachment->deleteAll(array('job_id' => $job_id));
            $this->JobapplicationsJob->delete($job_id);
        } catch (Exception $e) {
            $message = $e->getMessage();
            $success = false;
        }

        $result = array(
            'success' => $success,
            'message' => $message,
        );
        $this->autoRender = false;
        return json_encode($result);
    }

    function getMailsetting () {
        $message = '';
        $success = true;
        $data = array();
        try {
            $data = $this->JobapplicationsMailsetting->find('first', array(
                'conditions' => array(
                    'user_id' => $this->user_id
                )
            ));
        } catch (Exception $e) {
            $message = $e->getMessage();
            $success = false;
            $data = array();
        }

        $result = array(
            'data' => $data,
            'success' => $success,
            'message' => $message
        );
        $this->autoRender = false;
        return json_encode($result);
    }

    function saveMailsetting () {
        $message = '';
        $success = true;
        $data = $this->request->data;
        $new_data = array();
        try {
            if (!isset($data['id'])) {
                $this->JobapplicationsMailsetting->create();
                $new_data['created_by'] = $this->user_id;
            } else {
                $new_data['id'] = $data['id'];
            }
            $new_data['user_id'] = $this->user_id;
            $new_data['email'] = $data['email'];
            $new_data['message'] = $data['message'];
            $new_data['modified_by'] = $this->user_id;
            $this->JobapplicationsMailsetting->save($new_data);

            if (!isset($data['id'])) {
                $new_data['id'] = $this->JobapplicationsMailsetting->getLastInsertID();
            }

        } catch (Exception $e) {
            $message = $e->getMessage();
            $success = false;
            $new_data = array();
        }

        $result = array(
            'new_data' => $new_data,
            'success' => $success,
            'message' => $message
        );
        $this->autoRender = false;
        return json_encode($result);
    }
}