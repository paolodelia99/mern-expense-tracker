const Profile = require('../models/Profile');
const { validationResult } = require('express-validator');

//@desc     Get profile
//@route    GET /api/v1/profile
//@access   Private
exports.getProfile = async (req,res,next) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate(
            'user',
            ['firstName', 'lastName']
        );

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.status(200).json({
            success: true,
            numberOfTransactions: profile.transactions.length,
            data: profile
        });

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
};

//@desc     Create profile
//@route    POST /api/v1/profile
//@access   Private
exports.createProfile = async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const profileFields = {};
    profileFields.user = req.user.id;

    try {
        // Using upsert option (creates new doc if no match is found):
        let profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true, upsert: true }
        );

        res.status(200).json({
            success:true,
            data:profile
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

//@desc     Add Transaction
//@route    POST /api/v1/profile/transaction
//@access   Private
exports.addTransaction = async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const newTransaction = {
        text: req.body.text,
        amount: req.body.amount
    };

    try {
        // Using upsert option (creates new doc if no match is found):
        let profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $push:{ transactions: newTransaction}},
            { new: true, upsert: true }
        ).then( profile => {
            //the new transaction is send in the respnse data
            return res.status(201).json({
                success: true,
                data: profile.transactions[profile.transactions.length -1]
            })
        }).catch(e => {
            if(err.name === 'ValidationError') {
                const messages = Object.values(err.errors).map(val => val.message);

                return res.status(400).json({
                    success: false,
                    error: messages
                })
            }
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

//@desc     Delete Transaction
//@route    DELETE /api/v1/profile/transaction/:id
//@access   Private
exports.deleteTransaction = async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        await Profile.findOne({ user: req.user.id })
            .then( profile => {
               profile.transactions.pop({
                   _id: req.params.id
               })

                profile.save()
                    .then( () =>  res.status(200).json({success: true, data: {}}))
            })
            .catch( () => {
                return res.status(404).json({
                    success: false,
                    error: 'No transaction found'
                })
            });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}