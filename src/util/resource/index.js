import request from '@/util/request'


class Resource {
    constructor(base){
        this.base = base
    }
    list(){
        return request({
            method: `GET`,
            url: `/${this.base}`       
        })
    }
    show(id){
        return request({
            url: `/${this.base}/${id}`,
            method: 'GET',
        });
    }
    store(resource){
        return request({
            method: 'POST',
            url: `/${this.base}`,
            data: resource
        })
    }
    update(id,resource){
        return request({
            method: 'PATCH',
            url: `/${this.base}/${id}`,
            data: resource
        })
    }
    destroy(id){
        return request({
            method: 'DELETE',
            url: `/${this.base}/${id}`,
        })
    }
}

export { Resource as default }