/* ==========================================================================
   Resolve AI — Bank Master Dashboard Interactive Logic
   Handles real-time tickers, sub-agent controls, table filters, search,
   audit modal timelines, human intervention buttons, and file dropzone.
   ========================================================================== */

// 1. Full Realistic Indian Borrower Data Store (12 Accounts)
let borrowerData = [
  {
    id: 'LOAN-IN-8842',
    name: 'Rajesh Sharma',
    avatar: 'RS',
    loanType: 'Personal Loan',
    amount: '₹85,000',
    numericAmount: 85000,
    dpd: 45,
    stage: 'chat', // chat, call, legal, escalated, resolved
    stageLabel: 'Agent 1: Chat',
    sentiment: 'Cooperative (82%)',
    riskScore: 32,
    riskLevel: 'Low',
    lastActivity: 'Agreed to 3-part EMI plan via WhatsApp',
    timeline: [
      { time: '10 mins ago', channel: 'whatsapp', title: 'WhatsApp Bot Chat', text: 'Borrower: "I lost my job last month, but I can pay ₹25,000 by Friday if you structure the rest."' },
      { time: '2 hours ago', channel: 'call', title: 'Agent 2 IVR Voice Bot', text: 'Voice Bot offered 3-installment restructure plan. Borrower expressed willingness to settle.' },
      { time: '1 day ago', channel: 'whatsapp', title: 'Initial Outreach', text: 'Dispatched gentle payment reminder via WhatsApp with DPDP consent.' }
    ]
  },
  {
    id: 'LOAN-IN-7319',
    name: 'Sunita Patel',
    avatar: 'SP',
    loanType: 'Business Loan',
    amount: '₹2,10,000',
    numericAmount: 210000,
    dpd: 60,
    stage: 'call',
    stageLabel: 'Agent 2: Call',
    sentiment: 'Negotiating (64%)',
    riskScore: 54,
    riskLevel: 'Medium',
    lastActivity: 'Discussed 15% principal discount on Voice Call',
    timeline: [
      { time: '25 mins ago', channel: 'call', title: 'Agent 2 Voice Call (2m 14s)', text: 'Borrower requested a 20% waiver due to business cash flow delay. Bot proposed 15% max waiver.' },
      { time: '1 day ago', channel: 'whatsapp', title: 'WhatsApp Notification', text: 'Sent formal debt balance statement and settlement proposal document.' }
    ]
  },
  {
    id: 'LOAN-IN-9104',
    name: 'Amit Verma',
    avatar: 'AV',
    loanType: 'Auto Loan',
    amount: '₹45,000',
    numericAmount: 45000,
    dpd: 90,
    stage: 'legal',
    stageLabel: 'Agent 3: Legal',
    sentiment: 'Unresponsive (31%)',
    riskScore: 78,
    riskLevel: 'High',
    lastActivity: 'Pre-legal notice generated & sent via Speed Post',
    timeline: [
      { time: '1 hour ago', channel: 'legal', title: 'Agent 3 Legal Precursor Dispatched', text: 'Section 138 NI Act precursor notice dispatched via Speed Post + Registered Email.' },
      { time: '3 days ago', channel: 'call', title: 'IVR Call Unanswered', text: 'Call attempt 4: No answer. Master Agent escalated case to Agent 3 Legal Engine.' }
    ]
  },
  {
    id: 'LOAN-IN-6520',
    name: 'Priya Sundaram',
    avatar: 'PS',
    loanType: 'Credit Card Debt',
    amount: '₹1,25,000',
    numericAmount: 125000,
    dpd: 35,
    stage: 'chat',
    stageLabel: 'Agent 1: Chat',
    sentiment: 'Hardship Flagged (90%)',
    riskScore: 42,
    riskLevel: 'Medium',
    lastActivity: 'Medical emergency proof requested for EMI pause',
    timeline: [
      { time: '40 mins ago', channel: 'whatsapp', title: 'Medical Hardship Verification', text: 'Borrower submitted hospital admission certificate via WhatsApp document upload.' },
      { time: '4 hours ago', channel: 'whatsapp', title: 'Hardship Protocol Triggered', text: 'Master Agent enabled 30-day interest freeze protocol per RBI Guidelines.' }
    ]
  },
  {
    id: 'LOAN-IN-5291',
    name: 'Vikramaditya Singh',
    avatar: 'VS',
    loanType: 'Home Loan',
    amount: '₹3,40,000',
    numericAmount: 340000,
    dpd: 120,
    stage: 'escalated',
    stageLabel: 'Escalated',
    sentiment: 'Hostile (18%)',
    riskScore: 92,
    riskLevel: 'High',
    lastActivity: 'Master Agent assigned Human Officer oversight',
    timeline: [
      { time: '15 mins ago', channel: 'human', title: 'Human Officer Assigned', text: 'Master Agent detected high hostility & verbal refusal. Handover package generated.' },
      { time: '2 hours ago', channel: 'call', title: 'Voice Bot Safety Trigger', text: 'Borrower used abusive language. AI Voice Bot immediately terminated call safely.' }
    ]
  },
  {
    id: 'LOAN-IN-4482',
    name: 'Ananya Deshmukh',
    avatar: 'AD',
    loanType: 'Education Loan',
    amount: '₹1,75,000',
    numericAmount: 175000,
    dpd: 15,
    stage: 'resolved',
    stageLabel: 'Resolved',
    sentiment: 'Satisfied (96%)',
    riskScore: 12,
    riskLevel: 'Low',
    lastActivity: 'Full repayment received via UPI payment gateway link',
    timeline: [
      { time: '3 hours ago', channel: 'whatsapp', title: 'Payment Confirmation', text: 'Received ₹1,75,000 via Razorpay UPI link. Loan account closed successfully.' }
    ]
  },
  {
    id: 'LOAN-IN-3829',
    name: 'Rohan Kulkarni',
    avatar: 'RK',
    loanType: 'SME Working Capital',
    amount: '₹5,50,000',
    numericAmount: 550000,
    dpd: 75,
    stage: 'call',
    stageLabel: 'Agent 2: Call',
    sentiment: 'Callback Scheduled (72%)',
    riskScore: 58,
    riskLevel: 'Medium',
    lastActivity: 'Scheduled automated voice callback tomorrow 11 AM',
    timeline: [
      { time: '2 hours ago', channel: 'call', title: 'Voice Callback Scheduled', text: 'Borrower requested call back during business hours. Calendar lock confirmed.' }
    ]
  },
  {
    id: 'LOAN-IN-2910',
    name: 'Meera Reddy',
    avatar: 'MR',
    loanType: 'Personal Loan',
    amount: '₹62,000',
    numericAmount: 62000,
    dpd: 50,
    stage: 'chat',
    stageLabel: 'Agent 1: Chat',
    sentiment: 'Payment Committed (88%)',
    riskScore: 28,
    riskLevel: 'Low',
    lastActivity: 'UPI Payment link generated for ₹20,000 token',
    timeline: [
      { time: '5 mins ago', channel: 'whatsapp', title: 'UPI Link Dispatched', text: 'Borrower clicked payment link for ₹20,000 partial payment.' }
    ]
  },
  {
    id: 'LOAN-IN-1847',
    name: 'Karan Malhotra',
    avatar: 'KM',
    loanType: 'Commercial Vehicle',
    amount: '₹4,20,000',
    numericAmount: 420000,
    dpd: 105,
    stage: 'legal',
    stageLabel: 'Agent 3: Legal',
    sentiment: 'Legal Notice ACK (45%)',
    riskScore: 82,
    riskLevel: 'High',
    lastActivity: 'ACK signed for Section 138 precursor notification',
    timeline: [
      { time: '4 hours ago', channel: 'legal', title: 'Legal Notice Delivered', text: 'Postal tracking confirmed delivery of pre-litigation notice to borrower home address.' }
    ]
  },
  {
    id: 'LOAN-IN-6031',
    name: 'Deepak Kumar',
    avatar: 'DK',
    loanType: 'Microfinance Loan',
    amount: '₹28,500',
    numericAmount: 28500,
    dpd: 20,
    stage: 'resolved',
    stageLabel: 'Resolved',
    sentiment: 'Resolved (94%)',
    riskScore: 18,
    riskLevel: 'Low',
    lastActivity: 'Settlement plan completed (3 of 3 installments paid)',
    timeline: [
      { time: '1 day ago', channel: 'whatsapp', title: 'NOC Issued', text: 'No Objection Certificate (NOC) PDF dispatched to borrower via WhatsApp.' }
    ]
  },
  {
    id: 'LOAN-IN-7712',
    name: 'Sneha Gupta',
    avatar: 'SG',
    loanType: 'Consumer Durable',
    amount: '₹38,000',
    numericAmount: 38000,
    dpd: 40,
    stage: 'chat',
    stageLabel: 'Agent 1: Chat',
    sentiment: 'Active (78%)',
    riskScore: 35,
    riskLevel: 'Low',
    lastActivity: 'Selected Google Pay option on WhatsApp bot',
    timeline: [
      { time: '12 mins ago', channel: 'whatsapp', title: 'GPay Option Selected', text: 'Agent 1 generated instant UPI mandate link.' }
    ]
  },
  {
    id: 'LOAN-IN-8390',
    name: 'Arjun Mehta',
    avatar: 'AM',
    loanType: 'Business Equipment',
    amount: '₹6,80,000',
    numericAmount: 680000,
    dpd: 110,
    stage: 'escalated',
    stageLabel: 'Escalated',
    sentiment: 'Disputed Debt (25%)',
    riskScore: 89,
    riskLevel: 'High',
    lastActivity: 'Human Recovery Specialist assigned for offline visit',
    timeline: [
      { time: '30 mins ago', channel: 'human', title: 'Field Agent Assigned', text: 'Case assigned to Senior Recovery Officer S. K. Nair for in-person meeting.' }
    ]
  }
];

