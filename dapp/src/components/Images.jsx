import Button from "react-bootstrap/Button";
function Images(props) {
  return (
    <div className="images">
      <img src={props.image} alt="cat" />
      <p style={{ color: "black" }}>#{props.Id}</p>
      <p style={{ color: "black" }}>Price 0.02 ETH each NFT</p>
      <Button className="button">Mint the NFT</Button>
    </div>
  );
}
export default Images;
