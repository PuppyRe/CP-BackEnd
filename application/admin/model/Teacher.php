<?php

namespace app\admin\model;

use think\Model;


class Teacher extends Model
{

    

    

    // 表名
    protected $name = 'teacher';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = false;

    // 定义时间戳字段名
    protected $createTime = false;
    protected $updateTime = false;
    protected $deleteTime = false;

    // 追加属性
    protected $append = [
        'gender_text',
        'levellist_text',
        'status_text'
    ];
    

    
    public function getGenderList()
    {
        return ['0' => __('Gender 0'), '1' => __('Gender 1')];
    }

    public function getLevellistList()
    {
        return ['助教' => __('助教'), '讲师' => __('讲师'), '副教授' => __('副教授'), '教授' => __('教授')];
    }

    public function getStatusList()
    {
        return ['normal' => __('Status normal'), 'hidden' => __('Status hidden')];
    }


    public function getGenderTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['gender']) ? $data['gender'] : '');
        $list = $this->getGenderList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getLevellistTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['levellist']) ? $data['levellist'] : '');
        $list = $this->getLevellistList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getStatusTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['status']) ? $data['status'] : '');
        $list = $this->getStatusList();
        return isset($list[$value]) ? $list[$value] : '';
    }




    public function admin()
    {
        return $this->belongsTo('Admin', 'admin_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }


    public function majors()
    {
        return $this->belongsTo('Majors', 'major_ids', 'id', [], 'LEFT')->setEagerlyType(0);
    }
}
