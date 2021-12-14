import request from '@/utils/request'

export default{

    getPersonPageList(current,limit,searchObject){
        return request({
            url: `/admin/person/${current}/${limit}`,
            method: 'post',
            data: searchObject
        })
    },
    deletePerson(id){
        return request({
            url: `/admin/person/remove/${id}`,
            method: 'delete'
        })
    },
    deletePersons(idList){
        return request({
            url: `/admin/person/delete/persons`,
            method:'delete',
            data: idList
        })
    },
    getPersonById(id){
        return request({
            url: `/admin/person/select/${id}`,
            method:'get'
        })
    },
    updatePerson(person){
        return request({
            url: `/admin/person/update`,
            method:'post',
            data:person
        })
    },
    addPerson(person){
        return request({
            url: `/admin/person/add`,
            method:'post',
            data:person
        })
    }

}