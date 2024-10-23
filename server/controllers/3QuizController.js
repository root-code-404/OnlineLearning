// routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { QuizModel, UserModel } = require('../model/model');


router.post('/quiz', async (req, res) => {
  try {
    const { questions } = req.body;

    
    const newQuiz = new QuizModel({ questions });

   
    const savedQuiz = await newQuiz.save();

    res.status(201).json({ quiz: savedQuiz });
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ error: 'Could not create quiz' });
  }
});


router.get('/quiz/:quizId', async (req, res) => {
  try {
    const { quizId } = req.params;

   
    const quiz = await QuizModel.findById(quizId);

    if (!quiz) {
      res.status(404).json({ error: 'Quiz not found' });
      return;
    }

    res.status(200).json({ quiz });
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({ error: 'Could not fetch the quiz' });
  }
});


router.post('/submit/:quizId', async (req, res) => {
  try {
    const { quizId } = req.params;
    const { userId, answers } = req.body;

    
    const quiz = await QuizModel.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    // Calculate the score
    let score = 0;
    for (let i = 0; i < quiz.questions.length; i++) {
      if (quiz.questions[i].correctAnswer === answers[i]) {
        score++;
      }
    }

    res.status(200).json({ score });
  } catch (error) {
    console.error('Error submitting answers:', error);
    res.status(500).json({ error: 'Could not submit the quiz' });
  }
});

router.get('/quizzes', async (req, res) => {
  try {
    const quizzes = await QuizModel.find();
    res.status(200).json({ quizzes });
  } catch (error) {
    console.error('Error retrieving quizzes:', error);
    res.status(500).json({ error: 'Could not retrieve quizzes' });
  }
});

module.exports = router;
