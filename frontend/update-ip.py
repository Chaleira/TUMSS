import os
import socket

# Get local IP
def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except:
        return "127.0.0.1"

# Read .env file
env_file = ".env"
local_ip = get_local_ip()

if os.path.exists(env_file):
    with open(env_file, "r") as file:
        lines = file.readlines()
    
    # Replace or add LOCAL_IP
    with open(env_file, "w") as file:
        found = False
        for line in lines:
            if line.startswith("API_URL="):
                file.write(f"API_URL={local_ip}\n")
                found = True
            else:
                file.write(line)
        
        if not found:
            file.write(f"\nAPI_URL={local_ip}\n")
else:
    with open(env_file, "w") as file:
        file.write(f"API_URL={local_ip}\n")

print(f"✅ Local IP ({local_ip}) has been added to .env")
