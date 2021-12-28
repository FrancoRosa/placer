from requests import post, get
from time import time
from json import dumps

url = 'http://localhost:9998'
data = {"piles": [
    {
        "distance": 9,
        "color": "pink"
    },
    {
        "distance": 10,
        "color": "back"
    }
]}
tic = time()
r = get(url)
toc = time()
print(r.text)
print('Time to make get request:', toc-tic)
tic = time()
r = post(url+'/api/rgb', json=data)
toc = time()
print(r.json())
print('Time to make post request:', toc-tic)
