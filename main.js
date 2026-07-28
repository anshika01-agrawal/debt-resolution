/**
 * Resolve AI — Main Landing Page Interactive Script (Phase 2)
 * Features:
 *  1. Interactive Hero Simulation Widget with Tab Switcher & Dynamic Ticker
 *  2. Master & Sub-Agent Flowchart Drawer Interactivity & Self-Healing Pulse
 *  3. Bank Defaulter Drag-and-Drop File Upload & Campaign Launcher
 *  4. Interactive ROI & Recovery Velocity Calculator
 *  5. Before vs After Canvas Chart Rendering (Chart.js / HTML5 Canvas)
 *  6. 22 Scheduled Indian Languages Interactive Preview & Audio Player
 *  7. Book Demo Modal with Backdrop & Success Animation
 *  8. Sticky Nav & Scroll Observer + Animated Stats Count-up
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarAndScroll();
  initStatsCountUp();
  initHeroInteractiveDemo();
  initAgentFlowchart();
  initBankFileUpload();
  initRoiCalculator();
  initRecoveryChart();
  initMultilingualSection();
  initDemoModal();
});

/* ==========================================================================
   1. STICKY NAVBAR & ACTIVE SECTION OBSERVER
   ========================================================================== */
function initNavbarAndScroll() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinksList = document.querySelector('.nav-links');

  // Sticky Navbar background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  if (mobileMenuBtn && navLinksList) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinksList.classList.toggle('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });
  }

  // Active section link observer
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   2. ANIMATED STATS COUNT-UP
   ========================================================================== */
function initStatsCountUp() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const animateStats = () => {
    statNumbers.forEach(stat => {
      const text = stat.innerText.trim();
      
      // Parse numerical targets
      if (text.includes('500')) {
        animateValue(stat, 0, 500, 1800, '₹', 'Cr+');
      } else if (text.includes('95')) {
        animateValue(stat, 0, 95, 1500, '', '%');
      } else if (text.includes('10,000') || text.includes('10000')) {
        animateValue(stat, 0, 10000, 2000, '', '+', true);
      } else if (text.includes('3')) {
        animateValue(stat, 0, 3, 1200, '', 'x');
      }
    });
  };

  function animateValue(obj, start, end, duration, prefix = '', suffix = '', formatComma = false) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out quad
      const currentVal = Math.floor(progress * (end - start) + start);
      const valStr = formatComma ? currentVal.toLocaleString('en-IN') : currentVal;
      obj.innerText = `${prefix}${valStr}${suffix}`;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  // Trigger when stats section is visible
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animated) {
        animated = true;
        animateStats();
      }
    }, { threshold: 0.3 });
    observer.observe(statsSection);
  }
}

/* ==========================================================================
   3. INTERACTIVE HERO SIMULATION WIDGET (#hero-interactive-demo)
   ========================================================================== */
