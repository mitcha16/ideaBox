require 'test_helper'

class Api::V1::IdeasControllerTest < ActionController::TestCase
  test '#show json' do
    get :show, format: :json, id: Idea.first.id

    item = JSON.parse(response.body, symbolize_names: :true)

    assert_equal 'idea 2', item[:title]
    assert_response :success
  end

  test '#index json' do
    get :index, format: :json

    item = JSON.parse(response.body, symbolize_names: :true)

    assert_equal 2, item.size
    assert_response :success
  end

  test '#create json' do
    assert_equal 2, Idea.all.size

    post :create, format: :json, idea: {title: 'idea 3', body: 'an idea'}

    assert_equal 3, Idea.all.size
    assert_response :success
  end

  test '#destroy json' do
    assert_equal 2, Idea.all.size

    delete :destroy, format: :json, id: Idea.first.id

    assert_equal 1,  Idea.all.size
    assert_response :success
  end
end
