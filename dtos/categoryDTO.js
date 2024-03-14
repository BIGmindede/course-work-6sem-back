module.exports = class CategoryDTO {
    id
    title
    pictureName
    request
    author

    constructor(model) {
        this.id = model._id
        this.title = model.title
        this.pictureName = model.pictureName
        this.request = model.request
        this.author = model.author
    }
}