// Active State
let currentFilter = 'all';
let selectedBorrower = null;
let liveStreamTimer = null;
let agentStatus = { 1: true, 2: true, 3: true, 4: true };

// 2. DOM Initialization
document.addEventListener('DOMContentLoaded', () => {
  renderBorrowersTable();
  initSidebarToggle();
  initLiveActivityFeed();
  initSearchAndFilters();
  initDropzone();
  initSubagentListeners();
});

// 3. Render Table Records
function renderBorrowersTable() {
  const tbody = document.getElementById('borrowers-tbody');
  if (!tbody) return;

  const filtered = borrowerData.filter(b => {
    if (currentFilter === 'all') return true;
    return b.stage === currentFilter;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; padding: 30px; color: var(--text-muted);">
          <i class="fa-solid fa-folder-open" style="font-size: 2rem; margin-bottom: 8px; color: var(--border-subtle);"></i>
          <p>No borrower accounts found matching "${currentFilter}" filter.</p>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(b => {
    let pillClass = 'pill-chat';
    if (b.stage === 'call') pillClass = 'pill-call';
    else if (b.stage === 'legal') pillClass = 'pill-legal';
    else if (b.stage === 'escalated') pillClass = 'pill-escalated';
    else if (b.stage === 'resolved') pillClass = 'pill-resolved';

    let dpdClass = 'dpd-warning';
    if (b.dpd > 90) dpdClass = 'dpd-danger';

    let riskDotClass = 'risk-low';
    if (b.riskScore > 40 && b.riskScore <= 70) riskDotClass = 'risk-med';
    else if (b.riskScore > 70) riskDotClass = 'risk-high';

    return `
      <tr id="row-${b.id}">
        <td>
          <div class="borrower-meta-cell">
            <div class="borrower-avatar-initials">${b.avatar}</div>
            <div>
              <span class="borrower-name">${b.name}</span>
              <span class="borrower-id">${b.id}</span>
            </div>
          </div>
        </td>
        <td>
          <div style="font-weight: 600; color: var(--text-heading);">${b.loanType}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">HDFC-ACT-${b.id.split('-')[2]}</div>
        </td>
        <td>
          <div class="amount-text">${b.amount}</div>
        </td>
        <td>
          <span class="dpd-pill ${dpdClass}">${b.dpd} DPD</span>
        </td>
        <td>
          <span class="status-pill ${pillClass}">
            <i class="fa-solid ${getStageIcon(b.stage)}"></i> ${b.stageLabel}
          </span>
        </td>
        <td>
          <div class="risk-mini-badge">
            <span class="risk-dot ${riskDotClass}"></span>
            <span>${b.riskScore}/100</span>
          </div>
        </td>
        <td style="max-width: 220px;">
          <div style="font-size: 0.8rem; color: var(--text-body);" class="text-truncate">${b.lastActivity}</div>
          <div style="font-size: 0.72rem; color: var(--text-muted);">${b.sentiment}</div>
        </td>
        <td>
          <button class="btn-action-view" onclick="openBorrowerModal('${b.id}')">
            <i class="fa-solid fa-eye"></i> Audit
          </button>
        </td>
      </tr>
    `;
  }).join('');

  updateTabCounts();
}

function getStageIcon(stage) {
  switch (stage) {
    case 'chat': return 'fa-comments';
    case 'call': return 'fa-phone';
    case 'legal': return 'fa-scale-balanced';
    case 'escalated': return 'fa-shield-cat';
    case 'resolved': return 'fa-circle-check';
    default: return 'fa-circle';
  }
}

function updateTabCounts() {
  const counts = { all: borrowerData.length, chat: 0, call: 0, legal: 0, escalated: 0, resolved: 0 };
  borrowerData.forEach(b => {
    if (counts[b.stage] !== undefined) counts[b.stage]++;
  });

  for (let key in counts) {
    const el = document.getElementById(`count-${key}`);
    if (el) el.innerText = counts[key];
  }
}

// 4. Search and Stage Filter Tabs
function initSearchAndFilters() {
  const searchInput = document.getElementById('global-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const tbody = document.getElementById('borrowers-tbody');
      if (!tbody) return;

      const rows = tbody.querySelectorAll('tr');
      rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }

  const filterTabs = document.querySelectorAll('#stage-filter-tabs .tab-btn');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.getAttribute('data-filter');
      renderBorrowersTable();
    });
  });
}

