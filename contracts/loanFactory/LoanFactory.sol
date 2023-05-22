// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Loan.sol";
import "../tokens/ObligationToken.sol";
import "../configurationSystem/IConfiguration.sol";

contract LoanFactory {
    Loan[] private allLoans;
    ObligationToken public token;

    constructor(ObligationToken _token) {
        token = _token;
    }

    function createLoan(
        uint256 amount,
        uint256 interestRate,
        IConfiguration startLoanEntry,
        IConfiguration repayLoanEntry,
        IConfiguration repayInterestLoanEntry
    ) external {
        Loan newLoan = new Loan(
            msg.sender,
            amount,
            interestRate,
            token,
            startLoanEntry,
            repayLoanEntry,
            repayInterestLoanEntry
        );
        allLoans.push(newLoan);
    }

    function getAllLoans() external view returns (Loan[] memory) {
        return allLoans;
    }
}
