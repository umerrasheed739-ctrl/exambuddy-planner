let subjects = JSON.parse(localStorage.getItem('mySubjects')) || [];
let totalHours = localStorage.getItem('totalStudyHours') || 0; // Alag storage

function addSubject() {
    const name = document.getElementById('subject').value;
    const weightage = document.getElementById('weightage').value;
    const hoursInput = document.getElementById('total-hours').value;

    if (!name || !weightage) return alert("Please fill Subject and Weightage!");
    
    // Agar naye hours diye hain to update karein
    if (hoursInput) {
        totalHours = hoursInput;
        localStorage.setItem('totalStudyHours', totalHours);
    }

    if (totalHours == 0) return alert("Please set Total Hours!");

    subjects.push({ name, weightage }); // Sirf data save karein
    localStorage.setItem('mySubjects', JSON.stringify(subjects));

    document.getElementById('subject').value = "";
    document.getElementById('weightage').value = "";
    renderSubjects();
}

function renderSubjects() {
    const list = document.getElementById('subject-list');
    list.innerHTML = ""; // Pehle list saaf karein
    
    // Check: Agar subjects khali hain toh kuch na karein
    if (subjects.length === 0) return;

    const totalWeight = subjects.reduce((sum, sub) => sum + parseInt(sub.weightage), 0);
    // Yahan totalHours use karein jo aapne globally define kiya hai
    
    subjects.forEach((sub, index) => {
        const percentage = totalWeight > 0 ? (sub.weightage / totalWeight) : 0;
        const allocatedHours = (percentage * totalHours).toFixed(1);
        
        const li = document.createElement('li');
        
        // Yahan updated professional styling wali innerHTML hai
        li.innerHTML = `
            <div>
                <strong>${sub.name}</strong> (${sub.weightage}%) 
                <br><small>Allocated: <strong>${allocatedHours} hours</strong></small>
            </div>
            <button class="delete-btn" onclick="deleteSubject(${index})">Delete</button>
        `;
        
        list.appendChild(li);
    });
}

function deleteSubject(index) {
    subjects.splice(index, 1);
    localStorage.setItem('mySubjects', JSON.stringify(subjects));
    renderSubjects();
}

renderSubjects();