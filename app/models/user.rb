class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :name, :email, :password, :password_confirmation, :remember_me, :role, :house_number, :road_name, :postcode, :company_name, :website, :contact_number, :user_image
  # attr_accessible :title, :body
  has_many :purchases
  has_many :events

  mount_uploader :user_image, UserImageUploader

  def random_user_homepage
    @users.each do |user|
      if user.role == "Supplier"
        find(:all).sample(5)
      end
    end
  end
end
