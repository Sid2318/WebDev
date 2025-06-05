document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("studentForm");
  const tbody = document.querySelector("#studentsTable tbody");

  function fetchStudents() {
    fetch("/get_students")
      .then(res => res.json())
      .then(data => {
        tbody.innerHTML = "";
        data.forEach(student => {
          const tr = document.createElement("tr");

          tr.innerHTML = `
            <td><input type="text" value="${student.firstName}" data-id="${student.student_id}" data-field="firstName"></td>
            <td><input type="text" value="${student.lastName}" data-id="${student.student_id}" data-field="lastName"></td>
            <td><input type="email" value="${student.email}" data-id="${student.student_id}" data-field="email"></td>
            <td><input type="date" value="${student.dob}" data-id="${student.student_id}" data-field="dob"></td>
            <td>
              <select data-id="${student.student_id}" data-field="gender">
                <option value="Male" ${student.gender === "Male" ? "selected" : ""}>Male</option>
                <option value="Female" ${student.gender === "Female" ? "selected" : ""}>Female</option>
                <option value="Other" ${student.gender === "Other" ? "selected" : ""}>Other</option>
              </select>
            </td>
            <td><input type="number" value="${student.enrollmentYear}" data-id="${student.student_id}" data-field="enrollmentYear"></td>
            <td>
              <button class="updateBtn" data-id="${student.student_id}">Update</button>
              <button class="deleteBtn" data-id="${student.student_id}">Delete</button>
            </td>
          `;

          tbody.appendChild(tr);
        });
      });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      firstName: form.firstName.value.trim(),
      lastName: form.lastName.value.trim(),
      email: form.email.value.trim(),
      dob: form.dob.value,
      gender: form.gender.value,
      enrollmentYear: parseInt(form.enrollmentYear.value),
    };

    fetch("/add_student", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(() => {
        form.reset();
        fetchStudents();
      });
  });

  tbody.addEventListener("click", (e) => {
    if (e.target.classList.contains("updateBtn")) {
      const studentId = e.target.dataset.id;
      const tr = e.target.closest("tr");

      const data = {};
      tr.querySelectorAll("input, select").forEach(el => {
        const field = el.dataset.field;
        data[field] = el.value;
      });

      // Parse enrollmentYear to int
      data.enrollmentYear = parseInt(data.enrollmentYear);

      fetch(`/update_student/${studentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .then(() => {
          alert("Student updated successfully!");
          fetchStudents();
        });
    }

    if (e.target.classList.contains("deleteBtn")) {
      const studentId = e.target.dataset.id;
      if (confirm("Are you sure you want to delete this student?")) {
        fetch(`/delete_student/${studentId}`, {
          method: "DELETE"
        })
          .then(res => res.json())
          .then(() => {
            alert("Student deleted!");
            fetchStudents();
          });
      }
    }
  });

  // Initial fetch of students
  fetchStudents();
});
