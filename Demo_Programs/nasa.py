import requests

url = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"
response = requests.get(url)
print (response.text)
findpic_start = response.text.index("url") + 6
findpic_end = response.text.index('"', findpic_start)
pic_url = response.text[findpic_start:findpic_end]
print (pic_url)

file =open ("nasa.html", "w")
file.write("<html><body>")
file.write('<img src="' + pic_url + '">')
file.write("</body></html>")
file.close()


