// ATM System State and Data
let currentUser = null;
let isAdminLoggedIn = false;
let atmDatabase = {
    totalamt: 324400,
    totalWithdrawals: 0,
    totalDeposits: 0,
    users: [
        { accno: 99011, pin: 1256, name: 'Vivek', surname: 'Kushwah', amt: 66000 },
        { accno: 99012, pin: 1257, name: 'Abhishek', surname: 'Gupta', amt: 78000 },
        { accno: 99013, pin: 1258, name: 'Anshul', surname: 'Gour', amt: 75000 },
        { accno: 99014, pin: 1259, name: 'Raj', surname: 'Kumar', amt: 55000 },
        { accno: 99015, pin: 1260, name: 'Priya', surname: 'Singh', amt: 50400 }
    ]
};

// Admin Credentials
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

// Initialize Date and Time
function initializeDateTime() {
    function updateDateTime() {
        const now = new Date();
        document.getElementById('currentTime').textContent = now.toLocaleTimeString('en-US');
        document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }
    updateDateTime();
    setInterval(updateDateTime, 1000);
}

// Screen Navigation Functions
function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        window.scrollTo(0, 0);
    }
}

// Welcome Screen
function goToWelcome() {
    showScreen('welcomeScreen');
}

// User Login
function goToUserLogin() {
    document.getElementById('userLoginError').classList.remove('show');
    document.getElementById('userAccNo').value = '';
    document.getElementById('userPin').value = '';
    showScreen('userLoginScreen');
}

function handleUserLogin(event) {
    event.preventDefault();
    const accNo = parseInt(document.getElementById('userAccNo').value);
    const pin = parseInt(document.getElementById('userPin').value);
    const errorDiv = document.getElementById('userLoginError');
    
    const user = atmDatabase.users.find(u => u.accno === accNo && u.pin === pin);
    
    if (user) {
        currentUser = user;
        document.getElementById('userName').textContent = user.name + ' ' + user.surname;
        document.getElementById('userAccount').textContent = user.accno;
        errorDiv.classList.remove('show');
        showScreen('userDashboard');
    } else {
        errorDiv.textContent = '❌ Invalid Account Number or PIN!';
        errorDiv.classList.add('show');
    }
}

// Admin Login
function goToAdminLogin() {
    document.getElementById('adminLoginError').classList.remove('show');
    document.getElementById('adminUser').value = '';
    document.getElementById('adminPass').value = '';
    showScreen('adminLoginScreen');
}

function handleAdminLogin(event) {
    event.preventDefault();
    const username = document.getElementById('adminUser').value;
    const password = document.getElementById('adminPass').value;
    const errorDiv = document.getElementById('adminLoginError');
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        isAdminLoggedIn = true;
        updateAdminStats();
        errorDiv.classList.remove('show');
        showScreen('adminDashboard');
    } else {
        errorDiv.textContent = '❌ Invalid Username or Password!';
        errorDiv.classList.add('show');
    }
}

// User Dashboard
function goToUserDashboard() {
    showScreen('userDashboard');
}

// Check Balance
function goToCheckBalance() {
    if (currentUser) {
        document.getElementById('balanceAmount').textContent = '₹ ' + currentUser.amt.toLocaleString('en-IN');
        showScreen('checkBalanceScreen');
    }
}

// Withdraw Money
function goToWithdraw() {
    document.getElementById('withdrawAmount').value = '';
    document.getElementById('withdrawError').classList.remove('show');
    showScreen('withdrawScreen');
}

function setAmount(amount) {
    document.getElementById('withdrawAmount').value = amount;
}

function handleWithdraw(event) {
    event.preventDefault();
    const amount = parseInt(document.getElementById('withdrawAmount').value);
    const errorDiv = document.getElementById('withdrawError');
    
    if (amount <= 0) {
        errorDiv.textContent = '❌ Amount must be greater than 0!';
        errorDiv.classList.add('show');
        return;
    }
    
    if (amount > currentUser.amt) {
        errorDiv.textContent = '❌ Insufficient Balance! Current Balance: ₹' + currentUser.amt;
        errorDiv.classList.add('show');
        return;
    }
    
    if (amount > atmDatabase.totalamt) {
        errorDiv.textContent = '❌ ATM does not have sufficient cash!';
        errorDiv.classList.add('show');
        return;
    }
    
    // Process withdrawal
    currentUser.amt -= amount;
    atmDatabase.totalamt -= amount;
    atmDatabase.totalWithdrawals += amount;
    
    errorDiv.classList.remove('show');
    showMessage('✅ Withdrawal Successful! Amount: ₹' + amount + '\nYour current balance: ₹' + currentUser.amt);
}

