import Hero from "./Hero";

export default function Header() {

  let name = "Jency";
  let isMale = false;

  let userNameCSS = {
    color: "orange",
    backgroundColor: "pink",
    padding: "5px"
  };

  return (
    <>
      <h1>Header</h1>

      <a href="">About</a> |
      <a href="">Contact</a>

      <p style={userNameCSS}>
        Username : {name} {isMale ? "👨" : "👧"}
      </p>

      <Hero />
    </>
  );
}