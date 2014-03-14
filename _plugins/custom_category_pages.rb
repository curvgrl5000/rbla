If category is with tutorials...
if self.categories[index.data['category']].select { |post| post.categories[0] == 'tutorials' }.length != 0

  Specify a unique folder for /categories based on post type. In this case, /tutorials/categories
  target_dir = '/' + GenerateCategories.category_dir(self.config['category_tutorials_dir'], category)
 
  Use a unique layout file for this post type. In this case, tutorials_category_index.html
  index = CategoryIndex.new(self, self.source, target_dir, category, 'tutorials_category_index.html')

  Add category page to queue for export
  if index.render?
    self.pages << index
  end       

end                        