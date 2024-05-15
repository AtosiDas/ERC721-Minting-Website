// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
//import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
//import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// contract ERC721 is IERC721 {
//     string public name;
//     string public symbol;
//     constructor(string memory _name, string memory _symbol) {
//         name = _name;
//         symbol = _symbol;
//     }
//     // Mapping from token ID to owner address
//     mapping(uint256 => address) internal _ownerOf;

//     // Mapping owner address to token count
//     mapping(address => uint256) internal _balanceOf;

//     // Mapping from token ID to approved address
//     mapping(uint256 => address) internal _approvals;

//     // Mapping from owner to operator approvals
//     mapping(address => mapping(address => bool)) public isApprovedForAll;

//     function supportsInterface(bytes4 interfaceId) external pure returns (bool) {
//         return interfaceId == type(IERC721).interfaceId || interfaceId == type(IERC165).interfaceId;
//     }

//     function ownerOf(uint256 id) external view returns (address owner) { //Doubts
//         owner = _ownerOf[id];
//         require(owner != address(0), "token doesn't exist");
//     }

//     function balanceOf(address owner) external view returns (uint256) {
//         require(owner != address(0), "owner = zero address");
//         return _balanceOf[owner];
//     }

//     // function getTokenURI(uint256 tokenID) public view returns (string memory) {
//     //     _requireOwned(tokenID);

//     //     string memory baseURI = _baseURI();
//     //     return bytes(baseURI).length > 0 ? string.concat(baseURI, tokenID.toString()) : "";
//     // }

//     // function _requireOwned(uint256 tokenId) internal view returns (address) {
//     //     address owner = _ownerOf(tokenId);
//     //     require(owner == address(0));
//     //     return owner;
//     // }

//     // function _baseURI() internal  view returns(string memory) {
//     //     return "";
//     // }

//     function setApprovalForAll(address operator, bool approved) external {
//         isApprovedForAll[msg.sender][operator] = approved;
//         emit ApprovalForAll(msg.sender, operator, approved);
//     }

//     function approve(address spender, uint256 id) external {
//         address owner = _ownerOf[id];
//         require(msg.sender == owner || isApprovedForAll[owner][msg.sender], "not authorized");

//         _approvals[id] = spender;

//         emit Approval(owner, spender, id);
//     }

//     function getApproved(uint256 id) external view returns (address) {
//         require(_ownerOf[id] != address(0), "token doesn't exist");
//         return _approvals[id];
//     }

//     function _isApprovedOrOwner(address owner, address spender, uint256 id) internal view returns (bool) {
//         return (spender == owner || isApprovedForAll[owner][spender] || spender == _approvals[id]);
//     }

//     function transferFrom(address from, address to, uint256 id) public {
//         require(from == _ownerOf[id], "from != owner");
//         require(to != address(0), "transfer to zero address");

//         require(_isApprovedOrOwner(from, msg.sender, id), "not authorized");

//         _balanceOf[from]--;
//         _balanceOf[to]++;
//         _ownerOf[id] = to;

//         delete _approvals[id];

//         emit Transfer(from, to, id);
//     }

//     function safeTransferFrom(address from, address to, uint256 id) external {
//         transferFrom(from, to, id);

//         require(to.code.length == 0 || IERC721Receiver(to).onERC721Received(msg.sender, from, id, "") == IERC721Receiver.onERC721Received.selector, "unsafe recipient");
//     }

//     function safeTransferFrom(address from, address to, uint256 id, bytes calldata data) external {
//         transferFrom(from, to, id);

//         require(to.code.length == 0 || IERC721Receiver(to).onERC721Received(msg.sender, from, id, data) == IERC721Receiver.onERC721Received.selector, "unsafe recipient");
//     }

//     function _mint(address to, uint256 id) internal {
//         require(to != address(0), "mint to zero address");
//         require(_ownerOf[id] == address(0), "already minted");

//         _balanceOf[to]++;
//         _ownerOf[id] = to;

//         emit Transfer(address(0), to, id);
//     }

//     function _burn(uint256 id) internal {
//         address owner = _ownerOf[id];
//         require(owner != address(0), "not minted");

//         _balanceOf[owner] -= 1;

//         delete _ownerOf[id];
//         delete _approvals[id];

//         emit Transfer(owner, address(0), id);
//     }
// }

contract MyNFT is ERC721URIStorage, Ownable(msg.sender) {
    constructor() ERC721("Unique Graffiti tokens", "UGT") {}
    uint256 public price = 0.02 ether;
    function mint(uint256 _id, string memory _uri) external payable {
        require(msg.value == price, "Insufficient balance!");
        _mint(msg.sender, _id);
        _setTokenURI(_id, _uri);
    }

    function changePrice(uint256 _price) external onlyOwner {
        price = _price;
    }

    function burn(uint256 id) external {
        require(msg.sender == ownerOf(id), "not owner");
        _burn(id);
    }

    function withdraw() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }
}
