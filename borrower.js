/**
 * Resolve AI — Borrower Assistance Portal Logic (Phase 4)
 * Handles:
 *  1. Interactive AI Assistant Chatbot (Asha) with Text-to-Speech & Voice Mic
 *  2. Quick Prompt Action Chips & Hardship Offer Generation inside Chat
 *  3. Real-Time Repayment & EMI Calculator with Income/Expense Sliders
 *  4. Borrower Rights & Legal Protections Tab Switching
 *  5. Debt Resolution Timeline Tracker Updates (#borrower-tracker)
 *  6. Settlement Agreement & Digital Signed NOC Download Simulation with Confetti
 */

document.addEventListener('DOMContentLoaded', () => {
  initChatWidget();
  initRepaymentCalculator();
  initBorrowerRightsTabs();
  initSettlementModal();
});

/* ==========================================================================
   Global State
   ========================================================================== */
const state = {
  totalDue: 45000,
  income: 45000,
  expenses: 25000,
  tenure: 6, // default 6 months
  waiver: 5000,
  isVoiceEnabled: true,
  currentStep: 2, // 1: Identified, 2: Assessment, 3: Agreement, 4: NOC
};

/* ==========================================================================
   1. Interactive AI Debt Assistant Chat Widget (#borrower-chat-widget)
   ========================================================================== */
