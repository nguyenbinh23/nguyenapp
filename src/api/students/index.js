import request from '@/util/request'
import Resource from '@/util/resource'



class Student extends Resource {
    constructor(){
        super('students')
    }

    findSubjectByCode(code){
        return request({
            method: `GET`,
            url: `${this.base}/subjects`,
            params: {
                code: code
            }
        })
    }
    addSubject(data){
        return request({
            method: `POST`,
            url: `${this.base}/subjects`,
            data: data
        })
    }
    addSemester(data){
        return request({
            method: `POST`,
            url: `${this.base}/semesters`,
            data: data
        })
    }

    listSemester(){
        return request({
            method: `GET`,
            url: `${this.base}/semesters`,
        })
    }

    deleteSubject(id){
        return request({
            method: `DELETE`,
            url: `${this.base}/subjects/${id}`
        })
    }
}

export { Student as default }