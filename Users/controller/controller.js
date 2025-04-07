
exports.home = (req, res)=> {
    res.json({name:'iftekher mahmud',param:{id:req.params.id,name:req.query.name,age:req.query.age}})
}

exports.about = (req,res) => {
    res.json({name:'iftekher mahmud pervez'})
}