function initChatWidget() {
  const chatMessages = document.getElementById('chat-messages');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const typingIndicator = document.getElementById('typing-indicator');
  const speechToggleBtn = document.getElementById('speech-toggle-btn');
  const speechBtnLabel = document.getElementById('speech-btn-label');
  const resetChatBtn = document.getElementById('reset-chat-btn');
  const micBtn = document.getElementById('mic-btn');
  const quickChips = document.querySelectorAll('#quick-chips .chip-btn');

  // Speech Synthesis Toggle
  speechToggleBtn.addEventListener('click', () => {
    state.isVoiceEnabled = !state.isVoiceEnabled;
    if (state.isVoiceEnabled) {
      speechToggleBtn.classList.add('active');
      speechBtnLabel.textContent = 'Voice ON';
      showToast('🔊 AI Audio Speech turned ON');
    } else {
      speechToggleBtn.classList.remove('active');
      speechBtnLabel.textContent = 'Voice OFF';
      window.speechSynthesis && window.speechSynthesis.cancel();
      showToast('🔇 AI Audio Speech muted');
    }
  });

  // Reset Chat
  resetChatBtn.addEventListener('click', () => {
    location.reload();
  });

  // Voice Mic Input Simulation / Speech Recognition
  if (micBtn) {
    micBtn.addEventListener('click', () => {
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-IN';
        
        micBtn.classList.add('recording');
        showToast('🎙️ Listening... Speak your query clearly');
        
        recognition.onresult = (event) => {
          micBtn.classList.remove('recording');
          const transcript = event.results[0][0].transcript;
          chatInput.value = transcript;
          handleUserSend(transcript);
        };
        
        recognition.onerror = () => {
          micBtn.classList.remove('recording');
          showToast('⚠️ Voice recognition timeout. Try typing.');
        };
        
        recognition.start();
      } else {
        micBtn.classList.add('recording');
        setTimeout(() => {
          micBtn.classList.remove('recording');
          chatInput.value = 'I lost my job and want a 12-month EMI plan';
          showToast('🎙️ Voice simulated: "I lost my job and want a 12-month EMI plan"');
        }, 1200);
      }
    });
  }

  // Quick Chips Click Event
  quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const promptText = chip.getAttribute('data-prompt');
      if (promptText) {
        handleUserSend(promptText);
      }
    });
  });

  // Chat Form Submit
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (text) {
      handleUserSend(text);
      chatInput.value = '';
    }
  });

  function handleUserSend(text) {
    // Append User Message
    appendMessage(text, 'user');
    
    // Show Typing Indicator
    showTyping(true);

    // Simulate Agent Thinking Delay
    setTimeout(() => {
      showTyping(false);
      const botResponse = generateAgentResponse(text);
      appendMessage(botResponse.html, 'bot', botResponse.speechText);
    }, 900);
  }

  function appendMessage(content, sender, speechText = '') {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msgGroup = document.createElement('div');
    msgGroup.className = `msg-group ${sender}`;

    const iconClass = sender === 'bot' ? 'fa-robot' : 'fa-user';

    msgGroup.innerHTML = `
      <div class="msg-avatar">
        <i class="fa-solid ${iconClass}"></i>
      </div>
      <div class="msg-content">
        <div class="msg-bubble">${content}</div>
        <span class="msg-timestamp">${timeStr}</span>
      </div>
    `;

    chatMessages.insertBefore(msgGroup, typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Text to Speech Execution for Bot Messages
    if (sender === 'bot' && state.isVoiceEnabled && (speechText || content)) {
      speakText(speechText || stripHtml(content));
    }
  }

  function showTyping(show) {
    if (show) {
      typingIndicator.classList.add('active');
    } else {
      typingIndicator.classList.remove('active');
    }
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

/* AI Response Engine */
function generateAgentResponse(query) {
  const q = query.toLowerCase();

  if (q.includes('job') || q.includes('lost') || q.includes('unemployed') || q.includes('salary')) {
    return {
      html: `I completely understand, Rajesh ji. Experiencing a job disruption is tough, but we are here to support you. 
      <br><br>
      Under HDFC Bank's Hardship Protocol, we can grant an immediate <strong>₹5,000 Interest Waiver</strong> and spread your remaining balance of <strong>₹40,000 over 12 months at just ₹3,333/month</strong>.
      
      <div class="chat-offer-box">
        <h4><i class="fa-solid fa-gift"></i> Hardship Assistance Plan</h4>
        <ul>
          <li>Special Waiver: ₹5,000 (Balance drops to ₹40,000)</li>
          <li>Tenure: 12 Months @ <strong>₹3,333 / month</strong></li>
          <li>First EMI starts in 30 days</li>
        </ul>
        <button class="btn-chat-accept" onclick="window.selectChatPlan(12, 40000)">
          <i class="fa-solid fa-check-circle"></i> Select 12-Month Plan (₹3,333/mo)
        </button>
      </div>`,
      speechText: "I completely understand, Rajesh ji. Under HDFC Bank Hardship Protocol, we can grant an immediate 5,000 rupees waiver and spread your remaining balance over 12 months at just 3,333 rupees per month."
    };
  }

  if (q.includes('5000') || q.includes('5,000') || q.includes('emi') || q.includes('plan')) {
    return {
      html: `Here is the breakdown for a comfortable ₹5,000/month repayment option:
      <br><br>
      • Original Balance: ₹45,000
      <br>• Hardship Waiver: <strong>-₹5,000</strong>
      <br>• Net Payable: <strong>₹40,000</strong>
      <br>• Tenure: <strong>8 Months @ ₹5,000/month</strong>
      <br><br>
      This fits easily within your net surplus income. Would you like me to lock this plan for you now?`,
      speechText: "Here is the breakdown for a comfortable 5,000 rupees monthly plan. With our 5,000 rupees waiver, you can clear the balance in 8 monthly EMIs."
    };
  }

  if (q.includes('cibil') || q.includes('credit score') || q.includes('rating')) {
    return {
      html: `Great question, Rajesh ji! Resolving your account through Resolve AI positively impacts your credit history:
      <br><br>
      1. <strong>Immediate Freeze:</strong> All negative default reporting to CIBIL, Experian & Equifax is paused during your active EMI plan.
      <br>2. <strong>Score Rebound:</strong> Upon completing your final EMI, your score is projected to gain <strong>+65 to +80 Points</strong>.
      <br>3. <strong>Official Status:</strong> Account marked as <em>"Closed - Settled Satisfactory"</em> with full NOC document.`,
      speechText: "Resolving your loan through Resolve AI freezes negative reporting immediately and increases your CIBIL score by up to 80 points upon plan completion."
    };
  }

  if (q.includes('human') || q.includes('advisor') || q.includes('manager') || q.includes('talk')) {
    return {
      html: `Certainly! We respect your preference. You can speak with a senior HDFC Bank Settlement Officer:
      <br><br>
      📞 <strong>Direct Nodal Officer Line:</strong> 1800-RESOLVE (Ext: 4)
      <br>⏰ <strong>Callback Scheduled:</strong> A human officer has been notified to call you at your registered mobile ending in <strong>*4102</strong> within 15 minutes.`,
      speechText: "Certainly. A senior HDFC Bank settlement officer has been requested to call your registered mobile number within 15 minutes."
    };
  }

  if (q.includes('rbi') || q.includes('rights') || q.includes('law') || q.includes('harassment')) {
    return {
      html: `You are fully protected under RBI Fair Practice Code circulars:
      <br><br>
      • <strong>Zero Harassment:</strong> Strictly prohibited to contact family, workplace, or send unannounced physical agents.
      <br>• <strong>Strict Timings:</strong> Any official contact restricted between 8:00 AM and 7:00 PM only.
      <br>• <strong>Right to Written Receipt:</strong> Mandatory digital NOC issued immediately upon agreement lock.`,
      speechText: "You are 100% protected under RBI guidelines with zero harassment guarantee and strict communication timings."
    };
  }

  // Default Empathetic Fallback Response
  return {
    html: `Thank you for sharing that with me, Rajesh ji. We can customize your repayment plan based on your exact monthly budget. 
    <br><br>
    Try moving the <strong>Household Income slider</strong> in the calculator on your right, or choose a 3, 6, 9, or 12-month tenure. When you are ready, click <strong>"Lock This Repayment Plan"</strong> to receive your signed NOC!`,
    speechText: "Thank you for sharing that with me. We can customize your repayment plan based on your exact monthly budget."
  };
}

/* Global helper function called by buttons inside chat bubbles */
window.selectChatPlan = function(tenureMonths, agreedAmount) {
  // Update state
  state.tenure = tenureMonths;
  state.waiver = state.totalDue - agreedAmount;

  // Update Tenure Buttons
  const tenureBtns = document.querySelectorAll('.tenure-btn');
  tenureBtns.forEach(btn => {
    const t = parseInt(btn.getAttribute('data-tenure'), 10);
    if (t === tenureMonths) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update Calculator UI
  updateCalculatorUI();

  // Open Settlement Modal directly!
  openSettlementModal();
};

/* Speech Synthesis Web API */
function speakText(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel(); // Cancel any ongoing speech

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  utterance.pitch = 1.0;

  // Try to pick a smooth English/Indian female voice if available
  const voices = window.speechSynthesis.getVoices();
  const selectedVoice = voices.find(v => v.lang.includes('en-IN') || v.name.includes('India') || v.name.includes('Zira') || v.name.includes('Google US English'));
  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  window.speechSynthesis.speak(utterance);
}

function stripHtml(htmlStr) {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = htmlStr;
  return tmp.textContent || tmp.innerText || '';
}

/* ==========================================================================
   2. Interactive Repayment & EMI Calculator (#repayment-calc-card)
   ========================================================================== */
function initRepaymentCalculator() {
  const incomeRange = document.getElementById('income-range');
  const expenseRange = document.getElementById('expense-range');
  const incomeVal = document.getElementById('income-val');
  const expenseVal = document.getElementById('expense-val');
  const tenureBtns = document.querySelectorAll('.tenure-btn');
  const lockPlanBtn = document.getElementById('lock-plan-btn');

  // Income Slider Input
  incomeRange.addEventListener('input', (e) => {
    state.income = parseInt(e.target.value, 10);
    incomeVal.textContent = `₹${state.income.toLocaleString('en-IN')}`;
    updateCalculatorUI();
  });

  // Expense Slider Input
  expenseRange.addEventListener('input', (e) => {
    state.expenses = parseInt(e.target.value, 10);
    expenseVal.textContent = `₹${state.expenses.toLocaleString('en-IN')}`;
    updateCalculatorUI();
  });

  // Tenure Selection Buttons
  tenureBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tenureBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.tenure = parseInt(btn.getAttribute('data-tenure'), 10);
      updateCalculatorUI();
    });
  });

  // Lock Plan CTA Button
  lockPlanBtn.addEventListener('click', () => {
    openSettlementModal();
  });

  // Initial Calculation Run
  updateCalculatorUI();
}

