const Travel = require('../models/TravelModel')

// Filter, sorting and paginating
class APIfeatures {
    constructor(query, queryString){
        this.query = query
        this.queryString = queryString
    }
    filtering(){
        const queryObj = {...this.queryString} //queryString = req.query
 
        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete(queryObj[el]))
        
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
 
     //    gte = greater than or equal
     //    lte = lesser than or equal
     //    lt = lesser than
     //    gt = greater than
        this.query.find(JSON.parse(queryStr))
        console.log(JSON.parse(queryStr))
          
        return this;
    }
    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            console.log(sortBy)
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }
        return this;

    }
    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 10
        const skip = (page-1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}


const travelCtrl = {
    getTravels: async (req, res) =>{
        try {
            const features = new APIfeatures(Travel.find({UserId: req.params.Id}), req.query).filtering().sorting().paginating()
            const travels = await features.query
            res.json({
                status: 'success',
                results: travels.length,
                travels: travels
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = travelCtrl