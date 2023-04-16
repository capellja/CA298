function Home() {
  const bgImage = {
    backgroundImage: "url('/uni.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    width: "100%",
    top: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  };

  return (
    <div style={bgImage}>
      <h1>WELCOME TO UNIVERSITY</h1>
    </div>
  );
}

export default Home;
