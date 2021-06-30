# frozen_string_literal: true

module Api
  # The metrics controller it's an json controller that has only one endpoint to return the existent metrics
  class MetricsController < ApplicationController
    def index
      metrics_page = Metric.order(:name).page(current_page)
      metrics = metrics_page.map do |metric|
        { id: metric.id, name: metric.name, lastUpdate: metric.last_measure_at&.iso8601 }
      end
      render json: { data: metrics, page: { current: current_page, total: metrics_page.total_pages } }
    end

    def create
      Metric.create!(name: params.require(:name))
      render json: :nothing
    end

    private

    def current_page
      current_page = params[:page].to_i
      current_page.positive? ? current_page : 1
    end
  end
end
