class QuizzesController < ApplicationController
  def index
    @quizzes = Quiz.where(is_published: true).includes(:questions)
  end

  def show
    @quiz = Quiz.find(params[:id])
    @questions = @quiz.questions.includes(:answers)
  end
end
