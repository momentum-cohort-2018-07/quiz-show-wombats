class CreateQuizzes < ActiveRecord::Migration[5.2]
  def change
    create_table :quizzes do |t|
      t.string :title, null: false
      t.boolean :is_published, null: false, default: false
      t.timestamps
    end
  end
end
