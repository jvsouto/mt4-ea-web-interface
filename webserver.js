var express = require("express");
var app     = express();
var path    = require("path");
var bodyParser = require('body-parser');


var status = 0;
var close_all_orders = 0;
var close_all_pending_orders = 0;

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 





app.get('/ea-check',function(req,res){


    var outObj = {
        status: status, 
        close_all_orders: close_all_orders,
        close_all_pending_orders: close_all_pending_orders
    }
    
    close_all_orders = 0;
    close_all_pending_orders = 0;
    res.send(JSON.stringify(outObj));	//Write the response
});


app.get('/ea-web',function(req,res){
    

        res.render('web_ea.html',{title:req.query.toto});
    });

app.post('/ea-path',function(req,res){
    
if(req.body.start){
    status = 1 ;
}else if(req.body.stop){

    status = 0 ;
}
else if(req.body.close_all_orders){

    close_all_orders = 1;
}
else if(req.body.close_all_pendings){

    close_all_pending_orders = 1;
}

  console.log("Status:"+status+"\r\n");
  console.log("close_all_orders:"+close_all_orders+"\r\n");
  console.log("close_all_pending_orders:"+close_all_pending_orders+"\r\n");

    res.render('web_ea.html',{title:req.query.toto});
});


app.listen(3000);

console.log("Running at Port 3000");