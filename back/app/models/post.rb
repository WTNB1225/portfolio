class Post < ApplicationRecord
  include Rails.application.routes.url_helpers
  has_many_attached :images
end
