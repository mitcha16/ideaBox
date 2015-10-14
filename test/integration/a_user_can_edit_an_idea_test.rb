require "rails_helper"

class EditItemsTest < ActionDispatch::IntegrationTest

  test 'user can edit items' do
    idea = Idea.create(title: 'lame title', body: 'body')
    
    visit edit_idea_path(idea.id)

    fill_in 'Title', with: 'cool title'
    click_button 'Update Idea'

    assert_equal 'cool title', Idea.all.last.title
  end
end
