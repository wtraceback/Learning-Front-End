from flask import Flask, jsonify
from flask_cors import cross_origin
from utils import responseData

app = Flask(__name__)


@app.route("/ssr/api/books", methods=["GET"])
@cross_origin()
def getData():
    books = [
        {
            "id": 1,
            "title": u"论语",
            "author": u"孔子",
            "price": 18
        },
        {
            "id": 2,
            "title": u"道德经",
            "author": u"老子",
            "price": 15
        }
    ]

    return jsonify(responseData(True, "", books))


@app.route("/ssr/api/isLogin", methods=["GET"])
@cross_origin()
def getLoginStatus():
    login = {
        "login": True,
    }

    return jsonify(responseData(True, "", login))
