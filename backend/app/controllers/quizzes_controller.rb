class QuizzesController < ApplicationController
  before_action :authenticate_user, only: [:show, :score]

  def index
    @quizzes = Quiz.where(is_published: true).includes(:questions)
  end

  def show
    @quiz = Quiz.find(params[:id])
    @questions = @quiz.questions.includes(:answers)
  end

  def score
    quiz = Quiz.find(params[:id])
    answers = params[:answers]
    
    if answers.values.compact.size != quiz.questions.count
      render status: 422, json: {
        errors: ['This quiz is not complete.']
      }
      return
    end      

    score = 0
    answers.each_pair do |question_id, answer_id|
      question = quiz.questions.find(question_id)
      if question.correct_answer.id.to_s == answer_id.to_s
        score += 1
      end
    end

    render json: {
      data: {
        correct: score,
        total: quiz.questions.count
      }
    }
  end
end
