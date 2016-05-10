
var models = require('../models');


// GET /quizzes
exports.index = function(req, res, next) {
		if(!req.query.search){
	 		models
	 		.Quiz 
	 		.findAll() //Busca la primera pregunta
	 		.then (function(quizzes) {
	 			res.render('quizzes/index.ejs', {quizzes: quizzes})
	 		}).catch(function(error) { next(error); });
	 	}else {
 			models.Quiz.findAll({
	 			where: ["question like ?", "%" + req.query.search.split(" ").join("%") + "%"]
	 		}).then(function(quizzes){
	 			var busqueda = req.query.search;
	         	res.render( 'quizzes/index', { quizzes: quizzes.sort(), busqueda: busqueda});
	 		}).catch(function(error) { next(error); });
 	}
  };
	




// GET /quizzes/:id
exports.show = function(req, res, next) {
	models.Quiz.findById(req.params.quizId)
		.then(function(quiz) {
			if (quiz) {
				var answer = req.query.answer || '';

				res.render('quizzes/show', {quiz: quiz,
											answer: answer});
			} else {
		    	throw new Error('No existe ese quiz en la BBDD.');
		    }
		})
		.catch(function(error) {
			next(error);
		});
};


// GET /quizzes/:id/check
exports.check = function(req, res) {
	models.Quiz.findById(req.params.quizId)
		.then(function(quiz) {
			if (quiz) {
				var answer = req.query.answer || "";

				var result = answer === quiz.answer ? 'Correcta' : 'Incorrecta';

				res.render('quizzes/result', { quiz: quiz, 
											   result: result, 
											   answer: answer });
			} else {
				throw new Error('No existe ese quiz en la BBDD.');
			}
		})
		.catch(function(error) {
			next(error);
		});	
};
