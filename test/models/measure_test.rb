# frozen_string_literal: true

require 'test_helper'

class MeasureTest < ActiveSupport::TestCase
  setup do
    @metric = Metric.create!(name: 'test metric')
  end

  test 'a measure needs a value' do
    measure = Measure.new(metric: @metric)
    assert_not measure.valid?
    assert_equal :value, measure.errors.first.attribute
    assert_equal :blank, measure.errors.first.type
  end

  test 'a measure needs a metric' do
    measure = Measure.new(value: 0)
    assert_not measure.valid?
    assert_equal :metric, measure.errors.first.attribute
    assert_equal :blank, measure.errors.first.type
  end

  test 'a measure with value and metric is valid' do
    measure = Measure.new(metric: @metric, value: 0)
    assert measure.valid?
  end

  def assert_correct_averages_for(averages_block, first_date, second_date)
    value_1 = 1.123
    value_2 = 2.454
    first_expected_average = (value_1 + value_2) / 2

    value_3 = 123.32
    value_4 = 142.1311
    second_expected_average = (value_3 + value_4) / 2

    Timecop.freeze(first_date) do
      Measure.create!(metric: @metric, value: value_1)
      Measure.create!(metric: @metric, value: value_2)
    end

    Timecop.freeze(second_date) do
      Measure.create!(metric: @metric, value: value_3)
      Measure.create!(metric: @metric, value: value_4)
    end

    averages = averages_block.call
    dates = averages.keys

    assert_equal 2, dates.count
    assert_equal first_date.utc, dates.second
    assert_equal first_expected_average, averages[dates.second]
    assert_equal second_date, dates.first
    assert_equal second_expected_average, averages[dates.first]
  end

  test 'average measures per day' do
    assert_correct_averages_for(
      -> { Measure.avg_day },
      DateTime.now.utc.at_beginning_of_day,
      1.day.ago.utc.at_beginning_of_day
    )
  end

  test 'average measures per hour' do
    assert_correct_averages_for(
      -> { Measure.avg_hour },
      1.hour.ago.utc.at_beginning_of_hour,
      Time.now.utc.at_beginning_of_hour
    )
  end

  test 'average measures per minute' do
    assert_correct_averages_for(
      -> { Measure.avg_minute },
      1.minute.ago.utc.at_beginning_of_minute,
      Time.now.utc.at_beginning_of_minute
    )
  end
end
