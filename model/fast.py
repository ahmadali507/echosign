from fastapi import FastAPI
import random

app =  FastAPI()

@app.get('/')
async def root():
    return {'example' : "this is an example", 'data' : 0}; 
@app.get("/items/{item_id}")
def read_item(item_id : int , q : str | None = None):
        return { 'item)_id' : item_id, 'q' : q}
