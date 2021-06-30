# frozen_string_literal: true

require 'test_helper'

module Api
  module MetricsControllerTest
    class IndexTest < ActionDispatch::IntegrationTest
      class EmptyResponse < IndexTest
        setup do
          Metric.destroy_all
        end

        test 'returns empty response' do
          get '/api/metrics'

          assert_response :success
          assert_equal [], response.parsed_body['data']
        end
      end

      class SuccessResponse < IndexTest
        setup do
          @metric = Metric.create!(name: 'the name')
        end

        test 'returns success response' do
          get '/api/metrics'

          assert_response :success
          assert_equal 1, response.parsed_body['data'].count
          assert_equal @metric.name, response.parsed_body['data'].first['name']
          assert_equal @metric.id, response.parsed_body['data'].first['id']
        end
      end

      class PaginatedSuccessResponse < IndexTest
        test 'first success response' do
          create_metrics(1)
          get '/api/metrics?page=1'

          assert_response :success
          assert_equal 1, response.parsed_body['data'].count
        end

        test 'the 11th element goes to the next page' do
          create_metrics(11)
          get '/api/metrics?page=1'

          assert_response :success
          assert_equal 10, response.parsed_body['data'].count
        end

        test 'second page contains only one' do
          create_metrics(11)
          get '/api/metrics?page=2'

          assert_response :success
          assert_equal 1, response.parsed_body['data'].count
        end

        test 'the metrics are ordered alphabetically' do
          last_name = 'zzz'
          first_name = 'aaa'
          Metric.create!(name: last_name)
          Metric.create!(name: first_name)

          get '/api/metrics?page=1'

          assert_response :success
          assert_equal first_name, response.parsed_body['data'].first['name']
          assert_equal last_name, response.parsed_body['data'].second['name']
        end

        test 'the metrics are ordered alphabetically across pages' do
          last_name = 'zzz'
          with_a_prefix = 'a'

          Metric.create!(name: last_name)
          10.times { |i| Metric.create!(name: "#{with_a_prefix}#{i}") }

          get '/api/metrics?page=2'

          assert_response :success
          assert_equal last_name, response.parsed_body['data'].first['name']
        end

        test 'the response contains the page data' do
          total = 3
          current = 2
          create_metrics(total * 10)

          get "/api/metrics?page=#{current}"

          assert_response :success
          assert_equal current, response.parsed_body['page']['current']
          assert_equal total, response.parsed_body['page']['total']
        end

        test 'non existent page returns empty response' do
          create_metrics(1)

          get "/api/metrics?page=#{2}"

          assert_response :success
          assert_equal [], response.parsed_body['data']
        end

        private

        CHARSET = Array('A'..'Z') + Array('a'..'z')

        def create_metrics(number_of)
          number_of.times do
            Metric.create!(name: random_name)
          end
        end

        def random_name
          Array.new(10) { CHARSET.sample }.join
        end
      end
    end
  end
end
