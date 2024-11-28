<?php

namespace app\admin\model;

use think\Model;
use traits\model\SoftDelete;

class Majors extends Model
{

    use SoftDelete;

    

    // 表名
    protected $name = 'majors';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'integer';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = false;
    protected $deleteTime = 'deletetime';

    // 追加属性
    protected $append = [

    ];
    

    







    public function colleges()
    {
        return $this->belongsTo('Colleges', 'college_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }
}