function initHeroInteractiveDemo() {
  const container = document.getElementById('hero-interactive-demo');
  if (!container) return;

  const widget = container.querySelector('.hero-widget');
  if (!widget) return;

  // Insert Channel Switcher Tabs at top of widget body if not present
  let tabsHeader = widget.querySelector('.hero-channel-tabs');
  if (!tabsHeader) {
    tabsHeader = document.createElement('div');
    tabsHeader.className = 'hero-channel-tabs';
    tabsHeader.innerHTML = `
      <button class="channel-tab active" data-channel="whatsapp">
        <i class="fa-brands fa-whatsapp"></i> WhatsApp
      </button>
      <button class="channel-tab" data-channel="voice">
        <i class="fa-solid fa-phone-volume"></i> Voice Call
      </button>
      <button class="channel-tab" data-channel="email">
        <i class="fa-solid fa-envelope"></i> Email Notice
      </button>
      <button class="channel-tab" data-channel="sms">
        <i class="fa-solid fa-comment-sms"></i> SMS Quick Link
      </button>
    `;
    const header = widget.querySelector('.widget-header');
    if (header) {
      header.after(tabsHeader);
    } else {
      widget.prepend(tabsHeader);
    }
  }

  const stream = document.getElementById('hero-chat-stream');
  const badgePill = widget.querySelector('.widget-header .badge');
  const typingIndicator = widget.querySelector('.typing-indicator');

  // Channel Scenarios Data
  const scenarios = {
    whatsapp: {
      badge: 'Agent #1 (WhatsApp AI)',
      badgeClass: 'badge-success',
      typing: 'Agent 1 (WhatsApp) is drafting response',
      render: () => `
        <div class="chat-bubble agent animated-fade-in">
          Namaste Rahul ji. I am Resolve AI calling on behalf of Apex Bank. We noticed an outstanding EMI of ₹14,200. We understand times can be tough — would you like to structure a customized 3-month relief plan?
          <div class="chat-meta"><i class="fa-solid fa-robot"></i> Voice AI • Hindi/English Hybrid • 10:42 AM</div>
        </div>
        <div class="chat-bubble borrower animated-fade-in">
          I lost my job last month, I can't pay ₹45,000 right now...
          <div class="chat-meta"><i class="fa-solid fa-user"></i> Borrower • 10:43 AM</div>
        </div>
        <div class="chat-bubble agent animated-fade-in">
          We understand your situation completely. Can we break this into 4 monthly EMIs of ₹11,250 with 0% extra penalty?
          <div class="chat-meta"><i class="fa-solid fa-shield-halved"></i> Master Agent Approved • 10:43 AM</div>
        </div>
        <div class="chat-bubble borrower animated-fade-in">
          Yes, I can manage ₹11,250 per month!
          <div class="chat-meta"><i class="fa-solid fa-user"></i> Borrower • 10:44 AM</div>
        </div>
      `
    },
    voice: {
      badge: 'Agent #2 (Voice Dialect AI)',
      badgeClass: 'badge-primary',
      typing: 'Agent 2 (Voice Spectrum) active — Latency: 85ms',
      render: () => `
        <div class="voice-sim-card animated-fade-in">
          <div class="voice-status-bar">
            <div class="call-pulse-dot"></div>
            <span>Connected to +91 98765*****</span>
            <span class="lang-tag"><i class="fa-solid fa-language"></i> Switching Marathi → English</span>
          </div>
          <div class="waveform-container">
            <div class="wave-bar bar-1"></div>
            <div class="wave-bar bar-2"></div>
            <div class="wave-bar bar-3"></div>
            <div class="wave-bar bar-4"></div>
            <div class="wave-bar bar-5"></div>
            <div class="wave-bar bar-6"></div>
          </div>
          <div class="audio-transcript-box">
            <div class="transcript-line speaker-ai">
              <strong>Agent (Voice):</strong> "नमस्कार राहुल जी, आम्ही समजतो की सध्या काही अडचणी आहेत. आपण 4 सुलभ हप्त्यांमध्ये भरणा करू शकता का?"
            </div>
            <div class="transcript-line speaker-user">
              <strong>Borrower:</strong> "हो नक्कीच, दरमहा ₹11,250 भरणे शक्य आहे."
            </div>
          </div>
        </div>
      `
    },
    email: {
      badge: 'Agent #3 (Legal & Email)',
      badgeClass: 'badge-warning',
      typing: 'Agent 3 (Legal Auditor) verifying RBI FLDG Compliance',
      render: () => `
        <div class="email-sim-preview animated-fade-in">
          <div class="email-header">
            <div><strong>From:</strong> resolutions@apexbank-resolveai.in</div>
            <div><strong>To:</strong> rahul.sharma@email.com</div>
            <div><strong>Subject:</strong> Notice of Flexible EMI Hardship Relief — Loan #APX-9042</div>
          </div>
          <div class="email-body-text">
            Dear Mr. Sharma,<br><br>
            Under RBI Fair Debt Recovery Guidelines, Apex Bank has approved a <strong>0% Penalty Installment Proposal</strong> for your overdue balance of ₹45,000.<br><br>
            <div class="email-breakdown-table">
              <div><span>Option:</span> 4 Monthly Installments</div>
              <div><span>EMI Amount:</span> ₹11,250 / month</div>
              <div><span>First Due Date:</span> 5th August 2026</div>
            </div>
          </div>
          <button class="btn btn-primary btn-sm email-action-btn">
            <i class="fa-solid fa-lock"></i> Accept EMI Plan & Pay ₹11,250 Now
          </button>
        </div>
      `
    },
    sms: {
      badge: 'Agent #1 (SMS Dispatch)',
      badgeClass: 'badge-success',
      typing: 'Instant SMS Gateway Sent — Delivery Verified',
      render: () => `
        <div class="sms-sim-container animated-fade-in">
          <div class="sms-bubble received">
            [APEX BANK NOTICE]: Dear Borrower, your hardship request has been accepted. Pay 1st EMI of ₹11,250 with 0% penalty fee. Click secure link: <span class="sms-link">https://resolveai.in/pay/apx904</span> (Valid for 48 hrs).
            <div class="sms-meta">Sent via DLT Verified Gateway • 10:44 AM</div>
          </div>
          <div class="sms-bubble sent">
            Payment completed for ₹11,250. Ref: TXN987249182. Status: Restructured.
            <div class="sms-meta">Delivered • 10:46 AM</div>
          </div>
        </div>
      `
    }
  };

  // Tab switcher click handlers
  const tabButtons = tabsHeader.querySelectorAll('.channel-tab');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const channel = btn.dataset.channel;
      const scenario = scenarios[channel];
      if (scenario && stream) {
        stream.innerHTML = scenario.render();
        if (badgePill) {
          badgePill.className = `badge ${scenario.badgeClass}`;
          badgePill.innerText = scenario.badge;
        }
        if (typingIndicator) {
          typingIndicator.querySelector('span').innerText = scenario.typing;
        }
      }
    });
  });

  // Auto-ticker cycle every 6 seconds if user is idle
  let activeIndex = 0;
  const channelKeys = ['whatsapp', 'voice', 'email', 'sms'];
  let autoTimer = setInterval(() => {
    activeIndex = (activeIndex + 1) % channelKeys.length;
    const targetBtn = tabButtons[activeIndex];
    if (targetBtn && !container.matches(':hover')) {
      targetBtn.click();
    }
  }, 6000);
}

