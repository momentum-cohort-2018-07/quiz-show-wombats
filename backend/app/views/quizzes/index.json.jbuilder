json.data do
  json.totalCount @quizzes.count
  json.items @quizzes do |quiz|
    json.(quiz, :id, :title)
    json.questionCount quiz.questions.count
    json.isPublished quiz.is_published
    if current_user
      json.prevScore quiz.prev_score(current_user).try(:percent)
    end
  end
end
