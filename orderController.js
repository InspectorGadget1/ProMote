import Order from './models/order.model.js'
import User from './models/user.model.js'
import jwt from 'jsonwebtoken'
 


class orderController{
    async makeOrder(req,res){
        try{
            const {link, budget, month, comment, name, product} = req.body
            const token = req.cookies['token']
            const decoded = jwt.decode(token,{complete: true});
            const id = decoded.payload.id
            const user = await User.findById(id)
            if(!user){
                return res.status(400).json({message: "User ${username} not found"})
            }
            const createdDate = new Date()
            const finishedDate = new Date()
                finishedDate.setMonth(createdDate.getMonth()+ Number(month))
            const order = new Order({name, link, product: 'СММ просування', budget, created : createdDate, finished: finishedDate, comment, user:id})
            await order.save()
            res.redirect('/user')
        }
        catch(e){
            console.log(e)
            res.status(400).json({message: "Order error"})
        }
    }
}
export default new orderController()