function updateCalculatorUI() {
  const disposable = Math.max(0, state.income - state.expenses);
  
  // Dynamic Hardship Waiver logic:
  // If income <= 35,000 or expenses are high, increase waiver up to ₹7,500
  if (disposable < 15000) {
    state.waiver = 7500; // Hardship boost
  } else {
    state.waiver = 5000; // Standard waiver
  }

  const netPayable = Math.max(0, state.totalDue - state.waiver);
  const emi = Math.round(netPayable / state.tenure);

  // CIBIL Boost projection based on tenure
  let cibilBoost = 65;
  if (state.tenure === 3) cibilBoost = 80;
  if (state.tenure === 6) cibilBoost = 70;
  if (state.tenure === 9) cibilBoost = 60;
  if (state.tenure === 12) cibilBoost = 50;

  // Update DOM elements
  const disposableEl = document.getElementById('calc-disposable');
  const waiverEl = document.getElementById('calc-waiver');
  const emiEl = document.getElementById('calc-emi');
  const cibilEl = document.getElementById('cibil-projection');

  if (disposableEl) disposableEl.textContent = `₹${disposable.toLocaleString('en-IN')} / mo`;
  if (waiverEl) waiverEl.textContent = `- ₹${state.waiver.toLocaleString('en-IN')} (${((state.waiver / state.totalDue) * 100).toFixed(1)}% Off)`;
  if (emiEl) emiEl.textContent = `₹${emi.toLocaleString('en-IN')} / month`;
  if (cibilEl) cibilEl.textContent = `+${cibilBoost} Points Rebound (Target: ${680 + cibilBoost})`;
}

