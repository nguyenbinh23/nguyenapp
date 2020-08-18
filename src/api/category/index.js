import Resource from '@/util/resource'
import request from '../../util/request'

class CategoryResource extends Resource {
    constructor(){
        super('categories')
    }


    getArticlesByCateId(category,page = 1){
        return request({
            method: 'GET',
            params: {
                page: page,
            },
            url: `/${this.base}/${category}/articles`
        });
    }
}
export { CategoryResource as default }