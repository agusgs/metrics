# frozen_string_literal: true

module Api
  # The metrics controller it's an json controller that has only one endpoint to return the existent metrics
  class MetricsController < ApplicationController
    def index
      metrics = [
        { id: 1, name: 'metric 1', lastUpdate: DateTime.now.to_i },
        { id: 2, name: 'metric 2', lastUpdate: DateTime.now.to_i },
        { id: 3, name: 'metric 3', lastUpdate: DateTime.now.to_i },
        { id: 4, name: 'metric 4', lastUpdate: DateTime.now.to_i }
      ]

      render json: metrics
    end
  end
end
