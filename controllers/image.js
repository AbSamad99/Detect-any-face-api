
const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'ae36d4d7aadc4f47a867adc4ad933de2'
});

const handleApiCall=(req,res)=>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data=>res.json(data))
    .then(console.log)
    .catch(err=>res.status(400).json('Unable to work with API'))
}

const handleImage=(req, res, db) => {
  const {
    id
  } = req.body;
  db('users')
    .where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>res.json(entries[0]))
    .catch(err=>res.status(400).json('Unable to update count'));
};

module.exports = {
  handleImage:handleImage,
  handleApiCall:handleApiCall
};
