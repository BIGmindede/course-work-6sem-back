const CategoryDTO = require("../dtos/categoryDTO");
const UserDTO = require("../dtos/userDTO");
const ApiError = require("../exceptions/apiError");
const categoryModel = require("../models/categoryModel");
const userModel = require("../models/userModel");
const fileService = require("./fileService");

class CategoryService {
    async create(title, picture, request, author) {
        const checkIfExists = await categoryModel.findOne({ title })
        if (checkIfExists) {
            throw ApiError.badRequestError(`Категория: ${title} уже существует!`)
        }
        const pictureName = fileService.saveFile(picture)
        const category = await categoryModel.create({ title, pictureName, request, author })
        const relatedAuthor = await userModel.findOne(model.author)
        const categoryData = new CategoryDTO(category, new UserDTO(relatedAuthor))
        return categoryData
    }

    async getAll() {
        const categories = Promise.all((await categoryModel.find())
            .map(async model => {
                const author = await userModel.findOne(model.author)
                return new CategoryDTO(model, new UserDTO(author))
            }
        ))
        return categories
    }

    async getOne(id) {
        const category = await categoryModel.findOne({ id })
        const author = await userModel.findOne(category.author)
        const categoryData = new CategoryDTO(category, new UserDTO(author))
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
        const author = await userModel.findOne(category.author)
        const categoryData = new CategoryDTO(updatedCategory, new UserDTO(author))
        return categoryData
    }

    async remove(id) {
        const deletedCategory = await categoryModel.findOne({ _id: id })
        await categoryModel.deleteOne({ _id: id })
        const author = await userModel.findOne(category.author)
        const deletedCategoryData = new CategoryDTO(deletedCategory, new UserDTO(author))
        fileService.removeFile(deletedCategoryData.pictureName)
        return deletedCategoryData
    }
}

module.exports = new CategoryService()