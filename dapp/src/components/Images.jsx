import Button from "react-bootstrap/Button";
// import { contract } from "../App";
// async function mint(uri, id) {
//   const tx = await contract.mint(id, uri);
//   await tx.wait();
//   console.log("minted");
//   document.querySelector(".status").innerHTML = "Minted";
// }

function mint() {}

function Images(props) {
  // let uri = props.uri;
  // let id = props.Id;
  return (
    <div className="images">
      <img src={props.image} alt="cat" />
      <p style={{ color: "black" }}>#{props.Id}</p>
      <p className="status" style={{ color: "black" }}>
        Price 0.02 ETH each NFT
      </p>
      <Button onClick={mint()} className="button">
        Mint the NFT
      </Button>
    </div>
  );
}
export default Images;
