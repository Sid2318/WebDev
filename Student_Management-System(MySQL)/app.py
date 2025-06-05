from flask_sqlalchemy import SQLAlchemy
from flask import Flask, render_template, request, jsonify
from datetime import datetime
from sqlalchemy import text

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']= "sqlite:///catalog.db"
app.secret_key = "siddhi_super_secret_key_123"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Student(db.Model):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    dob = db.Column(db.Date, nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    enrollment_year = db.Column(db.Integer, nullable=False)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/add_student", methods=["POST"])
def add_student():
    data = request.get_json()

    query = text("""
        INSERT INTO students (first_name, last_name, email, dob, gender, enrollment_year)
        VALUES (:first_name, :last_name, :email, :dob, :gender, :enrollment_year)
    """)
    db.session.execute(query, {
        "first_name": data["firstName"],
        "last_name": data["lastName"],
        "email": data["email"],
        "dob": data["dob"],
        "gender": data["gender"],
        "enrollment_year": int(data["enrollmentYear"])
    })
    db.session.commit()
    return jsonify({"status": "success"})


@app.route("/get_students", methods=["GET"])
def get_students():
    query = text("SELECT * FROM students ORDER BY student_id DESC")
    result = db.session.execute(query).fetchall()

    students = []
    for row in result:
        students.append({
            "student_id": row.id,
            "first_name": row.first_name,
            "last_name": row.last_name,
            "email": row.email,
            "dob": row.dob.strftime("%Y-%m-%d"),
            "gender": row.gender,
            "enrollment_year": row.enrollment_year
        })

    return jsonify(students)

@app.route("/delete_student/<int:student_id>", methods=["DELETE"])
def delete_student(student_id):
    query = text("DELETE FROM students WHERE student_id = :id")
    result = db.session.execute(query, {"id": student_id})
    db.session.commit()
    if result.rowcount == 0:
        return jsonify({"status": "error", "message": "Student not found"}), 404
    return jsonify({"status": "success", "message": f"Deleted student {student_id}"})


@app.route("/update_student/<int:student_id>", methods=["PUT"])
def update_student(student_id):
    data = request.get_json()

    query = text("""
        UPDATE students SET 
            first_name = :first_name,
            last_name = :last_name,
            email = :email,
            dob = :dob,
            gender = :gender,
            enrollment_year = :enrollment_year
        WHERE id = :id
    """)

    result = db.session.execute(query, {
        "first_name": data.get("firstName"),
        "last_name": data.get("lastName"),
        "email": data.get("email"),
        "dob": data.get("dob"),
        "gender": data.get("gender"),
        "enrollment_year": int(data.get("enrollmentYear")),
        "id": student_id
    })

    db.session.commit()
    if result.rowcount == 0:
        return jsonify({"status": "error", "message": "Student not found"}), 404

    return jsonify({"status": "success", "message": f"Updated student {student_id}"})


if __name__ == "__main__":
    app.run(debug=True)