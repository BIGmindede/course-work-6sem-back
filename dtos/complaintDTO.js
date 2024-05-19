export class ComplaintDTO {
    id
    author
    target
    review
    reviewId
    content
    status
    date
    // Конструктор принимает четыре поля:
    // 1 модель из таблицы,
    // 2 UserDTO (автор),
    // 3 UserDTO (цель),
    // 4 содержание отзыва
    constructor(model, author, target, review) {
        this.id = model._id
        this.content = model.content // Содержание самой жалобы
        this.date = model.date
        this.status = model.status
        this.reviewId = model.review // В записи в бдшке только id отзыва содержится
        this.author = author // UserDTO
        this.target = target // UserDTO
        this.review = review // Содержание отзыва
    }
}