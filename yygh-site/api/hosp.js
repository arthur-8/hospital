import request from '@/utils/request'

const api_name=`/api/hosp/hospital`

export default{
    findHospPageList(page,limit,searthObj){
        return request({
            url:`${api_name}/findHospitalsByPage/${page}/${limit}`,
            method: 'get',
            params: searthObj
        })
    },
    findHospitalByHosname(hosname){
        return request({
            url:`${api_name}/findHospitalByHosname/${hosname}`,
            method: 'get'
        })
    },
    getHospitalDetail(hoscode){
        return request({
            url:`${api_name}/hospitalDetail/${hoscode}`,
            method:'get'
        })
    },
    getDepartments(hoscode){
        return request({
            url:`${api_name}/department/${hoscode}`,
            method:'get'
        })
    },
    getBookingScheduleRule(page,limit,hoscode,depcode){
        return request({
            url: `${api_name}/auth/getBookingScheduleRule/${page}/${limit}/${hoscode}/${depcode}`,
            method:'get'
        })
    },
    findScheduleList(hoscode,depcode,workDate){
        return request({
            url: `${api_name}/auth/findScheduleList/${hoscode}/${depcode}/${workDate}`,
            method:'get'
        })
    },
    getSchedule(scheduleId){
        return request({
            url: `${api_name}/getSchedule/${scheduleId}`,
            method:'get'
        })

    }
    
}