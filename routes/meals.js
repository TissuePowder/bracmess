const express = require('express');
const router = express.Router();
const date = require('date-and-time');
const Meals = require('../models/meals');


router.get('/', async (req, res, next) => {
    let dt = date.format(new Date(), 'YYYY-MM-DD');
    if (req.query.date) {
        dt = date.format(new Date(req.query.date), 'YYYY-MM-DD');
    }
    //console.log(req.query.date);
    await Meals.findAll({
        where: {
            date: dt
        },
        order: [
            ['name', 'asc']
        ]
    })
        .then(meals => {
            //console.log(meals);
            res.status(200).render('meals', { title: 'Meals', meals: meals, date: dt });
        }).catch(err => {
            console.log(err);
        })
});

router.post('/', async (req, res, next) => {
    let today = date.format(new Date(), 'YYYY-MM-DD');
    let requestedDate = date.format(new Date(req.body.date), 'YYYY-MM-DD');
    if (requestedDate < today) {
        req.flash('error', "You are not allowed to edit previous days' meals without the manager's approval");
        return res.status(403).redirect(`/meals?date=${req.body.date}`);
    }
    await Meals.update(
        {
            //date: req.body.date,
            meal_1: req.body.meal_1,
            meal_2: req.body.meal_2,
            meal_half: req.body.meal_half
        },
        {
            where: {
                id: req.body.id
            }
        }
    )
        .then(() => {
            req.flash('success', "Selected meal entry has been successfully updated for the boarder");
            res.status(200).redirect(`/meals?date=${req.body.date}`);
        })
        .catch(err => console.log(err));
});

module.exports = router;