// 5. Sidebar Toggle & Mobile View
function initSidebarToggle() {
  const toggleBtn = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        if (sidebar.classList.contains('collapsed')) {
          icon.className = 'fa-solid fa-chevron-right';
        } else {
          icon.className = 'fa-solid fa-chevron-left';
        }
      }
    });
  }
}

// 6. Live Auto-Updating Activity Ticker
const simulatedEventPool = [
  { icon: 'badge-whatsapp', iconFa: 'fa-whatsapp', tag: 'Agent 1: Chat', text: 'Rajesh S. selected 3-installment UPI plan on WhatsApp.' },
  { icon: 'badge-call', iconFa: 'fa-phone-volume', tag: 'Agent 2: Voice Bot', text: 'Agent 2 completed 2m 10s voice call with Sunita P. — 15% discount agreed.' },
  { icon: 'badge-legal', iconFa: 'fa-scale-balanced', tag: 'Agent 3: Legal', text: 'Legal notice auto-generated for LOAN-IN-9104 per DPDP Act guidelines.' },
  { icon: 'badge-human', iconFa: 'fa-user-shield', tag: 'Agent 4: Supervisor', text: 'High-risk case LOAN-IN-5291 flagged for Human Officer review.' },
  { icon: 'badge-whatsapp', iconFa: 'fa-whatsapp', tag: 'Agent 1: Chat', text: 'UPI payment receipt ₹20,000 confirmed for Meera R.' },
  { icon: 'badge-call', iconFa: 'fa-phone-volume', tag: 'Agent 2: Voice Bot', text: 'Voice callback locked for Rohan K. tomorrow 11:00 AM.' },
  { icon: 'badge-legal', iconFa: 'fa-scale-balanced', tag: 'Agent 3: Legal', text: 'Section 138 precursor postal tracking delivered for Karan M.' }
];

