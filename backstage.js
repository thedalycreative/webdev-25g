// MOCK DATA: Class List
// In a real app, this would come from a database.
const studentList = [
    { id: 'QS-001', firstName: 'Alice', lastName: 'Wonder', dob: '1995-04-12', checkedIn: false },
    { id: 'QS-002', firstName: 'Bob', lastName: 'Builder', dob: '1998-11-05', checkedIn: false },
    { id: 'QS-003', firstName: 'Charlie', lastName: 'Bucket', dob: '2001-02-28', checkedIn: false },
    { id: 'QS-004', firstName: 'Diana', lastName: 'Prince', dob: '1990-07-15', checkedIn: false },
    { id: 'QS-005', firstName: 'Evan', lastName: 'Hansen', dob: '2003-09-22', checkedIn: false },
    { id: 'QS-006', firstName: 'Fiona', lastName: 'Gallagher', dob: '1996-01-30', checkedIn: false },
    { id: 'QS-007', firstName: 'George', lastName: 'Jetson', dob: '1985-08-08', checkedIn: false },
    { id: 'QS-008', firstName: 'Hannah', lastName: 'Montana', dob: '1999-12-12', checkedIn: false },
    { id: 'QS-009', firstName: 'Ian', lastName: 'Malcolm', dob: '1978-06-03', checkedIn: false },
    { id: 'QS-010', firstName: 'Jack', lastName: 'Sparrow', dob: '1980-03-14', checkedIn: false },
    { id: 'QS-011', firstName: 'Katniss', lastName: 'Everdeen', dob: '2000-05-08', checkedIn: false }
];

// PROMO CODE LOGIC
const CORRECT_PROMO = "Quokkas2Train";
let promoGuesses = 0;

document.addEventListener('DOMContentLoaded', () => {
    populateChecklist();
    setupEventListeners();
});

function populateChecklist() {
    const tbody = document.getElementById('student-checklist');
    // Keep the trainer row, remove others if re-rendering (though we just append here)
    // Actually, let's just append the students.

    studentList.forEach(student => {
        const tr = document.createElement('tr');
        tr.id = `row-${student.id}`;
        tr.className = 'pending';
        tr.innerHTML = `
            <td class="status-cell">⬜ Waiting...</td>
            <td>${student.id}</td>
            <td>${student.firstName} ${student.lastName}</td>
        `;
        tbody.appendChild(tr);
    });
}

function setupEventListeners() {
    const form = document.getElementById('vip-form');
    const subjectSelect = document.getElementById('favSubject');
    const subjectDetailGroup = document.getElementById('subjectDetailGroup');

    // Initially hide detail group
    subjectDetailGroup.style.display = 'none';

    subjectSelect.addEventListener('change', () => {
        if (subjectSelect.value) {
            subjectDetailGroup.style.display = 'block';
            // Update placeholder based on selection for fun
            const subject = subjectSelect.options[subjectSelect.selectedIndex].text;
            document.getElementById('subjectDetail').placeholder = `What did you love about ${subject}?`;
        } else {
            subjectDetailGroup.style.display = 'none';
        }
    });

    // Link Holiday to Word Association Place
    const wordPlaceInput = document.getElementById('wordPlace');
    const promoInput = document.getElementById('promoCode');
    const promoMsg = document.getElementById('promoMessage');

    // Link Holiday to Word Association Place
    holidayInput.addEventListener('input', (e) => {
        wordPlaceInput.value = e.target.value;
    });

    // Checkbox Limit (Max 2)
    const minorCheckboxes = document.querySelectorAll('input[name="minorPower"]');
    minorCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            const checked = document.querySelectorAll('input[name="minorPower"]:checked');
            if (checked.length > 2) {
                cb.checked = false;
                alert("Whoa there! Max 2 Minor Powers only.");
            }
        });
    });

    // Promo Code Logic (Disable after 1 wrong guess on blur/change? Or submission? 
    // User said "after one guess disable... it won't submit" implies check on submit or verify button.
    // Let's check on blur for "one guess" feel, or strictly on submit. 
    // "After one guess disable... they can't try more"
    promoInput.addEventListener('change', () => {
        if (promoGuesses >= 1) return;

        if (promoInput.value !== CORRECT_PROMO && promoInput.value !== "") {
            promoGuesses++;
            promoInput.disabled = true;
            promoInput.style.borderColor = "red";
            promoMsg.textContent = "❌ Access Denied. Code locked.";
            promoMsg.style.color = "red";
        } else if (promoInput.value === CORRECT_PROMO) {
            promoInput.style.borderColor = "green";
            promoMsg.textContent = "✅ Access Granted: Trainer Mode";
            promoMsg.style.color = "green";
        }
    });

    // Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const dob = document.getElementById('dob').value;
        const studentId = document.getElementById('studentId').value.trim();

        // Find student in mock list
        const student = studentList.find(s => s.id === studentId);

        if (!student) {
            alert("❌ Student ID not found in the class list.");
            return;
        }

        // Validate Name & DOB
        const isNameMatch = student.firstName.toLowerCase() === firstName.toLowerCase() &&
            student.lastName.toLowerCase() === lastName.toLowerCase();

        if (!isNameMatch) {
            alert("❌ Name does not match the Student ID record.");
            return;
        }

        if (student.dob !== dob) {
            alert("❌ Date of Birth does not match our records.");
            return;
        }

        // Validate Promo Code for "Trainer" status in sheet
        const usedPromo = document.getElementById('promoCode').value;
        const isTrainer = usedPromo === CORRECT_PROMO;

        // SUCCESS!
        handleSuccess(student, isTrainer);
    });
}

function handleSuccess(student, isTrainer) {
    // 1. Update Visuals
    const row = document.getElementById(`row-${student.id}`);
    if (row) {
        row.className = 'checked-in';
        row.style.backgroundColor = getRandomColor(); // "Individually coloured rows"
        row.innerHTML = `
            <td>✅ 🥳 ✨</td>
            <td>${student.id}</td>
            <td>${student.firstName} ${student.lastName} ${isTrainer ? '🏆' : ''}</td>
        `;
    }

    // 2. Simulate Archive
    const formData = new FormData(document.getElementById('vip-form'));
    const dataObj = Object.fromEntries(formData.entries());
    console.log("📝 Archiving to Google Doc...", dataObj);
    alert(`🎉 Success! Welcome to the VIP Lounge, ${student.firstName}!`);

    // 3. Reset form
    document.getElementById('vip-form').reset();
    document.getElementById('promoCode').disabled = false; // Reset for demo purposes? Or keep locked? 
    // User said "disabled... can't try more". Better to keep locked or reset state cleanly.
    // Let's re-enable for the next person (demo flow).
    promoGuesses = 0;
    document.getElementById('promoMessage').textContent = "You have 1 guess.";
    document.getElementById('promoMessage').style.color = "inherit";
    document.getElementById('promoCode').style.borderColor = "#ddd";
}

function getRandomColor() {
    const colors = ['#ffebee', '#e3f2fd', '#f3e5f5', '#e8f5e9', '#fff3e0', '#fbe9e7', '#e0f7fa'];
    return colors[Math.floor(Math.random() * colors.length)];
}
