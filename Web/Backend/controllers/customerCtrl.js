const Customers = require('../models/CustomerModel')

const customerCtrl = {
    register: async (req, res) =>{
        try {
            const {Id, name, address, balance, deposit} = req.body;

            const customer = await Customers.findOne({Id})
            if(customer) return res.status(400).json({msg:'The Id already exists.'})

            const newCustomer = new Customers({
                Id, name, address, balance, deposit
            })

            await newCustomer.save()

            res.json({msg: "Register Success!"});
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getCustomers: async (req, res) =>{
        try {
            const customers = await Customers.find()
            res.json(customers)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateCustomer: async (req, res) => {
        try {
            const deposit = req.body.deposit
            let balance = req.body.balance
            const name = req.body.name
            const address = req.body.address
            if(deposit !== 0)
                balance = balance + deposit
            await Customers.findOneAndUpdate({Id: req.params.Id}, {balance: balance, name:name, address: address})
            res.json({msg: "Success!"});

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getCustomer: async (req, res) =>{
        try {
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