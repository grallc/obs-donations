const express = require('express');
const mongoose = require('mongoose');
require('./models/Tip');

const Tip = mongoose.model('Tip');
const app = express();
const cors = require('cors');

mongoose
    .connect('mongodb://localhost:27017/obs-donations', {
        useNewUrlParser: true
    })
    .then(() => console.log(`MongoDB Connected`))
    .catch(err => console.log(err));

const newTip = new Tip({
    receiver: 'DLYA8ek6aQLRQCKd9om',
    sender: 'jules44',
    gateway: 'PAYPAL',
    message: 'Merci pour ce super stream !'
});


// newTip.save().then((tip) => {
//     console.log(tip);
// });

app.use(cors());

app.get("/", function (req, res) {
    console.log('122')
    res.setHeader('Content-Type', 'application/json');
    if (req.query.user === undefined) {
        return res.send(JSON.stringify({
            error: 'Please specify a valid user ID'
        }));
    }
    if (req.query.lasts === 'true') {
        Tip.find({
            receiver: req.query.user,
            time: {
                $gte: new Date(new Date - 7 * 1000)
            }
        }).then((tips) => {
            res.send(JSON.stringify({
                tips
            }));
        })
    } else {
        Tip.find({
            receiver: req.query.user
        }).then((tips) => {
            res.send(JSON.stringify({
                tips
            }));
        })
    }
});

app.listen(8080, () => {
    console.log(`Server is up on port 8080`);
});