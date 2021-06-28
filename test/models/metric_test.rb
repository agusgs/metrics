# frozen_string_literal: true

require 'test_helper'

class MetricTest < ActiveSupport::TestCase
  test 'a metric needs a name' do
    measure = Metric.new
    assert_not measure.valid?
    assert_equal :name, measure.errors.first.attribute
    assert_equal :blank, measure.errors.first.type
  end

  test 'a metric needs a unique name' do
    existent_name = 'the metric name'
    Metric.create(name: existent_name)

    measure = Metric.new(name: existent_name)
    assert_not measure.valid?
    assert_equal :name, measure.errors.first.attribute
    assert_equal :taken, measure.errors.first.type
  end
end
