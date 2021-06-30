# frozen_string_literal: true

module Api
  class ApplicationController < ::ApplicationController
    rescue_from Exception do |e|
      Rails.logger.error(e.message)
      render json: { error: e.message }, status: 500
    end

    rescue_from ActiveRecord::RecordNotFound do |e|
      render json: { error: e.message }, status: :not_found
    end

    rescue_from ActionController::ParameterMissing do |e|
      render json: { error: e.message }, status: :bad_request
    end

    rescue_from ActiveRecord::RecordInvalid do |e|
      render json: { error: e.message }, status: :bad_request
    end

  end
end
