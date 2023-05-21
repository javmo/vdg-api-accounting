// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../tokens/ObligationToken.sol";
import "../configurationSystem/IConfiguration.sol";

contract Loan {
    address public lender;
    address public borrower;
    uint256 public amount;
    uint256 public interestRate;
    uint256 public loanStart;
    bool public loanActive;
    ObligationToken public token;
    IConfiguration public startLoanEntry;
    IConfiguration public repayLoanEntry;
    IConfiguration public repayInterestLoanEntry;

    constructor(
        address _lender,
        uint256 _amount,
        uint256 _interestRate,
        ObligationToken _token,
        IConfiguration _startLoanEntry,
        IConfiguration _repayLoanEntry,
        IConfiguration _repayInterestLoanEntry
    ) {
        lender = _lender;
        amount = _amount;
        interestRate = _interestRate;
        token = _token;
        startLoanEntry = _startLoanEntry;
        repayLoanEntry = _repayLoanEntry;
        repayInterestLoanEntry = _repayInterestLoanEntry;
        loanActive = false;
    }

    // Removed setters as configurations are set in constructor

    function startLoan(address _borrower) public {
        require(!loanActive, "Loan is already active");

        borrower = _borrower;
        token.transferFrom(lender, borrower, amount);

        loanActive = true;
        loanStart = block.timestamp;
    }

    function calculateInterest() public view returns (uint256) {
        require(loanActive, "Loan is not active");
        uint256 timeElapsed = block.timestamp - loanStart;

        uint256 interest = (amount * interestRate * timeElapsed) / (1e18 * 365 days);

        return interest;
    }

    function repayLoan() public {
        require(loanActive, "Loan is not active");

        uint256 interest = calculateInterest();
        uint256 requiredTotal = amount + interest;

        // Transfer tokens from borrower to this contract
        token.transferFrom(borrower, lender, requiredTotal);

        loanActive = false;
    }

    function getBorrower() public view returns (address) {
        return borrower;
    }

    function getAmount() public view returns (uint256) {
        return amount;
    }

    function getInterestRate() public view returns (uint256) {
        return interestRate;
    }

    function getLoanStart() public view returns (uint256) {
        return loanStart;
    }

    function getLoanActive() public view returns (bool) {
        return loanActive;
    }

    function getToken() public view returns (ObligationToken) {
        return token;
    }

    function getStartLoanEntry() public view returns (IConfiguration) {
        return startLoanEntry;
    }

    function getRepayLoanEntry() public view returns (IConfiguration) {
        return repayLoanEntry;
    }

    function getRepayInterestLoanEntry() public view returns (IConfiguration) {
        return repayInterestLoanEntry;
    }
}
