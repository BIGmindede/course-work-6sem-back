const categoryService = require("../services/categoryService")


class CategoryController {
    async create(req, res, next) {
        try {
            let { title, request, author } = req.body
            if (request === 'null') request = null
            const categoryData = await categoryService.create(title, req.files.picture, request, author)
            return res.json(categoryData)
        } catch (e) {
            next(e)            
        }
    }
    async getAll(req, res, next) {
        try {
            const categories = await categoryService.getAll()
            return res.json(categories)
        } catch (e) {
            next(e)
        }
    }
    async getOne(req, res, next) {
        try {
            const id = req.params.id
            const category = await categoryService.getOne(id)
            return res.json(category)
        } catch (e) {
            next(e)            
        }
    }
    async update(req, res, next) {
        try {
            let { id, title } = req.body
            if (title === 'undefined') title = null
            const category = await categoryService.update(id, title, req.files.picture)
            return res.json(category)
        } catch (e) {
            next(e)            
        }
    }
    async remove(req, res, next) {
        try {
            const id = req.params.id
            const category = await categoryService.remove(id)
            return res.json(category)
        } catch (e) {
            next(e)            
        }
    }
}

module.exports = new CategoryController()