/* ==========================================================================
   3. Borrower Rights Tabs Switching
   ========================================================================== */
function initBorrowerRightsTabs() {
  const tabBtns = document.querySelectorAll('.rights-tabs-nav .tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(`tab-${targetId}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   4. Settlement Modal & Digital NOC Download Simulation (#settlement-modal)
   ========================================================================== */
function initSettlementModal() {
  const modal = document.getElementById('settlement-modal');
  const closeX = document.getElementById('modal-close-x');
  const cancelBtn = document.getElementById('modal-cancel-btn');
  const confirmBtn = document.getElementById('confirm-agreement-btn');
  const downloadBtn = document.getElementById('download-noc-btn');

  if (closeX) closeX.addEventListener('click', closeSettlementModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeSettlementModal);

  // Close modal when clicking backdrop outside dialog
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeSettlementModal();
      }
    });
  }

  // Confirm Agreement Action
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      // Trigger Celebration Confetti
      launchConfetti();

      // Update Modal to NOC Step
      document.getElementById('modal-step-terms').style.display = 'none';
      document.getElementById('modal-step-noc').style.display = 'block';

      // Update Buttons
      confirmBtn.style.display = 'none';
      cancelBtn.style.display = 'none';
      downloadBtn.style.display = 'inline-flex';

      // Update Timeline Tracker (#borrower-tracker)
      updateTimelineStep(4);

      showToast('🎉 Repayment Plan Locked & Official NOC Generated!');
    });
  }

  // Download NOC PDF Simulation Action
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      downloadNocFile();
    });
  }
}

function openSettlementModal() {
  const modal = document.getElementById('settlement-modal');
  if (!modal) return;

  const netPayable = Math.max(0, state.totalDue - state.waiver);
  const emi = Math.round(netPayable / state.tenure);

  // Populate Summary Details
  const modalWaiver = document.getElementById('modal-waiver-val');
  const modalAgreed = document.getElementById('modal-agreed-val');
  const modalTenure = document.getElementById('modal-tenure-val');
  const nocAmount = document.getElementById('noc-amount-text');
  const nocTenure = document.getElementById('noc-tenure-text');

  if (modalWaiver) modalWaiver.textContent = `- ₹${state.waiver.toLocaleString('en-IN')}`;
  if (modalAgreed) modalAgreed.textContent = `₹${netPayable.toLocaleString('en-IN')}`;
  if (modalTenure) modalTenure.textContent = `${state.tenure} EMIs @ ₹${emi.toLocaleString('en-IN')} / mo`;
  
  if (nocAmount) nocAmount.textContent = `₹${netPayable.toLocaleString('en-IN')}`;
  if (nocTenure) nocTenure.textContent = `${state.tenure} monthly EMIs of ₹${emi.toLocaleString('en-IN')}`;

  // Reset Modal Views
  document.getElementById('modal-step-terms').style.display = 'block';
  document.getElementById('modal-step-noc').style.display = 'none';

  const confirmBtn = document.getElementById('confirm-agreement-btn');
  const cancelBtn = document.getElementById('modal-cancel-btn');
  const downloadBtn = document.getElementById('download-noc-btn');

  if (confirmBtn) confirmBtn.style.display = 'inline-flex';
  if (cancelBtn) cancelBtn.style.display = 'inline-flex';
  if (downloadBtn) downloadBtn.style.display = 'none';

  modal.classList.add('open');

  // Update Tracker to Step 3 (Agreement in Progress)
  updateTimelineStep(3);
}