function initLiveActivityFeed() {
  const list = document.getElementById('activity-stream-list');
  if (!list) return;

  // Add initial items
  simulatedEventPool.slice(0, 4).forEach((ev, idx) => {
    appendActivityItem(ev, `${(idx + 1) * 3} mins ago`);
  });

  // Ticker interval every 3.5s
  liveStreamTimer = setInterval(() => {
    const randomEvent = simulatedEventPool[Math.floor(Math.random() * simulatedEventPool.length)];
    appendActivityItem(randomEvent, 'Just now');
    updateMasterTicker(randomEvent);
  }, 3500);
}

function appendActivityItem(ev, timeStr) {
  const list = document.getElementById('activity-stream-list');
  if (!list) return;

  const item = document.createElement('div');
  item.className = 'activity-item';
  item.innerHTML = `
    <div class="activity-icon-badge ${ev.icon}">
      <i class="fa-brands ${ev.iconFa} ${ev.iconFa.includes('whatsapp') ? '' : 'fa-solid'}"></i>
    </div>
    <div class="activity-details">
      <div class="activity-title-line">
        <span>${ev.tag}</span>
        <span class="activity-timestamp">${timeStr}</span>
      </div>
      <div class="activity-desc">${ev.text}</div>
    </div>
  `;

  list.insertBefore(item, list.firstChild);
  if (list.children.length > 20) {
    list.removeChild(list.lastChild);
  }
}

