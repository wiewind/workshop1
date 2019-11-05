<?php
/**
 * Created by PhpStorm.
 * User: benying.zou
 * Date: 12.04.2018
 * Time: 13:41
 */
class CurrenciesController extends AppController {
    public $uses = array(
        'Currency',
        'CurrencyRate'
    );

    public $apikey = "f43f0b8836bd233aa9a5693e97107cf4";

    public function update () {
        $cdata = $this->CurrencyRate->find('first', [
            'order' => 'time desc'
        ]);

        $now = time();
        $lasttime = 0;
        if ($cdata) {
            $lasttime = strtotime($cdata['CurrencyRate']['time']);

        }
        // 120分钟内不更新
        if (($now - $lasttime) < (60*30)) {
            return;
        }

        $terms = $this->__getChangeTerms();
        if (!$terms) {
            ErrorCode::throwException(__("No Curriecies!"), ErrorCode::ErrorCodeServerInternal);
        }

        $json = $this->__getRates($terms);
        if (!$json) {
            ErrorCode::throwException(__("Don't Connect with forex!"), ErrorCode::ErrorCodeServerInternal);
        }

        $data = json_decode($json);
        $from = 'EUR';
        if (isset($data->rates)) {
            foreach ($data->rates as $from => $ratefrom) {
                foreach ($data->rates as $to => $rateto) {
                    if ($from != $to) {
                        $this->CurrencyRate->create();
                        $this->CurrencyRate->save([
                            'from' => $from,
                            'to' => $to,
                            'rate' => $rateto / $ratefrom,
                            'source' => 'fixer'
                        ]);
                    }
                }
            }
        }

        return $data;
    }

    private function __getChangeTerms () {
        $cdata = $this->getAllCurrencies();
        return Set::Extract('/Currency/code', $cdata);


//        $terms = [];
//        if ($cdata) {
//            for ($i=0; $i<count($cdata) - 1; $i++) {
//                for ($j=$i+1; $j<count($cdata); $j++) {
//                    $c1 = $cdata[$i]['Currency']['code'];
//                    $c2 = $cdata[$j]['Currency']['code'];
//                    $terms[] = $c1.$c2;
//                    $terms[] = $c2.$c1;
//                }
//            }
//        }
//        return $terms;
    }

    private function __getRates ($changeTerms) {
        $url = "http://data.fixer.io/api/latest?access_key=" . $this->apikey . '&base=EUR&symbols=' . implode(',', $changeTerms);
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HEADER, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false); //这个是重点,规避ssl的证书检查。
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false); // 跳过host验证
        $json = curl_exec($curl);
        curl_close($curl);
        return $json;
    }

    public function getRate () {
        // 没有task设置，只能在这里更新数据库。这不是个好办法，但也没其他更好的办法了。
        $this->update();

        $from = $this->request->data['from'];
        $to = $this->request->data['to'];
        $menge = $this->request->data['menge'];

        $data = $this->CurrencyRate->find('first', [
            'conditions' => [
                'from' => $from,
                'to' => $to
            ],
            'order' => 'time desc'
        ]);
        if (!$data) {
            $data = $this->CurrencyRate->find('first', [
                'conditions' => [
                    'from' => $to,
                    'to' => $from
                ],
                'order' => 'time desc'
            ]);
            if ($data) {
                $data['CurrencyRate']['rate'] = 1 / doubleval($data['CurrencyRate']['rate']);
            }
        }
        if (!$data) {
            ErrorCode::throwException(__("There is no exchange rate between the both currencies!"), ErrorCode::ErrorCodeBadRequest);
        }

        return round(doubleval($data['CurrencyRate']['rate']) * $menge, 4);
    }

    public function getAllCurrencies () {
        $data = $this->Currency->find('all', [
            'conditions' => [
                'active' => 1
            ]
        ]);
        if ($data) {
            for ($i=0; $i<count($data); $i++) {
                $data[$i]['Currency']['name'] = __($data[$i]['Currency']['name']);
            }
        }
        return $data;
    }

    public function getChartRates () {
        $from = $this->request->data['from'];
        $to = $this->request->data['to'];
        $during = $this->request->data['during'];

        $fieldDate = '';
        switch ($during) {
            case 'day':
                $fieldDate = 'DATE_FORMAT(time, "%Y-%m-%d")';
                break;
            case 'month':
                $fieldDate = 'DATE_FORMAT(time, "%Y-%m")';
                break;
            case 'year':
                $fieldDate = 'DATE_FORMAT(time, "%Y")';
                break;
        }

        $data = $this->CurrencyRate->find('all', [
            'fields' => [
                $fieldDate . ' as date',
                'sum(rate) / count(id) as rate'
            ],
            'conditions' => [
                'CurrencyRate.from' => $from,
                'CurrencyRate.to' => $to,

            ],
            'group' => [
                'date', 'CurrencyRate.from', 'CurrencyRate.to'
            ],
            'order' => 'date DESC',
            'limit' => 30
        ]);

        if ($data) {
            foreach ($data as $k => $d) {
                $d[0]['rate'] = round($d[0]['rate'], 4);
                $data[$k] = $d[0];
            }
        }

        return array_reverse($data);
    }
}