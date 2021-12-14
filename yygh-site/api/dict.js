import request from '@/utils/request'

const api_name=`/admin/cmn/dict`

export default{
    findChildData(id){
        return request({
            url:`${api_name}/findChildData/${id}`,
            method: 'get'
        })
    },
    findDictByDictCode(dictCode){
        return request({
            url:`${api_name}/findByDictCode/${dictCode}`,
            method: 'get'
        })
    }

}