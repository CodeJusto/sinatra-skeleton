# Homepage (Root path)
get '/' do
  erb :index
end

get '/contacts' do
  @contacts = Contact.all
  headers("Content-Type" => "application/json")
  json @contacts.as_json
end

post '/create' do
  headers("Content-Type" => "application/json")
  @contact = Contact.new(
    name: params[:name],
    email: params[:email]
    )
  if @contact.save
    json @contact.as_json
  end
  ## Add an else statement to let people know there was an error
end

get '/delete/:id' do
  @contact = Contact.find(params[:id]).destroy
  headers("Content-Type" => "application/json") 
  json @contact.as_json
end

get '/show/:id' do
  @contact = Contact.find(params[:id])
  headers("Content-Type" => "application/json") 
  json @contact.as_json
end