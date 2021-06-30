# frozen_string_literal: true

require 'test_helper'

module Api
  module MetricsControllerTest
    class PostTest < ActionDispatch::IntegrationTest
      def create_metric(params)
        post '/api/metrics', params: params, as: :json
      end

      class MissingName < PostTest
        test 'return 401 message' do
          create_metric({})
          assert_response :bad_request
        end
      end

      class ExistentName < PostTest
        setup do
          @metric = Metric.create(name: 'thing')
        end

        test 'return 401 message' do
          create_metric({ name: @metric.name })
          assert_response :bad_request
        end
      end

      class CreateMetric < PostTest
        test 'creates the metric' do
          metrics = Metric.count
          metric_name = 'the name'

          assert_changes -> { Metric.count }, from: metrics, to: metrics + 1 do
            create_metric({ name: metric_name })
          end
          assert_response :success

          new_metric = Metric.last
          assert_equal metric_name, new_metric.name
        end
      end
    end
  end
end
