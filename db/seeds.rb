# frozen_string_literal: true

# This is not what the seeds are meant to, but for the sake of simplicity i'll setup example cases here
temperature_metric = Metric.create!(name: 'Temperature')

100.times do
  Timecop.freeze(rand(1.week.ago...Time.now)) do
    Measure.create!(metric: temperature_metric, value: rand(15.0...30.999))
  end
end

memory_usage_metric = Metric.create!(name: 'Memory usage')

100.times do
  Timecop.freeze(rand(1.week.ago...Time.now)) do
    Measure.create!(metric: memory_usage_metric, value: rand(0.0...50.999))
  end
end
