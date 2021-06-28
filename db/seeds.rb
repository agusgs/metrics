# frozen_string_literal: true

temperature_metric = Metric.create(name: 'Temperature')
Metric.create(name: 'Http Requests count')

Measure.create(metric: temperature_metric, value: 10.23)
Measure.create(metric: temperature_metric, value: 11.23)
Measure.create(metric: temperature_metric, value: 10.13)
Measure.create(metric: temperature_metric, value: 9.242)
