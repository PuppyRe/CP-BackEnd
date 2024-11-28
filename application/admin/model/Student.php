<?php

namespace app\admin\model;

use think\Model;


class Student extends Model
{

    

    

    // 表名
    protected $name = 'student';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = false;

    // 定义时间戳字段名
    protected $createTime = false;
    protected $updateTime = false;
    protected $deleteTime = false;

    // 追加属性
    protected $append = [
        'collegelist_text',
        'majorlist_text'
    ];
    

    
    public function getCollegelistList()
    {
        return ['北京大学' => __('北京大学'), '清华大学' => __('清华大学')];
    }

    public function getMajorlistList()
    {
        return ['生物' => __('生物'), '物理' => __('物理')];
    }


    public function getCollegelistTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['collegelist']) ? $data['collegelist'] : '');
        $list = $this->getCollegelistList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getMajorlistTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['majorlist']) ? $data['majorlist'] : '');
        $list = $this->getMajorlistList();
        return isset($list[$value]) ? $list[$value] : '';
    }




    public function user()
    {
        return $this->belongsTo('User', 'id', 'group_id', [], 'LEFT')->setEagerlyType(0);
    }
}
