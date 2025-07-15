from flask import Flask, request, jsonify
from flask_cors import CORS
from cost_calculator import calculate_integration_cost

app = Flask(__name__)
CORS(app)

@app.route('/calculate', methods=['POST'])
def calculate_cost():
    data = request.json
    result = calculate_integration_cost(
        industry=data['industry'],
        financing_model=data['financing_model'],
        site_counts=data['site_counts'],
        critical_systems=data['critical_systems']
    )
    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
