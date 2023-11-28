class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users, id:false do |t|
      t.string :name, primary_key: true
      t.string :password_digest

      t.timestamps
    end
  end
end
