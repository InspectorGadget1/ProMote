import Order from './orderController.js'
class table{
    async findTable(req,res){
            const candidate = await Order.findOne({name: '1234'})

    }

}

export default new table()