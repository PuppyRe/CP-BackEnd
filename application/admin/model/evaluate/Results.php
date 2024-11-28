<?php

namespace app\admin\model\evaluate;

use think\Model;


class Results extends Model
{

    

    

    // 表名
    protected $name = 'evaluate_results';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'integer';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = false;
    protected $deleteTime = false;

    // 追加属性
    protected $append = [

    ];
    

    







    public function teacher()
    {
        return $this->belongsTo('app\admin\model\Teacher', 'teacher_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }


    public function details()
    {
        return $this->belongsTo('Details', 'evaluate_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }
}