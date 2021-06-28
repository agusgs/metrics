# frozen_string_literal: true

module Api
  # The measures controller it's an json controller that has only one endpoint to return the existent measures given an
  # existent metric
  class MeasuresController < ApplicationController
    def index
      metric = Metric.find(params.require(:metric_id))
      measures = Measures.for_metric(metric)

      response = {
        metric: {
          id: metric.id,
          name: metric.name
        },
        measures: measures.serialize
      }

      render json: response
    end
  end
end
