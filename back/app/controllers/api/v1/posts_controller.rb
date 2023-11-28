class Api::V1::PostsController < ApplicationController
  
  def index
    @posts = Post.all.order(created_at: :desc)
    posts_with_images = @posts.map do |post|
      post_data = post.as_json(include: :images)
      post_data.merge(
        images_url: post.images.map { |image| url_for(image) }
      )
    end
    render json: posts_with_images
  end
  
  def show
    @post = Post.find(params[:id])
    render json: @post.as_json(include: :images).merge(
      images_url: @post.images.map do |image|
        url_for(image)
      end
    )
  end

  def create
    @post = Post.new(post_params.except(:images))
    images = params[:post][:images]
    if images
      images.each do |image|
        @post.images.attach(image)
      end
    else
      @post.images.attach(io: File.open('/Users/watanabeyuki/Desktop/000006.jpg'), filename: '000006.jpg', content_type: 'image/jpeg')
    end
    if @post.save
      render json:@post, status: :created
    else
      render json:@post.errors, status: :unprocessable_entity
    end
  end

  def update
    @post = Post.find(params[:id])
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def destroy
      Post.find(params[:id]).destroy
  end

  private 

    def post_params
      params.require(:post).permit(:title, :content, images:[])
    end
end
