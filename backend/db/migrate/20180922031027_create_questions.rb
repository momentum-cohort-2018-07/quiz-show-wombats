class CreateQuestions < ActiveRecord::Migration[5.2]
  def change
    create_table :questions do |t|
      t.references :quiz, foreign_key: true, null: false
      t.string :text, null: false
      t.timestamps
    end
  end
end
