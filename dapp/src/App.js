import "./App.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
//import Images from "./components/Images";
import { ethers } from "ethers";

const contractABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    name: "changePrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721IncorrectOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721InsufficientApproval",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC721InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "ERC721InvalidOperator",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721InvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC721InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC721InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721NonexistentToken",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_fromTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_toTokenId",
        type: "uint256",
      },
    ],
    name: "BatchMetadataUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "MetadataUpdate",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_uri",
        type: "string",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "price",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const contractAddress = "0x4127c0170A1b5B204e8460e257f89c823c5EBf04";

async function connectWallet() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  //console.log(provider);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  //console.log(signer);
  const address = await signer.getAddress();
  //console.log(address);
  document.getElementById("wallet-address").textContent = address;
  // console.log(await provider.getBalance(address));
  let balance = await provider.getBalance(address);
  //console.log(balance);
  document.getElementById("balance").textContent =
    ethers.utils.formatEther(balance);
  document.querySelector("#balance").classList.remove("balance1");
  document.querySelector(".nfts").classList.remove("balance1");
  // contract = new ethers.Contract(contractAddress, contractABI, signer);

  // console.log("connected");
  // console.log(await contract.name());
  // console.log(await contract.symbol());
}

async function mint() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  //console.log(provider);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  //console.log(signer);
  const address = await signer.getAddress();

  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  console.log("connected");
  console.log(await contract.name());
  console.log(await contract.symbol());

  const value = ethers.utils.parseEther("0.02");
  const tx = await contract.mint(
    1,
    "ipfs://QmdQGBnphKaE16b5WVnrJwMv6pWQC7a7uoAYuqzadntAJy",
    { value: value }
  );
  await tx.wait();
  console.log("minted");
  document.querySelector(".status").innerHTML = "Minted";
  let balance = await provider.getBalance(address);
  document.getElementById("balance").textContent =
    ethers.utils.formatEther(balance);
  document.querySelector(".button").classList.add("balance1");
}

async function mint1() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  //console.log(provider);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  //console.log(signer);
  const address = await signer.getAddress();

  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  console.log("connected");
  console.log(await contract.name());
  console.log(await contract.symbol());

  const value = ethers.utils.parseEther("0.02");
  const tx = await contract.mint(
    2,
    "ipfs://Qmd2JHCFZPFeKUt72WFHm4HzqJdn2WEZsNHrkbwi3DKwiV",
    { value: value }
  );
  await tx.wait();
  console.log("minted");
  document.querySelector(".status1").innerHTML = "Minted";
  let balance = await provider.getBalance(address);
  document.getElementById("balance").textContent =
    ethers.utils.formatEther(balance);
  document.querySelector(".button1").classList.add("balance1");
}

async function mint2() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  //console.log(provider);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  //console.log(signer);
  const address = await signer.getAddress();

  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  console.log("connected");
  console.log(await contract.name());
  console.log(await contract.symbol());

  const value = ethers.utils.parseEther("0.02");
  const tx = await contract.mint(
    3,
    "ipfs://QmYKcBn5ppvMc3duXhiWby77vhSroLR4CNdxU8sSN73Pac",
    { value: value }
  );
  await tx.wait();
  console.log("minted");
  document.querySelector(".status2").innerHTML = "Minted";
  let balance = await provider.getBalance(address);
  document.getElementById("balance").textContent =
    ethers.utils.formatEther(balance);
  document.querySelector(".button2").classList.add("balance1");
}

async function mint3() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  //console.log(provider);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  //console.log(signer);
  const address = await signer.getAddress();

  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  console.log("connected");
  console.log(await contract.name());
  console.log(await contract.symbol());

  const value = ethers.utils.parseEther("0.02");
  const tx = await contract.mint(
    4,
    "ipfs://QmRmFFwapsMumBagWbyK1Lp7xuuSFK6iuvfq9KkuvqpRmk",
    { value: value }
  );
  await tx.wait();
  console.log("minted");
  document.querySelector(".status3").innerHTML = "Minted";
  let balance = await provider.getBalance(address);
  document.getElementById("balance").textContent =
    ethers.utils.formatEther(balance);
  document.querySelector(".button3").classList.add("balance1");
}

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <form
            className=" gradient col-lg-5"
            style={{ borderRadius: "15px", boxShadow: "1px 1px 10px black" }}
          >
            <h3>Mint Portal</h3>
            <h4>Please connect your wallet</h4>
            <Button
              onClick={connectWallet}
              id="wallet"
              style={{ marginBottom: "10px" }}
            >
              Connect Wallet
            </Button>
            <div
              className="card"
              id="wallet-address"
              style={{ margin: "10px" }}
            >
              Wallet address
            </div>
            <div id="balance" className="balance1" style={{ margin: "10px" }}>
              Balance
            </div>
          </form>
        </div>
        <div className="nfts balance1">
          <div className="images">
            <img
              src="https://bafybeifmlhwvkongrxera6rkjzafjd6cm4mym4zswyqccsywcx2mnygdbi.ipfs.cf-ipfs.com/"
              alt="cat"
            />
            <p style={{ color: "black" }}>#1</p>
            <p className="status" style={{ color: "black" }}>
              Price 0.02 ETH each NFT
            </p>
            <Button onClick={mint} className="button">
              Mint the NFT
            </Button>
          </div>

          <div className="images">
            <img
              src="https://bafybeidune5nt47clf3vde57sw2qkny2s72ovgjxb465jobrcorbqwp2ny.ipfs.cf-ipfs.com/"
              alt="dog"
            />
            <p style={{ color: "black" }}>#2</p>
            <p className="status1" style={{ color: "black" }}>
              Price 0.02 ETH each NFT
            </p>
            <Button onClick={mint1} className="button1">
              Mint the NFT
            </Button>
          </div>

          <div className="images">
            <img
              src="https://bafybeiearpg5u2344b2o4lwth4wnr2pzyam44syprgge3a53fkbk63tdaq.ipfs.cf-ipfs.com/"
              alt="flower"
            />
            <p style={{ color: "black" }}>#3</p>
            <p className="status2" style={{ color: "black" }}>
              Price 0.02 ETH each NFT
            </p>
            <Button onClick={mint2} className="button2">
              Mint the NFT
            </Button>
          </div>

          <div className="images">
            <img
              src="https://bafybeih6ce5ieqmlzv7vvpvpk232uor3g225a6lbbdzqpz7p7va3oajp4i.ipfs.cf-ipfs.com/"
              alt="lion"
            />
            <p style={{ color: "black" }}>#4</p>
            <p className="status3" style={{ color: "black" }}>
              Price 0.02 ETH each NFT
            </p>
            <Button onClick={mint3} className="button3">
              Mint the NFT
            </Button>
          </div>

          {/* <Images
            Id="1"
            image="https://bafybeifmlhwvkongrxera6rkjzafjd6cm4mym4zswyqccsywcx2mnygdbi.ipfs.cf-ipfs.com/"
            uri=""
          /> */}
          {/* <Images
            Id="2"
            image="https://bafybeidune5nt47clf3vde57sw2qkny2s72ovgjxb465jobrcorbqwp2ny.ipfs.cf-ipfs.com/"
          /> */}
          {/* <Images
            Id="3"
            image="https://bafybeiearpg5u2344b2o4lwth4wnr2pzyam44syprgge3a53fkbk63tdaq.ipfs.cf-ipfs.com/"
          /> */}
          {/* <Images
            Id="4"
            image="https://bafybeih6ce5ieqmlzv7vvpvpk232uor3g225a6lbbdzqpz7p7va3oajp4i.ipfs.cf-ipfs.com/"
          /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
