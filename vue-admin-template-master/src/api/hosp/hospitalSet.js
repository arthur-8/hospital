import request from '@/utils/request'

export default{
  getHospitalSetList(current, limit, searchObject) {
    return request({
      url: `/admin/hosp/hospitalSet/findPageHospSet/${current}/${limit}`,
      method: 'post',
      data: searchObject
    })
  },
  deleteHospitalSet(id){
    return request({
      url: `/admin/hosp/hospitalSet/${id}`,
      method: 'delete'
    })
  },
  deleteHospitalSets(idList){
    return request({
      url: `/admin/hosp/hospitalSet/removeHospitals`,
      method: 'delete',
      data: idList
    })
  },
  lockHospitalStatus(id,status){
    return request({
      url: `/admin/hosp/hospitalSet/lockHospitalSet/${id}/${status}`,
      method: 'put',
    })
  },
  saveHospitalSet(hospitalSet){
    return request({
      url: `/admin/hosp/hospitalSet/saveHospitalSet`,
      method: 'post',
      data: hospitalSet
    })
  },
  getHospitalSet(id){
    return request({
      url: `/admin/hosp/hospitalSet/getHospitalSet/${id}`,
      method: 'get'
    })
  },
  updateHospitalSet(hospitalSet){
    return request({
      url: `/admin/hosp/hospitalSet/updateHospitalSet`,
      method: 'put',
      data: hospitalSet
    })
  }
}
