async function loadJudgeDashboard() {
    try {
        // 1. Fetch the balanced 4:4 ratio from our backend
        const response = await fetch('/api/judge/daily-cause-list');
        const data = await response.json();

        const backlogContainer = document.getElementById('backlog-list');
        const freshContainer = document.getElementById('fresh-list');

        // Clear existing static placeholders
        backlogContainer.innerHTML = '';
        freshContainer.innerHTML = '';

        // 2. Separate and Render
        data.cases.forEach(caseItem => {
            const card = createCaseCard(caseItem);
            
            // Logic to place in correct column based on age (730 days = 2 years)
            const ageInDays = (new Date() - new Date(caseItem.createdAt)) / (1000 * 60 * 60 * 24);
            
            if (ageInDays > 730) {
                backlogContainer.appendChild(card);
            } else {
                freshContainer.appendChild(card);
            }
        });

    } catch (error) {
        console.error("Dashboard Load Failed:", error);
    }
}

function createCaseCard(item) {
    const div = document.createElement('div');
    // Apply "high-priority" class if adjournments are maxed or stay is active
    const priorityClass = (item.adjournmentCount >= 2 || item.stayOrder?.isActive) ? 'high-priority' : 'normal-priority';
    
    div.className = `case-card ${priorityClass}`;
    div.innerHTML = `
        <div class="card-header">
            <span class="case-id">#${item.caseNumber}</span>
            <span class="tag">${item.stayOrder?.isActive ? 'STAY ACTIVE' : item.status}</span>
        </div>
        <p class="case-title">${item.title}</p>
        <div class="stats">
            <span>Adjournments: ${item.adjournmentCount}/3</span>
            <span>Priority Score: ${item.priorityScore || 0}</span>
        </div>
        <button class="action-btn" onclick="openCaseDetails('${item._id}')">
            ${item.status === 'Investigation' ? 'Verify Evidence' : 'View Case'}
        </button>
    `;
    return div;
}

// Initialize on page load
window.onload = loadJudgeDashboard;