/* ==========================================================================
   4. MASTER AGENT & SUB-AGENT ARCHITECTURE INTERACTIVE FLOWCHART
   ========================================================================== */
function initAgentFlowchart() {
  const masterNode = document.querySelector('.master-agent-node');
  const subagentCards = document.querySelectorAll('.subagent-card');

  // Agent Stats Data for Drawer / Modal
  const agentDetails = {
    master: {
      title: 'Master Agent Oversight Engine',
      type: 'Central Orchestrator',
      icon: 'fa-brain',
      stats: {
        activeInstances: '1 Multi-Region Cluster (Self-Healing)',
        resolutionRate: '94.8% Overall Portfolio Success',
        systemHealth: '100% Nominal (0.4ms Decision Engine)',
        currentTask: 'Monitoring sub-agent compliance, real-time tone auditing & automated strategy switching'
      }
    },
    chat: {
      title: 'Agent 1: Chat AI (WhatsApp / SMS)',
      type: 'Sub-Agent #1',
      icon: 'fa-whatsapp',
      stats: {
        activeInstances: '4,120 Concurrent Threads',
        resolutionRate: '82% Instant EMI Conversion',
        systemHealth: '99.98% Gateway Uptime',
        currentTask: 'Drafting localized installment links & sending UPI payment mandates'
      }
    },
    voice: {
      title: 'Agent 2: Voice AI (22 Dialects)',
      type: 'Sub-Agent #2',
      icon: 'fa-phone-volume',
      stats: {
        activeInstances: '3,850 Active Dialers',
        resolutionRate: '89.4% Empathetic Settlement Rate',
        systemHealth: 'Latency: 85ms (High-Speed Neural Voice)',
        currentTask: 'Negotiating payment terms with regional language sentiment analysis'
      }
    },
    legal: {
      title: 'Agent 3: Legal & Regulatory Compliance',
      type: 'Sub-Agent #3',
      icon: 'fa-scale-balanced',
      stats: {
        activeInstances: '1,200 Real-Time Compliance Auditors',
        resolutionRate: '100% RBI & SARFAESI Compliance',
        systemHealth: '0 Infractions Flagged',
        currentTask: 'Scanning call transcripts for fair practice guidelines & hardship eligibility'
      }
    },
    human: {
      title: 'Agent 4: Human Escalation Desk',
      type: 'Sub-Agent #4',
      icon: 'fa-headset',
      stats: {
        activeInstances: '45 Standby Bank Officers',
        resolutionRate: '98% Complex Case Resolution',
        systemHealth: 'Average Transfer Time: < 12 seconds',
        currentTask: 'Handling severe hardship disputes & high-value commercial portfolio overrides'
      }
    }
  };

  // Create Agent Detail Drawer DOM
  let drawer = document.getElementById('agent-detail-drawer');
  if (!drawer) {
    drawer = document.createElement('div');
    drawer.id = 'agent-detail-drawer';
    drawer.className = 'agent-drawer';
    drawer.innerHTML = `
      <div class="drawer-content">
        <button class="drawer-close-btn">&times;</button>
        <div class="drawer-header">
          <div class="drawer-icon-box"><i class="fa-solid fa-robot"></i></div>
          <div>
            <span class="badge badge-primary drawer-badge">Agent Status</span>
            <h3 class="drawer-title">Agent Detail</h3>
          </div>
        </div>
        <div class="drawer-body">
          <div class="drawer-stat-row">
            <span class="stat-key"><i class="fa-solid fa-server"></i> Active Instances:</span>
            <span class="stat-val" id="drawer-instances">--</span>
          </div>
          <div class="drawer-stat-row">
            <span class="stat-key"><i class="fa-solid fa-chart-line"></i> Resolution Rate:</span>
            <span class="stat-val" id="drawer-rate">--</span>
          </div>
          <div class="drawer-stat-row">
            <span class="stat-key"><i class="fa-solid fa-heart-pulse"></i> System Health:</span>
            <span class="stat-val" id="drawer-health">--</span>
          </div>
          <div class="drawer-stat-box">
            <strong><i class="fa-solid fa-list-check"></i> Current Live Task:</strong>
            <p id="drawer-task">--</p>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(drawer);

    drawer.querySelector('.drawer-close-btn').addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  }

  function openDrawer(agentKey) {
    const data = agentDetails[agentKey];
    if (!data) return;

    const iconBox = drawer.querySelector('.drawer-icon-box');
    if (iconBox) iconBox.innerHTML = `<i class="fa-solid ${data.icon}"></i>`;
    drawer.querySelector('.drawer-badge').innerText = data.type;
    drawer.querySelector('.drawer-title').innerText = data.title;
    document.getElementById('drawer-instances').innerText = data.stats.activeInstances;
    document.getElementById('drawer-rate').innerText = data.stats.resolutionRate;
    document.getElementById('drawer-health').innerText = data.stats.systemHealth;
    document.getElementById('drawer-task').innerText = data.stats.currentTask;

    drawer.classList.add('open');
  }

  if (masterNode) {
    masterNode.style.cursor = 'pointer';
    masterNode.addEventListener('click', () => openDrawer('master'));
  }

  subagentCards.forEach((card, index) => {
    card.style.cursor = 'pointer';
    const keys = ['chat', 'voice', 'legal', 'human'];
    card.addEventListener('click', () => openDrawer(keys[index % keys.length]));
  });

  // Simulated Self-Healing Pulse for Master Agent
  const repairBadge = document.querySelector('.master-repair-badge');
  if (repairBadge) {
    setInterval(() => {
      repairBadge.classList.add('pulse-green-flash');
      repairBadge.innerHTML = `<i class="fa-solid fa-shield-check"></i> Health Check: All 4 Sub-Agents Nominal (100% Compliant)`;
      setTimeout(() => {
        repairBadge.classList.remove('pulse-green-flash');
      }, 2000);
    }, 8000);
  }
}

/* ==========================================================================
   5. BANK DEFAULTER FILE UPLOAD ZONE
   ========================================================================== */
function initBankFileUpload() {
  const dropzone = document.getElementById('bank-upload-dropzone');
  const browseBtn = document.getElementById('btn-browse-file');
  const fileInput = document.getElementById('file-input-hidden');
  const statusBox = document.getElementById('upload-file-status');

  if (!dropzone || !browseBtn || !fileInput) return;

  browseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    fileInput.click();
  });

  dropzone.addEventListener('click', () => {
    fileInput.click();
  });

  // Drag and Drop handlers
  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add('drag-over');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove('drag-over');
    }, false);
  });

  dropzone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
      handleFileUpload(fileInput.files[0]);
    }
  });

  function handleFileUpload(file) {
    const originalContent = dropzone.innerHTML;

    // Render animated upload progress bar
    dropzone.innerHTML = `
      <div class="upload-progress-wrapper" style="width: 100%; text-align: center; padding: 20px;">
        <div style="margin-bottom: 10px; font-weight: 600; color: var(--primary);">
          <i class="fa-solid fa-spinner fa-spin"></i> Parsing Defaulter Records: <strong>${file.name}</strong>
        </div>
        <div class="progress-track" style="height: 10px; background: rgba(91, 70, 232, 0.1); border-radius: 10px; overflow: hidden; margin-bottom: 8px;">
          <div class="progress-fill" id="upload-progress-fill" style="width: 0%; height: 100%; background: linear-gradient(90deg, var(--primary), var(--primary-light)); transition: width 0.1s linear;"></div>
        </div>
        <div style="font-size: 0.8rem; color: var(--text-muted);" id="upload-percent-text">0%</div>
      </div>
    `;

    const fill = document.getElementById('upload-progress-fill');
    const percentText = document.getElementById('upload-percent-text');
    let progress = 0;

    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 10;
      if (progress > 100) progress = 100;

      if (fill) fill.style.width = `${progress}%`;
      if (percentText) percentText.innerText = `${progress}%`;

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          renderUploadSuccess(file, originalContent);
        }, 400);
      }
    }, 120);
  }

  function renderUploadSuccess(file, originalContent) {
    dropzone.innerHTML = `
      <div class="upload-success-card" style="text-align: center; padding: 10px;">
        <div style="width: 48px; height: 48px; background: rgba(16, 185, 129, 0.1); color: var(--success); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; margin: 0 auto 12px auto;">
          <i class="fa-solid fa-circle-check"></i>
        </div>
        <h4 style="font-size: 1.1rem; color: var(--text-heading); margin-bottom: 4px;">Parsed 1,420 Defaulter Records</h4>
        <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 16px;">File: <strong>${file.name}</strong> • AI Portfolio Risk Categorized</p>

        <div class="cohort-badges-grid" style="display: flex; gap: 8px; justify-content: center; margin-bottom: 20px; flex-wrap: wrap;">
          <span class="badge badge-success" style="font-size: 0.78rem;"><i class="fa-solid fa-shield-check"></i> Low Risk: 62% (880)</span>
          <span class="badge badge-warning" style="font-size: 0.78rem;"><i class="fa-solid fa-triangle-exclamation"></i> Med Risk: 28% (398)</span>
          <span class="badge" style="background: rgba(239, 68, 68, 0.1); color: var(--danger); border: 1px solid rgba(239,68,68,0.2); font-size: 0.78rem;"><i class="fa-solid fa-circle-exclamation"></i> High Risk: 10% (142)</span>
        </div>

        <a href="dashboard.html" class="btn btn-primary btn-sm" style="margin-top: 4px;">
          <i class="fa-solid fa-rocket"></i> Launch AI Campaign in Dashboard
        </a>
      </div>
    `;

    if (statusBox) {
      statusBox.style.display = 'block';
      statusBox.innerHTML = `<i class="fa-solid fa-circle-check"></i> Ready! 1,420 Defaulters mapped into WhatsApp & Voice AI recovery queues.`;
    }
  }
}

/* ==========================================================================
   6. INTERACTIVE ROI & RECOVERY CALCULATOR
   ========================================================================== */
function initRoiCalculator() {
  const portfolioSlider = document.getElementById('input-portfolio-size');
  const currentRateSlider = document.getElementById('input-current-rate');

  const valPortfolio = document.getElementById('val-portfolio-size');
  const valCurrentRate = document.getElementById('val-current-rate');

  const resProjected = document.getElementById('res-projected-amount');
  const resRoiMultiplier = document.getElementById('res-roi-multiplier');

  if (!portfolioSlider || !resProjected) return;

  function calculateROI() {
    const portfolioSize = parseFloat(portfolioSlider.value) || 10000000;
    const currentRate = parseFloat(currentRateSlider ? currentRateSlider.value : 25) || 25;

    // Resolve AI avg recovery target: 82%
    const resolveAiRate = 82;
    const projectedAmount = Math.round(portfolioSize * (resolveAiRate / 100));
    const currentAmount = Math.round(portfolioSize * (currentRate / 100));

    const multiplier = (resolveAiRate / currentRate).toFixed(1);

    // Update DOM
    if (valPortfolio) {
      valPortfolio.innerText = formatIndianCurrency(portfolioSize);
    }
    if (valCurrentRate) {
      valCurrentRate.innerText = `${currentRate}%`;
    }

    resProjected.innerText = formatIndianCurrency(projectedAmount);
    if (resRoiMultiplier) {
      resRoiMultiplier.innerText = `${multiplier}x Recovery Velocity`;
    }
  }

  function formatIndianCurrency(num) {
    if (num >= 10000000) {
      const cr = (num / 10000000).toFixed(1);
      return `₹ ${cr} Crore`;
    } else if (num >= 100000) {
      const lakh = (num / 100000).toFixed(0);
      return `₹ ${lakh} Lakhs`;
    }
    return `₹ ${num.toLocaleString('en-IN')}`;
  }

  portfolioSlider.addEventListener('input', calculateROI);
  if (currentRateSlider) {
    currentRateSlider.addEventListener('input', calculateROI);
  }

  calculateROI();
}

/* ==========================================================================
   7. BEFORE VS AFTER RESOLVE AI CANVAS CHART (#recovery-chart)
   ========================================================================== */
function initRecoveryChart() {
  const canvas = document.getElementById('recovery-chart') || document.getElementById('recovery-chart-canvas');
  if (!canvas) return;

  // Check if Chart.js library is loaded
  if (typeof Chart !== 'undefined') {
    const ctx = canvas.getContext('2d');

    // Create high-end gradients
    const gradResolve = ctx.createLinearGradient(0, 0, 0, 200);
    gradResolve.addColorStop(0, 'rgba(91, 70, 232, 0.35)');
    gradResolve.addColorStop(1, 'rgba(91, 70, 232, 0.0)');

    const gradTrad = ctx.createLinearGradient(0, 0, 0, 200);
    gradTrad.addColorStop(0, 'rgba(203, 213, 225, 0.3)');
    gradTrad.addColorStop(1, 'rgba(203, 213, 225, 0.0)');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Day 0', 'DPD 7', 'DPD 14', 'DPD 21', 'DPD 30', 'DPD 45', 'DPD 60'],
        datasets: [
          {
            label: 'Resolve AI (Autonomous Multi-Agent)',
            data: [0, 38, 62, 79, 86, 91, 94],
            borderColor: '#5B46E8',
            borderWidth: 3,
            backgroundColor: gradResolve,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#5B46E8',
            pointRadius: 5,
            pointHoverRadius: 8
          },
          {
            label: 'Traditional Manual Agency',
            data: [0, 8, 16, 22, 26, 28, 31],
            borderColor: '#94A3B8',
            borderWidth: 2,
            borderDash: [5, 5],
            backgroundColor: gradTrad,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#94A3B8',
            pointRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false // Handled in custom HTML legend above canvas
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: '#1B1839',
            titleFont: { family: 'Outfit', size: 13 },
            bodyFont: { family: 'Inter', size: 12 },
            padding: 12,
            cornerRadius: 10,
            callbacks: {
              label: function(context) {
                return ` ${context.dataset.label}: ${context.parsed.y}% Recovered`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(235, 233, 248, 0.6)'
            },
            ticks: {
              font: { family: 'Inter', size: 11 },
              color: '#8380A4'
            }
          },
          y: {
            min: 0,
            max: 100,
            grid: {
              color: 'rgba(235, 233, 248, 0.6)'
            },
            ticks: {
              callback: function(val) { return val + '%'; },
              font: { family: 'Inter', size: 11 },
              color: '#8380A4'
            }
          }
        }
      }
    });
  }
}

/* ==========================================================================
   8. MULTILINGUAL SECTION INTERACTIVITY (22 Languages)
   ========================================================================== */
function initMultilingualSection() {
  const langSelect = document.getElementById('language-selector');
  const script1 = document.getElementById('audio-script-1');
  const script2 = document.getElementById('audio-script-2');
  const script3 = document.getElementById('audio-script-3');

  if (!langSelect) return;

  // Authentic translated audio transcript scripts for 22 scheduled Indian languages
  const translations = {
    hi: {
      s1: '"नमस्ते, क्या हम आपकी अगली ईएमआई के लिए एक आसान किस्त योजना बना सकते हैं?"',
      s2: '"आपकी छूट अनुरोध को बैंक द्वारा स्वीकृति मिल गई है।"',
      s3: '"भुगतान प्राप्त हुआ। आपका एनओसी सर्टिफिकेट व्हाट्सएप पर भेज दिया गया है।"'
    },
    bn: {
      s1: '"নমস্কার, আমরা কি আপনার পরবর্তী ইএমআই-এর জন্য একটি সহজ কিস্তি পরিকল্পনা করতে পারি?"',
      s2: '"আপনার ছাড়ের অনুরোধটি ব্যাংক কর্তৃক অনুমোদিত হয়েছে।"',
      s3: '"পেমেন্ট পাওয়া গেছে। আপনার এনওসি সার্টিফিকেট হোয়াটসঅ্যাপে পাঠানো হয়েছে।"'
    },
    mr: {
      s1: '"नमस्कार, आम्ही तुमच्या पुढील हप्त्यासाठी सुलभ हप्ता योजना करू शकतो का?"',
      s2: '"तुमची सवलत विनंती बँकेने मंजूर केली आहे."',
      s3: '"पैसे प्राप्त झाले. तुमचे एनओसी प्रमाणपत्र व्हॉट्सॲपवर पाठवले आहे."'
    },
    te: {
      s1: '"నమస్కారం, మీ తదుపరి EMI కోసం సులువైన వాయిదాల ప్లాన్ తయారు చేయవచ్చా?"',
      s2: '"మీ రద్దు అభ్యర్థనను బ్యాంక్ ఆమోదించింది."',
      s3: '"చెల్లింపు పూర్తయింది. మీ NOC సర్టిఫికేట్ వాట్సాప్‌కు పంపబడింది."'
    },
    ta: {
      s1: '"வணக்கம், உங்கள் அடுத்த EMI-க்கு எளிய தவணை திட்டத்தை உருவாக்கலாமா?"',
      s2: '"உங்கள் தள்ளுபடி கோரிக்கையை வங்கி அங்கீகரித்துள்ளது."',
      s3: '"கட்டணம் பெறப்பட்டது. உங்கள் NOC சான்றிதழ் வாட்ஸ்அப்பில் அனுப்பப்பட்டுள்ளது."'
    },
    gu: {
      s1: '"નમસ્તે, શું આપણે તમારા આગામી હપ્તા માટે સરળ હપ્તા યોજના બનાવી શકીએ?"',
      s2: '"તમારી મુક્તિ વિનંતી બેંક દ્વારા મંજૂર કરવામાં આવી છે."',
      s3: '"ચુકવણી મળી ગઈ છે. તમારું એનઓસી સર્ટિફિકેટ વોટ્સએપ પર મોકલવામાં આવ્યું છે."'
    },
    ur: {
      s1: '"السلام علیکم، کیا ہم आपकी اگلی قسط کے لیے آسان اقساط کا منصوبہ بنا سکتے ہیں؟"',
      s2: '"آپ کی رعایت کی درخواست بینک نے منظور کر لی ہے۔"',
      s3: '"ادائیگی موصول ہو گئی۔ آپ کا NOC سرٹیفکیٹ واٹس ایپ پر بھیج دیا گیا ہے۔"'
    },
    kn: {
      s1: '"ನಮಸ್ಕಾರ, ನಿಮ್ಮ ಮುಂದಿನ ಇಎಮ್‌ಐಗೆ ಸುಲಭ ಕಂತು ಯೋಜನೆಯನ್ನು ಮಾಡಬಹುದೇ?"',
      s2: '"ನಿಮ್ಮ ವಿನಾಯಿತಿ ವಿನಂತಿಯನ್ನು ಬ್ಯಾಂಕ್ ಅನುಮೋದಿಸಿದೆ."',
      s3: '"ಪಾವತಿ ಸ್ವೀಕರಿಸಲಾಗಿದೆ. ನಿಮ್ಮ NOC ಪ್ರಮಾಣಪತ್ರವನ್ನು ವಾಟ್ಸಾಪ್‌ಗೆ ಕಳುಹಿಸಲಾಗಿದೆ."'
    },
    or: {
      s1: '"ନମସ୍କାର, ଆମେ ଆପଣଙ୍କ ପରବର୍ତ୍ତୀ EMI ପାଇଁ ଏକ ସହଜ କିସ୍ତି ଯୋଜନା କରିପାରିବା କି?"',
      s2: '"ଆପଣଙ୍କ ରିହାତି ଅନୁରୋଧ ବ୍ୟାଙ୍କ ଦ୍ୱାରା ଅନୁମୋଦିତ ହୋଇଛି।"',
      s3: '"ପେମେଣ୍ଟ ପ୍ରାପ୍ତ ହେଲା। ଆପଣଙ୍କ NOC ସାର୍ଟିଫିକେଟ୍ ହ୍ୱାଟସ୍‌ଆପ୍‌ରେ ପଠାଯାଇଛି।"'
    },
    ml: {
      s1: '"നമസ്കാരം, നിങ്ങളുടെ അടുത്ത EMI-യ്ക്കായി ഒരു എളുപ്പ ഗഡു പ്ലാൻ തയ്യാറാക്കാമോ?"',
      s2: '"നിങ്ങളുടെ ഇളവ് അഭ്യർത്ഥന ബാങ്ക് അംഗീകരിച്ചു."',
      s3: '"പേയ്‌മെന്റ് ലഭിച്ചു. നിങ്ങളുടെ NOC സർട്ടിഫിക്കറ്റ് വാട്ട്‌സ്ആപ്പിൽ അയച്ചിട്ടുണ്ട്."'
    },
    pa: {
      s1: '"ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ, ਕੀ ਅਸੀਂ ਤੁਹਾਡੀ ਅਗਲੀ EMI ਲਈ ਆਸਾਨ ਕਿਸ਼ਤ ਯੋਜਨਾ ਬਣਾ ਸਕਦੇ ਹਾਂ?"',
      s2: '"ਤੁਹਾਡੀ ਛੋਟ ਦੀ ਬੇਨਤੀ ਨੂੰ ਬੈਂਕ ਦੁਆਰਾ ਮਨਜ਼ੂਰੀ ਦੇ ਦਿੱਤੀ ਗਈ ਹੈ।"',
      s3: '"ਭੁਗਤਾਨ ਪ੍ਰਾਪਤ ਹੋਇਆ। ਤੁਹਾਡਾ NOC ਸਰਟੀਫਿਕੇਟ ਵਟਸਐਪ ਤੇ ਭੇਜ ਦਿੱਤਾ ਗਿਆ ਹੈ।"'
    },
    as: {
      s1: '"নমস্কাৰ, আমি আপোনাৰ পৰৱৰ্তী EMI ৰ বাবে এটা সহজ কিস্তি পৰিকল্পনা কৰিব পাৰোনে?"',
      s2: '"আপোনাৰ ৰেহাইৰ অনুৰোধ বেংকে অনুমোদন জনাইছে।"',
      s3: '"পৰিশোধ প্ৰাপ্ত হ’ল। আপোনাৰ NOC প্ৰমাণপত্ৰ হোৱাটছএপলৈ প্ৰেৰণ কৰা হৈছে।"'
    },
    mai: {
      s1: '"प्रणाम, की हम अहॉंके अगिला ईएमआई लेल एकटा आसान किस्त योजना बना सकै छी?"',
      s2: '"अहॉंक छूट अनुरोध केँ बैंक स्वीकृत कऽ लेलक अछि।"',
      s3: '"भुगतान प्राप्त भेल। अहॉंक एनओसी प्रमाणपत्र व्हाट्सएप पर पठा देल गेल अछि।"'
    },
    mni: {
      s1: '"Khurumjari, nahaakgi mathanggi EMI gi maipakpa installment plan ama semba yaagabra?"',
      s2: '"Nahaakgi waiver request bank na approve toukhre."',
      s3: '"Payment phangkhre. Nahaakgi NOC certificate WhatsApp da thakhre."'
    },
    sat: {
      s1: '"Johar, chet abon ahang EMI lagit mito alga kist jojona bon banaw daare-a?"',
      s2: '"Abenah waiver nehor bank khon sary ena."',
      s3: '"Taka jam ena. Abenah NOC certificate WhatsApp re kol ena."'
    },
    ks: {
      s1: '"آداب، کیا ہِیو تُمہِینٛزِ اَگلی EMI خٲطِر اَکھ اٰسان قِسط یوجنا بَنٲوِتھ؟"',
      s2: '"تُہنز وِیور دَرخواست کٔر بینکَن مَنظوٗر۔"',
      s3: '"ادایَگی گٔے وَصول۔ تُہُنٛد NOC سرٹیفکیٹ وۆٹسایپَس پؠٹھ سوزنہٕ اٰو۔"'
    },
    ne: {
      s1: '"नमस्ते, के हामी तपाईंको आगामी EMI को लागि सजिलो किस्ता योजना बनाउन सक्छौं?"',
      s2: '"तपाईंको छुट अनुरोध बैंकद्वारा स्वीकृत भएको छ।"',
      s3: '"भुक्तानी प्राप्त भयो। तपाईंको NOC प्रमाणपत्र ह्वाट्सएपमा पठाइएको छ।"'
    },
    kok: {
      s1: '"नमस्कार, आम्ही तुमच्या मुखाविल्या EMI खातीर सोपी हप्त्याची येवजण करूंक शकतात काय?"',
      s2: '"तुमची सूट मागणूक बँकेन मानून घेतल्या।"',
      s3: '"पैसे मेळळे. तुमचे NOC प्रमाणपत्र व्हॉट्सॲप्पार धाडलां."'
    },
    doi: {
      s1: '"नमस्ते, क्या असेंगी थुंदी अगली ईएमआई आस्तै इक सोखी किश्त योजना बनाई सकदे आं?"',
      s2: '"थुंदी छूट दी अर्जी गी बैंकै मंजूरी देई दित्ती ऐ।"',
      s3: '"भुगतान मिली गेआ। थुंदा एनओसी प्रमाणपत्र व्हाट्सएप पर भेजी दित्ता गेआ ऐ।"'
    },
    brx: {
      s1: '"खुलुमबाय, जों नोंथांनि उनाव फैगोन EMI नि थाखाय गोरलै किस्ति प्लान बानायनो हायो नामा?"',
      s2: '"नोंथांनि रेहाय खालामनाय नार्नायखौ बैंकआ आफोद होबाय।"',
      s3: '"रां हरनाया मोन्नाय जाबाय। नोंथांनि NOC सार्टिफिकेटखौ हवाट्सएपआव हरबाय।"'
    },
    sd: {
      s1: '"سلام، ڇا اسين توھان جي ايندڙ EMI لاءِ ھڪ آسان قسط جي يوجنا ٺاھي سگھون ٿا؟"',
      s2: '"توھان جي ڇوٽ واري درخواست بينڪ پاران منظور ڪئي وئي آھي."',
      s3: '"ادائيگي حاصل ٿي وئي. توھان جو NOC سرٽيفڪيٽ واٽس ايپ تي موڪليو ويو آھي."'
    },
    sa: {
      s1: '"नमो नमः, किं वयम् भवतः अग्रिमाग्रिम-ईएमआई-कृते सुलभ-किस्त-योजनां रचयितुं शक्नुमः?"',
      s2: '"भवतः शिथिलीकरण-याचना कोषालयेन स्वीकृता।"',
      s3: '"भुगतानं प्राप्तम्। भवतः एनओसी-प्रमाणपत्रं व्हाट्सएप-माध्यमेन प्रेषितम्।"'
    }
  };

  langSelect.addEventListener('change', () => {
    const selectedLang = langSelect.value;
    const data = translations[selectedLang] || translations.hi;

    if (script1) script1.innerText = data.s1;
    if (script2) script2.innerText = data.s2;
    if (script3) script3.innerText = data.s3;
  });

  // Audio Player Simulation Buttons
  const playBtns = document.querySelectorAll('.play-btn');
  playBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.audio-preview-card');
      const waveformSpans = card ? card.querySelectorAll('.waveform-bar-sim span') : [];
      const icon = btn.querySelector('i');

      const isPlaying = btn.classList.contains('playing');

      // Stop all other playing buttons
      playBtns.forEach(b => {
        b.classList.remove('playing');
        const ic = b.querySelector('i');
        if (ic) { ic.className = 'fa-solid fa-play'; }
        const c = b.closest('.audio-preview-card');
        if (c) {
          c.querySelectorAll('.waveform-bar-sim span').forEach(s => s.style.animation = 'none');
        }
      });

      if (!isPlaying) {
        btn.classList.add('playing');
        if (icon) { icon.className = 'fa-solid fa-pause'; }
        waveformSpans.forEach((span, i) => {
          span.style.animation = `pulseWave 0.6s infinite ease-in-out alternate ${i * 0.15}s`;
        });
      }
    });
  });
}

/* ==========================================================================
   9. BOOK DEMO MODAL (#demo-modal)
   ========================================================================== */
function initDemoModal() {
  const modal = document.getElementById('demo-modal');
  const openBtns = document.querySelectorAll('.open-demo-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const form = document.getElementById('demo-form');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const originalFormHTML = form.innerHTML;

      form.innerHTML = `
        <div style="text-align: center; padding: 30px 10px;">
          <div style="width: 56px; height: 56px; background: rgba(16, 185, 129, 0.15); color: var(--success); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; margin: 0 auto 16px auto;" class="animated-bounce">
            <i class="fa-solid fa-circle-check"></i>
          </div>
          <h3 style="font-size: 1.3rem; color: var(--text-heading); margin-bottom: 8px;">Demo Requested!</h3>
          <p style="font-size: 0.9rem; color: var(--text-body); margin-bottom: 20px;">
            Our risk department team will contact you within <strong>2 hours</strong> to configure your platform demo.
          </p>
          <button class="btn btn-secondary btn-sm" id="btn-close-demo-success">Close Window</button>
        </div>
      `;

      const closeSuccessBtn = document.getElementById('btn-close-demo-success');
      if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener('click', () => {
          closeModal();
          setTimeout(() => { form.innerHTML = originalFormHTML; }, 500);
        });
      }
    });
  }
}
