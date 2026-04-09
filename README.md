# Bank of India ATM - Web UI Frontend

A modern, interactive web-based ATM system frontend built with HTML5, CSS3, and vanilla JavaScript.

## 🎯 Features

### User Features
- **Secure Login**: Account number and PIN authentication
- **Check Balance**: View current account balance
- **Withdraw Money**: Withdraw cash with quick amount options (₹500, ₹1000, ₹2000, ₹5000)
- **Deposit Money**: Deposit funds to your account
- **Transfer Money**: Transfer funds between accounts
- **Change PIN**: Securely update your PIN

### Admin Features
- **Admin Dashboard**: View ATM statistics
  - Total cash in ATM
  - Total withdrawals
  - Total deposits
- **View All Users**: See list of all accounts with balances
- **Search User**: Find specific user accounts
- **Register New User**: Create new customer accounts with initial balance

## 📋 System Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required
- No backend server needed (runs entirely in browser)

## 🚀 How to Use

### 1. **Open the Application**
   - Open `index.html` in your web browser
   - The ATM interface will load with the welcome screen

### 2. **User Login**
   - Click **"USER LOGIN"**
   - Enter Account Number and PIN from the test data below
   - Access your account dashboard

### 3. **Admin Login**
   - Click **"ADMIN LOGIN"**
   - Username: `admin`
   - Password: `admin123`
   - Access admin dashboard with management options

## 👤 Test User Accounts

| Account No | Name | PIN | Balance |
|-----------|------|-----|---------|
| 99011 | Vivek Kushwah | 1256 | ₹66,000 |
| 99012 | Abhishek Gupta | 1257 | ₹78,000 |
| 99013 | Anshul Gour | 1258 | ₹75,000 |
| 99014 | Raj Kumar | 1259 | ₹55,000 |
| 99015 | Priya Singh | 1260 | ₹50,400 |

## 📁 File Structure

```
ATM/
├── index.html          # Main HTML file with all screens
├── styles.css          # Styling and responsive design
├── script.js           # JavaScript logic and functionality
├── ATM.C               # Original C backend code
├── ATM CODE.txt        # Code reference
└── README.md           # This file
```

## 🎨 User Interface Highlights

- **Modern Design**: Clean, professional banking interface
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Real-time Clock**: Displays current date and time
- **Interactive Buttons**: Visual feedback and smooth animations
- **Error Handling**: Clear error messages for invalid operations
- **Success Messages**: Confirmation popups for transactions
- **Color-coded Sections**: Different colors for different transaction types

## 💾 Data Storage

All data is stored in the browser's memory (JavaScript variables). Data will reset if you refresh the page.
To persist data permanently, see the "Future Enhancements" section below.

## ⚙️ Technical Details

### Frontend Technologies
- **HTML5**: Semantic markup
- **CSS3**: Flexbox, Grid, Gradients, Animations
- **JavaScript (ES6)**: Vanilla JS (no external libraries)

### Features Implemented
- Screen-based navigation without page reloads
- Form validation
- Real-time data updates
- Responsive design
- Modal dialogs for messages
- Error handling

## 🔐 Security Notes

**This is a demonstration application.** In production:
- Use HTTPS for secure communication
- Hash and salt passwords
- Implement backend validation
- Use secure session management
- Add two-factor authentication
- Encrypt sensitive data
- Regular security audits

## 🚀 Future Enhancements

1. **Database Integration**: Store data persistently using backend API
2. **Transaction History**: View detailed transaction logs
3. **Mobile App**: React Native or Flutter version
4. **Biometric Authentication**: Fingerprint or facial recognition
5. **Multiple Currencies**: Support for different currencies
6. **Data Encryption**: Secure data transmission
7. **Receipt Generation**: PDF receipt download
8. **QR Code Payments**: Scan and pay functionality
9. **Notification System**: SMS/Email alerts for transactions
10. **Analytics Dashboard**: Transaction trends and reports

## ▶️ Running the Application

### Method 1: Direct Browser
1. Open the folder containing `index.html`
2. Double-click `index.html` or right-click → "Open with" → Select your browser

### Method 2: Local Server (Recommended)
Using VS Code Live Server Extension:
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

Using Python:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Then open: `http://localhost:8000`

Using Node.js (http-server):
```bash
npm install -g http-server
http-server
```

## 🐛 Troubleshooting

### Issue: Cannot login
- Check if you're using correct account number and PIN from the test data
- Clear browser cache and reload
- Try a different browser

### Issue: Data resets on refresh
- This is expected behavior as data is stored in browser memory
- Install backend with database to persist data

### Issue: Styling not applying
- Hard refresh browser (Ctrl+F5 or Cmd+Shift+R)
- Check if `styles.css` is in the same directory as `index.html`

## 📞 Contact & Support

For questions or issues, refer to the original ATM.C code comments or documentation.

## 📄 License

This project is created for educational purposes.

---

**Created**: 2024
**Version**: 1.0.0
**Status**: Fully Functional Demo
