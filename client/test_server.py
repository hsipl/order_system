import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Login(BaseModel):
    username:str
    password:str
    
    


@app.post("/login")
async def login(login_data:Login):
    
    if login_data.username=='h' and login_data.password=='123456': 
        status = '200'
    else :
        status='bad'
    print(status)
    return status

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)