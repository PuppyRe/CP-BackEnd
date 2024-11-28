<?php

namespace app\admin\controller;

use app\admin\model\Admin;
use app\admin\model\AuthGroupAccess;
use app\common\controller\Backend;
use think\Db;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\exception\DbException;
use think\exception\PDOException;
use think\exception\ValidateException;
use think\Validate;

/**
 * 
 *
 * @icon fa fa-circle-o
 */
class Teacher extends Backend
{

    /**
     * Teacher模型对象
     * @var \app\admin\model\Teacher
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\Teacher;
        $this->view->assign("genderList", $this->model->getGenderList());
        $this->view->assign("levellistList", $this->model->getLevellistList());
        $this->view->assign("statusList", $this->model->getStatusList());
    }



    /**
     * 默认生成的控制器所继承的父类中有index/add/edit/del/multi五个基础方法、destroy/restore/recyclebin三个回收站方法
     * 因此在当前控制器中可不用编写增删改查的代码,除非需要自己控制这部分逻辑
     * 需要将application/admin/library/traits/Backend.php中对应的方法复制到当前控制器,然后进行修改
     */


    /**
     * 查看
     */
    public function index()
    {
        //当前是否为关联查询
        $this->relationSearch = true;
        //设置过滤方法
        $this->request->filter(['strip_tags', 'trim']);
        if ($this->request->isAjax()) {
            //如果发送的来源是Selectpage，则转发到Selectpage
            if ($this->request->request('keyField')) {
                return $this->selectpage();
            }
            list($where, $sort, $order, $offset, $limit) = $this->buildparams();

            $list = $this->model
                    ->with(['admin','majors'])
                    ->where($where)
                    ->order($sort, $order)
                    ->paginate($limit);

            foreach ($list as $row) {
                
                
            }

            $result = array("total" => $list->total(), "rows" => $list->items());

            return json($result);
        }
        return $this->view->fetch();
    }
    /**
     * 添加
     *
     * @return string
     * @throws \think\Exception
     */
    public function add()
    {
        if (false === $this->request->isPost()) {
            return $this->view->fetch();
        }
        $params = $this->request->post('row/a');
        if (empty($params)) {
            $this->error(__('Parameter %s can not be empty', ''));
        }
        $params = $this->preExcludeFields($params);

        if ($this->dataLimit && $this->dataLimitFieldAutoFill) {
            $params[$this->dataLimitField] = $this->auth->id;
        }
        $result = false;

        $v = Validate::make([
            'mobile'    => 'require|length:11',
            'username'  => 'require|unique:admin',
            'password'  => 'require|length:6, 64',
            'name'      => 'require',
            'major_ids' => 'require'
        ],[
            'mobile.require'    => '草拟吗',
            'mobile.length'     => '你麻痹'
        ]);

        if (!$v->check($params)) $this->error($v->getError());

        Db::startTrans();
        try {
            //是否采用模型验证
//            if ($this->modelValidate) {
//                $name = str_replace("\\model\\", "\\validate\\", get_class($this->model));
//                $validate = is_bool($this->modelValidate) ? ($this->modelSceneValidate ? $name . '.add' : $name) : $this->modelValidate;
//                $this->model->validateFailException()->validate($validate);
//            }


            // 添加教师前，先加管理员（教师）
            $tmpNew = Admin::create([
                'username'  => $params['username'],
                'password'  => $params['password'],
                'avatar'    => '/assets/img/avatar.png',
//                'email'
                'mobile'    => $params['mobile'],
                'nickname'  => $params['name'],
                'status'    => 'normal'
            ]);

            AuthGroupAccess::create([
                'uid'    => $tmpNew['id'],
                'group_id' => '7'
            ]);

            $params['admin_id'] = $tmpNew['id'];

            $result = $this->model->allowField(true)->save($params);


            Db::commit();
        } catch (ValidateException|PDOException|Exception $e) {
            Db::rollback();
            $this->error($e->getMessage());
        }
        if ($result === false) {
            $this->error(__('No rows were inserted'));
        }
        $this->success();
    }

    /**
     * 删除
     *
     * @param $ids
     * @return void
     * @throws DbException
     * @throws DataNotFoundException
     * @throws ModelNotFoundException
     */
    public function del($ids = null)
    {
        if (false === $this->request->isPost()) {
            $this->error(__("Invalid parameters"));
        }
        $ids = $ids ?: $this->request->post("ids");
        if (empty($ids)) {
            $this->error(__('Parameter %s can not be empty', 'ids'));
        }
        $pk = $this->model->getPk();
        $adminIds = $this->getDataLimitAdminIds();
        if (is_array($adminIds)) {
            $this->model->where($this->dataLimitField, 'in', $adminIds);
        }
        $list = $this->model->where($pk, 'in', $ids)->select();

        $count = 0;
        Db::startTrans();
        try {
            foreach ($list as $item) {
                $count += $item->delete();
                Admin::where(['id' => $item['admin_id']])->delete();
                AuthGroupAccess::where(['uid' => $item['admin_id']])->delete();
            }
            Db::commit();
        } catch (PDOException|Exception $e) {
            Db::rollback();
            $this->error($e->getMessage());
        }
        if ($count) {
            $this->success();
        }
        $this->error(__('No rows were deleted'));
    }

    /**
     * 【联动查询】获取指定学校的专业列表
     * @return \think\response\Json
     */
    public function getMajor() {
        $params = $this->request->post('custom', '');
        if (!isset($params)) return json(array());
        $ret = \app\admin\model\Majors::where(['college_id' => $params])
            ->field('id,`name`')
            ->select();
        $result = array("list" => $ret, "total" => sizeof($ret));
        return json($result);
    }


}
