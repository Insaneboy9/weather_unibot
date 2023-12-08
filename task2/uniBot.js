const { ethers } = require("ethers");

async function main() {
    // Connect to the local Hardhat Network (Forked mainnet)
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545/");

    // Set up a wallet using a private key from hardhat account #19
    const privateKey = "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e";
    const wallet = new ethers.Wallet(privateKey, provider);
    const walletAddress = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"

    // pepe and WETH token address
    const pepeAddress = "0x6982508145454ce325ddbe47a25d4ec3d2311933"; 
    const wethAddress = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"

    // Address of the Uniswap V2 Router contract and Router contract
    const uniswapRouterAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"; 
    const uniswap = new ethers.Contract(uniswapRouterAddress, ['function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) payable returns (uint[] memory amounts)'], wallet);
    
    const ethAmount = ethers.parseEther("1");  // Amount of ETH to swap
    const deadline = Math.floor(Date.now() / 1000) + (60*10); // 1 minute from now
    const amountOutMin = 0; // Minimum acceptable amount of token for output
    const path = [wethAddress, pepeAddress]; // Construct the path array [WETH, pepe] to swap WETH to pepe

    // Send the transaction to perform the swap
    const tx = await uniswap.swapExactETHForTokens(
        amountOutMin,
        path,
        wallet.address,
        deadline,
        { value: ethAmount }
    );

    console.log("Transaction Hash:", tx.hash);

    // Get the ETH balance of the wallet 
    const balanceWei = await provider.getBalance(walletAddress);
    const balanceEth = ethers.formatEther(balanceWei);

    //Get the pepe balance of the wallet
    const pepeContract = new ethers.Contract(pepeAddress, ["function balanceOf(address) view returns (uint256)"], provider);
    const balancepepe = await pepeContract.balanceOf(walletAddress);
    const formatBalancePepe = ethers.formatUnits(balancepepe,18);
    
    console.log(`Wallet Address: ${walletAddress}`);
    console.log(`Balance: ${balanceEth} ETH`);
    console.log(`Balance: ${formatBalancePepe} pepe`);
    }

main();