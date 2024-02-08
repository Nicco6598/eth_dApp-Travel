// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductSale {
    address payable public owner;
    address payable private recipient;

    event Purchase(address indexed buyer, uint256 amount);

    constructor(address payable _recipient) {
        owner = payable(msg.sender);
        recipient = _recipient; // Inizializza recipient
    }

    function buyProduct() external payable {
        require(msg.value > 0, "Send ETH to buy the product");
        recipient.transfer(msg.value); // Cambia da owner a recipient
        emit Purchase(msg.sender, msg.value);
    }

    function withdraw() external {
        require(msg.sender == owner, "You are not the owner");
        owner.transfer(address(this).balance);
    }
}
