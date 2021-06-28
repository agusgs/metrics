class CreateMeasures < ActiveRecord::Migration[6.1]
  def change
    create_table :measures, id: :uuid do |t|
      t.references :metric, null: false, foreign_key: true, type: :uuid
      t.decimal :value, precision: 8, scale: 4, null: false

      t.timestamps
    end
  end
end
