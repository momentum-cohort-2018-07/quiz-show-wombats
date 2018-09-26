# == Schema Information
#
# Table name: quizzes
#
#  id           :integer          not null, primary key
#  title        :string           not null
#  is_published :boolean          default(FALSE), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Quiz < ApplicationRecord
  has_many :questions
  has_many :scores
  
  validates :title, presence: true

  def last_score(user)
    scores.where(user: user).order(created_at: :desc).first
  end

  def best_score(user)
    scores.where(user: user).order(correct: :desc).first
  end
end
