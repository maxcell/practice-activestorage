class CreateChildren < ActiveRecord::Migration[5.2]
  def change
    create_table :children do |t|
      t.string :name
      t.string :birth_date

      t.timestamps
    end
  end
end
