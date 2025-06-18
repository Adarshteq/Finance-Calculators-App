document.addEventListener('DOMContentLoaded', function() {
            // DOM Elements
            const tabs = document.querySelectorAll('.tab');
            const calculators = document.querySelectorAll('.calculator');
            const themeToggle = document.getElementById('themeToggle');
            const languageSelect = document.getElementById('languageSelect');
            const currencySelect = document.getElementById('currencySelect');
            const installBtn = document.getElementById('installBtn');
            
            // Interest Calculator Elements
            const simpleInterestBtn = document.getElementById('simpleInterestBtn');
            const compoundInterestBtn = document.getElementById('compoundInterestBtn');
            const compoundFrequencyGroup = document.getElementById('compoundFrequencyGroup');
            const compoundFrequency = document.getElementById('compoundFrequency');
            const principalInput = document.getElementById('principal');
            const interestRateInput = document.getElementById('interestRate');
            const yearsInput = document.getElementById('years');
            const monthsInput = document.getElementById('months');
            const calculateBtn = document.getElementById('calculateBtn');
            const resetBtn = document.getElementById('resetBtn');
            const resultDiv = document.getElementById('result');
            const interestAmountDiv = document.getElementById('interestAmount');
            const totalAmountDiv = document.getElementById('totalAmount');
            const interestChart = document.getElementById('interestChart');
            const voicePrincipal = document.getElementById('voicePrincipal');
            const voiceRate = document.getElementById('voiceRate');
            const emailInterest = document.getElementById('emailInterest');
            const smsInterest = document.getElementById('smsInterest');
            const pdfInterest = document.getElementById('pdfInterest');
            const qrInterest = document.getElementById('qrInterest');
            const qrInterestContainer = document.getElementById('qrInterestContainer');
            
            // Bill Splitter Elements
            const equalSplitBtn = document.getElementById('equalSplitBtn');
            const weightedSplitBtn = document.getElementById('weightedSplitBtn');
            const weightContainer = document.getElementById('weightContainer');
            const weightInputs = document.getElementById('weightInputs');
            const billAmountInput = document.getElementById('billAmount');
            const taxRateInput = document.getElementById('taxRate');
            const peopleCountInput = document.getElementById('peopleCount');
            const customTipInput = document.getElementById('customTip');
            const splitCalculateBtn = document.getElementById('splitCalculateBtn');
            const splitResetBtn = document.getElementById('splitResetBtn');
            const splitResultDiv = document.getElementById('splitResult');
            const splitAmountDiv = document.getElementById('splitAmount');
            const detailsDiv = document.getElementById('details');
            const splitChart = document.getElementById('splitChart');
            const tipButtons = document.querySelectorAll('.tip-btn');
            const voiceBill = document.getElementById('voiceBill');
            const emailSplit = document.getElementById('emailSplit');
            const smsSplit = document.getElementById('smsSplit');
            const pdfSplit = document.getElementById('pdfSplit');
            const qrSplit = document.getElementById('qrSplit');
            const qrSplitContainer = document.getElementById('qrSplitContainer');
            
            // Itemized Bill Elements
            const peopleNames = document.getElementById('peopleNames');
            const itemTaxRate = document.getElementById('itemTaxRate');
            const itemTipRate = document.getElementById('itemTipRate');
            const addItemBtn = document.getElementById('addItemBtn');
            const itemList = document.getElementById('itemList');
            const calculateItemBtn = document.getElementById('calculateItemBtn');
            const resetItemBtn = document.getElementById('resetItemBtn');
            const itemResult = document.getElementById('itemResult');
            const itemSummary = document.getElementById('itemSummary');
            const itemChart = document.getElementById('itemChart');
            const emailItem = document.getElementById('emailItem');
            const smsItem = document.getElementById('smsItem');
            const pdfItem = document.getElementById('pdfItem');
            const qrItem = document.getElementById('qrItem');
            const qrItemContainer = document.getElementById('qrItemContainer');
            
            // Debt Settlement Elements
            const debtPeople = document.getElementById('debtPeople');
            const addDebtBtn = document.getElementById('addDebtBtn');
            const debtList = document.getElementById('debtList');
            const calculateDebtBtn = document.getElementById('calculateDebtBtn');
            const resetDebtBtn = document.getElementById('resetDebtBtn');
            const debtResult = document.getElementById('debtResult');
            const settlementPlan = document.getElementById('settlementPlan');
            const emailDebt = document.getElementById('emailDebt');
            const smsDebt = document.getElementById('smsDebt');
            const pdfDebt = document.getElementById('pdfDebt');
            const qrDebt = document.getElementById('qrDebt');
            const qrDebtContainer = document.getElementById('qrDebtContainer');
            
            // History Elements
            const clearHistoryBtn = document.getElementById('clearHistoryBtn');
            const historyList = document.getElementById('historyList');
            
            // Variables
            let selectedTip = 0;
            let selectedCurrency = 'INR';
            let currencySymbol = '₹';
            let currentTheme = 'light';
            let history = [];
            let recognition;
            
            // Initialize the app
            initApp();
            
            // Event Listeners
            // Tab switching
            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    // Remove active class from all tabs and calculators
                    tabs.forEach(t => t.classList.remove('active'));
                    calculators.forEach(c => c.classList.remove('active'));
                    
                    // Add active class to clicked tab and corresponding calculator
                    this.classList.add('active');
                    const tabId = this.getAttribute('data-tab');
                    document.getElementById(tabId).classList.add('active');
                });
            });
            
            // Theme toggle
            themeToggle.addEventListener('click', toggleTheme);
            
            // Currency selection
            currencySelect.addEventListener('change', function() {
                selectedCurrency = this.value;
                currencySymbol = getCurrencySymbol(selectedCurrency);
                updateCurrencySymbols();
            });
            
            // Install PWA
            installBtn.addEventListener('click', installPWA);
            
            // Interest Calculator
            simpleInterestBtn.addEventListener('click', function() {
                simpleInterestBtn.classList.add('active');
                compoundInterestBtn.classList.remove('active');
                compoundFrequencyGroup.style.display = 'none';
            });
            
            compoundInterestBtn.addEventListener('click', function() {
                compoundInterestBtn.classList.add('active');
                simpleInterestBtn.classList.remove('active');
                compoundFrequencyGroup.style.display = 'block';
            });
            
            calculateBtn.addEventListener('click', calculateInterest);
            resetBtn.addEventListener('click', resetInterestForm);
            emailInterest.addEventListener('click', () => shareResult('interest'));
            smsInterest.addEventListener('click', () => shareResult('interest', 'sms'));
            pdfInterest.addEventListener('click', () => exportAsPDF('interest'));
            qrInterest.addEventListener('click', () => showQRCode('interest'));
            
            // Bill Splitter
            equalSplitBtn.addEventListener('click', function() {
                equalSplitBtn.classList.add('active');
                weightedSplitBtn.classList.remove('active');
                weightContainer.style.display = 'none';
            });
            
            weightedSplitBtn.addEventListener('click', function() {
                weightedSplitBtn.classList.add('active');
                equalSplitBtn.classList.remove('active');
                weightContainer.style.display = 'block';
                updateWeightInputs();
            });
            
            splitCalculateBtn.addEventListener('click', calculateSplit);
            splitResetBtn.addEventListener('click', resetSplitForm);
            customTipInput.addEventListener('input', handleCustomTip);
            emailSplit.addEventListener('click', () => shareResult('split'));
            smsSplit.addEventListener('click', () => shareResult('split', 'sms'));
            pdfSplit.addEventListener('click', () => exportAsPDF('split'));
            qrSplit.addEventListener('click', () => showQRCode('split'));
            
            // Add event listeners to tip buttons
            tipButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons
                    tipButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    // Set selected tip
                    selectedTip = parseFloat(this.getAttribute('data-tip'));
                    customTipInput.value = '';
                });
            });
            
            // Itemized Bill
            peopleCountInput.addEventListener('input', updateWeightInputs);
            addItemBtn.addEventListener('click', addItem);
            calculateItemBtn.addEventListener('click', calculateItemizedBill);
            resetItemBtn.addEventListener('click', resetItemizedForm);
            emailItem.addEventListener('click', () => shareResult('item'));
            smsItem.addEventListener('click', () => shareResult('item', 'sms'));
            pdfItem.addEventListener('click', () => exportAsPDF('item'));
            qrItem.addEventListener('click', () => showQRCode('item'));
            
            // Debt Settlement
            addDebtBtn.addEventListener('click', addDebt);
            calculateDebtBtn.addEventListener('click', calculateDebtSettlement);
            resetDebtBtn.addEventListener('click', resetDebtForm);
            emailDebt.addEventListener('click', () => shareResult('debt'));
            smsDebt.addEventListener('click', () => shareResult('debt', 'sms'));
            pdfDebt.addEventListener('click', () => exportAsPDF('debt'));
            qrDebt.addEventListener('click', () => showQRCode('debt'));
            
            // History
            clearHistoryBtn.addEventListener('click', clearHistory);
            
            // Voice Input
            if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
                recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
                recognition.continuous = false;
                recognition.lang = 'en-US';
                
                voicePrincipal.addEventListener('click', () => startVoiceRecognition(principalInput));
                voiceRate.addEventListener('click', () => startVoiceRecognition(interestRateInput));
                voiceBill.addEventListener('click', () => startVoiceRecognition(billAmountInput));
            } else {
                // Hide voice buttons if not supported
                document.querySelectorAll('.voice-input').forEach(btn => btn.style.display = 'none');
            }
            
            // Initialize with light theme and currency
            toggleTheme();
            updateCurrencySymbols();
            
            // Functions
            function initApp() {
                // Load history from localStorage
                if (localStorage.getItem('financeHistory')) {
                    history = JSON.parse(localStorage.getItem('financeHistory'));
                    renderHistory();
                }
                
                // Add a sample item for demonstration
                addItem();
                
                // Add a sample debt for demonstration
                addDebt();
                
                // Set up dark mode scheduling
                scheduleDarkMode();
            }
            
            function getCurrencySymbol(currency) {
                const symbols = {
                    'USD': '$',
                    'EUR': '€',
                    'GBP': '£',
                    'INR': '₹',
                    'JPY': '¥',
                    'CAD': 'C$'
                };
                return symbols[currency] || '₹';
            }
            
            function updateCurrencySymbols() {
                document.querySelectorAll('.result-value, .split-amount').forEach(el => {
                    if (el.textContent.startsWith('$') || el.textContent.startsWith('₹') || 
                        el.textContent.startsWith('€') || el.textContent.startsWith('£') ||
                        el.textContent.startsWith('¥') || el.textContent.startsWith('C$')) {
                        el.textContent = currencySymbol + el.textContent.slice(1);
                    }
                });
            }
            
            function toggleTheme() {
                document.body.classList.toggle('dark');
                currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
                
                // Change emoji based on theme
                if (currentTheme === 'dark') {
                    themeToggle.textContent = '🌞';
                } else {
                    themeToggle.textContent = '🌓';
                }
                
                // Save theme preference
                localStorage.setItem('themePreference', currentTheme);
            }
            
            function scheduleDarkMode() {
                // Check for saved theme preference
                const savedTheme = localStorage.getItem('themePreference');
                if (savedTheme) {
                    if (savedTheme === 'dark') {
                        document.body.classList.add('dark');
                        themeToggle.textContent = '🌞';
                    }
                    return;
                }
                
                // Check for OS preference
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.body.classList.add('dark');
                    themeToggle.textContent = '🌞';
                }
                
                // Schedule dark mode for evening hours (6 PM to 6 AM)
                const now = new Date();
                const hour = now.getHours();
                if (hour >= 18 || hour < 6) {
                    document.body.classList.add('dark');
                    themeToggle.textContent = '🌞';
                }
            }
            
            function installPWA() {
                // In a real app, this would trigger the PWA installation prompt
                // For this demo, we'll show a confirmation message
                alert('App installed! You can now access this finance calculator from your home screen.');
            }
            
            // Interest Calculator Functions
            function calculateInterest() {
                const principal = parseFloat(principalInput.value);
                const interestRate = parseFloat(interestRateInput.value);
                const years = parseFloat(yearsInput.value) || 0;
                const months = parseFloat(monthsInput.value) || 0;
                const isCompound = compoundInterestBtn.classList.contains('active');
                const frequency = parseInt(compoundFrequency.value) || 1;
                
                // Validate inputs
                if (isNaN(principal) || principal <= 0) {
                    alert('Please enter a valid principal amount');
                    return;
                }
                
                if (isNaN(interestRate) || interestRate <= 0) {
                    alert('Please enter a valid interest rate');
                    return;
                }
                
                if (years < 0 || months < 0) {
                    alert('Time period cannot be negative');
                    return;
                }
                
                if (years === 0 && months === 0) {
                    alert('Please enter a valid time period');
                    return;
                }
                
                // Calculate time in years
                const timeInYears = years + (months / 12);
                
                let interest, totalAmount;
                
                if (isCompound) {
                    // Calculate compound interest
                    const n = frequency;
                    const r = interestRate / 100;
                    totalAmount = principal * Math.pow(1 + r / n, n * timeInYears);
                    interest = totalAmount - principal;
                } else {
                    // Calculate simple interest
                    interest = (principal * interestRate * timeInYears) / 100;
                    totalAmount = principal + interest;
                }
                
                // Display results
                interestAmountDiv.textContent = `${currencySymbol}${interest.toFixed(2)}`;
                totalAmountDiv.textContent = `${currencySymbol}${totalAmount.toFixed(2)}`;
                
                // Show result with animation
                resultDiv.classList.add('show');
                
                // Render chart
                renderInterestChart(principal, interest, timeInYears);
                
                // Save to history
                saveToHistory({
                    type: 'interest',
                    principal: principal,
                    rate: interestRate,
                    time: timeInYears,
                    isCompound: isCompound,
                    frequency: frequency,
                    interest: interest,
                    total: totalAmount,
                    currency: selectedCurrency,
                    timestamp: new Date().toISOString()
                });
                
                // Scroll to result
                resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
            
            function renderInterestChart(principal, interest, years) {
                const ctx = interestChart.getContext('2d');
                
                // Destroy existing chart if it exists
                if (window.interestChartInstance) {
                    window.interestChartInstance.destroy();
                }
                
                // Create new chart
                window.interestChartInstance = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: Array.from({length: Math.ceil(years) + 1}, (_, i) => `Year ${i}`),
                        datasets: [{
                            label: 'Principal',
                            data: Array.from({length: Math.ceil(years) + 1}, (_, i) => principal),
                            borderColor: '#a29bfe',
                            backgroundColor: 'rgba(162, 155, 254, 0.1)',
                            fill: true
                        }, {
                            label: 'Total Amount',
                            data: Array.from({length: Math.ceil(years) + 1}, (_, i) => {
                                const t = i;
                                if (compoundInterestBtn.classList.contains('active')) {
                                    const n = parseInt(compoundFrequency.value);
                                    const r = parseFloat(interestRateInput.value) / 100;
                                    return principal * Math.pow(1 + r / n, n * t);
                                } else {
                                    return principal + (principal * parseFloat(interestRateInput.value) * t) / 100;
                                }
                            }),
                            borderColor: '#6c5ce7',
                            backgroundColor: 'rgba(108, 92, 231, 0.1)',
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Growth Over Time'
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    callback: function(value) {
                                        return currencySymbol + value.toFixed(2);
                                    }
                                }
                            }
                        }
                    }
                });
            }
            
            function resetInterestForm() {
                principalInput.value = '';
                interestRateInput.value = '';
                yearsInput.value = '';
                monthsInput.value = '';
                compoundFrequency.value = '12';
                
                // Hide result
                resultDiv.classList.remove('show');
                
                // Reset focus
                principalInput.focus();
            }
            
            // Bill Splitter Functions
            function updateWeightInputs() {
                const peopleCount = parseInt(peopleCountInput.value) || 1;
                weightInputs.innerHTML = '';
                
                for (let i = 1; i <= peopleCount; i++) {
                    const weightRow = document.createElement('div');
                    weightRow.className = 'weight-row';
                    weightRow.innerHTML = `
                        <label>Person ${i}:</label>
                        <input type="number" class="person-weight" placeholder="Weight" min="1" value="1">
                    `;
                    weightInputs.appendChild(weightRow);
                }
            }
            
            function calculateSplit() {
                const billAmount = parseFloat(billAmountInput.value);
                const taxRate = parseFloat(taxRateInput.value) || 0;
                const peopleCount = parseInt(peopleCountInput.value);
                const isWeighted = weightedSplitBtn.classList.contains('active');
                
                // Validate inputs
                if (isNaN(billAmount) || billAmount <= 0) {
                    alert('Please enter a valid bill amount');
                    return;
                }
                
                if (isNaN(peopleCount) || peopleCount <= 0) {
                    alert('Please enter a valid number of people');
                    return;
                }
                
                // Check if custom tip is being used
                if (customTipInput.value && !isNaN(parseFloat(customTipInput.value))) {
                    selectedTip = parseFloat(customTipInput.value);
                }
                
                // Calculate tax and tip
                const taxAmount = billAmount * (taxRate / 100);
                const tipAmount = billAmount * (selectedTip / 100);
                const totalWithTaxTip = billAmount + taxAmount + tipAmount;
                
                let amountPerPerson;
                
                if (isWeighted) {
                    // Calculate weighted split
                    const weightInputs = document.querySelectorAll('.person-weight');
                    let totalWeight = 0;
                    const weights = [];
                    
                    weightInputs.forEach(input => {
                        const weight = parseFloat(input.value) || 1;
                        weights.push(weight);
                        totalWeight += weight;
                    });
                    
                    amountPerPerson = weights.map(weight => (weight / totalWeight) * totalWithTaxTip);
                } else {
                    // Equal split
                    amountPerPerson = Array(peopleCount).fill(totalWithTaxTip / peopleCount);
                }
                
                // Display result
                splitAmountDiv.textContent = `${currencySymbol}${amountPerPerson[0].toFixed(2)}`;
                
                let detailsText = `Total bill: ${currencySymbol}${billAmount.toFixed(2)}`;
                if (taxRate > 0) detailsText += ` + ${taxRate}% tax (${currencySymbol}${taxAmount.toFixed(2)})`;
                if (selectedTip > 0) detailsText += ` + ${selectedTip}% tip (${currencySymbol}${tipAmount.toFixed(2)})`;
                detailsText += ` = ${currencySymbol}${totalWithTaxTip.toFixed(2)}`;
                
                if (isWeighted) {
                    detailsText += ` (split by weights)`;
                } else {
                    detailsText += ` (split equally)`;
                }
                
                detailsDiv.textContent = detailsText;
                
                // Show result with animation
                splitResultDiv.classList.add('show');
                
                // Render chart
                renderSplitChart(amountPerPerson);
                
                // Save to history
                saveToHistory({
                    type: 'bill-split',
                    billAmount: billAmount,
                    taxRate: taxRate,
                    tipRate: selectedTip,
                    peopleCount: peopleCount,
                    isWeighted: isWeighted,
                    perPerson: amountPerPerson,
                    currency: selectedCurrency,
                    timestamp: new Date().toISOString()
                });
                
                // Scroll to result
                splitResultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
            
            function renderSplitChart(amounts) {
                const ctx = splitChart.getContext('2d');
                
                // Destroy existing chart if it exists
                if (window.splitChartInstance) {
                    window.splitChartInstance.destroy();
                }
                
                // Create new chart
                window.splitChartInstance = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: amounts.map((_, i) => `Person ${i+1}`),
                        datasets: [{
                            data: amounts,
                            backgroundColor: [
                                '#6c5ce7', '#00b894', '#fdcb6e', '#e17055', '#00cec9', '#a29bfe'
                            ]
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'right'
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        return `${context.label}: ${currencySymbol}${context.raw.toFixed(2)}`;
                                    }
                                }
                            }
                        }
                    }
                });
            }
            
            function resetSplitForm() {
                billAmountInput.value = '';
                taxRateInput.value = '0';
                peopleCountInput.value = '1';
                customTipInput.value = '';
                selectedTip = 0;
                
                // Remove active class from all tip buttons
                tipButtons.forEach(btn => btn.classList.remove('active'));
                
                // Reset to equal split
                equalSplitBtn.classList.add('active');
                weightedSplitBtn.classList.remove('active');
                weightContainer.style.display = 'none';
                
                // Hide result
                splitResultDiv.classList.remove('show');
                
                // Reset focus
                billAmountInput.focus();
            }
            
            function handleCustomTip() {
                // When custom tip is entered, deselect all tip buttons
                tipButtons.forEach(btn => btn.classList.remove('active'));
                
                // Update selected tip if custom input is valid
                if (this.value && !isNaN(parseFloat(this.value))) {
                    selectedTip = parseFloat(this.value);
                } else {
                    selectedTip = 0;
                }
            }
            
            // Itemized Bill Functions
            function addItem() {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'item';
                
                // Get people names
                const names = peopleNames.value.split(',').filter(name => name.trim() !== '');
                const peopleCount = names.length > 0 ? names.length : 1;
                
                // Create assignee options
                let assigneeOptions = '';
                for (let i = 0; i < peopleCount; i++) {
                    const name = names[i] || `Person ${i+1}`;
                    assigneeOptions += `<option value="${i}">${name}</option>`;
                }
                
                itemDiv.innerHTML = `
                    <input type="text" class="item-name" placeholder="Item name">
                    <input type="number" class="item-price" placeholder="Price" min="0" step="0.01">
                    <select class="item-assignee">
                        <option value="all">All</option>
                        ${assigneeOptions}
                    </select>
                    <button class="btn-danger btn-sm">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                
                // Add delete event
                const deleteBtn = itemDiv.querySelector('button');
                deleteBtn.addEventListener('click', function() {
                    itemDiv.remove();
                });
                
                itemList.appendChild(itemDiv);
            }
            
            function calculateItemizedBill() {
                const items = document.querySelectorAll('.item');
                const taxRate = parseFloat(itemTaxRate.value) || 0;
                const tipRate = parseFloat(itemTipRate.value) || 0;
                
                // Get people names
                const names = peopleNames.value.split(',').map(name => name.trim()).filter(name => name !== '');
                const peopleCount = names.length > 0 ? names.length : 1;
                const people = names.length > 0 ? names : Array(peopleCount).fill().map((_, i) => `Person ${i+1}`);
                
                // Initialize totals
                const totals = Array(peopleCount).fill(0);
                let subtotal = 0;
                
                // Process each item
                items.forEach(item => {
                    const name = item.querySelector('.item-name').value || 'Unnamed Item';
                    const price = parseFloat(item.querySelector('.item-price').value) || 0;
                    const assignee = item.querySelector('.item-assignee').value;
                    
                    if (price > 0) {
                        subtotal += price;
                        
                        if (assignee === 'all') {
                            // Split equally among all
                            const perPerson = price / peopleCount;
                            totals.forEach((_, i) => totals[i] += perPerson);
                        } else {
                            // Assign to specific person
                            const personIndex = parseInt(assignee);
                            if (personIndex >= 0 && personIndex < peopleCount) {
                                totals[personIndex] += price;
                            }
                        }
                    }
                });
                
                // Calculate tax and tip
                const taxAmount = subtotal * (taxRate / 100);
                const tipAmount = subtotal * (tipRate / 100);
                const total = subtotal + taxAmount + tipAmount;
                
                // Add tax and tip to everyone equally
                const taxTipPerPerson = (taxAmount + tipAmount) / peopleCount;
                totals.forEach((_, i) => totals[i] += taxTipPerPerson);
                
                // Display results
                itemSummary.innerHTML = `
                    <div class="result-item">
                        <div class="result-label">Subtotal</div>
                        <div class="result-value">${currencySymbol}${subtotal.toFixed(2)}</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">Tax (${taxRate}%)</div>
                        <div class="result-value">${currencySymbol}${taxAmount.toFixed(2)}</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">Tip (${tipRate}%)</div>
                        <div class="result-value">${currencySymbol}${tipAmount.toFixed(2)}</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">Total</div>
                        <div class="result-value total-amount">${currencySymbol}${total.toFixed(2)}</div>
                    </div>
                    <div class="result-item" style="margin-top: 20px;">
                        <div class="result-label">Amount Per Person</div>
                    </div>
                `;
                
                // Add per person amounts
                totals.forEach((amount, i) => {
                    const personDiv = document.createElement('div');
                    personDiv.className = 'result-item';
                    personDiv.innerHTML = `
                        <div class="result-label">${people[i]}</div>
                        <div class="result-value">${currencySymbol}${amount.toFixed(2)}</div>
                    `;
                    itemSummary.appendChild(personDiv);
                });
                
                // Show result with animation
                itemResult.classList.add('show');
                
                // Render chart
                renderItemChart(people, totals);
                
                // Save to history
                saveToHistory({
                    type: 'itemized-bill',
                    people: people,
                    subtotal: subtotal,
                    taxRate: taxRate,
                    tipRate: tipRate,
                    perPerson: totals,
                    currency: selectedCurrency,
                    timestamp: new Date().toISOString()
                });
                
                // Scroll to result
                itemResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
            
            function renderItemChart(people, amounts) {
                const ctx = itemChart.getContext('2d');
                
                // Destroy existing chart if it exists
                if (window.itemChartInstance) {
                    window.itemChartInstance.destroy();
                }
                
                // Create new chart
                window.itemChartInstance = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: people,
                        datasets: [{
                            label: 'Amount Owed',
                            data: amounts,
                            backgroundColor: '#6c5ce7'
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    callback: function(value) {
                                        return currencySymbol + value.toFixed(2);
                                    }
                                }
                            }
                        }
                    }
                });
            }
            
            function resetItemizedForm() {
                peopleNames.value = '';
                itemTaxRate.value = '0';
                itemTipRate.value = '0';
                itemList.innerHTML = '';
                
                // Hide result
                itemResult.classList.remove('show');
                
                // Add one item by default
                addItem();
            }
            
            // Debt Settlement Functions
            function addDebt() {
                const debtDiv = document.createElement('div');
                debtDiv.className = 'item';
                
                // Get people names
                const names = debtPeople.value.split(',').filter(name => name.trim() !== '');
                const peopleCount = names.length > 0 ? names.length : 1;
                
                // Create options
                let options = '';
                for (let i = 0; i < peopleCount; i++) {
                    const name = names[i] || `Person ${i+1}`;
                    options += `<option value="${i}">${name}</option>`;
                }
                
                debtDiv.innerHTML = `
                    <select class="debt-payer">
                        ${options}
                    </select>
                    <select class="debt-payee">
                        ${options}
                    </select>
                    <input type="number" class="debt-amount" placeholder="Amount" min="0" step="0.01">
                    <button class="btn-danger btn-sm">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                
                // Add delete event
                const deleteBtn = debtDiv.querySelector('button');
                deleteBtn.addEventListener('click', function() {
                    debtDiv.remove();
                });
                
                debtList.appendChild(debtDiv);
            }
            
            function calculateDebtSettlement() {
                // Get people names
                const names = debtPeople.value.split(',').map(name => name.trim()).filter(name => name !== '');
                const peopleCount = names.length > 0 ? names.length : 1;
                const people = names.length > 0 ? names : Array(peopleCount).fill().map((_, i) => `Person ${i+1}`);
                
                // Initialize net amounts
                const netAmounts = Array(peopleCount).fill(0);
                
                // Process each debt
                const debts = document.querySelectorAll('.item');
                debts.forEach(debt => {
                    const payerIndex = parseInt(debt.querySelector('.debt-payer').value);
                    const payeeIndex = parseInt(debt.querySelector('.debt-payee').value);
                    const amount = parseFloat(debt.querySelector('.debt-amount').value) || 0;
                    
                    if (amount > 0 && payerIndex !== payeeIndex) {
                        netAmounts[payerIndex] -= amount;
                        netAmounts[payeeIndex] += amount;
                    }
                });
                
                // Calculate debt settlement
                const transactions = [];
                
                // Find person with max debt and max credit
                while (true) {
                    let maxDebtIndex = -1, maxCreditIndex = -1;
                    let maxDebt = -Infinity, maxCredit = -Infinity;
                    
                    for (let i = 0; i < peopleCount; i++) {
                        if (netAmounts[i] < maxDebt) {
                            maxDebt = netAmounts[i];
                            maxDebtIndex = i;
                        }
                        if (netAmounts[i] > maxCredit) {
                            maxCredit = netAmounts[i];
                            maxCreditIndex = i;
                        }
                    }
                    
                    // Break if all debts are settled
                    if (maxDebt >= 0 || maxCredit <= 0) break;
                    
                    // Calculate amount to settle
                    const amount = Math.min(-maxDebt, maxCredit);
                    
                    // Add transaction
                    transactions.push({
                        from: people[maxDebtIndex],
                        to: people[maxCreditIndex],
                        amount: amount
                    });
                    
                    // Update net amounts
                    netAmounts[maxDebtIndex] += amount;
                    netAmounts[maxCreditIndex] -= amount;
                }
                
                // Display results
                settlementPlan.innerHTML = '';
                
                if (transactions.length === 0) {
                    settlementPlan.innerHTML = '<p>No debts to settle. All balances are zero.</p>';
                } else {
                    transactions.forEach(transaction => {
                        const transactionDiv = document.createElement('div');
                        transactionDiv.className = 'debt-item';
                        transactionDiv.innerHTML = `
                            <div class="debt-label">${transaction.from} owes ${transaction.to}</div>
                            <div class="debt-amount">${currencySymbol}${transaction.amount.toFixed(2)}</div>
                        `;
                        settlementPlan.appendChild(transactionDiv);
                    });
                }
                
                // Show result with animation
                debtResult.classList.add('show');
                
                // Save to history
                saveToHistory({
                    type: 'debt-settlement',
                    people: people,
                    transactions: transactions,
                    currency: selectedCurrency,
                    timestamp: new Date().toISOString()
                });
                
                // Scroll to result
                debtResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
            
            function resetDebtForm() {
                debtPeople.value = '';
                debtList.innerHTML = '';
                
                // Hide result
                debtResult.classList.remove('show');
                
                // Add one debt by default
                addDebt();
            }
            
            // History Functions
            function saveToHistory(calculation) {
                history.unshift(calculation);
                if (history.length > 50) history.pop(); // Limit to 50 entries
                localStorage.setItem('financeHistory', JSON.stringify(history));
                renderHistory();
            }
            
            function renderHistory() {
                historyList.innerHTML = '';
                
                if (history.length === 0) {
                    historyList.innerHTML = '<p>No calculations in history yet.</p>';
                    return;
                }
                
                history.forEach((calc, index) => {
                    const item = document.createElement('div');
                    item.className = 'history-item';
                    item.dataset.index = index;
                    
                    let description = '';
                    let icon = '';
                    
                    switch (calc.type) {
                        case 'interest':
                            icon = '<i class="fas fa-calculator"></i> ';
                            description = `Interest: ${currencySymbol}${calc.principal.toFixed(2)} at ${calc.rate}% for ${calc.time.toFixed(1)} years`;
                            break;
                        case 'bill-split':
                            icon = '<i class="fas fa-money-bill-wave"></i> ';
                            description = `Bill Split: ${currencySymbol}${calc.billAmount.toFixed(2)} among ${calc.peopleCount} people`;
                            break;
                        case 'itemized-bill':
                            icon = '<i class="fas fa-list"></i> ';
                            description = `Itemized Bill: ${calc.people.length} people`;
                            break;
                        case 'debt-settlement':
                            icon = '<i class="fas fa-handshake"></i> ';
                            description = `Debt Settlement: ${calc.transactions.length} transactions`;
                            break;
                    }
                    
                    const date = new Date(calc.timestamp);
                    const dateStr = date.toLocaleString();
                    
                    item.innerHTML = `
                        <div class="date">${dateStr}</div>
                        <div class="details">${icon}${description}</div>
                    `;
                    
                    item.addEventListener('click', function() {
                        // For simplicity, just show an alert
                        alert(`Calculation details:\n${description}\nSaved on ${dateStr}`);
                    });
                    
                    historyList.appendChild(item);
                });
            }
            
            function clearHistory() {
                if (confirm('Are you sure you want to clear all history?')) {
                    history = [];
                    localStorage.removeItem('financeHistory');
                    renderHistory();
                }
            }
            
            // Sharing Functions
            function shareResult(type, method = 'email') {
                let subject = '', body = '';
                
                switch (type) {
                    case 'interest':
                        subject = 'Interest Calculation Result';
                        body = `Principal: ${currencySymbol}${principalInput.value}\n` +
                               `Interest Rate: ${interestRateInput.value}%\n` +
                               `Time: ${yearsInput.value || 0} years, ${monthsInput.value || 0} months\n` +
                               `Interest Amount: ${interestAmountDiv.textContent}\n` +
                               `Total Amount: ${totalAmountDiv.textContent}`;
                        break;
                    case 'split':
                        subject = 'Bill Split Result';
                        body = `Total Bill: ${currencySymbol}${billAmountInput.value}\n` +
                               `Tax Rate: ${taxRateInput.value}%\n` +
                               `Tip Rate: ${selectedTip}%\n` +
                               `People: ${peopleCountInput.value}\n` +
                               `Each Person Pays: ${splitAmountDiv.textContent}\n` +
                               `Details: ${detailsDiv.textContent}`;
                        break;
                    case 'item':
                        subject = 'Itemized Bill Result';
                        body = `People: ${peopleNames.value || 'Not specified'}\n` +
                               `Tax Rate: ${itemTaxRate.value}%\n` +
                               `Tip Rate: ${itemTipRate.value}%\n` +
                               `Summary: ${itemSummary.textContent}`;
                        break;
                    case 'debt':
                        subject = 'Debt Settlement Result';
                        body = `People: ${debtPeople.value || 'Not specified'}\n` +
                               `Settlement Plan:\n${settlementPlan.textContent}`;
                        break;
                }
                
                if (method === 'email') {
                    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                } else {
                    // For SMS, this would require a Twilio integration in a real app
                    alert(`SMS would be sent with:\n\n${body}`);
                }
            }
            
            function exportAsPDF(type) {
                // In a real app, this would use jsPDF and html2canvas
                alert(`PDF export for ${type} would be generated`);
            }
            
            function showQRCode(type) {
                let text = '';
                let container;
                
                switch (type) {
                    case 'interest':
                        text = `Interest Calculation:\nPrincipal: ${principalInput.value}\nRate: ${interestRateInput.value}%\nTime: ${yearsInput.value || 0}y ${monthsInput.value || 0}m\nInterest: ${interestAmountDiv.textContent}\nTotal: ${totalAmountDiv.textContent}`;
                        container = qrInterestContainer;
                        break;
                    case 'split':
                        text = `Bill Split:\nTotal: ${billAmountInput.value}\nTax: ${taxRateInput.value}%\nTip: ${selectedTip}%\nPeople: ${peopleCountInput.value}\nEach: ${splitAmountDiv.textContent}`;
                        container = qrSplitContainer;
                        break;
                    case 'item':
                        text = `Itemized Bill:\nPeople: ${peopleNames.value}\nSummary: ${itemSummary.textContent}`;
                        container = qrItemContainer;
                        break;
                    case 'debt':
                        text = `Debt Settlement:\nPeople: ${debtPeople.value}\nPlan: ${settlementPlan.textContent}`;
                        container = qrDebtContainer;
                        break;
                }
                
                container.innerHTML = '';
                container.style.display = 'block';
                
                QRCode.toCanvas(container, text, {
                    width: 150,
                    margin: 1,
                    color: {
                        dark: currentTheme === 'dark' ? '#f5f6fa' : '#2d3436',
                        light: currentTheme === 'dark' ? '#2d3436' : '#ffffff'
                    }
                }, function(error) {
                    if (error) console.error(error);
                });
            }
            
            // Voice Input Functions
            function startVoiceRecognition(inputField) {
                if (!recognition) return;
                
                recognition.start();
                recognition.onresult = function(event) {
                    const transcript = event.results[0][0].transcript;
                    // Extract numbers from transcript
                    const numbers = transcript.match(/\d+(\.\d+)?/g);
                    if (numbers && numbers.length > 0) {
                        inputField.value = parseFloat(numbers[0]);
                    }
                };
                
                recognition.onerror = function(event) {
                    console.error('Speech recognition error', event.error);
                };
            }
        });