// Deposit Money
function goToDeposit() {
    document.getElementById('depositAmount').value = '';
    document.getElementById('depositError').classList.remove('show');
    showScreen('depositScreen');
}

function handleDeposit(event) {
    event.preventDefault();
    const amount = parseInt(document.getElementById('depositAmount').value);
    const errorDiv = document.getElementById('depositError');
    
    if (amount <= 0) {
        errorDiv.textContent = '❌ Amount must be greater than 0!';
        errorDiv.classList.add('show');
        return;
    }
    
    // Process deposit
    currentUser.amt += amount;
    atmDatabase.totalamt += amount;
    atmDatabase.totalDeposits += amount;
    
    errorDiv.classList.remove('show');
    showMessage('✅ Deposit Successful! Amount: ₹' + amount + '\nYour current balance: ₹' + currentUser.amt);
}

// Transfer Money
function goToTransfer() {
    document.getElementById('transferAccNo').value = '';
    document.getElementById('transferAmount').value = '';
    document.getElementById('transferError').classList.remove('show');
    showScreen('transferScreen');
}

function handleTransfer(event) {
    event.preventDefault();
    const accNo = parseInt(document.getElementById('transferAccNo').value);
    const amount = parseInt(document.getElementById('transferAmount').value);
    const errorDiv = document.getElementById('transferError');
    
    if (accNo === currentUser.accno) {
        errorDiv.textContent = '❌ Cannot transfer to your own account!';
        errorDiv.classList.add('show');
        return;
    }
    
    if (amount <= 0) {
        errorDiv.textContent = '❌ Amount must be greater than 0!';
        errorDiv.classList.add('show');
        return;
    }
    
    if (amount > currentUser.amt) {
        errorDiv.textContent = '❌ Insufficient Balance!';
        errorDiv.classList.add('show');
        return;
    }
    
    const recipient = atmDatabase.users.find(u => u.accno === accNo);
    
    if (!recipient) {
        errorDiv.textContent = '❌ Recipient account not found!';
        errorDiv.classList.add('show');
        return;
    }
    
    // Process transfer
    currentUser.amt -= amount;
    recipient.amt += amount;
    
    errorDiv.classList.remove('show');
    showMessage('✅ Transfer Successful!\nTransferred ₹' + amount + ' to Account: ' + accNo + '\nYour current balance: ₹' + currentUser.amt);
}

// Change PIN
function goToChangePin() {
    document.getElementById('oldPin').value = '';
    document.getElementById('newPin').value = '';
    document.getElementById('confirmPin').value = '';
    document.getElementById('changePinError').classList.remove('show');
    showScreen('changePinScreen');
}

function handleChangePin(event) {
    event.preventDefault();
    const oldPin = parseInt(document.getElementById('oldPin').value);
    const newPin = parseInt(document.getElementById('newPin').value);
    const confirmPin = parseInt(document.getElementById('confirmPin').value);
    const errorDiv = document.getElementById('changePinError');
    
    if (oldPin !== currentUser.pin) {
        errorDiv.textContent = '❌ Current PIN is incorrect!';
        errorDiv.classList.add('show');
        return;
    }
    
    if (newPin !== confirmPin) {
        errorDiv.textContent = '❌ New PIN and Confirm PIN do not match!';
        errorDiv.classList.add('show');
        return;
    }
    
    if (newPin.toString().length !== 4) {
        errorDiv.textContent = '❌ PIN must be 4 digits!';
        errorDiv.classList.add('show');
        return;
    }
    
    // Change PIN
    currentUser.pin = newPin;
    
    errorDiv.classList.remove('show');
    showMessage('✅ PIN Changed Successfully!');
}

// Admin Dashboard
function goToAdminDashboard() {
    updateAdminStats();
    showScreen('adminDashboard');
}

