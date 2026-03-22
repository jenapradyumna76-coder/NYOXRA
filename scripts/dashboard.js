// Priority Backlog Cases Data
const backlogCases = [
    {
        sl: 1,
        id: 'BP001',
        name: 'State vs. Kumar',
        description: 'Criminal appeal - Murder charge conviction review. High priority due to pending sentence appeal.'
    },
    {
        sl: 2,
        id: 'BP002',
        name: 'National Bank Ltd. vs. Sharma',
        description: 'Civil suit - Loan dispute involving Rs. 50 lakhs. Matter listed for final arguments hearing.'
    },
    {
        sl: 3,
        id: 'BP003',
        name: 'Gupta Enterprises vs. Ministry',
        description: 'Administrative case - Tax assessment challenge. Awaiting bench orders on preliminary objections.'
    },
    {
        sl: 4,
        id: 'BP004',
        name: 'People vs. Industrial Corp',
        description: 'Environmental violation case - Pollution control matter. Scheduled for witness examination.'
    },
    {
        sl: 5,
        id: 'BP005',
        name: 'Singh Family Trust vs. Others',
        description: 'Property litigation - Inheritance dispute over ancestral property. Case in final arguments stage.'
    }
];

// Fresh Filings Cases Data
const freshCases = [
    {
        sl: 1,
        id: 'FF001',
        name: 'Patel vs. Government',
        description: 'Constitutional petition - Right to education claim. Filed for urgent hearing consideration.'
    },
    {
        sl: 2,
        id: 'FF002',
        name: 'Tech Innovations Ltd. vs. Competitors',
        description: 'Intellectual property dispute - Patent infringement claim. Civil suit for damages and injunction.'
    },
    {
        sl: 3,
        id: 'FF003',
        name: 'Sharma Insurance vs. Claimants',
        description: 'Insurance claim rejection appeal. Parties submitted written statements. Awaiting evidence.'
    },
    {
        sl: 4,
        id: 'FF004',
        name: 'Municipal Authority vs. Developers',
        description: 'Land use violation case - Unauthorized construction complaint. Interim measures granted.'
    },
    {
        sl: 5,
        id: 'FF005',
        name: 'Rajesh vs. Landlord',
        description: 'Tenancy dispute - Unlawful eviction case. Preliminary hearing scheduled for next week.'
    }
];

// Function to render cases
function renderCases(cases, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = cases.map(caseData => `
        <div class="case-item" title="${caseData.description}">
            <div class="case-header">
                <span class="case-sl">#${caseData.sl}</span>
                <span class="case-id">${caseData.id}</span>
            </div>
            <div class="case-name">${caseData.name}</div>
            <div class="case-description-tooltip">${caseData.description}</div>
        </div>
    `).join('');
}

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', function() {
    renderCases(backlogCases, 'backlog-list');
    renderCases(freshCases, 'fresh-list');
});

// Fetch Dashboard Data Function
function fetchDashboardData() {
    console.log('Dashboard data refreshed');
    renderCases(backlogCases, 'backlog-list');
    renderCases(freshCases, 'fresh-list');
}
