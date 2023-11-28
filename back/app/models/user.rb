class User < ApplicationRecord
  self.primary_key = :name
  validates :name, :password, presence: true
  validates :name, uniqueness: true
  has_secure_password
end
