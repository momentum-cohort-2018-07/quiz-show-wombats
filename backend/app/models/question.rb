# == Schema Information
#
# Table name: questions
#
#  id         :integer          not null, primary key
#  quiz_id    :integer          not null
#  text       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Question < ApplicationRecord
  belongs_to :quiz
  has_many :answers

  validates :text, presence: true

  def correct_answer
    answers.where(is_correct: true).first
  end
end
