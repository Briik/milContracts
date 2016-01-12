require 'nokogiri'
require 'open-uri'

Contract.destroy_all

doc = Nokogiri::XML(open("http://www.defense.gov/DesktopModules/ArticleCS/RSS.ashx?max=1095&ContentType=400&Site=727")) do |config|
    config.options = Nokogiri::XML::ParseOptions::NONET
end

# use days as an array!  days[0] is the most recent day's report!
days = doc.xpath("//item")

for day in days do
    Contract.create({
     title: day.xpath("title").to_s.split("\n")[1],
     link: day.xpath("link").to_s.split(">")[1].split("<")[0],
     description: day.xpath("description").to_s.split("\n")[1],
     pubdate: DateTime.httpdate(day.xpath("pubDate").to_s.split(">")[1].split("<")[0]),
     dollar_amt: /(?=[$])[$,\d]{1,14}/.match(day.xpath("description").to_s).to_s,
     creator: day.xpath("dc:creator").to_s.split(">")[1].split("<")[0]
})
end

contracts = Contract.all
