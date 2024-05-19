export class ReviewDTO {
    id
    category
    categoryId
    author
    title
    content
    reliability
    usersRatedAmount
    date
    pictureName

    constructor(model, author, categoryName) {
        this.id = model._id
        // Так как в записи таблицы отзывов содержится только id категории,
        // к которой привязан отзыв, то в эту дто-шку закидываем
        // также и название самой категории
        this.category = categoryName 
        this.categoryId = model.category
        this.title = model.title
        this.content = model.content
        this.reliability = model.reliability
        this.usersRatedAmount = model.usersRatedAmount
        this.date = model.date
        this.pictureName = model.pictureName
        this.author = author // UserDTO
    }
}