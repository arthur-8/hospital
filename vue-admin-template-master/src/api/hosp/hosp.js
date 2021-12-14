import request from '@/utils/request'

export default{
    getHospList(page,limit,searchObject){
        return request({
            url: `/admin/hosp/hospital/list/findAll/${page}/${limit}`,
            method: 'get',
            params: searchObject
        })
    },
    findByDictCode(dictCode){
        return request({
            url: `/admin/cmn/dict/findByDictCode/${dictCode}`,
            method: 'get'
        })
    },
    findByParentId(id){
        return request({
            url: `/admin/cmn/dict/findChildData/${id}`,
            method: 'get'
        })
    },
    updateStatus(id,status){
        return request({
            url: `/admin/hosp/hospital/updateStatus/${id}/${status}`,
            method: 'get'
        })
    },
    fetchHospDetails(id){
        return request({
            url: `/admin/hosp/hospital/fetchHosp/${id}`,
            method: 'get'
        })
    },
    fetchHospScheduleByHosCode(hoscode){
        return request({
            url: `/admin/hosp/department/list/${hoscode}`,
            method: 'get'
        })
    },
    findScheduleDetail(page,limit,hoscode,depcode){
        return request({
            url: `/admin/hosp/schedule/getSchedule/${page}/${limit}/${hoscode}/${depcode}`,
            method: 'get'
        })
    },
    getDetailSchedule(hoscode,depcode,workDate){
        return request({
            url: `/admin/hosp/schedule/fetchSchedule/${hoscode}/${depcode}/${workDate}`,
            method: 'get'
        })
    }
}