function updateAdminStats() {
    document.getElementById('totalAtmCash').textContent = '₹ ' + atmDatabase.totalamt.toLocaleString('en-IN');
    document.getElementById('totalWithdrawals').textContent = '₹ ' + atmDatabase.totalWithdrawals.toLocaleString('en-IN');
    document.getElementById('totalDeposits').textContent = '₹ ' + atmDatabase.totalDeposits.toLocaleString('en-IN');
}

// View All Users
function goToUserList() {
    const tableHtml = `
        <table>
            <thead>
                <tr>
                    <th>Account No.</th>
                    <th>Name</th>
                    <th>Balance</th>
                </tr>
            </thead>
            <tbody>
                ${atmDatabase.users.map(u => `
                    <tr>
                        <td>${u.accno}</td>
                        <td>${u.name} ${u.surname}</td>
                        <td>₹ ${u.amt.toLocaleString('en-IN')}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    document.getElementById('userListTable').innerHTML = tableHtml;
    showScreen('userListScreen');
}

// Search User
function goToSearchUser() {
    document.getElementById('searchAccNo').value = '';
    document.getElementById('searchResult').innerHTML = '';
    showScreen('searchUserScreen');
}

function handleSearchUser(event) {
    event.preventDefault();
    const accNo = parseInt(document.getElementById('searchAccNo').value);
    const user = atmDatabase.users.find(u => u.accno === accNo);
    
    const resultDiv = document.getElementById('searchResult');
    
    if (user) {
        const html = `
            <table>
                <thead>
                    <tr>
                        <th>Account No.</th>
                        <th>Name</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${user.accno}</td>
                        <td>${user.name} ${user.surname}</td>
                        <td>₹ ${user.amt.toLocaleString('en-IN')}</td>
                    </tr>
                </tbody>
            </table>
        `;
        resultDiv.innerHTML = html;
    } else {
        resultDiv.innerHTML = '<p style="color: red; padding: 20px; text-align: center;">❌ User not found!</p>';
    }
}

// Register New User
function goToNewRegister() {
    document.getElementById('regFirstName').value = '';
    document.getElementById('regLastName').value = '';
    document.getElementById('regPin').value = '';
    document.getElementById('regAmount').value = '';
    document.getElementById('registerError').classList.remove('show');
    showScreen('newRegisterScreen');
}

function handleNewRegister(event) {
    event.preventDefault();
    const firstName = document.getElementById('regFirstName').value;
    const lastName = document.getElementById('regLastName').value;
    const pin = parseInt(document.getElementById('regPin').value);
    const amount = parseInt(document.getElementById('regAmount').value);
    const errorDiv = document.getElementById('registerError');
    
    if (pin.toString().length !== 4) {
        errorDiv.textContent = '❌ PIN must be exactly 4 digits!';
        errorDiv.classList.add('show');
        return;
    }
    
    if (amount < 0) {
        errorDiv.textContent = '❌ Amount cannot be negative!';
        errorDiv.classList.add('show');
        return;
    }
    
    // Generate new account number
    const newAccNo = 99000 + atmDatabase.users.length + 1;
    
    // Add new user
    atmDatabase.users.push({
        accno: newAccNo,
        pin: pin,
        name: firstName,
        surname: lastName,
        amt: amount
    });
    
    errorDiv.classList.remove('show');
    showMessage('✅ User Registered Successfully!\nAccount No: ' + newAccNo);
}

// Logout
function logout() {
    currentUser = null;
    isAdminLoggedIn = false;
    document.getElementById('userLoginError').classList.remove('show');
    document.getElementById('adminLoginError').classList.remove('show');
    goToWelcome();
}

// Show Message Modal
function showMessage(message) {
    const modal = document.getElementById('messageModal');
    const messageText = document.getElementById('messageText');
    messageText.textContent = message;
    modal.classList.add('show');
    
    setTimeout(() => {
        closeModal();
        goToUserDashboard();
    }, 3000);
}

function closeModal() {
    const modal = document.getElementById('messageModal');
    modal.classList.remove('show');
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    initializeDateTime();
    goToWelcome();
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('messageModal');
    if (event.target === modal) {
        closeModal();
    }
});
