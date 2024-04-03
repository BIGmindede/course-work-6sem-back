const requestService = require("../services/requestService")

class RequestController {
    async create(req, res, next) {
        try {
            const { title, content, author } = req.body
            const request = await requestService.create(title, content, author)
            return res.json(request)
        } catch (e) {
            next(e)            
        }
    }
    async getAll(req, res, next) {
        try {
            const requests = await requestService.getAll()
            return res.json(requests)
        } catch (e) {
            next(e)
        }
    }
    // async getOne(req, res, next) {
    //     try {
            
    //     } catch (e) {
    //         next(e)            
    //     }
    // }
    async update(req, res, next) {
        try {
            const { id, status } = req.body
            const updatedRequest = await requestService.update(id, status)
            return res.json(updatedRequest)
        } catch (e) {
            next(e)            
        }
    }
    async remove(req, res, next) {
        try {
            
        } catch (e) {
            next(e)            
        }
    }
}

module.exports = new RequestController()