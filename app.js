var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var cors = require('cors');
app.use(cors());
app.use('/', indexRouter);
app.use('/', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

var fs = require('fs'),
    request = require('request');

var download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
       /* console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);*/

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

//config for your database
var sqlConfig = {
    user: 'sa',
    password: '1234',
    server: 'localhost',
    database: 'hotelbooking'
};
var sql = require('mssql');
var image_url = 'https://q-ak.bstatic.com';
var request = require('request');
var urlRequest = 'https://www.booking.com/markers_on_map?aid=397594;label=gog235jc-1DCAEoggI46AdIKlgDaPQBiAEBmAEquAEXyAEM2AED6AEB-AECiAIBqAIDuAKRh5TmBcACAQ;sid=99b9cba327afaf19199ed9a98964ba8d;srpvid=67376e380f5e02c9&;aid=397594;dest_id=-3712045;dest_type=city;sr_id=;ref=searchresults;limit=20;stype=1;lang=vi;ssm=1;ngp=1;room1=A,A;maps_opened=1;esf=1;nflt=;sr_countrycode=vn;sr_lat=;sr_long=;dba=1;dbc=1;mar=0.3;srh=2827847,2569018,3869335,3401237,1172239,1334692,2201858,2109619,2869102,2551657,2859837,3833819,2132505,2651165,3727120,4003999;somp=1;somp=1;mdimb=1%20;tp=1%20;img_size=270x200%20;avl=1%20;nor=1%20;spc=1%20;rmd=1%20;slpnd=1%20;sbr=1;BBOX=108.44455883217165,11.935128811967767,108.47206756782839,11.945709484734051&_=1558021249791';
// var urlRequest = 'https://www.booking.com/markers_on_map?aid=397594;label=gog235jc-1FCAEoggI46AdIKlgDaPQBiAEBmAEquAEXyAEM2AEB6AEB-AECiAIBqAIDuAKRh5TmBcACAQ;sid=99b9cba327afaf19199ed9a98964ba8d;srpvid=faf368c0f39f000e&;aid=397594;dest_id=-3712045;dest_type=city;sr_id=;ref=searchresults;limit=90;stype=1;lang=vi;ssm=1;ngp=1;room1=A,A;maps_opened=1;esf=1;nflt=;sr_countrycode=vn;sr_lat=;sr_long=;dba=1;dbc=1;mar=0.3;srh=3869335,2569018,2827847,3401237,1172239,1334692,2201858,2109619,2869102,2551657,2859837,3833819,2132505,2651165,3727120,4003999;somp=1;somp=1;mdimb=1%20;tp=1%20;img_size=270x200%20;avl=1%20;nor=1%20;spc=1%20;rmd=1%20;slpnd=1%20;sbr=1;BBOX=108.4237101674081,11.940734586569711,108.45121890306484,11.944471381358039&_=1557672838598';
// var urlRequest = 'https://www.booking.com/markers_on_map?aid=397594;label=gog235jc-1FCAEoggI46AdIKlgDaPQBiAEBmAEquAEXyAEM2AEB6AEB-AECiAIBqAIDuAKRh5TmBcACAQ;sid=99b9cba327afaf19199ed9a98964ba8d;srpvid=2f007a6c535e0295&;aid=397594;dest_id=-3712045;dest_type=city;sr_id=;ref=searchresults;limit=20;stype=1;lang=vi;ssm=1;ngp=1;room1=A,A;maps_opened=1;esf=1;nflt=;sr_countrycode=vn;sr_lat=;sr_long=;dba=1;dbc=1;mar=0.3;srh=2827847,2569018,3869335,3401237,1172239,1334692,2201858,2109619,2869102,2551657,2859837,3833819,2132505,2651165,3727120,4003999;somp=1;somp=1;mdimb=1%20;tp=1%20;img_size=270x200%20;avl=1%20;nor=1%20;spc=1%20;rmd=1%20;slpnd=1%20;sbr=1;BBOX=108.44455883217165,11.934876886152267,108.47206756782839,11.94596140047741&_=1557941099043';
// var urlRequest = 'https://www.booking.com/markers_on_map?aid=397594;label=gog235jc-1DCAEoggI46AdIKlgDaPQBiAEBmAEquAEXyAEM2AED6AEB-AECiAIBqAIDuAKRh5TmBcACAQ;sid=99b9cba327afaf19199ed9a98964ba8d;srpvid=67376e380f5e02c9&;aid=397594;dest_id=-3712045;dest_type=city;sr_id=;ref=searchresults;limit=20;stype=1;lang=vi;ssm=1;ngp=1;room1=A,A;maps_opened=1;esf=1;nflt=;sr_countrycode=vn;sr_lat=;sr_long=;dba=1;dbc=1;mar=0.3;srh=2827847,2569018,3869335,3401237,1172239,1334692,2201858,2109619,2869102,2551657,2859837,3833819,2132505,2651165,3727120,4003999;somp=1;somp=1;mdimb=1%20;tp=1%20;img_size=270x200%20;avl=1%20;nor=1%20;spc=1%20;rmd=1%20;slpnd=1%20;sbr=1;BBOX=108.4237101674081,11.936997740241612,108.45121890306484,11.948208124591456&_=1558021249771';
(async function () {
    try {
        console.log("sql connecting......")
        let pool = await sql.connect(sqlConfig);
        const hotelsData = await new Promise(resolve => {
            request(urlRequest, function (error, response, body) {
                console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                const bodyJson = JSON.parse(body);
                var hotels = [];
                bodyJson.b_hotels.forEach(item => {
                    console.log(item.b_hotel_title)
                    const urlImage = image_url + item.b_image_url;
                    const urls = urlImage.split("/");
                    const lastName = urls[urls.length - 1];
                    download(image_url + item.b_image_url, 'images/'+lastName, function () {
                         // console.log('done');
                     });
                    const itemHotel = {
                        col: [
                            'Da lat',
                            'Da lat',
                            'description',
                            item.b_hotel_title,
                            lastName,
                            parseFloat(item.b_latitude),
                            parseFloat(item.b_longitude)
                        ]
                    };
                    hotels.push(itemHotel)
                });
                resolve(hotels)
            })
        });
        console.log('Log info for hotels: ', hotelsData);
        const table = new sql.Table('hotel') // or temporary table, e.g. #temptable
        table.create = true;
        table.columns.add('address', sql.NVarChar(255))
        table.columns.add('city', sql.VarChar(255))
        table.columns.add('description', sql.NVarChar(255))
        table.columns.add('hotelName', sql.NVarChar(255))
        table.columns.add('images', sql.NVarChar(255))
        table.columns.add('lat', sql.Float())
        table.columns.add('lng', sql.Float())
        hotelsData.forEach((item, index) => {
                table.rows.add(
                    item.col[0],
                    item.col[1],
                    item.col[2],
                    item.col[3],
                    item.col[4],
                    item.col[5],
                    item.col[6],
                );
        })
        console.log(table);
        let result = await pool.request()
            .bulk(table)  // subject is my database table name
        console.log(result)
    } catch (err) {
        console.log(err);
    }
})()

module.exports = app;
