# frozen_string_literal: true

class Measure < ApplicationRecord
  belongs_to :metric
  validates_presence_of :value
  validates_presence_of :metric

  scope :avg_by, ->(by) { group("date_trunc('#{by}', created_at)").average(:value) }
  scope :avg_day, -> { avg_by('day') }
  scope :avg_hour, -> { avg_by('hour') }
  scope :avg_minute, -> { avg_by('minute') }
end
