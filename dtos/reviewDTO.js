export class ReviewDTO {
    id
    category
    author
    title
    content
    reliability
    usersRatedAmount
    date
    pictureName

    constructor(model, author) {
        this.id = model._id
        this.category = model.category
        this.title = model.title
        this.content = model.content
        this.reliability = model.reliability
        this.usersRatedAmount = model.usersRatedAmount
        this.date = model.date
        this.pictureName = model.pictureName
        this.author = author
    }
}