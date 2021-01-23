const Customers = require('../models/CustomerModel')

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


const customerCtrl = {
    register: async (req, res) =>{
        try {
            const {Id, name, address1, address2, address3, phone, balance, deposit} = req.body;

            const customer = await Customers.findOne({Id})
            if(customer) return res.status(400).json({msg:'The Id already exists.'})

            const newCustomer = new Customers({
                Id, name, address1, address2, address3, phone,  balance, deposit
            })

            await newCustomer.save()

            res.json({msg: "Register Success!"});
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getCustomers: async (req, res) =>{
        console.log(req.body)
        try {
            const features = new APIfeatures(Customers.find(), req.query).filtering().sorting().paginating()
            const customers = await features.query
            res.json({
                status: 'success',
                results: customers.length,
                customers: customers
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateCustomer: async (req, res) => {
        console.log(req.body)
        try {
            const deposit = req.body.deposit
            let balance = req.body.balance
            const name = req.body.name
            const address1 = req.body.address1
            const address2 = req.body.address2
            const address3 = req.body.address3
            const phone = req.body.phone
            if(deposit !== 0)
                balance = balance + deposit
            await Customers.findOneAndUpdate({Id: req.params.Id}, {balance: balance, name:name, address1: address1, address2: address2, address3: address3, phone: phone})
            res.json({msg: "Success!"});

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getCustomer: async (req, res) =>{
        try {
            console.log(req.params)
            const customer = await Customers.findOne({Id: req.params.Id})
            if(!customer) return res.status(400).json({msg:"Cannot find a customer"})

            res.json(customer)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteCustomer: async (req, res) =>{
        try {
            await Customers.findOneAndDelete({Id: req.params.Id})
            res.json({msg: "Customer Deleted"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = customerCtrl