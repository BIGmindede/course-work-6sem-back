const CategoryDTO = require("../dtos/categoryDTO");
const ApiError = require("../exceptions/apiError");
const categoryModel = require("../models/categoryModel");
const fileService = require("./fileService");

class CategoryService {
    async create(title, picture, request, author) {
        const checkIfExists = await categoryModel.findOne({ title })
        if (checkIfExists) {
            throw ApiError.badRequestError(`Категория: ${title} уже существует!`)
        }

        const pictureName = await fileService.saveFile(picture)

        const category = await categoryModel.create({ title, pictureName, request, author })
        
        const categoryData = new CategoryDTO(category)
        return categoryData
    }

    async getAll() {
        const categories = (await categoryModel.find()).map(model => new CategoryDTO(model))
        return categories
    }

    async getOne(id) {
        const category = await categoryModel.findOne({ id })
        const categoryData = new CategoryDTO(category)
        return categoryData
    }

    async update(id, title, picture) {
        const category = await categoryModel.findOne({ _id: id })
        if (title) {
            category.title = title
        }
        if (picture) {
            fileService.removeFile(category.pictureName)
            category.pictureName = fileService.saveFile(picture)
        }
        const updatedCategory = await category.save()
        const categoryData = new CategoryDTO(updatedCategory)
        return categoryData
    }

    async remove(id) {
        const category = await categoryModel.deleteOne({ id })
        const categoryData = new CategoryDTO(category)
        return categoryData
    }
}

module.exports = new CategoryService()