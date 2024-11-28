<?php

namespace app\api\controller;

use app\common\controller\Api;

/**
 * 广告接口
 */
class Advertises extends Api {

    // 不需要登录的方法列表
    protected $noNeedLogin = ['*'];
    protected $noNeedRight = ['*'];
    /**
     * 获取广告列表
     * @return void
     */
    public function getAdLists() {
        $ads = \app\admin\model\Advertises::where(['status' => 'normal'])
                ->order(['weigh' => 'DESC'])    // DESC 降序，ASC 升序
                ->select();
        $this->success("获取广告成功", $ads);
    }


}