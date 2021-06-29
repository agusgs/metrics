# frozen_string_literal: true

module Api
  # The measures controller it's an json controller that has only one endpoint to return the existent measures given an
  # existent metric
  class MeasuresController < ApplicationController
    def index
      metric = Metric.find(params.require(:metric_id))
      from_param = params[:from]
      from_filter = from_param ? DateTime.strptime(from_param, '%s').utc : nil
      measures = Measures.for_metric(metric, from_filter)

      response = {
        measures: measures.serialize
      }

      render json: response
    end
  end
end
