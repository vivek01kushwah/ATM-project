# ATM Management System

## 1. Project Overview
The ATM Management System is a console-based C application that simulates the essential functions of an Automated Teller Machine (ATM). The system allows users to perform transactions such as withdrawals, deposits, balance inquiries, PIN changes, and transfers. It also supports an admin interface for managing users, including registration and viewing user details.

**Key Features:**
- Admin Login for system management
- User Login for secure access to personal accounts
- Basic banking functionalities such as:
    - Withdrawals
    - Deposits
    - Balance inquiries
    - Transfers
    - PIN changes
- Receipt generation for transactions

## 2. System Requirements
**Hardware:**
- Processor: Minimum of 1 GHz
- RAM: 512 MB or higher
- Hard Disk: At least 10 MB free space
- Console for running C programs (Linux/Windows)

**Software:**
- C Compiler (GCC, Turbo C, Code::Blocks, or Visual Studio)
- Basic knowledge of C programming and file handling

## 3. Project Modules

### 3.1 Admin Module
The Admin Module allows the admin to log in and manage the user accounts in the system. The admin can:
- View user accounts: See all registered users with their account details
- Search user details: Search for a user by account number to retrieve account details
- Register new users: Create new accounts by entering a unique account number, PIN, name, surname, and the initial deposit

**Admin Login Credentials:**
- Admin ID: 1526
- Password: password

### 3.2 User Module
The User Module allows authenticated users to log in and perform basic banking operations such as withdrawals, deposits, balance checks, and money transfers. Users can also change their PIN and print transaction receipts.

**Key User Operations:**
- Withdraw Money: Withdraw a specified amount, ensuring it doesn't exceed the account balance
- Deposit Money: Deposit money into the account
- Check Balance: Display the current balance in the user’s account
- Transfer Money: Transfer funds to another user by providing their account number
- Change PIN: Update the account's PIN after verifying the current PIN
- Print Receipt: Print a receipt for the current session's transactions

## 4. Functionalities in Detail
Admin Functions
Admin Login: Verifies the admin ID and password. Grants access to admin functionalities upon successful login.
void adminnewregister() {
    // Register new user by entering account number, PIN, name, surname, and balance
}

User Login: Users log in using their account number and PIN. The system locks the user after three incorrect login attempts.
void userlogin() {
    // User authentication based on account number and PIN
}

Withdraw Money: Validates whether the requested amount is a multiple of 100 and checks for sufficient funds.
void withdrawmoney(int k) {
    // Withdraw amount from the user’s account and update balance
}

Deposit Money: Validates whether the deposited amount is a multiple of 100.
void depositmoney(int k) {
    // Deposit money into the user’s account and update balance
}

Check Balance: Displays the current account balance.
void checkbalance(int k) {
    // Display account balance for the logged-in user
}

Change PIN: Allows the user to change their PIN after verifying their current PIN.
void pinchange(int k) {
    // Change the user’s PIN
}

Transfer Money: Allows a user to transfer money to another registered account by specifying the recipient’s account number.
void tamount(int k) {
    // Transfer money from one account to another
}

Receipt Printing: Prints a receipt for the transactions made in the current session.
void recipt(int temp) {
    // Print user transaction details
}

Main Function: The program’s flow starts with the main menu, offering two primary options: Admin Login or User Login.
int main() {
    // Displays the main menu
}

Static Data Initialization: The staticmembers() function initializes five pre-defined accounts for testing purposes.
void staticmembers() {
    // Initialize 5 default user accounts
}

### 4.1 Data Structure
The system uses the following structure to store account information:

```c
struct ATM {
    int accno; // Account Number
    int pin; // PIN (4-digit number)
    char name[20]; // User's First Name
    char surname[20]; // User's Last Name
    int amt; // Current Balance
} ob[20]; // Array to store data for 20 users

### 5.Conclusion
The ATM Management System project demonstrates core banking functionalities in C. It covers secure user and admin logins, basic transaction operations, and user management. While there are limitations like fixed user storage and plain-text PIN storage, the project provides a solid foundation for an ATM system simulation and can be further expanded with security and scalability features.