function updateMasterTicker(ev) {
  const ticker = document.getElementById('master-log-ticker');
  if (!ticker) return;
  const now = new Date();
  const timeStr = now.toTimeString().split(' ')[0];
  ticker.innerHTML = `[${timeStr}] <span class="log-highlight">${ev.tag}</span>: ${ev.text}`;
}

function filterActivityFeed(type) {
  const pills = document.querySelectorAll('.feed-pill');
  pills.forEach(p => p.classList.remove('active'));
  event.target.classList.add('active');

  showToast(`Filtering Live Feed by: ${type.toUpperCase()}`, 'info');
}

// 7. Sub-Agent Controls & Buttons
function initSubagentListeners() {
  const btnRebalance = document.getElementById('btn-rebalance-workload');
  if (btnRebalance) {
    btnRebalance.addEventListener('click', () => {
      showToast('Master Agent rebalancing workload across sub-agents...', 'success');
      updateMasterTicker({ tag: 'Master Agent', text: 'Workload rebalance triggered: Agent 1 (45%), Agent 2 (32%), Agent 3 (15%), Agent 4 (8%).' });
    });
  }

  const btnExport = document.getElementById('btn-export-report');
  if (btnExport) {
    btnExport.addEventListener('click', () => {
      showToast('Generating HDFC Debt Recovery Q3 Audit PDF Report...', 'success');
    });
  }

  const btnNotif = document.getElementById('btn-notifications');
  if (btnNotif) {
    btnNotif.addEventListener('click', () => {
      showToast('3 Pending Alerts: 2 legal approvals required, 1 hostile handover.', 'warning');
    });
  }

  const btnSettings = document.getElementById('btn-settings-toast');
  if (btnSettings) {
    btnSettings.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('System Rules: RBI Compliance, DPDP Privacy & Ethics Guardrails Active.', 'info');
    });
  }
}

function togglePauseAgent(agentId) {
  agentStatus[agentId] = !agentStatus[agentId];
  const badge = document.getElementById(`agent-status-badge-${agentId}`);
  const btn = document.getElementById(`btn-pause-${agentId}`);

  if (agentStatus[agentId]) {
    badge.className = 'subagent-status-tag status-active';
    badge.innerText = 'ACTIVE';
    btn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
    showToast(`Sub-agent ${agentId} RESUMED successfully.`, 'success');
    updateMasterTicker({ tag: `Agent ${agentId}`, text: `Sub-agent ${agentId} set to ACTIVE status by Bank Risk Admin.` });
  } else {
    badge.className = 'subagent-status-tag status-paused';
    badge.innerText = 'PAUSED';
    btn.innerHTML = '<i class="fa-solid fa-play"></i> Resume';
    showToast(`Sub-agent ${agentId} PAUSED by Risk Admin.`, 'warning');
    updateMasterTicker({ tag: `Agent ${agentId}`, text: `Sub-agent ${agentId} PAUSED by Bank Risk Admin.` });
  }
}

