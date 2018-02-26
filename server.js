const express = require('express')
const path = require('path');
const http = require('http')
const google = require('googleapis')
const drive = google.drive('v3')
const bodyParser = require('body-parser')
const multer = require('multer')
//var upload = multer({ dest:'./uploads/'})
var upload = multer()
//const privatekey  = require("./utils/demo-60feb12fe722.json")
const privatekey  = require("./utils/My Project 92371-ea52dc4de173.json");

/**
// CORS Express middleware to enable CORS Requests.
const cors = require('cors')({
  origin: true
});

// Firebase Setup
const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.GCLOUD_PROJECT}.firebaseio.com`
});
***/

/**var jwtClient = new google.auth.JWT(
privatekey.client_email,
null,
privatekey.private_key,
['https://www.googleapis.com/auth/spreadsheets',
'https://www.googleapis.com/auth/drive',
'https://www.googleapis.com/auth/calendar']);
//authenticate request
jwtClient.authorize(function (err, tokens) {
if (err) {
console.log(err);
return;
} else {
console.log(tokens)	
console.log("Successfully connected!");
}
});**/

const app = express()
/**
app.set('view engine','ejs')
app.set('views',path.join( __dirname, './views'))
**/
//const MONGO_URI =process.env.NODE_ENV === 'development' ?'mongodb://localhost:27017/auth' :'mongodb://heroku_x4xnglm7:em5c6br38p6molbe25j3qfqod6@ds011880.mlab.com:11880/heroku_x4xnglm7'

if (process.env.NODE_ENV === 'development') {
    const webpack = require('webpack')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const config = require('./webpack.config')
    const compiler = webpack(config)

    app.use(
        webpackDevMiddleware(compiler, {
            noInfo: true,
            publicPath: config.output.publicPath
        })
    )
	  app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
  }));   
}
//app.use(require('cors')({ origin: true }));
app.use(bodyParser.json())

function uploadG(data,name){
		return new Promise((resolve, reject)=>{
var fileMetadata = {
	name: name,
	parents: ['1gxj0h4q37VqNx9jEzu0AfytGasfyxQYQ']
}
	
var media = {
mimeType: 'image/*',
body: data
};

drive.files.create({
auth:jwtClient,
resource: fileMetadata,
media: media,
fields: 'id'
},(err, file) => {
if(err) {
// Handle error
console.log(err); reject(Error(err));
} else {
console.log('File Id: ', file.id);
resolve(file.id);
}
})			
		});
	}

app.get("/api/hello", (req, res) => {
    res.send("hello there");
});

app.post("/api/upload", upload.any(), (req, res, next) => {
	/**var upload = multer({
		storage: storage
	}).single('file')
	
	upload(req, res, function(err) {
		var bitmap = fs.createReadStream('./uploads/' + req.file.filename);
		//console.log(bitmap)
	var uu = uploadG(bitmap,req.file.filename); 
	uu.then(fileId => {
        emptyFiles();
		res.json({'fileId':fileId});
		console.log('fileId from promise:', fileId);
	}).catch(function(error){console.log(error)})
	})**/
	//var bitmap = fs.createReadStream(req.file[0]);
	//console.log('The files ',JSON.stringify(req.files));
	//console.log('The files ',JSON.stringify(req.files[0].size)); //this  works
	//console.log('The buffer ',JSON.stringify(Buffer.concat(req.files[0].buffer)));
	//console.log('The other buffer ',JSON.stringify(req.files[0].buffer.Buffer));
		var uu = uploadG(req.files[0].buffer,req.body.name);
	uu.then(fileId => {
		res.json({'fileId':fileId});
		console.log('fileId from promise:', fileId);
	}).catch(function(error){console.log(error);res.json({fileId:'file receved by server'});}) 
	
})

app.post("/api/upload/image",upload.any(), (req, res, next) => {
  var somVal = req.file;
    if(somVal!==null){console.log(somVal.size + ' KB')}
    console.log(req.body.name+" Done On The Server forIMage!")
    res.json({'fileId': 1234567})
});
app.use('/dist', express.static(process.cwd() + '/dist'))

app.use((req, res) => res.sendFile(__dirname + '/index.html'))

app.listen(3000, () => console.log('Server Listening on PORT 3000'))