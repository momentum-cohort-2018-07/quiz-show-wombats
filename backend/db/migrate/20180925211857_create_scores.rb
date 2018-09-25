class CreateScores < ActiveRecord::Migration[5.2]
  def change
    create_table :scores do |t|
      t.references :user, foreign_key: true, null: false
      t.references :quiz, foreign_key: true, null: false
      t.integer :correct, null: false
      t.integer :total, null: false

      t.timestamps
    end
  end
end
