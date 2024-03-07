module.exports = class CategoryDTO {
    id
    title
    request
    author

    constructor(model) {
        this.id = model._id
        this.title = model.title
        this.request = model.request
        this.author = model.author
    }
}