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

require 'test_helper'

class QuizTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