function adjustAgentTone(agentId) {
  showToast(`Agent ${agentId} Tone re-aligned to 'Empathy-First Professional'`, 'info');
}

function triggerForceCallBatch() {
  showToast('Forced Immediate Call Queue triggered for 50 high-priority accounts.', 'success');
}

function triggerLegalDraftBatch() {
  showToast('Generated 18 Section 138 compliance precursor notice drafts.', 'info');
}

function reviewPendingEscalations() {
  currentFilter = 'escalated';
  renderBorrowersTable();
  document.getElementById('borrower-table-section').scrollIntoView({ behavior: 'smooth' });
  showToast('Filtered table to 60 Escalated cases.', 'warning');
}

// 8. Borrower Modal & Multi-Channel Audit Timeline
function openBorrowerModal(borrowerId) {
  const b = borrowerData.find(x => x.id === borrowerId);
  if (!b) return;

  selectedBorrower = b;
  const modal = document.getElementById('borrower-modal');
  if (!modal) return;

  document.getElementById('modal-borrower-avatar').innerText = b.avatar;
  document.getElementById('modal-borrower-name').innerText = b.name;
  document.getElementById('modal-borrower-sub').innerText = `Loan ID: ${b.id} | ${b.loanType}`;
  document.getElementById('modal-outstanding').innerText = b.amount;
  document.getElementById('modal-dpd').innerText = `${b.dpd} Days`;
  document.getElementById('modal-stage-pill').innerHTML = `<i class="fa-solid ${getStageIcon(b.stage)}"></i> ${b.stageLabel}`;
  document.getElementById('modal-propensity').innerText = `${b.sentiment}`;
  
  const riskFill = document.getElementById('modal-risk-meter-fill');
  const riskText = document.getElementById('modal-risk-score-text');
  if (riskFill && riskText) {
    riskFill.style.width = `${b.riskScore}%`;
    riskText.innerText = `${b.riskScore}/100 (${b.riskLevel} Risk)`;
  }

  // Populate Timeline
  const timelineBox = document.getElementById('modal-timeline-box');
  if (timelineBox) {
    timelineBox.innerHTML = b.timeline.map(item => `
      <div class="timeline-item">
        <div class="timeline-icon ${getTimelineBadge(item.channel)}">
          <i class="fa-solid ${getTimelineIcon(item.channel)}"></i>
        </div>
        <div class="timeline-content-card">
          <div class="timeline-card-header">
            <span>${item.title}</span>
            <span style="font-size: 0.72rem; color: var(--text-muted);">${item.time}</span>
          </div>
          <div>${item.text}</div>
        </div>
      </div>
    `).join('');
  }

  modal.classList.add('active');
}

function getTimelineBadge(ch) {
  switch (ch) {
    case 'whatsapp': return 'badge-whatsapp';
    case 'call': return 'badge-call';
    case 'legal': return 'badge-legal';
    case 'human': return 'badge-human';
    default: return 'badge-call';
  }
}

function getTimelineIcon(ch) {
  switch (ch) {
    case 'whatsapp': return 'fa-comments';
    case 'call': return 'fa-phone';
    case 'legal': return 'fa-scale-balanced';
    case 'human': return 'fa-user-shield';
    default: return 'fa-clock';
  }
}

function closeBorrowerModal() {
  const modal = document.getElementById('borrower-modal');
  if (modal) modal.classList.remove('active');
}

function triggerHumanAction(actionType) {
  if (!selectedBorrower) return;

  switch (actionType) {
    case 'waiver':
      selectedBorrower.stage = 'resolved';
      selectedBorrower.stageLabel = 'Resolved (Waiver)';
      selectedBorrower.lastActivity = 'Human Officer authorized 15% settlement waiver';
      showToast(`Authorized 15% Waiver for ${selectedBorrower.name}`, 'success');
      break;
    case 'field':
      selectedBorrower.stage = 'escalated';
      selectedBorrower.stageLabel = 'Escalated (Field Ops)';
      selectedBorrower.lastActivity = 'Escalated to Field Operations team';
      showToast(`Field Operations assigned to ${selectedBorrower.name}`, 'warning');
      break;
    case 'legal':
      selectedBorrower.stage = 'legal';
      selectedBorrower.stageLabel = 'Agent 3: Legal';
      selectedBorrower.lastActivity = 'Custom legal notice dispatched';
      showToast(`Issued custom legal notice for ${selectedBorrower.name}`, 'info');
      break;
    case 'pause':
      showToast(`Paused AI outreach for ${selectedBorrower.name} for 7 days.`, 'info');
      break;
  }

  renderBorrowersTable();
  closeBorrowerModal();
}

