<?php

namespace app\api\controller;

use app\common\controller\Api;

/**
 * 首页接口
 */
class Index extends Api
{
    // 不需要登录的方法列表
    protected $noNeedLogin = ['getAd'];
    protected $noNeedRight = ['*'];

    /**
     * 首页
     *
     */
    public function index()
    {
        $args = $this->request->post();

        $specUser = $this->auth->getUser();
        $specUserInfo = $this->auth->getUserinfo();

        $this->success("当前登录的用户id是" . $specUser['id']);
        if ($specUser['money'] > 0) {
            $remain = $specUser['money'] - $args['balance'];
            if ($remain > 0) {
                $specUser->save(['money' => $remain]);
            } else {
                $this->error("余额不足");
            }
        }

        // 返回失败的状态
        // 返回成功的状态
        $this->success('金额已扣除！');
    }

    public function getAd() {

        $mads = new \app\admin\model\Advertises();
        $ads = $mads->where(['status' => 'normal'])->select();

        $this->success("获取广告成功",$ads);
    }

    



}
