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
  
  validates :title, presence: true
end
