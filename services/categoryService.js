const CategoryDTO = require("../dtos/categoryDTO");
const ApiError = require("../exceptions/apiError");
const categoryModel = require("../models/categoryModel");

class CategoryService {
    async create(title, request, author) {
        const category = await categoryModel.findOne({ title })
        if (category) {
            throw ApiError.badRequestError(`Категория: ${title} уже существует!`)
        }

        category = await categoryModel.create({ title, request, author })
        
        const categoryData = new CategoryDTO(category)
        return categoryData
    }

    async getAll() {
        const categories = await categoryModel.find()
        return categories
    }

    async getOne(id) {
        const category = await categoryModel.findOne({ id })
        const categoryData = new CategoryDTO(category)
        return categoryData
    }

    async remove(id) {
        const category = await categoryModel.deleteOne({ id })
        const categoryData = new CategoryDTO(category)
        return categoryData
    }
}

module.exports = new CategoryService()