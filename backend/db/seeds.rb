# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'csv'

Answer.delete_all
Question.delete_all
Quiz.delete_all
User.delete_all

user = User.create!(email: 'user@example.org', password: 'password')
admin = User.create!(email: 'admin@example.org', password: 'password', is_admin: true)

quizzes = {}
questions = {}

CSV.foreach(File.join(File.dirname(__FILE__), "../../samples/quizzes.csv"), headers: true) do |row|
  quiz = Quiz.create!(title: row['title'], is_published: true)
  quizzes[row['id']] = quiz
end

CSV.foreach(File.join(File.dirname(__FILE__), "../../samples/questions.csv"), headers: true) do |row|
  question = Question.create!(text: row['text'], quiz: quizzes[row['quiz_id']])
  questions[row['id']] = question
end

CSV.foreach(File.join(File.dirname(__FILE__), "../../samples/answers.csv"), headers: true) do |row|
  Answer.create!(text: row['text'], question: questions[row['question_id']], is_correct: row['correct'])
end
