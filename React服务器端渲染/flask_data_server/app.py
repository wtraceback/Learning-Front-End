from flask import Flask, jsonify
from flask_cors import cross_origin
from utils import responseData

app = Flask(__name__)

login_status = {
    "login": True,
}


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
def isLogin():
    return jsonify(responseData(True, "", login_status))


@app.route("/ssr/api/login", methods=["GET"])
@cross_origin()
def Login():
    login_status["login"] = True

    return jsonify(responseData(True, "", login_status))


@app.route("/ssr/api/logout", methods=["GET"])
@cross_origin()
def Logout():
    login_status["login"] = False

    return jsonify(responseData(True, "", login_status))
