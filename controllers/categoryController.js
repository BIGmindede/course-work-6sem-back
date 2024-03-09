const categoryService = require("../services/categoryService")


class CategoryController {
    async create(req, res, next) {
        try {
            const { title, request, author } = req.body
            const categoryData = await categoryService.create(title, request, author)
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