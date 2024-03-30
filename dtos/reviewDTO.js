module.exports = class ReviewDTO {
    id
    category
    author
    title
    content
    reliability
    date
    pictureName

    constructor(model) {
        this.id = model._id
        this.category = model.category
        this.author = model.author
        this.title = model.title
        this.content = model.content
        this.reliability = model.reliability
        this.date = model.date
        this.pictureName = model.pictureName
    }
}