from flask import Flask, request, jsonify
from convert import get_format

app = Flask(__name__)

# python3.11 -m venv hobbit
# source hobbit/bin/activate
# pip3 install nltk
# pip3 install flask
# python3 app.py


@app.route('/api/change_person', methods=['GET'])
def change_person():
    args = request.args
    sentence = args.get("sentence", default="", type=str)
    formatted = get_format(sentence)
    response = jsonify({'formatted': formatted.capitalize()})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=105)