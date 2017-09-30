
module.exports = {

  load: function(req, res, next) {
    res.render('index', { message: ''});
  }

}
