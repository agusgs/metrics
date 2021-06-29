# frozen_string_literal: true

module Api
  # The metrics controller it's an json controller that has only one endpoint to return the existent metrics
  class MetricsController < ApplicationController
    def index
      metrics = ::Metric.all.map do |metric|
        { id: metric.id, name: metric.name, lastUpdate: metric.last_measure_at&.iso8601 }
      end
      render json: metrics
    end
  end
end
