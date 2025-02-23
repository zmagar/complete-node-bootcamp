const fs = require('fs');


const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)

);

exports.checkID = (req, res, next, val) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'invalid id',
        });
    }
    next();
}

exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'fail',
            message: 'Bad request',
        });
    }
    next();

}

exports.getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours,
        },
    });
};

exports.getTour = (req, res) => {
    console.log(`Param tour id = ${req.params.id}`)
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);
    res.status(200).json({
        status: 'success',
        data: {
            tour,
        },
    });
};

exports.createTour = (req, res) => {
    //   console.log(req.body);

    const newID = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newID }, req.body);

    tours.push(newTour);
    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        (err) => {
            res.status(201).json({
                status: 'success',
                data: {
                    tour: newTour,
                },
            });
        }
    );
};


exports.updateTour = (req, res) => {

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>',
        },
    });
};

exports.deleteTour = (req, res) => {

    res.status(204).json({
        status: 'success',
        data: null,
    });
};