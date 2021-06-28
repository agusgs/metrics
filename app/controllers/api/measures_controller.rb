# frozen_string_literal: true

module Api
  # The measures controller it's an json controller that has only one endpoint to return the existent measures given an
  # existent metric
  class MeasuresController < ApplicationController
    def index
      measures = [
        { measure: 9.9, timestamp: DateTime.now.to_i },
        { measure: 9.2, timestamp: DateTime.now.to_i },
        { measure: 6.1, timestamp: DateTime.now.to_i },
        { measure: 5.4, timestamp: DateTime.now.to_i },
        { measure: 12.7, timestamp: DateTime.now.to_i }
      ]

      response = {
        id: 1,
        avgDay: 10.5,
        avgHour: 9.5,
        avgMin: 9.2,
        metric: {
          id: 1,
          name: 'metric name'
        },
        measures: measures
      }

      render json: response
    end
  end
end
