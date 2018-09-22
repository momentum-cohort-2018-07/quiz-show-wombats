json.data do
  json.totalCount @quizzes.count
  json.items @quizzes do |quiz|
    json.(quiz, :id, :title)
    json.questionCount quiz.questions.count
    json.isPublished quiz.is_published
  end
end
