# frozen_string_literal: true

class CreateMetrics < ActiveRecord::Migration[6.1]
  def change
    create_table :metrics, id: :uuid do |t|
      # THIS IS FOR ENABLING POSTGRESQL TO USE GENERATE AND USE UUIDS AS PK
      enable_extension 'uuid-ossp'
      enable_extension 'pgcrypto'

      t.string :name, unique: true, null: false
      t.timestamp :last_measure_at

      t.timestamps
    end
  end
end
