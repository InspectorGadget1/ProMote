import jwt from 'jsonwebtoken'
export async function admin (roles){ 
    return function(req,res,next){
        try{
            const token = req.cookies['token']
            const decodedData = jwt.verify(token,'SECRET')
            const decoded = jwt.decode(token,{complete: true});
            const id = decoded.payload.id
            const user = User.findOne({_id : id})
        }
        catch(e){
            res.redirect('/login')
        }
    const token = req.cookies['token']
    const decodedData = jwt.verify(token,'SECRET')
    const decoded = jwt.decode(token,{complete: true});
    const id = decoded.payload.id
    const user = await User.findOne({_id : id})
    if(user.role != 'ADMIN') res.redirect('/')
    next()
}
}