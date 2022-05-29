const date = require('date-and-time');
const Tenant = require('../models/tenant');
const Meal = require('../models/meal');

exports.getMeals = async (req, res, next) => {
    try {

        let dt = date.format(new Date(), 'YYYY-MM-DD');
        if (req.query.date) {
            dt = date.format(new Date(req.query.date), 'YYYY-MM-DD');
        }

        const tenants = await Tenant.query().select('name')
            .withGraphFetched('meals(filterDate, selectFields, order)').orderBy('name')
            .modifiers({
                filterDate(builder) {
                    builder.where('date', dt);
                },
                selectFields(builder) {
                    builder.select('id', 'date', 'mealTypeId', 'quantity');
                },
                order(builder) {
                    builder.orderBy('mealTypeId');
                }
            });

        const mealTypesForDate = await Meal.query()
            .distinct('mealTypeId').where('date', dt).orderBy('mealTypeId').withGraphFetched('mealType');

        res.status(200).render('meals', { title: 'Meals', mealTypesForDate, tenants, date: dt });
        //res.status(200).json(tenants);
        //res.status(200).json(meals);
        //res.status(200).json(mealTypesForDate);

    }
    catch (err) {
        next(err);
    }

}


exports.postMeals = async (req, res, next) => {
    try {
        const today = date.format(new Date(), 'YYYY-MM-DD');
        const requestedDate = date.format(new Date(req.body.date), 'YYYY-MM-DD');
        if (requestedDate < today) {
            req.flash('error', "You are not allowed to edit previous days' meals without the manager's approval");
            return res.status(403).redirect(`/meals?date=${req.body.date}`);
        }

        await Meal.query().findByHashId(req.body.id).patch({ quantity: Number(req.body.quantity) });

        req.flash('success', "Selected meal entry has been successfully updated for the boarder");
        res.status(200).redirect(`/meals?date=${req.body.date}`);


    }
    catch (err) {
        next(err);
    }

    // Meals.update(
    //     {
    //         //date: req.body.date,
    //         meal_1: req.body.meal_1,
    //         meal_2: req.body.meal_2,
    //         meal_half: req.body.meal_half
    //     },
    //     {
    //         where: {
    //             id: req.body.id
    //         }
    //     }
    // )
    //     .then(() => {
    //         req.flash('success', "Selected meal entry has been successfully updated for the boarder");
    //         res.status(200).redirect(`/meals?date=${req.body.date}`);
    //     })
    //     .catch(err => console.log(err));
};