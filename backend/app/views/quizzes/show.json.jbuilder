json.data do
  json.(@quiz, :id, :title)
  json.questions @questions do |question|
    json.(question, :id, :text)
    json.answers question.answers do |answer|
      json.(answer, :id, :text)
    end
  end
end
