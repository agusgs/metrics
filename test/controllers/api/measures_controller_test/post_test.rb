# frozen_string_literal: true

require 'test_helper'

module Api
  module MeasuresControllerTest
    class PostTest < ActionDispatch::IntegrationTest
      def create_measure(params)
        post '/api/measures', params: params, as: :json
      end

      class MetricMissing < PostTest
        test 'return 401 message' do
          create_measure({ measure: rand(0.0...9.9) })
          assert_response :bad_request
        end
      end

      class MetricNotFound < PostTest
        test 'return 404 message' do
          create_measure({ metricId: Random.uuid, measure: rand(0.0...9.9) })
          assert_response :not_found
        end
      end

      class MissingMeasure < PostTest
        test 'return 401 message' do
          metric = Metric.create!(name: 'thing')
          create_measure({ metricId: metric.id })
          assert_response :bad_request
        end
      end

      class CreateMeasure < PostTest
        setup do
          @metric = Metric.create!(name: 'the name')
          @measure = rand(0.0...9.9).to_d
        end

        test 'returns success response' do
          measures_count = Measure.count
          assert_changes -> { Measure.count }, from: measures_count, to: measures_count + 1 do
            create_measure({ metricId: @metric.id, measure: @measure })
          end
          assert_response :success

          new_measure = Measure.last
          assert_equal @metric, new_measure.metric
          assert_equal @measure.truncate(2), new_measure.value.truncate(2)
        end
      end
    end
  end
end
