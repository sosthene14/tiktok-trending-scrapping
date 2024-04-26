from pathlib import Path
from tiktok_trending import download_video, get_new_posts, parse_response
import json
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/get_posts')
def get_posts():
    try:
        resp = get_new_posts()
        posts = parse_response(resp)
        post_list = []
        for p in posts:
            post_dict = {
                "authorName": p.author.nickname,
                "authorId": p.author.uniqueId,
                "videoId": p.video.id,
                "videoLink": f"https://www.tiktok.com/@{p.author.uniqueId}/video/{p.video.id}?is_from_webapp=1&sender_device=pc",
                "description": p.desc
            }
            post_list.append(post_dict)
        
        return jsonify(posts=post_list)
    except Exception as e:
        return jsonify(error=str(e)), 500

