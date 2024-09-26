const epxress = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');


const fileUpload = require('express-fileupload');
const methodOverride = require('method-override')
const photoController = require('./controllers/photoControllers')
const pageController = require("./controllers/pageController")

const app = epxress();

mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db');

app.set('view engine', 'ejs');

app.use(epxress.static('public'));
app.use(epxress.urlencoded({ extended: true }));
app.use(epxress.json());
app.use(fileUpload());
app.use(methodOverride('_method',{
  methods:["POST","GET"]
}))

app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updateFoto);
app.delete('/photos/:id',photoController.deleteFoto)

app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);


const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});
