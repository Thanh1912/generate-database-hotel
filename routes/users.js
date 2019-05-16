var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/api/booking', function (req, res, next) {
  const param= req.query.lat_lng;
  console.log(param)
  const url = "https://www.booking.com/markers_on_map?aid=397594;label=gog235jc-1FCAEoggI46AdIKlgDaPQBiAEBmAEquAEXyAEM2AEB6AEB-AECiAIBqAIDuAKRh5TmBcACAQ;sid=99b9cba327afaf19199ed9a98964ba8d;srpvid=a2055e4288ed004c&;aid=397594;dest_id=-3712045;dest_type=city;sr_id=;ref=searchresults;limit=90;stype=1;lang=vi;ssm=1;ngp=1;room1=A,A;maps_opened=1;esf=1;nflt=;sr_countrycode=vn;sr_lat=;sr_long=;dba=1;dbc=1;mar=0.3;srh=3869335,2869102,2827847,3401237,1172239,1334692,2201858,2109619,2569018,2551657,2859837,3833819,2132505,2651165,3727120,4003999;somp=1;somp=1;mdimb=1%20;tp=1%20;img_size=270x200%20;avl=1%20;nor=1%20;spc=1%20;rmd=1%20;slpnd=1%20;sbr=1;BBOX="+param+"&_=1557235469786"
  var request = require('request');
  request(url, function (error, response, body) {
      res.json(body&&body.length===0?{}:JSON.parse(body));
  });
});
module.exports = router;
