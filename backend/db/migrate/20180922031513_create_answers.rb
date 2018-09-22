class CreateAnswers < ActiveRecord::Migration[5.2]
  def change
    create_table :answers do |t|
      t.references :question, foreign_key: true, null: false
      t.string :text, null: false
      t.boolean :is_correct, null: false, default: false
      t.timestamps
    end
  end
end
