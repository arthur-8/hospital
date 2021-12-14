import request from '@/utils/request'

const api_name = `/api/order/orderInfo`

export default {
 submitOrder(scheduleId, patientId,workDate) {
  return request({
    url: `${api_name}/auth/submitOrder/${scheduleId}/${patientId}/${workDate}`,
    method: 'post'
  })
 },
 getOrders(orderId){
   return request({
     url:`${api_name}/auth/getOrders/${orderId}`,
     method:'get'
   })
 },
 getPageList(page,limit,searchObject){
  return request({
    url:`${api_name}/auth/${page}/${limit}`,
    method:"get",
    params:searchObject
  })
 },
 getStatusList(){
   return request({
     url:`${api_name}/auth/getStatusList`,
     method:"get"
   })
 }
}