function closeSettlementModal() {
  const modal = document.getElementById('settlement-modal');
  if (modal) modal.classList.remove('open');
}

/* Update Debt Resolution Progress Tracker Bar (#borrower-tracker) */
function updateTimelineStep(stepNum) {
  state.currentStep = stepNum;

  const progressBar = document.getElementById('tracker-progress-bar');
  const statusText = document.getElementById('tracker-current-status-text');

  const step1 = document.getElementById('step-1');
  const step2 = document.getElementById('step-2');
  const step3 = document.getElementById('step-3');
  const step4 = document.getElementById('step-4');

  const steps = [step1, step2, step3, step4];

  if (stepNum === 3) {
    if (progressBar) progressBar.style.width = '70%';
    if (statusText) statusText.textContent = 'Step 3: Repayment Agreement Active';
    
    step1.className = 'tracker-step completed';
    step2.className = 'tracker-step completed';
    step3.className = 'tracker-step active';
    step4.className = 'tracker-step pending';
  } else if (stepNum === 4) {
    if (progressBar) progressBar.style.width = '100%';
    if (statusText) {
      statusText.textContent = '🎉 Step 4: Debt Free NOC Certificate Issued!';
      statusText.style.background = '#D1FAE5';
      statusText.style.color = '#059669';
    }

    step1.className = 'tracker-step completed';
    step2.className = 'tracker-step completed';
    step3.className = 'tracker-step completed';
    step4.className = 'tracker-step completed';
  }
}

/* Download Digital NOC Document File */
function downloadNocFile() {
  const netPayable = Math.max(0, state.totalDue - state.waiver);
  const emi = Math.round(netPayable / state.tenure);
  const dateStr = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  const nocTextContent = `
================================================================================
                        HDFC BANK LTD. & RESOLVE AI
                       NO DUES SETTLEMENT CERTIFICATE
================================================================================
Certificate Serial No: NOC-2026-HDFC-894102
Date of Issue        : ${dateStr}
Borrower Name        : Rajesh Sharma
Loan Account Number  : LA-894102
Lender Bank          : HDFC Bank Ltd.
Original Due Balance : ₹45,000

AGREED SETTLEMENT TERMS:
--------------------------------------------------------------------------------
1. Total Waiver Granted    : ₹${state.waiver.toLocaleString('en-IN')} (Hardship Special Relief)
2. Final Agreed Amount     : ₹${netPayable.toLocaleString('en-IN')}
3. Repayment Schedule      : ${state.tenure} Equal Monthly Installments
4. Monthly EMI Amount      : ₹${emi.toLocaleString('en-IN')} / month
5. First Installment Due   : 15th August 2026

CREDIT BUREAU & LEGAL GUARANTEE:
--------------------------------------------------------------------------------
- All recovery agent proceedings and calls stand PERMANENTLY WITHDRAWN.
- Upon completion of agreed EMIs, HDFC Bank shall update CIBIL status to 
  "CLOSED - SETTLED SATISFACTORY" within 30 days.
- Verified under RBI Digital Lending Framework 2023.

DIGITAL SIGNATURE SEAL:
[SHA-256 Signature: 9a8f7e6d5c4b3a21e0f98d7c6b5a4321]
Signed by: Resolve AI Autonomous Resolution Engine & HDFC Bank Recovery Desk
================================================================================
  `;

  const blob = new Blob([nocTextContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `HDFC_NOC_LA894102_Rajesh_Sharma.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  showToast('📄 Official Signed NOC Document downloaded!');
}

/* Confetti Launcher */
function launchConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  } else {
    // Canvas Fallback
    showToast('🎉 Congratulations on locking your debt-free plan!');
  }
}

/* Helper Toast Notification */
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-notification success';
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #10B981;"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
