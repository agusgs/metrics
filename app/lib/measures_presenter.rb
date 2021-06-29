# frozen_string_literal: true

# This class represents the group of measures that exists for a given metric and will be sent through the api
class MeasuresPresenter
  def self.for_metric(metric, from_filter)
    new(metric, from_filter)
  end

  def initialize(metric, from_filter)
    @from_filter = from_filter
    @per_day = by_metric(metric).avg_day
    @per_hour = by_metric(metric).avg_hour
    @per_minute = by_metric(metric).avg_minute
    @all = by_metric(metric).order(:created_at)
  end

  def get_average_minute(measure)
    @per_minute[measure.created_at.at_beginning_of_minute]
  end

  def get_average_hour(measure)
    @per_hour[measure.created_at.at_beginning_of_hour]
  end

  def get_average_day(measure)
    @per_day[measure.created_at.at_beginning_of_day]
  end

  def serialize
    @all.map do |measure|
      {
        timestamp: measure.created_at.iso8601,
        measure: measure.value.to_f,
        avgMinute: get_average_minute(measure).to_f,
        avgHour: get_average_hour(measure).to_f,
        avgDay: get_average_day(measure).to_f
      }
    end
  end

  private

  def map_all
    @all.map { |measure| { timestamp: measure.created_at.to_i, measure: measure.value.to_f } }
  end

  def map_average(averages)
    averages.map { |date, avg| { timestamp: date.to_i, measure: avg.to_f } }
  end

  def by_metric(metric)
    by_metric = Measure.where(metric: metric)
    if @from_filter
      by_metric.where('created_at > ?', @from_filter)
    else
      by_metric
    end
  end
end
