import sys
import yt_dlp
import json
import os

def download_audio(url, save_dir, file_name):
    file_path = os.path.join(save_dir, file_name)

    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': file_path,
        'noplaylist': True,
        # 'writethumbnail': True,
        'quiet': True,
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)
        metadata = {
            "title": info.get("title", ""),
            "artist": info.get("uploader", ""),
        }
        print(json.dumps(metadata))

if __name__ == "__main__":
    url = sys.argv[1]
    save_dir = sys.argv[2]
    file_name = sys.argv[3]
    download_audio(url, save_dir, file_name)
