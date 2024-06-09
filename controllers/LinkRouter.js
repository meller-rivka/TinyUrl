import express from 'express'
import LinkController from './LinkController.js'
const LinkRouter = express.Router()

LinkRouter.get('/', LinkController.getList)

LinkRouter.get('/:id', LinkController.redicateById)

LinkRouter.get('/:id/clicks', LinkController.distributionByClicks)

LinkRouter.post('/', LinkController.add)

LinkRouter.put('/:id', LinkController.update)

LinkRouter.delete('/:id', LinkController.delete)

export default LinkRouter