// 9. Batch File Upload Modal & Drag-and-Drop
function openUploadModal() {
  const modal = document.getElementById('dashboard-upload-modal');
  if (modal) modal.classList.add('active');
}

function closeUploadModal() {
  const modal = document.getElementById('dashboard-upload-modal');
  if (modal) modal.classList.remove('active');
}

function initDropzone() {
  const openBtnHeader = document.getElementById('btn-open-upload-header');
  const openBtnNav = document.getElementById('btn-open-upload-nav');
  if (openBtnHeader) openBtnHeader.addEventListener('click', openUploadModal);
  if (openBtnNav) openBtnNav.addEventListener('click', (e) => { e.preventDefault(); openUploadModal(); });

  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('file-upload-input');

  if (dropzone && fileInput) {
    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
      }, false);
    });

    dropzone.addEventListener('drop', (e) => {
      const files = e.dataTransfer.files;
      if (files.length > 0) handleFileSelect(files[0]);
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) handleFileSelect(e.target.files[0]);
    });
  }
}

function handleFileSelect(file) {
  const statusBox = document.getElementById('upload-file-status');
  const fileNameEl = document.getElementById('upload-filename');
  const fileSizeEl = document.getElementById('upload-filesize');
  const submitBtn = document.getElementById('btn-submit-batch');

  if (statusBox && fileNameEl && fileSizeEl && submitBtn) {
    fileNameEl.innerText = file.name;
    fileSizeEl.innerText = `${(file.size / (1024 * 1024)).toFixed(2)} MB • 250 Defaulter Accounts Parsed`;
    statusBox.style.display = 'block';
    submitBtn.removeAttribute('disabled');
    showToast(`Parsed file "${file.name}" ready for Master Agent pipeline.`, 'success');
  }
}

function executeBatchUpload() {
  closeUploadModal();
  showToast('Deploying 250 Defaulter Accounts to Master Agent Pipeline...', 'success');

  // Dynamic row appending demo
  const newAccount = {
    id: `LOAN-IN-${Math.floor(1000 + Math.random() * 9000)}`,
    name: 'Siddharth Rao',
    avatar: 'SR',
    loanType: 'Personal Loan',
    amount: '₹1,15,000',
    numericAmount: 115000,
    dpd: 42,
    stage: 'chat',
    stageLabel: 'Agent 1: Chat',
    sentiment: 'Engaged (85%)',
    riskScore: 29,
    riskLevel: 'Low',
    lastActivity: 'New account ingested via Excel upload',
    timeline: [
      { time: 'Just now', channel: 'whatsapp', title: 'Pipeline Ingested', text: 'Batch uploaded from HDFC_NPA_Batch_Q3.xlsx' }
    ]
  };

  borrowerData.unshift(newAccount);
  renderBorrowersTable();
  
  // Update metric counters
  const totalValEl = document.getElementById('metric-total-portfolio');
  const activeCountEl = document.getElementById('metric-active-borrowers');
  if (totalValEl) totalValEl.innerText = '₹14.9 Cr';
  if (activeCountEl) activeCountEl.innerText = '1,421';
}

// 10. Toast Notification System
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  let iconFa = 'fa-info-circle';
  if (type === 'success') iconFa = 'fa-circle-check';
  else if (type === 'warning') iconFa = 'fa-triangle-exclamation';
  else if (type === 'danger') iconFa = 'fa-circle-xmark';

  toast.innerHTML = `
    <i class="fa-solid ${iconFa}" style="font-size: 1.1rem;"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
