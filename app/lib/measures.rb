# frozen_string_literal: true

# This class represents the group of measures that exists for a given metric
class Measures
  def self.for_metric(metric)
    new(metric)
  end

  def initialize(metric)
    @per_day = by_metric(metric).avg_day
    @per_hour = by_metric(metric).avg_hour
    @per_minute = by_metric(metric).avg_minute
    @all = by_metric(metric)
  end

  AVERAGE_PER_DAY_NAME = 'Average per day'

  AVERAGE_PER_HOUR_NAME = 'Average per hour'

  AVERAGE_PER_MINUTE_NAME = 'Average per minute'

  ALL_MEASURES_NAME = 'All measures'

  def serialize
    [
      { name: AVERAGE_PER_DAY_NAME, measures: map_average(@per_day) },
      { name: AVERAGE_PER_HOUR_NAME, measures: map_average(@per_hour) },
      { name: AVERAGE_PER_MINUTE_NAME, measures: map_average(@per_minute) },
      { name: ALL_MEASURES_NAME, measures: map_all }
    ]
  end

  private

  def map_all
    @all.map { |measure| { timestamp: measure.created_at.to_i, measure: measure.value.to_f } }
  end

  def map_average(averages)
    averages.map { |date, avg| { timestamp: date.to_i, measure: avg.to_f } }
  end

  def by_metric(metric)
    Measure.where(metric: metric)
  end
end
