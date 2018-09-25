# == Schema Information
#
# Table name: scores
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  quiz_id    :integer          not null
#  correct    :integer          not null
#  total      :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Score < ApplicationRecord
  belongs_to :user
  belongs_to :quiz

  def percent
    return null if total == 0
    correct / total.to_f
  end
end
