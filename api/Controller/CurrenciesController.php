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

    public $apikey = "YVDXhR7N4Q5zHTEqZwfnDXKx5DThNWG3";

    public function update () {
        $cdata = $this->CurrencyRate->find('first', [
            'order' => 'time desc'
        ]);

        $now = time();
        $lasttime = 0;
        if ($cdata) {
            $lasttime = strtotime($cdata['CurrencyRate']['time']);

        }
        // 30分钟内不更新
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
        if (is_array($data)) {
            foreach ($data as $d) {
                if (isset($d->symbol)) {
                    $from = substr($d->symbol, 0, 3);
                    $to = substr($d->symbol, 3);

                    $rate = [
                        'from' => $from,
                        'to' => $to,
                        'rate' => $d->price,
                        'source' => 'forex'
                    ];

                    $this->CurrencyRate->create();
                    $this->CurrencyRate->save($rate);
                }
            }
        }

        return $data;
    }

    private function __getChangeTerms () {
        $cdata = $this->getAllCurrencies();
        $terms = [];
        if ($cdata) {
            for ($i=0; $i<count($cdata) - 1; $i++) {
                for ($j=$i+1; $j<count($cdata); $j++) {
                    $c1 = $cdata[$i]['Currency']['code'];
                    $c2 = $cdata[$j]['Currency']['code'];
                    $terms[] = $c1.$c2;
                    $terms[] = $c2.$c1;
                }
            }
        }
        return $terms;
    }

    private function __getRates ($changeTerms) {
        $url = "https://forex.1forge.com/1.0.3/quotes?pairs=".implode(',', $changeTerms)."&api_key=" . $this->apikey;
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
        //

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
}